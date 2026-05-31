import React, { useState } from 'react';
import '../styles/global.css';

// Translation dictionary
const t = {
  ar: {
    title: "عرض مشروع منصة مصنع الأثاث المتكاملة",
    subtitle: "رؤية رقمية متكاملة لربط العملاء بالإنتاج، مضاعفة المبيعات، وأتمتة العمليات اللوجستية.",
    langSwitch: "English",
    backHome: "العودة للرئيسية",
    budget: "الميزانية الاستثمارية",
    timeline: "المدة الزمنية للتنفيذ",
    weeks: "أسابيع",
    week: "أسبوع",
    days: "أيام",
    recommendedBadge: "العرض الأكثر قيمة واستثماراً للنمو",
    standardBadge: "العرض القياسي الذكي",
    egp: "جنيه مصري",
    
    // Proposal Names
    eliteTitle: "العرض المتكامل للنمو والذكاء الاصطناعي (Elite AI Suite)",
    eliteDesc: "الحل الرقمي الأقوى والأشمل للمصنع. يدمج بين تجربة التسوق الذكية بالذكاء الاصطناعي، وبوابة تجار الجملة (B2B)، ولوحة تحكم متطورة لأتمتة عمليات الشحن والصيانة بشكل كامل.",
    standardTitle: "العرض القياسي الذكي (Standard Growth)",
    standardDesc: "منصة متكاملة لتأسيس حضور المصنع الإلكتروني باحترافية. تغطي عمليات البيع المباشر للأفراد، ربط أرامكس الأساسي، ونظام المقالات والصيانة القياسي.",
    
    // Core CTAs
    whatsappElite: "تفعيل عرض الـ 63,000 ج.م والمناقشة",
    whatsappStandard: "تفعيل عرض الـ 50,000 ج.م والمناقشة",
    tryInteractive: "جرّب بنفسك واجهة تجربة المستخدم التفاعلية أدناه 👇",

    // Tabs
    frontEndSection: "القسم الأول: واجهة العميل (Main Website)",
    adminSection: "القسم الثاني: لوحة الإدارة والتشغيل (Admin Panel)",
    compareTab: "مقارنة الميزات التفصيلية",
    timelineTab: "خريطة وجدول مراحل العمل",
    simulatorTab: "محاكي تجربة المستخدم التفاعلي",

    // Main Sections description
    frontEndDesc: "رحلة سلسة تأخذ الزائر من الاستكشاف وبناء الثقة حتى الشراء والدفع بمرونة تامة.",
    adminDesc: "المطبخ الخلفي الذي يدير منه المصنع كل عملياته بسهولة واحترافية فائقة.",

    // Simulator headings
    simTitle: "كيف ستبدو تجربة المستخدم للعميل والآدمن؟ (UX Simulator)",
    simDesc: "اضغط على الأزرار أدناه لتجربة الأدوات الذكية المخطط تنفيذها مباشرة والتفاعل معها:",
    simStyler: "منسق الغرف الذكي (AI Room Styler)",
    simB2b: "بوابة أسعار التجار (B2B Portal)",
    simAdmin: "لوحة تتبع الطلبات والشحن (Admin Flow)",

    // Room Styler simulation text
    stylerIntro: "يتيح للعميل رفع صورة لغرفته الفارغة، ليقوم النظام بتخيلها وفرشها بأثاث المصنع ليرى النتيجة قبل الشراء.",
    stylerPlaceholder: "قم برفع صورة لغرفتك أو اختر نموذجاً جاهزاً للبدء:",
    stylerEmpty: "غرفة فارغة (قبل الفرش)",
    stylerStyled: "الغرفة مفروشة بأثاث المصنع (بعد الفرش)",
    stylerActionBtn: "تطبيق فرش الأثاث بالذكاء الاصطناعي ✨",
    stylerStatusProcessing: "جاري تحليل أبعاد الغرفة وتطبيق الأثاث بشكل متناسق...",
    stylerStatusSuccess: "تم فرش الغرفة بنجاح! يمكنك الآن شراء الأثاث كـ Bundle بخصم 15%",
    stylerModern: "صالون مودرن فاخر",
    stylerClassic: "غرفة نوم كلاسيك دافئة",

    // B2B Portal simulation text
    b2bIntro: "واجهة تفتح بصلاحيات خاصة للمصممين وتجار الأثاث تظهر أسعار الجملة، مما يفتح خط مبيعات ضخم للمصنع.",
    b2bToggleLabel: "اختر نوع حساب المستخدم لرؤية تغير الأسعار:",
    b2bRetailUser: "عميل تجزئة (عادي)",
    b2bPartnerUser: "تاجر / مصمم ديكور (حساب B2B نشط)",
    productTitle: "طاولة صالون 'أورورا' خشب زان طبيعي",
    retailPrice: "السعر العادي للتجزئة: 18,000 ج.م",
    wholesalePrice: "سعر شريك B2B المعتمد: 12,600 ج.م",
    b2bSavingsBadge: "تم تطبيق خصم الشركاء (30%-)",
    b2bTerms: "الحد الأدنى لطلب الجملة: 3 قطع · السعر لا يشمل مصاريف الشحن الخاص بالتجار.",

    // Admin Flow simulation text
    adminIntro: "المطبخ التشغيلي للمصنع: معالجة الطلبات، سحب بوالص أرامكس تلقائياً، وإدارة الصيانة.",
    adminStep1: "1. قيد التنفيذ (الورشة)",
    adminStep2: "2. جاري الشحن (أرامكس)",
    adminStep3: "3. مكتمل (تلقائي)",
    adminStatusDesc1: "الطلب قيد التصنيع في الورشة حالياً. جاري تجهيز الأخشاب والأقمشة المعتمدة.",
    adminStatusDesc2: "تم تجهيز بوليصة الشحن تلقائياً عبر ربط API أرامكس. رقم التتبع: AMX-9827361.",
    adminStatusDesc3: "تم التوصيل بنجاح. أرسل النظام تلقائياً دليل العناية بالأثاث للعميل عبر الإيميل.",
    adminActionChange: "قم بنقل حالة الطلب لمحاكاة التدفق التشغيلي 🔄",
    adminRmaTitle: "نظام الصيانة والاسترجاع الذكي (RMA):",
    adminRmaDesc: "يتم رفع صور القطعة قبل الشحن وصور الشكوى لحفظ حقوق المصنع وتفادي نزاعات الصيانة.",
    adminRmaPhotoBefore: "صورة المصنع قبل الشحن 📸",
    adminRmaPhotoAfter: "صورة العميل (شكوى الصيانة) 📸",

    // Features
    featStorefront: "تصفح المنتجات وأقسام المتجر المتقدمة",
    featFactoryStory: "صفحة 'قصة المصنع' لبناء ارتباط عاطفي وثقة",
    featUserAccounts: "نظام تسجيل حسابات للعملاء لحفظ الطلبات والعناوين",
    featWhatsApp: "زر تواصل مباشر وتفاعلي عبر الواتساب",
    featSpecialOrder: "صفحة 'تنفيذ تصميمات خاصة' بطلب عربون مبدئي",
    featSamples: "طلب 'صندوق عينات الخامات' بالخشب والأقمشة للتوصيل المباشر",
    featPaymentGate: "ربط بوابة دفع إلكتروني آمنة بالكامل",
    featUgc: "المحتوى الحقيقي التلقائي (UGC) من صور العملاء الحقيقية",
    featRecommends: "نظام التوصيات الذكي وعروض الغرف التلقائية (Bundles)",
    featAramexBasic: "ربط شركة أرامكس لحساب بوالص الشحن يدوياً",
    featAramexApi: "ربط شحن أرامكس API التلقائي الكامل (سحب بوالص فوري)",
    featAiChatbot: "مساعد دردشة تفاعلي بالذكاء الاصطناعي (AI Chatbot) متواجد 24/7",
    featAiRoomStyler: "منسق الغرف الذكي بالذكاء الاصطناعي (AI Room Styler)",
    featB2bPortal: "بوابة شريك B2B حصرية (أسعار جملة متغيرة بناءً على الحساب)",
    featAiProducts: "إضافة المنتجات بمساعدة AI (توليد الوصف وتحسين جودة الصور والبطاقات)",
    featBlog: "نظام مقالات ومدونة متكاملة متوافقة مع الـ SEO",
    featAdminDashboard: "لوحة إدارة ومتابعة الطلبات وتعديل حالتها للآدمن",
    featRealTimeNotify: "نظام إشعارات حية وتلقائية للطلبات الجديدة في لوحة الآدمن",
    featCareManual: "نظام إرسال دليل العناية بالخشب والقماش تلقائياً بعد التسليم",
    featRmaSystem: "نظام إدارة الاسترجاع والضمان والصيانة (RMA) مدعوم بالصور قبل/بعد",

    // Timeline steps
    tlWeek1: "الأسبوع 1: التخطيط والواجهة الأساسية",
    tlWeek1Desc: "هيكلة قاعدة البيانات، ربط نظام الحسابات والتوثيق، ودمج تصميم واجهة العميل التفاعلية.",
    tlWeek2: "الأسبوع 2: تجربة الشراء وعينات الخامات",
    tlWeek2Desc: "برمجة متجر تصفح المنتجات وسلة المشتريات، وتفعيل آلية طلب صناديق العينات والتصميمات الخاصة.",
    tlWeek3: "الأسبوع 3: الدفع وأرامكس وتتبع الطلبات",
    tlWeek3Desc: "ربط بوابات الدفع الإلكتروني، دمج نظام أرامكس للشحن، وبناء لوحة تحكم تتبع حالات الطلبات للآدمن.",
    tlWeek4: "الأسبوع 4: أدوات مضاعفة المبيعات والـ AI",
    tlWeek4Desc: "تطوير نظام التوصيات الذكي، شات بوت المساعدة 24/7، وإطلاق ميزة منسق الغرف الذكي (AI Room Styler) لنسخة الـ Elite.",
    tlWeek5: "الأسبوع 5: بوابة الـ B2B ونظام RMA والتشغيل الكامل",
    tlWeek5Desc: "برمجة بوابة تجار الجملة الحصرية، إطلاق نظام إدارة الصيانة RMA بالصور، إرسال أدلة العناية التلقائية، والتسليم النهائي للمشروع.",

    // FAQ Section
    faqTitle: "الأسئلة الشائعة وتوضيحات تقنية",
    faqQ1: "ما الفرق الجوهري الذي يستحق فارق الاستثمار البالغ 13,000 ج.م؟",
    faqA1: "الاستثمار الإضافي يغطي أدوات الذكاء الاصطناعي الحقيقية مثل منسق الغرف الذكي، وبوابة B2B مخصصة لتجار الأثاث والمصممين لتشغيل خط مبيعات ضخم للمصنع، بالإضافة إلى أتمتة كاملة للعمليات مثل ربط بوالص أرامكس برمجياً ونظام الصيانة بالصور (RMA)، مما يوفر تكلفة موظفين إداريين إضافيين للمصنع.",
    faqQ2: "هل يمكنني الترقية من العرض القياسي إلى المتكامل لاحقاً؟",
    faqA2: "نعم، النظام مصمم بهيكلية معيارية تسمح بالبدء بالعرض القياسي وإضافة بوابة الـ B2B وأدوات الـ AI التفاعلية لاحقاً، ولكن تنفيذها من البداية يوفر نحو 30% من تكلفة التطوير المنفصل ويسرع من عملية الانتشار السوقي.",
    faqQ3: "كيف يتم تأمين وحساب بوالص الشحن مع أرامكس؟",
    faqA3: "في كلا الحلين يتم الربط مع حساب المصنع لدى أرامكس. في العرض المتكامل يتم ذلك تلقائياً بضغطة زر لسحب البوليصة وإرسال التتبع للعميل، وفي العرض القياسي يظهر طلب الشحن للآدمن ليقوم بسحبها من لوحة أرامكس ونسخ رقم التتبع.",
  },
  en: {
    title: "Proposal for Furniture Factory Digital Platform",
    subtitle: "A comprehensive digital ecosystem to connect production to sales, boost conversion rates, and automate logistics.",
    langSwitch: "العربية",
    backHome: "Back to Home",
    budget: "Budget Investment",
    timeline: "Execution Timeline",
    weeks: "Weeks",
    week: "Week",
    days: "Days",
    recommendedBadge: "Best Value & ROI Package for Growth",
    standardBadge: "Standard Growth Package",
    egp: "EGP",

    eliteTitle: "Elite AI & Enterprise Suite",
    eliteDesc: "The ultimate digital infrastructure for the factory. Integrates cutting-edge AI Room Styling, a dedicated B2B wholesale pricing portal for decorators, and complete operational automation for shipping and customer RMA care.",
    standardTitle: "Standard Growth Package",
    standardDesc: "A robust digital presence showcasing the factory's craftsmanship. Covers standard B2C sales flow, basic Aramex logistics, custom designs processing, and manual admin controls.",

    whatsappElite: "Activate 63,000 EGP Proposal",
    whatsappStandard: "Activate 50,000 EGP Proposal",
    tryInteractive: "Try out the live UX Simulators below 👇",

    frontEndSection: "Section 1: Main Customer Website",
    adminSection: "Section 2: Admin Panel & Back-Office",
    compareTab: "Feature Matrix Comparison",
    timelineTab: "Development Roadmap",
    simulatorTab: "Interactive UX Simulators",

    frontEndDesc: "A fluid customer journey designed to move visitors from browsing, building trust, up to secure electronic purchase.",
    adminDesc: "The back-office engine where the factory team manages inventories, logistics, orders, and customer after-sales.",

    simTitle: "What Does the User Experience Look Like? (UX Simulator)",
    simDesc: "Interact with the components below to preview the smart tools planned for development:",
    simStyler: "AI Room Styler Simulator",
    simB2b: "B2B Wholesaler Portal",
    simAdmin: "Admin Order & Shipping Flow",

    stylerIntro: "Allows customers to upload a photo of their empty room and see the factory's furniture laid out beautifully in real-time.",
    stylerPlaceholder: "Upload a room photo or choose one of our mock samples to preview:",
    stylerEmpty: "Empty Room (Before)",
    stylerStyled: "Styled with Factory Furniture (After)",
    stylerActionBtn: "Apply AI Furniture Layout ✨",
    stylerStatusProcessing: "AI is analyzing room borders and layout matching...",
    stylerStatusSuccess: "Room styled! Add all featured furniture as a bundle and save 15%",
    stylerModern: "Premium Modern Salon Set",
    stylerClassic: "Warm Neo-Classic Bedroom Set",

    b2bIntro: "A dedicated B2B portal revealing trade discounts for furniture distributors and interior designers, boosting large volume sales.",
    b2bToggleLabel: "Toggle user profile level to see dynamic pricing changes:",
    b2bRetailUser: "Standard Retail Customer",
    b2bPartnerUser: "Registered Trade Decorator / Wholesaler",
    productTitle: "Solid Beech 'Aurora' Living Room Coffee Table",
    retailPrice: "Retail Price: 18,000 EGP",
    wholesalePrice: "Trade/B2B Approved Price: 12,600 EGP",
    b2bSavingsBadge: "Partner Trade Discount Applied (-30%)",
    b2bTerms: "Minimum order qty: 3 units. Standard wholesale shipping tariffs apply.",

    adminIntro: "Operational kitchen: complete control of orders, automatic Aramex shipping webhook integrations, and maintenance records.",
    adminStep1: "1. Production (Workshop)",
    adminStep2: "2. Dispatched (Aramex)",
    adminStep3: "3. Delivered & Closed",
    adminStatusDesc1: "Order is currently being crafted in the carpentry workshop using solid beech wood.",
    adminStatusDesc2: "Shipping label automatically generated via Aramex API integration. Track ID: AMX-9827361.",
    adminStatusDesc3: "Delivered successfully. System automatically dispatched the Furniture Care Manual to customer email.",
    adminActionChange: "Click statuses below to simulate the admin operational pipeline 🔄",
    adminRmaTitle: "RMA Maintenance Tracker Component:",
    adminRmaDesc: "Before/After photo comparison logs to document pre-shipping state and post-delivery claims, safeguarding factory rights.",
    adminRmaPhotoBefore: "Factory Inspection Photo 📸",
    adminRmaPhotoAfter: "Customer Maintenance Claim Photo 📸",

    featStorefront: "Product Catalog & Advanced Browsing Categories",
    featFactoryStory: "Emotional Storytelling 'Factory Story' Page",
    featUserAccounts: "Customer Accounts with Order History & Addresses",
    featWhatsApp: "Direct Integrated Floating WhatsApp Live Contact",
    featSpecialOrder: "Special Orders Portal with Custom Photo & Deposit Upload",
    featSamples: "Order Raw Sample Box (Wood & Textiles) at Small Fee",
    featPaymentGate: "Fully Integrated Secure Payment Gateways",
    featUgc: "Dynamic User Generated Content (Real customer homes pictures feed)",
    featRecommends: "Smart Recommendation Algorithms & Room Bundles Discounting",
    featAramexBasic: "Manual Aramex Shipments Booking Integration",
    featAramexApi: "Direct Automated Aramex Webhook API Integration",
    featAiChatbot: "24/7 AI Automated Assistant Chatbot for Orders",
    featAiRoomStyler: "AI Room Styler (Upload empty room & layout furniture)",
    featB2bPortal: "Dynamic B2B Wholesaler/Designer Discount Workspace",
    featAiProducts: "AI-Assisted Product Listing & Visual Enhancer (Glassmorphism card layout)",
    featBlog: "SEO Optimized Blog & Decor Styling Articles Center",
    featAdminDashboard: "Admin Order Dashboard & Status Pipelines",
    featRealTimeNotify: "Real-time Instant Browser Push Notifications on New Orders",
    featCareManual: "Auto-Emailing Care Manuals (Wood/Textile cleaners info) on Delivery",
    featRmaSystem: "Comprehensive RMA Maintenance & Photo Verification Workspace",

    tlWeek1: "Week 1: Foundations & Core DB",
    tlWeek1Desc: "Setup server backend structure, customer authentication, and premium front-end layout shell.",
    tlWeek2: "Week 2: Commerce Pages & Sample Boxes",
    tlWeek2Desc: "Build main product grids, shopping cart checkout flow, custom design uploads, and sample box logic.",
    tlWeek3: "Week 3: Payments, Logistics & Admin Portal",
    tlWeek3Desc: "Incorporate electronic payment gateways, bind Aramex billing webhooks, and launch back-office order tracking.",
    tlWeek4: "Week 4: Smart Conversion & AI Engines",
    tlWeek4Desc: "Launch AI support chatbot, direct WhatsApp shortcuts, dynamic bundling system, and premium interactive features.",
    tlWeek5: "Week 5: Enterprise Portals & Quality Control",
    tlWeek5Desc: "Deploy B2B dealer profiles, RMA maintenance visual ledger, automated care trigger logs, and production deploy.",

    faqTitle: "Frequently Asked Questions",
    faqQ1: "Why invest the additional 13,000 EGP for the Elite package?",
    faqA1: "The Elite package pays for itself by automating standard overheads. Features like the automatic Aramex dispatch save hours of manual shipping forms every day. The B2B Wholesale Portal opens a completely new recurring high-ticket pipeline by making it seamless for decorators to bulk order, while the AI Room Styler converts uncertain buyers who struggle to visualize the furniture in their houses.",
    faqQ2: "Can we start with the Standard package and upgrade to Elite later?",
    faqA2: "Absolutely! The system uses a modular clean code architecture, allowing us to implement B2B pricing, automated RMA grids, and AI components later. However, booking them together saves roughly 30% compared to separate build phases.",
    faqQ3: "How does the Aramex shipping integration operate?",
    faqA3: "Both versions hook into your official Aramex corporate account. In the Standard Package, the admin receives orders and manually creates shipping bills inside the Aramex portal. In the Elite Suite, the system communicates directly with Aramex API to instantly generate shipping bills, fetch tracking numbers, and update the customer in real-time.",
  }
};

export default function Proposals() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('features');
  
  // UX Simulators State
  const [simType, setSimType] = useState('styler'); // styler | b2b | admin
  
  // Simulator: AI Room Styler
  const [roomStyle, setRoomStyle] = useState('modern');
  const [isRoomProcessing, setIsRoomProcessing] = useState(false);
  const [roomStyled, setRoomStyled] = useState(false);
  
  const handleApplyAI = () => {
    setIsRoomProcessing(true);
    setRoomStyled(false);
    setTimeout(() => {
      setIsRoomProcessing(false);
      setRoomStyled(true);
    }, 2000);
  };

  // Simulator: B2B Wholesaler Portal
  const [userProfile, setUserProfile] = useState('retail'); // retail | partner

  // Simulator: Admin Order Flow
  const [orderStatus, setOrderStatus] = useState('workshop'); // workshop | transit | completed

  const text = t[lang];

  // Helper to build WhatsApp deep link
  const getWhatsAppLink = (proposalType) => {
    const isElite = proposalType === 'elite';
    const number = "+201112678333";
    let message = "";
    if (lang === 'ar') {
      message = isElite 
        ? "مرحباً بلال! لقد اطلعت على العرض المتكامل للنمو والذكاء الاصطناعي (Elite AI Suite) بقيمة 63,000 ج.م وأود المضي قدماً لتفعيله وبدء المشروع. دعنا ننسق الخطوات القادمة!"
        : "مرحباً بلال! لقد اطلعت على العرض القياسي الذكي (Standard Growth) بقيمة 50,000 ج.م وأود بدء المشروع بهذا العرض المناسب. دعنا نتحدث لمباشرة العمل!";
    } else {
      message = isElite
        ? "Hi Bilal! I reviewed the Elite AI & Enterprise Suite proposal (63,000 EGP / 5 Weeks) and want to proceed with it. Let's align on the kick-off steps!"
        : "Hi Bilal! I reviewed the Standard Growth Package proposal (50,000 EGP / 4 Weeks) and would like to launch this setup. Let's schedule a call!";
    }
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="proposal-hub" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr', textAlign: lang === 'ar' ? 'right' : 'left' }}>
      
      {/* Dynamic Liquid Glowing Blobs */}
      <div className="liquid-blob liquid-blob--blue" style={{ width: '400px', height: '400px', top: '10%', left: lang === 'ar' ? '10%' : '60%' }}></div>
      <div className="liquid-blob liquid-blob--light" style={{ width: '300px', height: '300px', top: '50%', left: lang === 'ar' ? '60%' : '15%' }}></div>
      
      <div className="container proposal-container">
        
        {/* Header Options */}
        <header className="proposal-header">
          <button className="btn-glass back-home-btn" onClick={() => window.location.pathname = '/'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none', marginRight: '6px', marginLeft: '6px' }}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {text.backHome}
          </button>
          
          <button className="btn-primary lang-toggle-btn" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            🌐 {text.langSwitch}
          </button>
        </header>

        {/* Hero Section */}
        <section className="proposal-hero">
          <span className="section-label">Interactive Proposals Hub</span>
          <h1 className="proposal-main-title">{text.title}</h1>
          <p className="proposal-main-subtitle">{text.subtitle}</p>
        </section>

        {/* 2 Main Proposal Cards Side by Side */}
        <section className="pricing-grid">
          
          {/* ELITE PACKAGE (63,000 EGP) */}
          <div className="proposal-card proposal-card--elite glass">
            <div className="card-badge-container">
              <span className="elite-badge">{text.recommendedBadge}</span>
            </div>
            
            <div className="card-header-block">
              <h2 className="card-title">{text.eliteTitle}</h2>
              <p className="card-description">{text.eliteDesc}</p>
            </div>

            <div className="pricing-meta-row">
              <div className="meta-box">
                <span className="meta-label">{text.budget}</span>
                <span className="meta-val highlight-val">63,000 <span className="currency">{text.egp}</span></span>
              </div>
              <div className="meta-box">
                <span className="meta-label">{text.timeline}</span>
                <span className="meta-val">5 <span className="time-unit">{text.weeks}</span></span>
              </div>
            </div>

            <div className="package-highlights-summary">
              <ul>
                <li>⚡ <strong>{lang === 'ar' ? 'منسق الغرف الذكي (AI Room Styler)' : 'AI Room Styler (Virtual Furnishing)'}</strong></li>
                <li>🤖 <strong>{lang === 'ar' ? 'شات بوت تفاعلي للعملاء 24/7' : '24/7 Smart AI Support Chatbot'}</strong></li>
                <li>💼 <strong>{lang === 'ar' ? 'بوابة تجار ومصممي ديكور B2B' : 'Dedicated B2B Trade Discount Portal'}</strong></li>
                <li>🚚 <strong>{lang === 'ar' ? 'ربط أتمتة شحن أرامكس API بالكامل' : 'Full Automatic Aramex Shipping Hook'}</strong></li>
                <li>🔧 <strong>{lang === 'ar' ? 'نظام الصيانة والاسترجاع الرقمي بالصور (RMA)' : 'RMA Image-based Claims & Care Guides'}</strong></li>
              </ul>
            </div>

            <a href={getWhatsAppLink('elite')} target="_blank" rel="noopener noreferrer" className="btn-primary card-cta-btn card-cta-btn--elite">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px', marginLeft: '8px' }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              {text.whatsappElite}
            </a>
          </div>

          {/* STANDARD PACKAGE (50,000 EGP) */}
          <div className="proposal-card proposal-card--standard glass">
            <div className="card-badge-container">
              <span className="standard-badge">{text.standardBadge}</span>
            </div>
            
            <div className="card-header-block">
              <h2 className="card-title">{text.standardTitle}</h2>
              <p className="card-description">{text.standardDesc}</p>
            </div>

            <div className="pricing-meta-row">
              <div className="meta-box">
                <span className="meta-label">{text.budget}</span>
                <span className="meta-val">50,000 <span className="currency">{text.egp}</span></span>
              </div>
              <div className="meta-box">
                <span className="meta-label">{text.timeline}</span>
                <span className="meta-val">4 <span className="time-unit">{text.weeks}</span></span>
              </div>
            </div>

            <div className="package-highlights-summary">
              <ul>
                <li>🛒 {lang === 'ar' ? 'تصفح المنتجات والأقسام وسلة الشراء' : 'Standard Catalog Browsing & Cart'}</li>
                <li>📝 {lang === 'ar' ? 'صفحة تنفيذ تصميمات خاصة مع العربون' : 'Custom Requests & Initial Deposit Portal'}</li>
                <li>📦 {lang === 'ar' ? 'طلب عينات خامات الخشب كمنتج عادي' : 'Samples Materials Ordering (Standard Product)'}</li>
                <li>💳 {lang === 'ar' ? 'بوابة الدفع الإلكتروني وتواصل واتساب مباشر' : 'Secure Payment Gateway & WhatsApp Button'}</li>
                <li>🏭 {lang === 'ar' ? 'لوحة تحكم الآدمن لإدارة الطلبات والمدونة' : 'Order Tracking & Basic Blog for SEO'}</li>
              </ul>
            </div>

            <a href={getWhatsAppLink('standard')} target="_blank" rel="noopener noreferrer" className="btn-glass card-cta-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', marginLeft: '8px' }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              {text.whatsappStandard}
            </a>
          </div>

        </section>

        {/* Section Navigation Tabs */}
        <section className="proposal-nav-tabs glass">
          <button className={`nav-tab-btn ${activeTab === 'features' ? 'nav-tab-btn--active' : ''}`} onClick={() => setActiveTab('features')}>
            ⚡ {text.compareTab}
          </button>
          <button className={`nav-tab-btn ${activeTab === 'simulator' ? 'nav-tab-btn--active' : ''}`} onClick={() => setActiveTab('simulator')}>
            📱 {text.simulatorTab}
          </button>
          <button className={`nav-tab-btn ${activeTab === 'timeline' ? 'nav-tab-btn--active' : ''}`} onClick={() => setActiveTab('timeline')}>
            📅 {text.timelineTab}
          </button>
        </section>

        {/* Dynamic Content Pane */}
        <div className="tab-content-panel">
          
          {/* TAB 1: FEATURE MATRIX COMPARISON */}
          {activeTab === 'features' && (
            <div className="feature-comparison-pane animate-fade">
              
              {/* Category: Frontend Customer Website */}
              <div className="matrix-category">
                <h3 className="category-title-header">{text.frontEndSection}</h3>
                <p className="category-subtext">{text.frontEndDesc}</p>
                <div className="matrix-table">
                  <div className="matrix-row matrix-header">
                    <div className="matrix-cell cell-feat">{lang === 'ar' ? 'الميزة / الوظيفة' : 'Feature / Module'}</div>
                    <div className="matrix-cell cell-std">50,000 EGP</div>
                    <div className="matrix-cell cell-elite elite-col">63,000 EGP</div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featStorefront}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'عرض فئات الأثاث بشكل تفاعلي' : 'Fluid premium catalog interface'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featFactoryStory}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'عرض جودة الخشب والورشة والقصة التاريخية' : 'Build emotional customer attachment'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featUserAccounts}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'ملفات العملاء وحفظ العناوين وتتبع الطلبات' : 'Secure user authentication'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featWhatsApp}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'عائم بلمسة عصرية للتواصل الفوري' : 'Live quick chat overlay'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featSpecialOrder}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'رفع صور لتصميم خارجي وطلب تسعير ودفع عربون' : 'Custom carpentry uploads & payments'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featSamples}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'شراء عينات خشب وأقمشة للتأكد من الجودة مسبقاً' : 'Physical material samples delivery'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔ <small>({lang === 'ar' ? 'كمنتج عادي' : 'Standard item'})</small></span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <small>({lang === 'ar' ? 'تفاعلي متكامل' : 'Premium UI flow'})</small></span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featPaymentGate}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'فيزا، ماستركارد، فوري، ومحافظ إلكترونية' : 'Instantly integrated digital wallets'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featUgc}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'معرض صور الأثاث في منازل العملاء السابقين لبناء ثقة' : 'Dynamic customer home snapshot feed'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featRecommends}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'عروض غرف كاملة بخصم ومقترحات Upsell ذكية لسلة الشراء' : 'Smart cross-sells & bundles'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAiChatbot}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'مساعد ذكي للرد 24/7 واقتراح الغرف المناسبة' : '24/7 Automated AI conversational expert'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">AI Powered</span></span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAiRoomStyler}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'رفع صورة الغرفة وفرشها وتخيلها بالكامل إلكترونياً' : 'Virtual room staging by AI'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">AI Powered</span></span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featB2bPortal}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'بوابة خاصة للمصممين وتجار الجملة بأسعار منخفضة' : 'Merchant & decorator wholesale hub'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">Enterprise</span></span></div>
                  </div>
                </div>
              </div>

              {/* Category: Admin Panel & Backend Dashboard */}
              <div className="matrix-category" style={{ marginTop: '40px' }}>
                <h3 className="category-title-header">{text.adminSection}</h3>
                <p className="category-subtext">{text.adminDesc}</p>
                <div className="matrix-table">
                  <div className="matrix-row matrix-header">
                    <div className="matrix-cell cell-feat">{lang === 'ar' ? 'الميزة / الوظيفة' : 'Feature / Module'}</div>
                    <div className="matrix-cell cell-std">50,000 EGP</div>
                    <div className="matrix-cell cell-elite elite-col">63,000 EGP</div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAdminDashboard}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'لوحة تحكم لإدارة المنتجات وحالات الطلبات وتتبع المبيعات' : 'Factory operational workspace'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featBlog}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'مدونة مقالات نصائح الديكور وتنسيق الألوان لـ SEO ممتاز' : 'SEO optimized content engine'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featRealTimeNotify}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'تنبيه فوري عند تسجيل طلب جديد أو إرسال استفسار' : 'Instant browser audio-visual alerts'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAiProducts}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'إدخال صور وتوليد أوصاف تسويقية احترافية وتعديل صور بالكامل' : 'AI-assisted listing generator'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span>✔ <small>({lang === 'ar' ? 'خارجي' : 'External AI workflow'})</small></span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <small>({lang === 'ar' ? 'مدمج وتأثيرات بصرية' : 'Built-in UI Visuals'})</small></span></div>
                  </div>

                  <div className="matrix-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAramexBasic}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'حساب بوالص الشحن وربط الحساب الأساسي لتشغيل البزنس' : 'Aramex business logistics routing'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-yes">✔</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔</span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featAramexApi}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'سحب بوليصة شحن أرامكس تلقائياً وإرسال التتبع دون كتابة يدوية' : 'Automated API booking & sync'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">Automation</span></span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featCareManual}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'إرسال دليل العناية بالخشب والقماش تلقائياً فور تأكيد استلام القطعة' : 'Auto care guidelines delivery'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">After-Sales</span></span></div>
                  </div>

                  <div className="matrix-row text-highlight-row">
                    <div className="matrix-cell cell-feat">
                      <strong>{text.featRmaSystem}</strong>
                      <span className="feat-tip">{lang === 'ar' ? 'نظام تتبع شكاوى الصيانة وحفظ صور حالة القطعة قبل وبعد الشحن' : 'Image-backed complaints resolution'}</span>
                    </div>
                    <div className="matrix-cell cell-std"><span className="badge-no">✖</span></div>
                    <div className="matrix-cell cell-elite elite-col"><span className="badge-yes">✔ <span className="highlight-tag">Elite RMA</span></span></div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE UX SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="simulator-pane animate-fade">
              <div className="simulator-heading-block">
                <h3 className="sim-title-header">{text.simTitle}</h3>
                <p className="sim-description-text">{text.simDesc}</p>
              </div>

              {/* Simulator Sub-Navigation */}
              <div className="sim-sub-nav">
                <button className={`sim-nav-btn ${simType === 'styler' ? 'sim-nav-btn--active' : ''}`} onClick={() => setSimType('styler')}>
                  ✨ {text.simStyler}
                </button>
                <button className={`sim-nav-btn ${simType === 'b2b' ? 'sim-nav-btn--active' : ''}`} onClick={() => setSimType('b2b')}>
                  💼 {text.simB2b}
                </button>
                <button className={`sim-nav-btn ${simType === 'admin' ? 'sim-nav-btn--active' : ''}`} onClick={() => setSimType('admin')}>
                  ⚙ {text.simAdmin}
                </button>
              </div>

              {/* Simulator Body */}
              <div className="simulator-body glass">
                
                {/* 1. ROOM STYLER SIMULATION */}
                {simType === 'styler' && (
                  <div className="sim-styler-content animate-fade">
                    <p className="sim-module-intro">🎨 <strong>{text.stylerIntro}</strong></p>
                    
                    <div className="styler-controls">
                      <div className="style-selector-row">
                        <label>{lang === 'ar' ? 'اختر الطراز المراد محاكاته:' : 'Choose room styling demo:'}</label>
                        <div className="style-btn-group">
                          <button className={`btn-glass ${roomStyle === 'modern' ? 'active-btn' : ''}`} onClick={() => { setRoomStyle('modern'); setRoomStyled(false); }}>
                            🏠 {text.stylerModern}
                          </button>
                          <button className={`btn-glass ${roomStyle === 'classic' ? 'active-btn' : ''}`} onClick={() => { setRoomStyle('classic'); setRoomStyled(false); }}>
                            🏰 {text.stylerClassic}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="styler-canvas">
                      
                      {/* Before / Empty Room State */}
                      <div className="canvas-pane before-pane">
                        <div className="canvas-badge">{text.stylerEmpty}</div>
                        <div className="room-bg-sim room-bg-sim--empty">
                          {/* Simulated vector empty room layout */}
                          <div className="empty-corner-walls"></div>
                          <div className="empty-wood-floor"></div>
                          <div className="empty-window"></div>
                          <div className="empty-text-desc">{lang === 'ar' ? 'غرفة صالون فارغة، جاري تجهيز الذكاء الاصطناعي لملء الفراغ...' : 'Bare room walls and hardwood flooring.'}</div>
                        </div>
                      </div>

                      {/* After / Styled Room State */}
                      <div className="canvas-pane after-pane">
                        <div className="canvas-badge styled-badge">{text.stylerStyled}</div>
                        {isRoomProcessing && (
                          <div className="room-loading-overlay">
                            <div className="spinner"></div>
                            <p>{text.stylerStatusProcessing}</p>
                          </div>
                        )}
                        
                        {!roomStyled && !isRoomProcessing && (
                          <div className="room-cta-overlay">
                            <button className="btn-primary" onClick={handleApplyAI}>
                              {text.stylerActionBtn}
                            </button>
                          </div>
                        )}

                        <div className={`room-bg-sim room-bg-sim--styled ${roomStyled ? 'room-visible' : ''}`}>
                          <div className="styled-walls"></div>
                          <div className="styled-floor"></div>
                          <div className="styled-window-glow"></div>
                          
                          {/* Dynamic Styled Furniture Overlay based on chosen style */}
                          {roomStyle === 'modern' ? (
                            <div className="styled-furniture-modern animate-scale">
                              {/* Modern Couch Shape */}
                              <div className="modern-couch">
                                <div className="couch-body"></div>
                                <div className="couch-pillow pillow-1"></div>
                                <div className="couch-pillow pillow-2"></div>
                              </div>
                              {/* Modern Plant */}
                              <div className="modern-plant"></div>
                              {/* Modern Rug */}
                              <div className="modern-rug"></div>
                              {/* Table */}
                              <div className="modern-table-flat"></div>
                              <span className="price-tag-overlay">صالون 'أورورا'</span>
                            </div>
                          ) : (
                            <div className="styled-furniture-classic animate-scale">
                              {/* Classic luxury bed & lights */}
                              <div className="classic-bed">
                                <div className="bed-headboard"></div>
                                <div className="bed-mattress"></div>
                              </div>
                              <div className="classic-nightstand stand-l"></div>
                              <div className="classic-nightstand stand-r"></div>
                              <div className="classic-rug"></div>
                              <span className="price-tag-overlay">سرير 'رويال' خشب زان</span>
                            </div>
                          )}
                          
                          <div className="styler-success-alert animate-fade">
                            🎉 {text.stylerStatusSuccess}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 2. B2B PORTAL DISCOUNT SIMULATION */}
                {simType === 'b2b' && (
                  <div className="sim-b2b-content animate-fade">
                    <p className="sim-module-intro">💼 <strong>{text.b2bIntro}</strong></p>
                    
                    <div className="b2b-selector-block">
                      <label className="b2b-label-heading">{text.b2bToggleLabel}</label>
                      <div className="b2b-toggle-switch-container">
                        <button className={`profile-toggle-btn ${userProfile === 'retail' ? 'profile-toggle-btn--active' : ''}`} onClick={() => setUserProfile('retail')}>
                          👤 {text.b2bRetailUser}
                        </button>
                        <button className={`profile-toggle-btn ${userProfile === 'partner' ? 'profile-toggle-btn--active' : ''}`} onClick={() => setUserProfile('partner')}>
                          🏢 {text.b2bPartnerUser}
                        </button>
                      </div>
                    </div>

                    {/* Simulated Catalog Card */}
                    <div className="product-b2b-card-sim glass">
                      <div className="prod-badge-holder">
                        {userProfile === 'partner' && (
                          <span className="b2b-badge-applied animate-scale">🔥 B2B Partner Portal Active</span>
                        )}
                      </div>
                      
                      <div className="sim-product-details">
                        <div className="sim-product-image-container">
                          {/* A neat styled coffee table drawing with CSS */}
                          <div className="sim-coffee-table-drawing">
                            <div className="table-top"></div>
                            <div className="table-leg leg-1"></div>
                            <div className="table-leg leg-2"></div>
                            <div className="table-leg leg-3"></div>
                            <div className="table-leg leg-4"></div>
                            <div className="table-wood-grain"></div>
                          </div>
                        </div>
                        
                        <div className="sim-product-info">
                          <h4 className="sim-prod-name">{text.productTitle}</h4>
                          <p className="sim-prod-desc">{lang === 'ar' ? 'مصنعة بالكامل من قطاع خشب زان أحمر عالي الجودة مع طبقة حماية عازلة للرطوبة والخدش.' : 'Meticulously crafted from premium solid beech wood with standard heavy moisture seal layers.'}</p>
                          
                          <div className="sim-prod-price-area">
                            {userProfile === 'retail' ? (
                              <div className="retail-price-display animate-fade">
                                <span className="price-tag-label">{lang === 'ar' ? 'السعر للعميل:' : 'Price:'}</span>
                                <span className="actual-price-num">18,000 ج.م</span>
                              </div>
                            ) : (
                              <div className="b2b-price-display animate-scale">
                                <span className="original-strike-price">18,000 ج.م</span>
                                <div className="b2b-discounted-price">
                                  <span className="price-tag-label">{text.wholesalePrice}</span>
                                  <span className="b2b-saving-pill">{text.b2bSavingsBadge}</span>
                                </div>
                                <p className="b2b-terms-text">ℹ {text.b2bTerms}</p>
                              </div>
                            )}
                          </div>

                          <div className="sim-checkout-actions">
                            <button className="btn-primary" style={{ width: '100%' }}>
                              {userProfile === 'retail' ? (lang === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart') : (lang === 'ar' ? 'طلب تسعيرة كميات جملة' : 'Request Wholesale Quote')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ADMIN OPERATIONS SIMULATION */}
                {simType === 'admin' && (
                  <div className="sim-admin-content animate-fade">
                    <p className="sim-module-intro">⚙ <strong>{text.adminIntro}</strong></p>
                    
                    <div className="admin-status-control-section">
                      <label className="admin-status-label">{text.adminActionChange}</label>
                      <div className="admin-status-pipeline">
                        <button className={`pipeline-btn ${orderStatus === 'workshop' ? 'active-workshop' : ''}`} onClick={() => setOrderStatus('workshop')}>
                          🛠 {text.adminStep1}
                        </button>
                        <div className="pipeline-connector">➡</div>
                        <button className={`pipeline-btn ${orderStatus === 'transit' ? 'active-transit' : ''}`} onClick={() => setOrderStatus('transit')}>
                          🚚 {text.adminStep2}
                        </button>
                        <div className="pipeline-connector">➡</div>
                        <button className={`pipeline-btn ${orderStatus === 'completed' ? 'active-completed' : ''}`} onClick={() => setOrderStatus('completed')}>
                          ✅ {text.adminStep3}
                        </button>
                      </div>
                    </div>

                    {/* Order Panel Workspace Card */}
                    <div className="admin-order-workspace glass">
                      <div className="workspace-header">
                        <span>📦 {lang === 'ar' ? 'إدارة الطلب #AMX-09823' : 'Order Tracking Workspace #AMX-09823'}</span>
                        <span className={`status-display-badge status-${orderStatus}`}>
                          {orderStatus === 'workshop' && (lang === 'ar' ? 'تحت التصنيع' : 'In Workshop')}
                          {orderStatus === 'transit' && (lang === 'ar' ? 'مع أرامكس للشحن' : 'In Transit (Aramex)')}
                          {orderStatus === 'completed' && (lang === 'ar' ? 'تم التسليم وإرسال دليل العناية' : 'Delivered & Care Sent')}
                        </span>
                      </div>

                      <div className="workspace-body-details">
                        <div className="status-explanation-card">
                          {orderStatus === 'workshop' && <p className="animate-fade">🔨 {text.adminStatusDesc1}</p>}
                          {orderStatus === 'transit' && <p className="animate-fade">📦 {text.adminStatusDesc2}</p>}
                          {orderStatus === 'completed' && <p className="animate-fade">📧 {text.adminStatusDesc3}</p>}
                        </div>

                        {/* Interactive RMA photo block if completed */}
                        {orderStatus === 'completed' && (
                          <div className="rma-simulation-module animate-scale">
                            <h5 className="rma-title">{text.adminRmaTitle}</h5>
                            <p className="rma-sub">{text.adminRmaDesc}</p>
                            
                            <div className="rma-photo-comparison-grid">
                              <div className="rma-photo-card">
                                <span>{text.adminRmaPhotoBefore}</span>
                                <div className="sim-photo-placeholder before-photo">
                                  <div className="photo-couch-clean"></div>
                                  <span className="photo-caption">{lang === 'ar' ? 'فحص المصنع: القطعة خالية من العيوب' : 'Ready at Factory'}</span>
                                </div>
                              </div>
                              <div className="rma-photo-card">
                                <span>{text.adminRmaPhotoAfter}</span>
                                <div className="sim-photo-placeholder after-photo">
                                  <div className="photo-couch-clean">
                                    <div className="scuffed-mark"></div>
                                  </div>
                                  <span className="photo-caption text-caution">{lang === 'ar' ? 'شكوى العميل: خدش بسيط بالظهر' : 'Customer Scuff Claim'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE AND ROADMAP */}
          {activeTab === 'timeline' && (
            <div className="timeline-pane animate-fade">
              <div className="timeline-intro-meta">
                <h3 className="timeline-pane-title">{lang === 'ar' ? 'جدول التطوير ومراحل التسليم والـ Milestones' : 'Project Roadmaps & Milestones Development Schedule'}</h3>
                <p className="timeline-pane-sub">{lang === 'ar' ? 'مخطط زمني مقارن لتنفيذ المشروع في 4 أسابيع للنسخة القياسية مقابل 5 أسابيع للنسخة المتكاملة بالـ AI والـ B2B.' : 'Track the structural milestones and deliverables scheduled for both plans.'}</p>
              </div>

              <div className="timeline-milestones-list">
                
                {/* Milestone 1 */}
                <div className="milestone-item-row glass">
                  <div className="milestone-col-indicator">
                    <div className="milestone-node active-node">1</div>
                    <div className="milestone-line"></div>
                  </div>
                  <div className="milestone-col-details">
                    <h4 className="milestone-week-title">{text.tlWeek1}</h4>
                    <p className="milestone-week-description">{text.tlWeek1Desc}</p>
                    <div className="milestone-plan-tags">
                      <span className="tag-std">Included in 50k Plan</span>
                      <span className="tag-elite">Included in 63k Plan</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="milestone-item-row glass">
                  <div className="milestone-col-indicator">
                    <div className="milestone-node active-node">2</div>
                    <div className="milestone-line"></div>
                  </div>
                  <div className="milestone-col-details">
                    <h4 className="milestone-week-title">{text.tlWeek2}</h4>
                    <p className="milestone-week-description">{text.tlWeek2Desc}</p>
                    <div className="milestone-plan-tags">
                      <span className="tag-std">Included in 50k Plan</span>
                      <span className="tag-elite">Included in 63k Plan</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="milestone-item-row glass">
                  <div className="milestone-col-indicator">
                    <div className="milestone-node active-node">3</div>
                    <div className="milestone-line"></div>
                  </div>
                  <div className="milestone-col-details">
                    <h4 className="milestone-week-title">{text.tlWeek3}</h4>
                    <p className="milestone-week-description">{text.tlWeek3Desc}</p>
                    <div className="milestone-plan-tags">
                      <span className="tag-std">Included in 50k Plan</span>
                      <span className="tag-elite">Included in 63k Plan</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div className="milestone-item-row glass">
                  <div className="milestone-col-indicator">
                    <div className="milestone-node active-node">4</div>
                    <div className="milestone-line"></div>
                  </div>
                  <div className="milestone-col-details">
                    <h4 className="milestone-week-title">{text.tlWeek4}</h4>
                    <p className="milestone-week-description">{text.tlWeek4Desc}</p>
                    <div className="milestone-plan-tags">
                      <span className="tag-std-warn">{lang === 'ar' ? 'العرض القياسي: تسليم واختبار ورفع نهائي' : '50k Plan: Testing & Final Delivery'}</span>
                      <span className="tag-elite">{lang === 'ar' ? 'العرض المتكامل: إطلاق شات بوت AI والـ Room Styler' : '63k Plan: Launching AI Chatbots & Room Styler'}</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 5 */}
                <div className="milestone-item-row glass">
                  <div className="milestone-col-indicator">
                    <div className="milestone-node elite-node">5</div>
                  </div>
                  <div className="milestone-col-details">
                    <h4 className="milestone-week-title">{text.tlWeek5}</h4>
                    <p className="milestone-week-description">{text.tlWeek5Desc}</p>
                    <div className="milestone-plan-tags">
                      <span className="tag-std-missing">{lang === 'ar' ? 'العرض القياسي: تم التسليم بالفعل بالأسبوع الرابع' : '50k Plan: Completed in Week 4'}</span>
                      <span className="tag-elite">{lang === 'ar' ? 'العرض المتكامل: تفعيل بوابة الـ B2B وتأمين لوحات الـ RMA بالكامل' : '63k Plan: Launch B2B Wholesalers & RMA systems'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Professional FAQ Section */}
        <section className="proposal-faq-section glass">
          <h3 className="faq-heading-title">{text.faqTitle}</h3>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-q">❓ {text.faqQ1}</h4>
              <p className="faq-a">{text.faqA1}</p>
            </div>
            
            <div className="faq-item">
              <h4 className="faq-q">❓ {text.faqQ2}</h4>
              <p className="faq-a">{text.faqA2}</p>
            </div>

            <div className="faq-item">
              <h4 className="faq-q">❓ {text.faqQ3}</h4>
              <p className="faq-a">{text.faqA3}</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="hub-footer">
          <p>© {new Date().getFullYear()} {lang === 'ar' ? 'بلال أبو قورة — مهندس برمجيات وتطوير ويب' : 'Bilal Aboqura — Full Stack Developer Portfolio.'}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {lang === 'ar' 
              ? 'مُصمم ومُطور خصيصاً لمشاريع الأثاث الفاخر والتحول الرقمي للشركات والمصانع.' 
              : 'Tailored for high-end furniture manufacturing transformations and enterprise digitizations.'}
          </p>
        </footer>

      </div>

      <style>{`
        /* ── HUB LAYOUT ── */
        .proposal-hub {
          background-color: var(--color-bg);
          color: var(--color-text);
          min-height: 100vh;
          position: relative;
          padding: 40px 0;
          font-family: 'Outfit', 'Cairo', 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .proposal-container {
          position: relative;
          z-index: 10;
        }

        .proposal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .back-home-btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .lang-toggle-btn {
          padding: 10px 20px;
          font-size: 0.9rem;
          background: var(--color-primary);
        }

        .proposal-hero {
          text-align: center;
          margin-bottom: 50px;
        }

        .proposal-main-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.2;
          margin-top: 15px;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #ffffff, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .proposal-main-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-dim);
          max-width: 750px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── PRICING GRID ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .proposal-card {
          padding: 40px 30px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .proposal-card:hover {
          transform: translateY(-8px);
        }

        .proposal-card--elite {
          border-color: rgba(59, 130, 246, 0.45) !important;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.05)) !important;
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.2), 0 20px 60px rgba(0, 0, 0, 0.5) !important;
        }

        .proposal-card--standard {
          border-color: rgba(255, 255, 255, 0.1) !important;
          background: rgba(255, 255, 255, 0.02) !important;
        }

        .card-badge-container {
          display: flex;
          margin-bottom: 20px;
        }

        .elite-badge {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: var(--radius-pill);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .standard-badge {
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-text-dim);
          padding: 6px 16px;
          border-radius: var(--radius-pill);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .card-header-block {
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .card-description {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          line-height: 1.6;
        }

        .pricing-meta-row {
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 30px;
        }

        .meta-box {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 6px;
        }

        .meta-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .meta-val.highlight-val {
          color: var(--color-accent);
        }

        .meta-val .currency {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-text-dim);
        }

        .meta-val .time-unit {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-dim);
        }

        .package-highlights-summary {
          margin-bottom: 30px;
          flex: 1;
        }

        .package-highlights-summary ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .package-highlights-summary li {
          font-size: 0.95rem;
          color: #cbd5e1;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .package-highlights-summary li::before {
          content: "✦";
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .card-cta-btn {
          width: 100%;
          justify-content: center;
          padding: 16px 20px;
          font-weight: 700;
          font-size: 1rem;
          text-align: center;
        }

        .card-cta-btn--elite {
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        /* ── SECTION NAV TABS ── */
        .proposal-nav-tabs {
          display: flex;
          justify-content: space-around;
          padding: 6px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .nav-tab-btn {
          flex: 1;
          min-width: 160px;
          padding: 14px 20px;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--color-text-dim);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
        }

        .nav-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-tab-btn--active {
          color: #ffffff !important;
          background: rgba(59, 130, 246, 0.15) !important;
          box-shadow: inset 0 0 12px rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        /* ── FEATURE MATRIX ── */
        .matrix-category {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          padding: 30px;
        }

        .category-title-header {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .category-subtext {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }

        .matrix-table {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .matrix-row {
          display: flex;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          align-items: center;
          transition: background-color var(--transition-fast);
        }

        .matrix-row:hover:not(.matrix-header) {
          background: rgba(255, 255, 255, 0.02);
        }

        .matrix-row:last-child {
          border-bottom: none;
        }

        .matrix-header {
          background: rgba(59, 130, 246, 0.08);
          border-bottom: 2px solid rgba(59, 130, 246, 0.2);
          font-weight: 700;
        }

        .matrix-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cell-feat {
          flex: 2.2;
          padding-right: 15px;
          padding-left: 15px;
        }

        .cell-std, .cell-elite {
          text-align: center;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }

        .elite-col {
          background: rgba(59, 130, 246, 0.03);
        }

        .feat-tip {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .badge-yes {
          color: #10b981;
          font-size: 1.2rem;
        }

        .badge-no {
          color: #ef4444;
          font-size: 1rem;
        }

        .highlight-tag {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: var(--color-accent);
          border-radius: var(--radius-pill);
          margin-top: 4px;
          font-weight: 700;
        }

        .text-highlight-row {
          background: rgba(59, 130, 246, 0.02);
        }

        /* ── UX SIMULATORS ── */
        .simulator-heading-block {
          text-align: center;
          margin-bottom: 30px;
        }

        .sim-title-header {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .sim-description-text {
          font-size: 0.95rem;
          color: var(--color-text-dim);
        }

        .sim-sub-nav {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .sim-nav-btn {
          padding: 12px 24px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: var(--color-text-dim);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
        }

        .sim-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .sim-nav-btn--active {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: #ffffff !important;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .simulator-body {
          padding: 30px;
          border-radius: var(--radius-lg);
          border-color: rgba(255, 255, 255, 0.06);
          min-height: 380px;
        }

        .sim-module-intro {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 20px;
        }

        /* 1. Styler Simulator Canvas */
        .style-selector-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .style-selector-row label {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          font-weight: 600;
        }

        .style-btn-group {
          display: flex;
          gap: 10px;
        }

        .style-btn-group button {
          padding: 8px 18px;
          font-size: 0.85rem;
        }

        .style-btn-group button.active-btn {
          border-color: var(--color-accent);
          background: rgba(96, 165, 250, 0.1);
          color: #ffffff;
        }

        .styler-canvas {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          min-height: 280px;
        }

        @media (max-width: 768px) {
          .styler-canvas {
            grid-template-columns: 1fr;
          }
        }

        .canvas-pane {
          position: relative;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          background: #090e1a;
        }

        .canvas-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 20;
          font-size: 0.72rem;
          padding: 4px 10px;
          background: rgba(0,0,0,0.6);
          border-radius: var(--radius-sm);
          color: var(--color-text-dim);
          font-weight: 700;
        }

        .canvas-badge.styled-badge {
          background: rgba(16, 185, 129, 0.85);
          color: #ffffff;
          right: auto;
          left: 12px;
        }

        .room-bg-sim {
          width: 100%;
          height: 100%;
          min-height: 260px;
          position: relative;
          overflow: hidden;
        }

        /* simulated empty room drawings */
        .empty-corner-walls {
          position: absolute;
          top: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          clip-path: polygon(0 0, 100% 0, 80% 120px, 20% 120px);
        }

        .empty-wood-floor {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 140px;
          background: linear-gradient(180deg, #334155, #1e293b);
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }

        .empty-window {
          position: absolute;
          top: 20px; left: 45%; width: 40px; height: 50px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.03);
        }

        .empty-text-desc {
          position: absolute;
          bottom: 15px;
          left: 10%; right: 10%;
          text-align: center;
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        /* styled room drawings */
        .room-bg-sim--styled {
          background: #0f172a;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .room-bg-sim--styled.room-visible {
          opacity: 1;
        }

        .styled-walls {
          position: absolute;
          top: 0; left: 0; right: 0; height: 160px;
          background: linear-gradient(135deg, #1e293b, #111827);
          clip-path: polygon(0 0, 100% 0, 80% 120px, 20% 120px);
        }

        .styled-floor {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 140px;
          background: linear-gradient(180deg, #78350f, #451a03); /* Rich wood floor color */
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }

        .styled-window-glow {
          position: absolute;
          top: 20px; left: 45%; width: 40px; height: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(96, 165, 250, 0.25);
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.4);
        }

        .room-cta-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          background: rgba(0,0,0,0.4);
        }

        .room-loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 31;
          background: rgba(5, 10, 20, 0.85);
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(59, 130, 246, 0.2);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Furniture drawings */
        .styled-furniture-modern {
          position: absolute;
          inset: 0;
        }

        .modern-couch {
          position: absolute;
          bottom: 15px; left: 25%; width: 50%; height: 60px;
          background: #475569;
          border-radius: 12px 12px 6px 6px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .couch-body {
          position: absolute;
          bottom: 12px; left: 5px; right: 5px; height: 35px;
          background: #64748b;
          border-radius: 8px;
        }

        .couch-pillow {
          position: absolute;
          bottom: 15px; width: 35%; height: 25px;
          background: #f59e0b; /* Golden warm pillows */
          border-radius: 6px;
        }

        .pillow-1 { left: 10%; }
        .pillow-2 { right: 10%; }

        .modern-rug {
          position: absolute;
          bottom: 5px; left: 20%; width: 60%; height: 20px;
          background: rgba(255,255,255,0.15);
          border-radius: 50px;
        }

        .modern-table-flat {
          position: absolute;
          bottom: 8px; left: 40%; width: 20%; height: 12px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 3px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }

        .modern-plant {
          position: absolute;
          bottom: 35px; right: 15%; width: 14px; height: 35px;
          background: #10b981;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .price-tag-overlay {
          position: absolute;
          bottom: 85px; left: 50%; transform: translateX(-50%);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 8px;
          background: var(--color-primary);
          color: #ffffff;
          border-radius: 4px;
        }

        /* Classic Bed drawings */
        .styled-furniture-classic {
          position: absolute;
          inset: 0;
        }

        .classic-bed {
          position: absolute;
          bottom: 20px; left: 30%; width: 40%; height: 75px;
          background: #451a03;
          border-radius: 8px 8px 4px 4px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.6);
        }

        .bed-headboard {
          position: absolute;
          top: 0; left: 0; right: 0; height: 35px;
          background: #78350f;
          border-radius: 6px 6px 0 0;
          border-bottom: 2px solid #b45309;
        }

        .bed-mattress {
          position: absolute;
          bottom: 5px; left: 4px; right: 4px; height: 40px;
          background: #f8fafc;
          border-radius: 4px;
          border-top: 15px solid #e2e8f0;
        }

        .classic-nightstand {
          position: absolute;
          bottom: 20px; width: 15px; height: 25px;
          background: #78350f;
          border-radius: 2px;
        }

        .stand-l { left: 22%; }
        .stand-r { right: 22%; }

        .classic-rug {
          position: absolute;
          bottom: 5px; left: 25%; width: 50%; height: 18px;
          background: #b91c1c; /* Crimson traditional rug */
          border-radius: 3px;
        }

        .styler-success-alert {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          z-index: 25;
          font-size: 0.72rem;
          padding: 8px 12px;
          background: rgba(16, 185, 129, 0.95);
          border-radius: var(--radius-sm);
          color: #ffffff;
          text-align: center;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        /* 2. B2B portal simulation styles */
        .b2b-selector-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          align-items: center;
        }

        .b2b-label-heading {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          font-weight: 700;
        }

        .b2b-toggle-switch-container {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-pill);
          padding: 4px;
        }

        .profile-toggle-btn {
          padding: 10px 24px;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--color-text-dim);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
        }

        .profile-toggle-btn--active {
          background: rgba(59, 130, 246, 0.15) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          color: var(--color-accent) !important;
        }

        .product-b2b-card-sim {
          max-width: 650px;
          margin: 0 auto;
          padding: 24px;
          border-radius: var(--radius-md);
        }

        .prod-badge-holder {
          min-height: 25px;
          margin-bottom: 12px;
        }

        .b2b-badge-applied {
          font-size: 0.72rem;
          padding: 4px 12px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
          border-radius: var(--radius-pill);
          font-weight: 800;
        }

        .sim-product-details {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
        }

        @media (max-width: 580px) {
          .sim-product-details {
            grid-template-columns: 1fr;
          }
        }

        .sim-product-image-container {
          background: #090e1a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          position: relative;
        }

        .sim-coffee-table-drawing {
          width: 120px;
          height: 80px;
          position: relative;
        }

        .table-top {
          position: absolute;
          top: 15px; left: 0; width: 120px; height: 15px;
          background: #b45309;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          z-index: 10;
        }

        .table-leg {
          position: absolute;
          top: 28px; width: 8px; height: 42px;
          background: #78350f;
        }

        .leg-1 { left: 10px; transform: skewX(-5deg); }
        .leg-2 { right: 10px; transform: skewX(5deg); }
        .leg-3 { left: 24px; width: 6px; height: 38px; opacity: 0.7; }
        .leg-4 { right: 24px; width: 6px; height: 38px; opacity: 0.7; }

        .sim-product-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sim-prod-name {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .sim-prod-desc {
          font-size: 0.85rem;
          color: var(--color-text-dim);
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .sim-prod-price-area {
          margin-bottom: 20px;
          min-height: 70px;
        }

        .retail-price-display {
          display: flex;
          flex-direction: column;
        }

        .price-tag-label {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        .actual-price-num {
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
        }

        .original-strike-price {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: var(--color-text-muted);
        }

        .b2b-discounted-price {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 2px;
          flex-wrap: wrap;
        }

        .b2b-saving-pill {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border-radius: var(--radius-sm);
          font-weight: 700;
        }

        .b2b-terms-text {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          margin-top: 6px;
        }

        /* 3. Admin workspace simulator styles */
        .admin-status-control-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
          align-items: center;
        }

        .admin-status-label {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          font-weight: 700;
        }

        .admin-status-pipeline {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .pipeline-btn {
          padding: 10px 18px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255,255,255,0.02);
          color: var(--color-text-dim);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s;
          font-family: inherit;
        }

        .pipeline-connector {
          color: var(--color-text-muted);
          font-weight: 700;
        }

        .active-workshop {
          border-color: #f59e0b !important;
          background: rgba(245, 158, 11, 0.15) !important;
          color: #fbbf24 !important;
        }

        .active-transit {
          border-color: #3b82f6 !important;
          background: rgba(59, 130, 246, 0.15) !important;
          color: #93c5fd !important;
        }

        .active-completed {
          border-color: #10b981 !important;
          background: rgba(16, 185, 129, 0.15) !important;
          color: #34d399 !important;
        }

        .admin-order-workspace {
          max-width: 650px;
          margin: 0 auto;
          border-radius: var(--radius-md);
          border-color: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .workspace-header {
          display: flex;
          justify-content: space-between;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 0.85rem;
          font-weight: 700;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-display-badge {
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-weight: 800;
        }

        .status-display-badge.status-workshop { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .status-display-badge.status-transit { background: rgba(59, 130, 246, 0.15); color: #93c5fd; }
        .status-display-badge.status-completed { background: rgba(16, 185, 129, 0.15); color: #34d399; }

        .workspace-body-details {
          padding: 24px;
        }

        .status-explanation-card {
          padding: 15px;
          background: rgba(255,255,255,0.02);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          color: #cbd5e1;
          margin-bottom: 20px;
          border-left: 3px solid var(--color-primary);
        }

        .rma-simulation-module {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 20px;
        }

        .rma-title {
          font-size: 0.95rem;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .rma-sub {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        .rma-photo-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .rma-photo-comparison-grid {
            grid-template-columns: 1fr;
          }
        }

        .rma-photo-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rma-photo-card span {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text-dim);
        }

        .sim-photo-placeholder {
          height: 120px;
          background: #090e1a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-sm);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .photo-couch-clean {
          width: 60px;
          height: 30px;
          background: #475569;
          border-radius: 6px;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .scuffed-mark {
          position: absolute;
          top: 5px; left: 12px; width: 14px; height: 4px;
          background: #b91c1c;
          border-radius: 2px;
          transform: rotate(15deg);
        }

        .photo-caption {
          position: absolute;
          bottom: 8px;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .photo-caption.text-caution {
          color: #f87171;
        }

        /* ── ROADMAP TIMELINE ── */
        .timeline-intro-meta {
          text-align: center;
          margin-bottom: 40px;
        }

        .timeline-pane-title {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .timeline-pane-sub {
          font-size: 0.9rem;
          color: var(--color-text-dim);
        }

        .timeline-milestones-list {
          display: flex;
          flex-direction: column;
          gap: 0px; /* Connect standard milestones smoothly */
          max-width: 800px;
          margin: 0 auto;
        }

        .milestone-item-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          border-color: rgba(255,255,255,0.06);
        }

        .milestone-col-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .milestone-node {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255, 255, 255, 0.15);
          color: var(--color-text-muted);
          z-index: 10;
        }

        .milestone-node.active-node {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #ffffff;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }

        .milestone-node.elite-node {
          background: #8b5cf6;
          border-color: #8b5cf6;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
        }

        .milestone-line {
          position: absolute;
          top: 32px;
          bottom: -44px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 0;
        }

        .milestone-week-title {
          font-size: 1.1rem;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .milestone-week-description {
          font-size: 0.88rem;
          color: var(--color-text-dim);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .milestone-plan-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tag-std, .tag-elite, .tag-std-warn, .tag-std-missing {
          font-size: 0.68rem;
          padding: 3px 10px;
          border-radius: 4px;
          font-weight: 700;
        }

        .tag-std { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--color-text-dim); }
        .tag-elite { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59,130,246,0.2); color: var(--color-accent); }
        .tag-std-warn { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245,158,11,0.25); color: #fbbc04; }
        .tag-std-missing { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239,68,68,0.15); color: #f87171; }

        /* ── FAQ SECTION ── */
        .proposal-faq-section {
          padding: 40px;
          border-radius: var(--radius-lg);
          border-color: rgba(255, 255, 255, 0.05);
          margin-top: 60px;
          margin-bottom: 60px;
        }

        .faq-heading-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 30px;
          text-align: center;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .faq-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-q {
          font-size: 1.05rem;
          color: #ffffff;
          font-weight: 700;
        }

        .faq-a {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          line-height: 1.6;
        }

        /* ── HUB FOOTER ── */
        .hub-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 30px;
          margin-top: 40px;
          text-align: center;
        }

        .hub-footer p {
          font-size: 0.9rem;
          color: var(--color-text-dim);
        }

        /* ── MICRO-ANIMATIONS ── */
        .animate-fade {
          animation: fadeIn 0.4s ease forwards;
        }

        .animate-scale {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}
