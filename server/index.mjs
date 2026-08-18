import { createServer } from 'node:http';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const PORT = Number(process.env.API_PORT || 8787);
const HOST = process.env.API_HOST || '127.0.0.1';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const AUTH_DISABLED = !IS_PRODUCTION && process.env.AUTH_DISABLED !== 'false';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const DATABASE_PATH = resolve(process.env.DATABASE_PATH || './server/data/dashboard.sqlite');
const SESSION_DAYS = 14;

if (IS_PRODUCTION && !ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD is required when NODE_ENV=production.');
}

mkdirSync(dirname(DATABASE_PATH), { recursive: true });
const db = new DatabaseSync(DATABASE_PATH);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    event TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT DEFAULT '',
    source TEXT DEFAULT '',
    properties TEXT DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_visits_created ON visits(created_at);
  CREATE INDEX IF NOT EXISTS idx_visits_session ON visits(session_id);

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT DEFAULT '',
    email TEXT DEFAULT '',
    whatsapp TEXT DEFAULT '',
    source TEXT DEFAULT 'Manual',
    project_type TEXT DEFAULT '',
    description TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    value_cents INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'New',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    client TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Planning',
    progress INTEGER NOT NULL DEFAULT 0 CHECK(progress BETWEEN 0 AND 100),
    due_date TEXT DEFAULT '',
    budget_cents INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    client TEXT NOT NULL,
    project TEXT DEFAULT '',
    amount_cents INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Draft',
    sent_at TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    client TEXT NOT NULL,
    amount_cents INTEGER NOT NULL DEFAULT 0,
    due_date TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Draft',
    paid_at TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS content_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Page',
    path TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Draft',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const entityConfig = {
  leads: {
    table: 'leads',
    fields: ['name', 'company', 'email', 'whatsapp', 'source', 'project_type', 'description', 'budget', 'value_cents', 'status'],
    required: ['name'],
  },
  projects: {
    table: 'projects',
    fields: ['name', 'client', 'status', 'progress', 'due_date', 'budget_cents'],
    required: ['name'],
  },
  proposals: {
    table: 'proposals',
    fields: ['reference', 'client', 'project', 'amount_cents', 'status', 'sent_at'],
    required: ['reference', 'client'],
  },
  invoices: {
    table: 'invoices',
    fields: ['reference', 'client', 'amount_cents', 'due_date', 'status', 'paid_at'],
    required: ['reference', 'client'],
  },
  content: {
    table: 'content_items',
    fields: ['title', 'type', 'path', 'status'],
    required: ['title'],
  },
};

function json(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(JSON.stringify(body));
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map((entry) => {
    const index = entry.indexOf('=');
    return [entry.slice(0, index).trim(), decodeURIComponent(entry.slice(index + 1))];
  }));
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('Request body is too large.'));
    });
    req.on('end', () => {
      if (!body) return resolveBody({});
      try { resolveBody(JSON.parse(body)); } catch { reject(new Error('Invalid JSON.')); }
    });
    req.on('error', reject);
  });
}

function secureEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function tokenHash(token) {
  return createHash('sha256').update(token).digest('hex');
}

function isAuthenticated(req) {
  if (AUTH_DISABLED) return true;
  const token = parseCookies(req).admin_session;
  if (!token) return false;
  const session = db.prepare('SELECT expires_at FROM sessions WHERE token_hash = ?').get(tokenHash(token));
  return Boolean(session && new Date(session.expires_at) > new Date());
}

function sanitizeRecord(config, payload, partial = false) {
  const record = {};
  for (const field of config.fields) {
    if (payload[field] !== undefined) record[field] = payload[field];
  }
  if (!partial) {
    for (const field of config.required) {
      if (!String(record[field] || '').trim()) throw new Error(`${field} is required.`);
    }
  }
  for (const field of ['value_cents', 'budget_cents', 'amount_cents', 'progress']) {
    if (record[field] !== undefined) record[field] = Math.max(0, Number(record[field]) || 0);
  }
  return record;
}

function listEntity(config) {
  return db.prepare(`SELECT * FROM ${config.table} ORDER BY created_at DESC`).all();
}

function createEntity(config, payload) {
  const record = sanitizeRecord(config, payload);
  const fields = Object.keys(record);
  const placeholders = fields.map(() => '?').join(', ');
  const result = db.prepare(`INSERT INTO ${config.table} (${fields.join(', ')}) VALUES (${placeholders})`).run(...fields.map((field) => record[field]));
  return db.prepare(`SELECT * FROM ${config.table} WHERE id = ?`).get(result.lastInsertRowid);
}

function updateEntity(config, id, payload) {
  const record = sanitizeRecord(config, payload, true);
  const fields = Object.keys(record);
  if (!fields.length) throw new Error('No supported fields were provided.');
  db.prepare(`UPDATE ${config.table} SET ${fields.map((field) => `${field} = ?`).join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...fields.map((field) => record[field]), id);
  return db.prepare(`SELECT * FROM ${config.table} WHERE id = ?`).get(id);
}

function dateRangeDays(value) {
  const parsed = Number(value);
  return [7, 30, 90, 365].includes(parsed) ? parsed : 30;
}

function analytics(days) {
  const modifier = `-${days - 1} days`;
  const summary = db.prepare(`
    SELECT COUNT(*) AS visits, COUNT(DISTINCT session_id) AS visitors
    FROM visits WHERE event = 'page_view' AND created_at >= datetime('now', ?)
  `).get(modifier);
  const daily = db.prepare(`
    WITH RECURSIVE dates(day) AS (
      SELECT date('now', ?)
      UNION ALL SELECT date(day, '+1 day') FROM dates WHERE day < date('now')
    )
    SELECT dates.day, COUNT(visits.id) AS visits, COUNT(DISTINCT visits.session_id) AS visitors
    FROM dates LEFT JOIN visits ON date(visits.created_at) = dates.day AND visits.event = 'page_view'
    GROUP BY dates.day ORDER BY dates.day
  `).all(modifier);
  const sources = db.prepare(`
    SELECT CASE WHEN source = '' THEN 'Direct' ELSE source END AS source, COUNT(*) AS visits
    FROM visits WHERE event = 'page_view' AND created_at >= datetime('now', ?)
    GROUP BY source ORDER BY visits DESC LIMIT 8
  `).all(modifier);
  const pages = db.prepare(`
    SELECT path, COUNT(*) AS views, COUNT(DISTINCT session_id) AS visitors
    FROM visits WHERE event = 'page_view' AND created_at >= datetime('now', ?)
    GROUP BY path ORDER BY views DESC LIMIT 8
  `).all(modifier);
  return { days, summary, daily, sources, pages };
}

function dashboard(days) {
  const data = analytics(days);
  const revenue = db.prepare(`SELECT COALESCE(SUM(amount_cents), 0) AS cents FROM invoices WHERE status = 'Paid' AND paid_at >= date('now', 'start of month')`).get();
  const outstanding = db.prepare(`SELECT COALESCE(SUM(amount_cents), 0) AS cents, COUNT(*) AS count FROM invoices WHERE status NOT IN ('Paid', 'Draft')`).get();
  const leadSummary = db.prepare(`SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'Qualified' THEN 1 ELSE 0 END) AS qualified FROM leads`).get();
  const projectSummary = db.prepare(`SELECT COUNT(*) AS active FROM projects WHERE status NOT IN ('Completed', 'Archived')`).get();
  const monthlyRevenue = db.prepare(`
    WITH RECURSIVE months(month) AS (
      SELECT date('now', 'start of month', '-11 months')
      UNION ALL SELECT date(month, '+1 month') FROM months WHERE month < date('now', 'start of month')
    )
    SELECT months.month, COALESCE(SUM(invoices.amount_cents), 0) AS cents
    FROM months LEFT JOIN invoices ON date(invoices.paid_at, 'start of month') = months.month AND invoices.status = 'Paid'
    GROUP BY months.month ORDER BY months.month
  `).all();
  return { analytics: data, revenue, outstanding, leadSummary, projectSummary, monthlyRevenue };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname.replace(/\/+$/, '') || '/';

  try {
    if (req.method === 'GET' && path === '/api/health') {
      return json(res, 200, { ok: true, database: true, authRequired: !AUTH_DISABLED });
    }

    if (req.method === 'POST' && path === '/api/auth/login') {
      const body = await readBody(req);
      if (AUTH_DISABLED || secureEqual(String(body.password || ''), ADMIN_PASSWORD)) {
        const token = randomBytes(32).toString('base64url');
        const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);
        db.prepare('DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP').run();
        db.prepare('INSERT INTO sessions (token_hash, expires_at) VALUES (?, ?)').run(tokenHash(token), expires.toISOString());
        return json(res, 200, { ok: true }, {
          'Set-Cookie': `admin_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}${IS_PRODUCTION ? '; Secure' : ''}`,
        });
      }
      return json(res, 401, { error: 'Invalid password.' });
    }

    if (req.method === 'GET' && path === '/api/auth/session') {
      return json(res, 200, { authenticated: isAuthenticated(req), authRequired: !AUTH_DISABLED });
    }

    if (req.method === 'POST' && path === '/api/auth/logout') {
      const token = parseCookies(req).admin_session;
      if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash(token));
      return json(res, 200, { ok: true }, { 'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0' });
    }

    if (req.method === 'POST' && path === '/api/track') {
      const body = await readBody(req);
      const event = String(body.event || '').slice(0, 64);
      const sessionId = String(body.sessionId || '').slice(0, 128);
      const pagePath = String(body.path || '/').slice(0, 500);
      if (!event || !sessionId || !['page_view', 'lead_form_submit', 'proposal_view', 'content_view'].includes(event)) {
        return json(res, 400, { error: 'Invalid analytics event.' });
      }
      db.prepare('INSERT INTO visits (session_id, event, path, referrer, source, properties) VALUES (?, ?, ?, ?, ?, ?)').run(
        sessionId,
        event,
        pagePath,
        String(body.referrer || '').slice(0, 1000),
        String(body.source || '').slice(0, 120),
        JSON.stringify(body.properties || {}).slice(0, 10_000),
      );
      return json(res, 202, { ok: true });
    }

    if (req.method === 'POST' && path === '/api/leads/public') {
      const body = await readBody(req);
      if (String(body.website || '').trim()) return json(res, 202, { ok: true });
      const lead = createEntity(entityConfig.leads, {
        name: String(body.name || '').slice(0, 160),
        whatsapp: String(body.whatsapp || '').slice(0, 80),
        source: 'Website form',
        project_type: String(body.projectType || '').slice(0, 120),
        description: String(body.description || '').slice(0, 5000),
        budget: String(body.budget || '').slice(0, 120),
        status: 'New',
      });
      return json(res, 201, { ok: true, id: lead.id });
    }

    if (!isAuthenticated(req)) return json(res, 401, { error: 'Authentication required.' });

    if (req.method === 'GET' && path === '/api/dashboard') {
      return json(res, 200, dashboard(dateRangeDays(url.searchParams.get('days'))));
    }

    if (req.method === 'GET' && path === '/api/analytics') {
      return json(res, 200, analytics(dateRangeDays(url.searchParams.get('days'))));
    }

    const entityMatch = path.match(/^\/api\/(leads|projects|proposals|invoices|content)(?:\/(\d+))?$/);
    if (entityMatch) {
      const [, entity, idText] = entityMatch;
      const config = entityConfig[entity];
      if (req.method === 'GET' && !idText) return json(res, 200, { items: listEntity(config) });
      if (req.method === 'POST' && !idText) return json(res, 201, createEntity(config, await readBody(req)));
      if (req.method === 'PATCH' && idText) return json(res, 200, updateEntity(config, Number(idText), await readBody(req)));
      if (req.method === 'DELETE' && idText) {
        db.prepare(`DELETE FROM ${config.table} WHERE id = ?`).run(Number(idText));
        return json(res, 200, { ok: true });
      }
    }

    return json(res, 404, { error: 'Not found.' });
  } catch (error) {
    const isConstraint = String(error.message).includes('UNIQUE constraint');
    return json(res, isConstraint ? 409 : 400, { error: isConstraint ? 'That reference already exists.' : error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Dashboard API listening on http://${HOST}:${PORT}`);
  console.log(`SQLite database: ${DATABASE_PATH}`);
  if (AUTH_DISABLED) console.log('Development authentication is disabled. Set AUTH_DISABLED=false to test login.');
});
