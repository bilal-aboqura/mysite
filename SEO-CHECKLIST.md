# SEO Deployment Checklist — Bilal Aboqura Portfolio

# bilalaboqura.com

## ✅ COMPLETED — Automated Changes

### 1. index.html — Full SEO Meta Layer

- [x] Keyword-rich `<title>` targeting "Full Stack Developer & Website Builder"
- [x] Expanded `<meta name="description">` with hire-intent language
- [x] `<meta name="keywords">` with 15+ targeted keywords
- [x] `<meta name="robots">` with max-image-preview & max-snippet directives
- [x] Canonical URL (`<link rel="canonical">`)
- [x] Full Open Graph tags (og:title, og:description, og:image, og:type, og:locale)
- [x] Full Twitter Card tags
- [x] **5 JSON-LD Structured Data schemas:**
  - Person schema (name, jobTitle, email, phone, sameAs)
  - WebSite schema
  - ProfessionalService schema with OfferCatalog
  - FAQPage schema (5 Q&As targeting high-intent queries)
  - BreadcrumbList schema
- [x] Performance preconnects + dns-prefetch

### 2. Components — Semantic HTML & Microdata

- [x] **Hero.jsx** — itemScope Person, itemProp name/jobTitle/image, keyword CTAs
- [x] **About.jsx** — Keyword-rich h2, expanded body copy, lazy+sized image
- [x] **Services.jsx** — Schema.org/Service itemscope per card, enriched descriptions
- [x] **Projects.jsx** — Schema.org/CreativeWork per project, aria-labels, richer h2
- [x] **Skills.jsx** — aria-label, keyword h2, tech stack summary paragraph
- [x] **CTA.jsx** — ContactPage schema, hire-intent h2, email/phone itemProps
- [x] **Footer.jsx** — WPFooter schema, Person schema, rel="me" social links, nav landmark
- [x] **App.jsx** — aria-label on `<main>`, visually-hidden keyword-rich text block

### 3. Public Files

- [x] **robots.txt** — Explicit allow for 8 AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
- [x] **sitemap.xml** — Expanded to include all 6 section anchors with priorities
- [x] **llms.txt** — GEO file for AI search engines (ChatGPT, Perplexity, Gemini, Claude)
- [x] **nginx_site.conf** — HTTPS, gzip, caching, security headers, canonical redirect

### 4. OG Image (og-image.jpg)

- [x] HTML template created at `public/og-image-generator.html`
- [ ] **ACTION REQUIRED** → Convert to JPG (see instructions below)

---

## 🔧 MANUAL STEPS YOU MUST DO

### Step 1: Generate og-image.jpg

The OG image HTML template at `public/og-image-generator.html` needs to be converted to a JPG.

**Option A — Browser screenshot (easiest):**

1. Open `public/og-image-generator.html` in Chrome
2. Set DevTools to "Responsive" mode at 1200×630 px
3. Right-click → "Capture screenshot" (or use `Ctrl+Shift+P` → "Capture full size screenshot")
4. Save the result as `public/og-image.jpg`

**Option B — Use online tool:**

- Go to https://htmlcsstoimage.com or https://screenshotone.com
- Paste the HTML content from `og-image-generator.html`
- Download at 1200×630 and save as `public/og-image.jpg`

### Step 2: Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://bilalaboqura.com/`
3. Submit sitemap: `https://bilalaboqura.com/sitemap.xml`
4. Click "Request Indexing" on the main URL

### Step 3: Submit to Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site: `https://bilalaboqura.com/`
3. Import sitemap from Google SC or submit manually

### Step 4: Deploy Updated nginx.conf

```bash
# Upload to your VPS:
scp nginx_site.conf user@your-vps:/etc/nginx/sites-available/bilalaboqura.conf
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Build & Deploy the Updated Site

```bash
npm run build
# Then deploy dist/ to your VPS
```

### Step 6: Verify Structured Data

- https://search.google.com/test/rich-results
- Paste: https://bilalaboqura.com/
- Should show: FAQ, Person, ProfessionalService rich results

### Step 7: Verify Open Graph

- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
- Paste: https://bilalaboqura.com/

---

## 📈 EXPECTED SEO IMPACT (Timeline)

| Timeframe  | Expected Result                                       |
| ---------- | ----------------------------------------------------- |
| 1–2 weeks  | Google re-crawls with new structured data             |
| 2–4 weeks  | FAQ rich results may appear in SERPs                  |
| 1–2 months | Rankings improve for "full stack developer" queries   |
| 2–3 months | AI engines (ChatGPT, Perplexity) start surfacing site |
| 3–6 months | Page 1 potential for mid-tail keywords                |

## 🎯 TARGETED KEYWORDS (Priority Order)

1. "full stack developer for hire"
2. "build a website" + location
3. "hire web developer"
4. "React developer freelance"
5. "Next.js developer"
6. "custom website development"
7. "Bilal Aboqura" (brand)
8. "web application development"
