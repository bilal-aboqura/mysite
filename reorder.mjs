import fs from 'fs';
import path from 'path';

function reorderChapters(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Split content before first chapter
    const parts = content.split(/(?=<h2>الفصل)/);
    
    const preContent = parts[0];
    const chapters = parts.slice(1);
    
    // We need to separate the conclusion from the last chapter
    const lastChapterContent = chapters[chapters.length - 1];
    const conclusionSplit = lastChapterContent.split(/(?=<h2>الخاتمة<\/h2>)/);
    
    chapters[chapters.length - 1] = conclusionSplit[0];
    const postContent = conclusionSplit[1] || ''; // in case handling differs slightly
    
    console.log(`Found ${chapters.length} chapters in ${filePath}`);
    
    // Map chapters by keyword
    const chapterMap = {};
    for (const chap of chapters) {
        if (chap.includes('البداية وتجهيز السيرفر')) chapterMap['1'] = chap;
        else if (chap.includes('التأمين الجذري للسيرفر')) chapterMap['2'] = chap;
        else if (chap.includes('سر المحترفين')) chapterMap['3'] = chap;
        else if (chap.includes('التطبيق العملي ورفع الكود')) chapterMap['4'] = chap;
        else if (chap.includes('ربط الدومين وتأمين الموقع')) chapterMap['5'] = chap;
        else if (chap.includes('تحدث موقعك')) chapterMap['6'] = chap;
        else if (chap.includes('أكثر من موقع')) chapterMap['7'] = chap;
        else if (chap.includes('ترقية بيئة العمل')) chapterMap['8'] = chap;
        else if (chap.includes('النسخ الاحتياطي والمراقبة')) chapterMap['9'] = chap;
    }
    
    // Check if we lost any
    if (Object.keys(chapterMap).length !== 9) {
        console.error(`ERROR: Missing chapters in ${filePath}. Found:`, Object.keys(chapterMap));
        return;
    }
    
    // Re-number and build final
    const orderedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const numbering = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع'];
    
    let newChaptersHtml = '';
    for (let i = 0; i < orderedKeys.length; i++) {
        let chapInfo = chapterMap[orderedKeys[i]];
        // Replace "الفصل XXX:" with the new numbering
        chapInfo = chapInfo.replace(/<h2>الفصل\s+[^:]+:/, `<h2>الفصل ${numbering[i]}:`);
        newChaptersHtml += chapInfo;
    }
    
    const finalHtml = preContent + newChaptersHtml + postContent;
    fs.writeFileSync(filePath, finalHtml);
    console.log(`✅ Successfully updated ${filePath}`);
}

reorderChapters('./public/ebooks/vps-guide.html');
reorderChapters('./public/ebooks/vps-guide-print.html');
