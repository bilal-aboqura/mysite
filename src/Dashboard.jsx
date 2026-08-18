import { useCallback, useEffect, useState } from 'react';
import bilalPhoto from './assets/IMG_E1456-640.webp';
import { adminApi } from './adminApi';
import './Dashboard.css';

const navItems = [
  ['overview', 'Overview', 'grid'],
  ['analytics', 'Analytics', 'chart'],
  ['leads', 'Leads', 'users'],
  ['projects', 'Projects', 'folder'],
  ['proposals', 'Proposals', 'file'],
  ['invoices', 'Invoices', 'receipt'],
  ['content', 'Content', 'edit'],
];

const EMPTY_SERIES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const ENTITY_TYPES = {
  Lead: 'leads',
  Project: 'projects',
  Proposal: 'proposals',
  Invoice: 'invoices',
  'Content draft': 'content',
};

const formatMoney = (cents = 0) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(Number(cents) / 100);

const formatDate = (value) => value
  ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(value))
  : '—';

const rangeToDays = (range) => ({
  'Last 7 days': 7,
  'Last 30 days': 30,
  'Last 90 days': 90,
  'This year': 365,
}[range] || 30);

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 19h22"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    folder: <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H10l2 3h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/>,
    file: <><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></>,
    receipt: <><path d="M5 3v18l3-2 4 2 4-2 3 2V3l-3 2-4-2-4 2Z"/><path d="M9 9h6M9 13h6"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    trend: <><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    chevron: <path d="m7 10 5 5 5-5"/>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  };
  return <svg className="admin-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function MiniChart({ values, color = 'blue' }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${36 - ((value - min) / (max - min || 1)) * 30}`).join(' ');
  return (
    <svg className={`admin-mini-chart is-${color}`} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

function LineChart({ values, labels }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - ((value - min) / (max - min || 1)) * 72 - 12}`).join(' ');
  const area = `0,100 ${points} 100,100`;
  return (
    <div className="admin-chart-wrap">
      <div className="admin-chart-y"><span>900</span><span>600</span><span>300</span><span>0</span></div>
      <svg className="admin-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Website visits trend for the selected period">
        <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1473e6" stopOpacity=".22"/><stop offset="1" stopColor="#1473e6" stopOpacity="0"/></linearGradient></defs>
        <g className="chart-grid"><line x1="0" x2="100" y1="12" y2="12"/><line x1="0" x2="100" y1="36" y2="36"/><line x1="0" x2="100" y1="60" y2="60"/><line x1="0" x2="100" y1="84" y2="84"/></g>
        <polygon points={area} fill="url(#chartFill)" />
        <polyline points={points} />
      </svg>
      <div className="admin-chart-x">{labels.map((label) => <span key={label}>{label}</span>)}</div>
    </div>
  );
}

function Status({ children }) {
  const key = children.toLowerCase().replaceAll(' ', '-');
  return <span className={`admin-status is-${key}`}><i />{children}</span>;
}

function Metric({ label, value, change, icon, tone = 'blue', values = EMPTY_SERIES }) {
  return (
    <article className="admin-metric">
      <div className={`admin-metric-icon is-${tone}`}><Icon name={icon} size={19} /></div>
      <div className="admin-metric-copy"><span>{label}</span><strong>{value}</strong><small className={change.startsWith('+') ? 'is-up' : 'is-neutral'}>{change}</small></div>
      <MiniChart values={values} color={tone} />
    </article>
  );
}

function EmptyState({ title, body, action }) {
  return <div className="admin-empty-state"><span><Icon name="folder" /></span><h3>{title}</h3><p>{body}</p>{action}</div>;
}

function SectionHeader({ title, subtitle, action }) {
  return <div className="admin-section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function Overview({ onNavigate, summary, records }) {
  const analytics = summary?.analytics || { summary: { visits: 0, visitors: 0 }, daily: [] };
  const dailyVisits = analytics.daily.map((day) => day.visits);
  const monthly = summary?.monthlyRevenue || [];
  const monthlyValues = monthly.map((item) => item.cents);
  const maxMonthly = Math.max(...monthlyValues, 1);
  const totalLeads = records.leads.length;
  const leadStages = ['New', 'Contacted', 'Qualified', 'Proposal'];
  const recent = [
    ...records.leads.map((item) => ({ type: 'lead', title: `Lead: ${item.name}`, detail: item.source, date: item.created_at })),
    ...records.invoices.map((item) => ({ type: 'payment', title: `${item.reference} · ${item.status}`, detail: `${item.client} · ${formatMoney(item.amount_cents)}`, date: item.updated_at })),
    ...records.proposals.map((item) => ({ type: 'proposal', title: `${item.reference} · ${item.status}`, detail: item.client, date: item.updated_at })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return <div className="admin-view">
    <section className="admin-metrics" aria-label="Business summary">
      <Metric label="Revenue this month" value={formatMoney(summary?.revenue?.cents)} change="Paid invoices" icon="receipt" values={monthlyValues} />
      <Metric label="Website visits" value={Number(analytics.summary.visits || 0).toLocaleString()} change={`${analytics.summary.visitors || 0} unique visitors`} icon="eye" tone="violet" values={dailyVisits} />
      <Metric label="Qualified leads" value={String(summary?.leadSummary?.qualified || 0)} change={`${totalLeads} total leads`} icon="users" tone="green" values={EMPTY_SERIES} />
      <Metric label="Outstanding" value={formatMoney(summary?.outstanding?.cents)} change={`${summary?.outstanding?.count || 0} invoices`} icon="clock" tone="amber" values={EMPTY_SERIES} />
    </section>

    <section className="admin-overview-grid">
      <article className="admin-panel admin-revenue-panel">
        <SectionHeader title="Revenue" subtitle="Collected payments across the last 12 months" action={<button className="admin-text-button" onClick={() => onNavigate('invoices')}>View invoices <Icon name="arrow" size={16}/></button>} />
        <div className="admin-revenue-total"><strong>{formatMoney(monthlyValues.reduce((sum, value) => sum + value, 0))}</strong><span>Recorded payments</span></div>
        <div className="admin-bar-chart" aria-label="Monthly revenue chart">
          {monthly.map((item, index) => <div className="admin-bar-column" key={item.month}><i style={{ height: `${Math.max(4, (item.cents / maxMonthly) * 100)}%` }} className={index === monthly.length - 1 ? 'is-current' : ''}/><span>{new Date(`${item.month}T00:00:00`).toLocaleDateString('en-US', { month: 'short' })}</span></div>)}
        </div>
      </article>

      <article className="admin-panel admin-pipeline-panel">
        <SectionHeader title="Sales pipeline" subtitle={`${formatMoney(records.leads.reduce((sum, lead) => sum + Number(lead.value_cents || 0), 0))} potential value`} />
        <div className="admin-pipeline-total"><div className="admin-pipeline-ring"><strong>{totalLeads}</strong><span>active</span></div><div><strong>{records.proposals.filter((item) => item.status === 'Accepted').length}</strong><span>accepted proposals</span></div></div>
        <div className="admin-pipeline-list">{leadStages.map((stage, index) => { const count = records.leads.filter((lead) => lead.status === stage).length; return <div key={stage}><span>{stage}<b>{count}</b></span><i><em className={`is-${['blue','violet','amber','green'][index]}`} style={{ width: `${totalLeads ? (count / totalLeads) * 100 : 0}%` }}/></i></div>; })}</div>
      </article>
    </section>

    <section className="admin-bottom-grid">
      <article className="admin-panel admin-projects-panel">
        <SectionHeader title="Active projects" subtitle={`${records.projects.length} projects recorded`} action={<button className="admin-text-button" onClick={() => onNavigate('projects')}>View all <Icon name="arrow" size={16}/></button>} />
        {records.projects.length ? <div className="admin-project-list">{records.projects.slice(0, 5).map((project) => <div className="admin-project-row" key={project.id}><span className="admin-project-mark">{project.name.slice(0,2).toUpperCase()}</span><div><strong>{project.name}</strong><span>{project.client || 'No client'} · Due {formatDate(project.due_date)}</span></div><div className="admin-progress"><span>{project.progress}%</span><i><em style={{ width: `${project.progress}%` }}/></i></div><button className="admin-icon-button" aria-label={`More actions for ${project.name}`}><Icon name="more"/></button></div>)}</div> : <EmptyState title="No projects yet" body="Use Quick add to create your first active project." />}
      </article>
      <article className="admin-panel admin-activity-panel">
        <SectionHeader title="Recent activity" subtitle="Stored workspace updates" />
        {recent.length ? <div className="admin-activity-list">{recent.map((item) => <div key={`${item.type}-${item.title}-${item.date}`}><span className={`activity-dot is-${item.type}`}><Icon name={item.type === 'payment' ? 'receipt' : item.type === 'lead' ? 'users' : 'file'} size={16}/></span><p><strong>{item.title}</strong><span>{item.detail}</span></p><time>{formatDate(item.date)}</time></div>)}</div> : <EmptyState title="Nothing recorded yet" body="New leads, proposals, and payments will appear here." />}
      </article>
    </section>
  </div>;
}

function Analytics({ data, leadCount }) {
  const daily = data?.daily || [];
  const values = daily.map((day) => day.visits);
  const totalVisits = Number(data?.summary?.visits || 0);
  const visitors = Number(data?.summary?.visitors || 0);
  const sourceTotal = (data?.sources || []).reduce((sum, item) => sum + Number(item.visits), 0);
  const conversion = visitors ? ((leadCount / visitors) * 100).toFixed(1) : '0.0';
  const labels = daily.filter((_, index) => index % Math.max(1, Math.floor(daily.length / 7)) === 0).map((item) => formatDate(item.day));

  return <div className="admin-view">
    <div className="admin-demo-note is-connected"><span><Icon name="check" size={18}/><strong>First-party analytics is active.</strong> New public-site visits are written directly to your database.</span></div>
    <section className="admin-metrics admin-analytics-metrics">
      <Metric label="Total visits" value={totalVisits.toLocaleString()} change={`${data?.days || 30}-day range`} icon="eye" values={values} />
      <Metric label="Unique visitors" value={visitors.toLocaleString()} change="Anonymous sessions" icon="users" tone="violet" values={daily.map((day) => day.visitors)} />
      <Metric label="Pages per visitor" value={visitors ? (totalVisits / visitors).toFixed(1) : '0.0'} change="Across tracked pages" icon="file" tone="green" values={values} />
      <Metric label="Visitor-to-lead" value={`${conversion}%`} change={`${leadCount} stored leads`} icon="trend" tone="amber" values={EMPTY_SERIES} />
    </section>
    <section className="admin-panel admin-traffic-panel">
      <SectionHeader title="Website traffic" subtitle={`Daily visits · last ${data?.days || 30} days`} action={<div className="admin-chart-legend"><span><i/>Visits</span><strong>{totalVisits.toLocaleString()} total</strong></div>} />
      <LineChart values={values.length ? values : EMPTY_SERIES} labels={labels.length ? labels : ['No visits yet']} />
    </section>
    <section className="admin-analytics-grid">
      <article className="admin-panel"><SectionHeader title="Traffic sources" subtitle="Campaign source or direct traffic" />{data?.sources?.length ? <div className="admin-source-list">{data.sources.map((item) => { const percent = sourceTotal ? Math.round((item.visits / sourceTotal) * 100) : 0; return <div key={item.source}><span>{item.source}<b>{item.visits}</b></span><i><em style={{ width: `${percent}%` }}/></i><strong>{percent}%</strong></div>; })}</div> : <EmptyState title="No source data yet" body="Sources appear after your public site receives visits." />}</article>
      <article className="admin-panel"><SectionHeader title="Top pages" subtitle="Most visited content" />{data?.pages?.length ? <div className="admin-top-pages">{data.pages.map((item) => <div key={item.path}><span><Icon name="file" size={17}/><span><strong>{item.path === '/' ? 'Home' : item.path}</strong><small>{item.path}</small></span></span><b>{item.views}</b><em>{item.visitors} people</em></div>)}</div> : <EmptyState title="No page views yet" body="Open your public site to record the first page view." />}</article>
    </section>
    <section className="admin-insights-strip">
      <div><span className="insight-icon"><Icon name="globe"/></span><p><strong>Self-hosted and private</strong><span>Traffic records stay in your own SQLite database.</span></p></div>
      <div><span className="insight-icon"><Icon name="clock"/></span><p><strong>{data?.days || 30}-day reporting window</strong><span>Change the date range from the page header.</span></p></div>
      <div><span className="insight-icon"><Icon name="users"/></span><p><strong>Anonymous visitor sessions</strong><span>No names, emails, or fingerprinting are collected.</span></p></div>
    </section>
  </div>;
}

function DataTable({ columns, rows, empty = 'No records yet.' }) {
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{columns.map((column, index) => <th key={`${column}-${index}`}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows : <tr><td className="admin-table-empty" colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>;
}

function Leads({ search, items }) {
  const filtered = items.filter((lead) => `${lead.name} ${lead.company} ${lead.status}`.toLowerCase().includes(search.toLowerCase()));
  const value = items.reduce((sum, lead) => sum + Number(lead.value_cents || 0), 0);
  return <div className="admin-view"><div className="admin-list-summary"><div><strong>{items.length}</strong><span>All leads</span></div><div><strong>{items.filter((lead) => lead.status === 'New').length}</strong><span>New</span></div><div><strong>{items.filter((lead) => lead.status === 'Qualified').length}</strong><span>Qualified</span></div><div><strong>{formatMoney(value)}</strong><span>Pipeline value</span></div></div><section className="admin-panel admin-data-panel"><SectionHeader title="Lead inbox" subtitle={`${filtered.length} contacts shown`} /><DataTable columns={['Contact','Source','Potential value','Stage','Received','']} empty="No leads yet. Website enquiries will appear here automatically." rows={filtered.map((lead) => <tr key={lead.id}><td><div className="admin-person"><span>{lead.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}</span><div><strong>{lead.name}</strong><small>{lead.company || lead.whatsapp || 'No company'}</small></div></div></td><td>{lead.source}</td><td><strong>{formatMoney(lead.value_cents)}</strong></td><td><Status>{lead.status}</Status></td><td>{formatDate(lead.created_at)}</td><td><button className="admin-icon-button" aria-label={`More actions for ${lead.name}`}><Icon name="more"/></button></td></tr>)}/></section></div>;
}

function Projects({ items, onAdd }) {
  const groups = ['Planning', 'In progress', 'Review'];
  return <div className="admin-view"><div className="admin-board">{groups.map((group) => <section className="admin-board-column" key={group}><header><span><i className={`is-${group === 'Planning' ? 'amber' : group === 'Review' ? 'green' : 'blue'}`}/>{group}</span><b>{items.filter((project) => project.status === group).length}</b></header>{items.filter((project) => project.status === group).map((project) => <article className="admin-project-card" key={project.id}><div><span className="admin-project-mark">{project.name.slice(0,2).toUpperCase()}</span><button className="admin-icon-button" aria-label="Project menu"><Icon name="more"/></button></div><h3>{project.name}</h3><p>{project.client || 'No client assigned'}</p><div className="admin-card-progress"><span>Progress <b>{project.progress}%</b></span><i><em style={{width:`${project.progress}%`}}/></i></div><footer><span><Icon name="clock" size={15}/> Due {formatDate(project.due_date)}</span><div className="admin-card-avatars"><i>BA</i></div></footer></article>)}<button className="admin-add-card" onClick={onAdd}><Icon name="plus" size={17}/> Add project</button></section>)}</div></div>;
}

function Proposals({ search, items }) {
  const filtered = items.filter((item) => `${item.client} ${item.project} ${item.reference}`.toLowerCase().includes(search.toLowerCase()));
  const decided = items.filter((item) => ['Accepted', 'Declined'].includes(item.status));
  const winRate = decided.length ? Math.round((decided.filter((item) => item.status === 'Accepted').length / decided.length) * 100) : 0;
  return <div className="admin-view"><div className="admin-list-summary"><div><strong>{formatMoney(items.reduce((sum, item) => sum + Number(item.amount_cents || 0), 0))}</strong><span>Total value</span></div><div><strong>{winRate}%</strong><span>Acceptance rate</span></div><div><strong>{items.filter((item) => item.status === 'Draft').length}</strong><span>Drafts</span></div><div><strong>{items.filter((item) => item.status === 'Viewed').length}</strong><span>Awaiting reply</span></div></div><section className="admin-panel admin-data-panel"><SectionHeader title="All proposals" subtitle="Track every proposal from draft to decision" /><DataTable columns={['Proposal','Client','Project','Amount','Status','Sent','']} empty="No proposals yet. Create one with Quick add." rows={filtered.map((item) => <tr key={item.id}><td><strong>{item.reference}</strong></td><td>{item.client}</td><td>{item.project}</td><td><strong>{formatMoney(item.amount_cents)}</strong></td><td><Status>{item.status}</Status></td><td>{formatDate(item.sent_at)}</td><td><button className="admin-icon-button" aria-label={`More actions for ${item.reference}`}><Icon name="more"/></button></td></tr>)}/></section></div>;
}

function Invoices({ search, items }) {
  const filtered = items.filter((item) => `${item.client} ${item.reference}`.toLowerCase().includes(search.toLowerCase()));
  const sum = (predicate) => items.filter(predicate).reduce((total, item) => total + Number(item.amount_cents || 0), 0);
  return <div className="admin-view"><div className="admin-list-summary"><div><strong>{formatMoney(sum((item) => item.status === 'Paid'))}</strong><span>Paid</span></div><div><strong>{formatMoney(sum((item) => ['Sent','Due soon'].includes(item.status)))}</strong><span>Awaiting payment</span></div><div className="is-warning"><strong>{formatMoney(sum((item) => item.status === 'Overdue'))}</strong><span>Overdue</span></div><div><strong>{items.length}</strong><span>Total invoices</span></div></div><section className="admin-panel admin-data-panel"><SectionHeader title="Invoices" subtitle="Payments and outstanding balances" /><DataTable columns={['Invoice','Client','Amount','Due date','Status','']} empty="No invoices yet. Create one with Quick add." rows={filtered.map((item) => <tr key={item.id}><td><strong>{item.reference}</strong></td><td>{item.client}</td><td><strong>{formatMoney(item.amount_cents)}</strong></td><td>{formatDate(item.due_date)}</td><td><Status>{item.status}</Status></td><td><button className="admin-icon-button" aria-label={`More actions for ${item.reference}`}><Icon name="more"/></button></td></tr>)}/></section></div>;
}

function Content({ search, items, pages }) {
  const filtered = items.filter((item) => `${item.title} ${item.type}`.toLowerCase().includes(search.toLowerCase()));
  const viewMap = Object.fromEntries((pages || []).map((page) => [page.path, page.views]));
  return <div className="admin-view"><section className="admin-panel admin-data-panel"><SectionHeader title="Site content" subtitle="Database-backed content records and real page views" action={<a className="admin-filter-button" href="/" target="_blank"><Icon name="external" size={16}/> Open website</a>}/><DataTable columns={['Title','Type','Last updated','Status','Views','']} empty="No content records yet. Add published pages with Quick add." rows={filtered.map((item) => <tr key={item.id}><td><div className="admin-content-title"><span><Icon name="file" size={18}/></span><strong>{item.title}</strong></div></td><td>{item.type}</td><td>{formatDate(item.updated_at)}</td><td><Status>{item.status}</Status></td><td><strong>{viewMap[item.path] || 0}</strong></td><td><button className="admin-icon-button" aria-label={`Edit ${item.title}`}><Icon name="edit" size={17}/></button></td></tr>)}/></section></div>;
}

function Settings() {
  return <div className="admin-view admin-settings"><section className="admin-panel"><SectionHeader title="Data connections" subtitle="Services currently powering this dashboard"/><div className="admin-integration-list"><div><span className="integration-logo is-google"><Icon name="chart"/></span><p><strong>First-party analytics</strong><span>Anonymous page views are stored in your own SQLite database</span></p><Status>Connected</Status></div><div><span className="integration-logo is-stripe">DB</span><p><strong>Workspace database</strong><span>Leads, projects, proposals, invoices, and content</span></p><Status>Connected</Status></div><div><span className="integration-logo is-mail"><Icon name="mail"/></span><p><strong>Project enquiry endpoint</strong><span>Website form submissions become dashboard leads</span></p><Status>Connected</Status></div></div></section><section className="admin-panel admin-profile-settings"><SectionHeader title="Deployment security" subtitle="Production configuration required"/><div className="admin-security-note"><Icon name="settings"/><div><strong>Set ADMIN_PASSWORD before deployment</strong><p>The Docker API refuses to start in production without it. Sessions use an HTTP-only, same-site cookie.</p></div></div><div className="admin-settings-form"><label><span>Database</span><input value="SQLite · persistent Docker volume" readOnly/></label><label><span>Analytics</span><input value="First-party · anonymous sessions" readOnly/></label></div></section></div>;
}

function QuickAdd({ open, onClose, onSave }) {
  const [type, setType] = useState('Lead');
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    setTitle('');
    setClient('');
    setValue('');
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try { await onSave({ type, title, client, value }); } finally { setSaving(false); }
  };
  return <div className="admin-sheet-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="admin-sheet" role="dialog" aria-modal="true" aria-labelledby="quick-add-title"><header><div><h2 id="quick-add-title">Create something new</h2><p>This record will be saved to your dashboard database.</p></div><button className="admin-icon-button" aria-label="Close" onClick={onClose}><Icon name="close"/></button></header><form onSubmit={submit}><label><span>Type</span><select value={type} onChange={(event) => setType(event.target.value)}>{Object.keys(ENTITY_TYPES).map((option) => <option key={option}>{option}</option>)}</select></label><label><span>Name or title</span><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Acme website redesign" autoFocus/></label><label><span>Client</span><input value={client} onChange={(event) => setClient(event.target.value)} placeholder="Client or company name"/></label><label><span>Estimated value</span><div className="admin-money-input"><span>$</span><input value={value} onChange={(event) => setValue(event.target.value)} inputMode="decimal" placeholder="0.00"/></div></label><div className="admin-sheet-actions"><button type="button" className="admin-secondary-button" onClick={onClose}>Cancel</button><button className="admin-primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create item'}</button></div></form></aside></div>;
}

function Login({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await adminApi.login(password);
      onAuthenticated();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  };
  return <main className="admin-login"><section><span className="admin-brand-mark">B</span><h1>Bilal Studio admin</h1><p>Sign in to access private business and website data.</p><form onSubmit={submit}><label><span>Admin password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus autoComplete="current-password"/></label>{error && <p className="admin-login-error" role="alert">{error}</p>}<button className="admin-primary-button" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button></form></section></main>;
}

const viewTitles = {
  overview: ['Good morning, Bilal', 'Here’s what is happening across your business today.'],
  analytics: ['Website analytics', 'Understand who visits your site and what brings them in.'],
  leads: ['Leads', 'Qualify enquiries and keep every opportunity moving.'],
  projects: ['Projects', 'Plan delivery and track active client work.'],
  proposals: ['Proposals', 'Create, send, and follow up on commercial proposals.'],
  invoices: ['Invoices', 'Track revenue, due dates, and client payments.'],
  content: ['Content', 'Manage the pages and resources on your public site.'],
  settings: ['Settings', 'Configure your workspace and data connections.'],
};

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState('Last 30 days');
  const [toast, setToast] = useState('');
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [records, setRecords] = useState({ leads: [], projects: [], proposals: [], invoices: [], content: [] });

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = 'Admin dashboard · Bilal Studio';
    adminApi.session()
      .then((session) => setAuthenticated(session.authenticated))
      .catch(() => {
        setAuthenticated(true);
        setApiError('The dashboard API is offline. Start it with npm run dev:api.');
      });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const days = rangeToDays(range);
      const [dashboardData, analyticsData, leadsData, projectsData, proposalsData, invoicesData, contentData] = await Promise.all([
        adminApi.dashboard(days),
        adminApi.analytics(days),
        adminApi.list('leads'),
        adminApi.list('projects'),
        adminApi.list('proposals'),
        adminApi.list('invoices'),
        adminApi.list('content'),
      ]);
      setSummary(dashboardData);
      setAnalytics(analyticsData);
      setRecords({
        leads: leadsData.items,
        projects: projectsData.items,
        proposals: proposalsData.items,
        invoices: invoicesData.items,
        content: contentData.items,
      });
    } catch (error) {
      if (error.status === 401) setAuthenticated(false);
      else setApiError(error.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const createRecord = async ({ type, title: recordTitle, client, value }) => {
    const entity = ENTITY_TYPES[type];
    const valueCents = Math.round((Number(value) || 0) * 100);
    const suffix = String(Date.now()).slice(-6);
    const payloads = {
      leads: { name: recordTitle, company: client, source: 'Manual', value_cents: valueCents, status: 'New' },
      projects: { name: recordTitle, client, budget_cents: valueCents, progress: 0, status: 'Planning' },
      proposals: { reference: `PR-${suffix}`, client: client || recordTitle, project: recordTitle, amount_cents: valueCents, status: 'Draft' },
      invoices: { reference: `INV-${suffix}`, client: client || recordTitle, amount_cents: valueCents, status: 'Draft' },
      content: { title: recordTitle, type: 'Page', path: '', status: 'Draft' },
    };
    try {
      await adminApi.create(entity, payloads[entity]);
      setQuickAddOpen(false);
      setToast(`${type} saved to the database.`);
      await loadData();
    } catch (error) {
      setToast(error.message);
    }
  };

  const title = viewTitles[activeView];
  let content;
  if (activeView === 'overview') content = <Overview onNavigate={navigate} summary={summary} records={records} />;
  else if (activeView === 'analytics') content = <Analytics data={analytics} leadCount={records.leads.length} />;
  else if (activeView === 'leads') content = <Leads search={search} items={records.leads} />;
  else if (activeView === 'projects') content = <Projects items={records.projects} onAdd={() => setQuickAddOpen(true)} />;
  else if (activeView === 'proposals') content = <Proposals search={search} items={records.proposals} />;
  else if (activeView === 'invoices') content = <Invoices search={search} items={records.invoices} />;
  else if (activeView === 'content') content = <Content search={search} items={records.content} pages={analytics?.pages} />;
  else content = <Settings />;

  if (authenticated === null) return <div className="admin-app"><div className="admin-boot">Loading secure dashboard…</div></div>;
  if (!authenticated) return <div className="admin-app"><Login onAuthenticated={() => setAuthenticated(true)} /></div>;

  return (
    <div className="admin-app">
      <a className="admin-skip-link" href="#admin-content">Skip to dashboard content</a>
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label="Dashboard navigation">
        <div className="admin-brand"><span className="admin-brand-mark">B</span><span><strong>Bilal</strong><small>Studio admin</small></span><button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><Icon name="close"/></button></div>
        <nav>
          <span className="admin-nav-label">Workspace</span>
          {navItems.map(([id,label,icon]) => <button key={id} className={activeView === id ? 'is-active' : ''} onClick={() => navigate(id)}><Icon name={icon}/><span>{label}</span>{id === 'leads' && records.leads.length > 0 && <b>{records.leads.length}</b>}{id === 'invoices' && records.invoices.filter((invoice) => invoice.status === 'Overdue').length > 0 && <b>{records.invoices.filter((invoice) => invoice.status === 'Overdue').length}</b>}</button>)}
          <span className="admin-nav-label">System</span>
          <button className={activeView === 'settings' ? 'is-active' : ''} onClick={() => navigate('settings')}><Icon name="settings"/><span>Settings</span></button>
        </nav>
        <div className="admin-sidebar-usage"><span><Icon name="globe" size={17}/>Website status<i>Live</i></span><div><i/><small>All systems operational</small></div></div>
        <div className="admin-user"><img src={bilalPhoto} alt=""/><span><strong>Bilal Aboqura</strong><small>Administrator</small></span><button className="admin-icon-button" aria-label="Account menu"><Icon name="more"/></button></div>
      </aside>
      {sidebarOpen && <button className="admin-sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>}

      <main className="admin-main" id="admin-content">
        <header className="admin-topbar">
          <button className="admin-menu-button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Icon name="menu"/></button>
          <label className="admin-search"><Icon name="search" size={18}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search leads, projects, invoices…"/><kbd>⌘ K</kbd></label>
          <div className="admin-top-actions"><a className="admin-view-site" href="/" target="_blank"><Icon name="external" size={17}/>View site</a><button className="admin-notification" aria-label="Notifications"><Icon name="bell"/><i/></button><button className="admin-primary-button admin-new-button" onClick={() => setQuickAddOpen(true)}><Icon name="plus" size={18}/>New</button></div>
        </header>

        <div className="admin-page-head">
          <div><h1>{title[0]}</h1><p>{title[1]}</p></div>
          <div className="admin-page-actions">{activeView !== 'settings' && <label className="admin-range"><Icon name="clock" size={17}/><select value={range} onChange={(event) => setRange(event.target.value)}><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select><Icon name="chevron" size={15}/></label>}<button className="admin-primary-button" onClick={() => setQuickAddOpen(true)}><Icon name="plus" size={17}/>{activeView === 'content' ? 'New content' : activeView === 'invoices' ? 'New invoice' : activeView === 'proposals' ? 'New proposal' : activeView === 'projects' ? 'New project' : activeView === 'leads' ? 'Add lead' : 'Quick add'}</button></div>
        </div>

        {apiError && <div className="admin-api-error" role="alert"><Icon name="settings" size={18}/><span><strong>Data connection unavailable</strong>{apiError}</span><button onClick={loadData}>Retry</button></div>}
        {loading ? <div className="admin-loading-panel"><span/><span/><span/></div> : content}
      </main>
      <QuickAdd open={quickAddOpen} onClose={() => setQuickAddOpen(false)} onSave={createRecord} />
      {toast && <div className="admin-toast" role="status"><span><Icon name="check" size={17}/></span>{toast}</div>}
    </div>
  );
}
