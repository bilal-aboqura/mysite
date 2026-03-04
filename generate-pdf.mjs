import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'public', 'ebooks', 'vps-guide-print.html');
const pdfPath = path.join(__dirname, 'public', 'ebooks', 'vps-guide.pdf');

console.log('🚀 Starting PDF generation...');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Load the local HTML file (no need to run dev server)
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

// Wait for fonts to load
await page.evaluate(() => document.fonts.ready);

// Generate PDF
await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
    displayHeaderFooter: false,
});

await browser.close();
console.log(`✅ PDF generated at: ${pdfPath}`);
