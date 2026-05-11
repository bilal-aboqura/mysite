import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/global.css';

gsap.registerPlugin(ScrollTrigger);

// ─── WhatsApp chat data ───────────────────────────────────────────────────────
// Each entry simulates a real WA conversation thread
const chats = [
  {
    contact: 'أحمد الشريف',
    role: 'SeenGCC',
    avatarColor: '#25d366',
    initials: 'أش',
    statusTime: '11:42',
    messages: [
      { from: 'client', text: 'بلال والله الموقع طلع تحفة 🔥', time: '11:40 ص' },
      { from: 'client', text: 'الاهتمام بالتفاصيل والجودة في التصميم كان مميز جداً، فوق اللي توقعته', time: '11:41 ص' },
      { from: 'me',     text: 'تسلم يا ذوق، ده من طيب أصلك والله! 🙏✨', time: '11:41 ص' },
      { from: 'client', text: 'أنصح بالتعامل معك بشدة، بعتلك ناس من عندي 💯', time: '11:42 ص' },
    ],
  },
  {
    contact: 'فارس طوسون',
    role: 'FaresToson.com',
    avatarColor: '#3b82f6',
    initials: 'فط',
    statusTime: '3:18',
    messages: [
      { from: 'client', text: 'شغل ممتاز يا بلال والله', time: '3:15 م' },
      { from: 'client', text: 'سرعة في التنفيذ والموقع طلع بشكل أكثر من رائع', time: '3:16 م' },
      { from: 'me',     text: 'ولا يهمك يا بطل، ده واجبنا وأقل حاجة تتقدم لك 🫡🔥', time: '3:17 م' },
      { from: 'client', text: 'التعامل كان محترف من البداية للنهاية. شكراً جداً على المجهود 🙏🏻', time: '3:18 م' },
    ],
  },
  {
    contact: 'محمد نظام',
    role: 'Nezam.vip',
    avatarColor: '#8b5cf6',
    initials: 'من',
    statusTime: '9:05',
    messages: [
      { from: 'client', text: 'من أفضل المطورين اللي اشتغلت معاهم صراحة', time: '9:02 م' },
      { from: 'me',     text: 'يا حبيبي تسلم، كلامك ده فوق راسي والله 😊❤️', time: '9:03 م' },
      { from: 'client', text: 'فاهم شغله كويس جداً وبيسلم في المواعيد بالظبط', time: '9:04 م' },
      { from: 'client', text: 'النتيجة كانت فوق التوقعات 💪🔥', time: '9:05 م' },
    ],
  },
  {
    contact: 'خالد المنصور',
    role: 'Client',
    avatarColor: '#f59e0b',
    initials: 'خم',
    statusTime: '6:30',
    messages: [
      { from: 'client', text: 'يا بلال جربت الموقع على موبايل وكمبيوتر', time: '6:27 م' },
      { from: 'client', text: 'والله شغل نضيف جداً ومحترف 👌', time: '6:28 م' },
      { from: 'me',     text: 'تمام زي الفل! قولي بقى، التعديلات كده تمام ولا في حاجة تانية؟ 🤔👌', time: '6:29 م' },
      { from: 'client', text: 'آه كل شيء تمام. شغلك بيتكلم عن نفسه ❤️', time: '6:30 م' },
    ],
  },
  {
    contact: 'سارة العتيبي',
    role: 'Online Store',
    avatarColor: '#ec4899',
    initials: 'سع',
    statusTime: '1:55',
    messages: [
      { from: 'client', text: 'بلال الموقع شغال تمام والمبيعات زادت من أول أسبوع 🥹', time: '1:52 م' },
      { from: 'me',     text: 'يا فرج الله! ده أحلى خبر سمعته النهاردة بجد، مبروك يا صاحبي 🥳🙌', time: '1:53 م' },
      { from: 'client', text: 'جد شكراً، ما توقعت النتيجة تكون بهالسرعة', time: '1:54 م' },
      { from: 'client', text: 'هرسللك ناس كتير تعبانين من مطورين ثانيين 😂', time: '1:55 م' },
    ],
  },
  {
    contact: 'عمر الرشيدي',
    role: 'SaaS Startup',
    avatarColor: '#10b981',
    initials: 'عر',
    statusTime: '10:22',
    messages: [
      { from: 'client', text: 'يا بلال اللوحة التحكم طلعت احسن من اللي تخيلته', time: '10:19 ص' },
      { from: 'client', text: 'سرعة التطوير كانت مفاجأة كبيرة جداً', time: '10:20 ص' },
      { from: 'me',     text: 'زي الفل يا ريس! طمني بقى، رد فعل الجماعة عندك كان إيه لما شافوها؟ 😎👏', time: '10:21 ص' },
      { from: 'client', text: 'الكل معجب. فريقي قالوا افضل dashboard شافوه 💯', time: '10:22 ص' },
    ],
  },
];

// ─── Checkmarks (double blue tick — WhatsApp read receipt) ───────────────────
const ReadTick = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" style={{ display:'inline-block', marginLeft:'3px', flexShrink:0 }}>
    <path d="M1 5.5L4.5 9L10 2" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 5.5L9.5 9L15 2" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Single WA chat card ─────────────────────────────────────────────────────
const WACard = ({ chat }) => (
  <div className="wa-card">
    {/* Phone chrome top bar */}
    <div className="wa-card__topbar">
      {/* Status bar */}
      <div className="wa-card__statusbar">
        <span style={{ fontSize: '0.6rem', fontWeight: '600' }}>{chat.statusTime}</span>
        <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="white" opacity="0.9"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="3" height="8" rx="0.5" opacity="0.4"/></svg>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="white" opacity="0.9"><path d="M5 1.5C3.3 1.5 1.8 2.2 0.7 3.3L0 2.6C1.3 1.3 3.1 0.5 5 0.5C6.9 0.5 8.7 1.3 10 2.6L9.3 3.3C8.2 2.2 6.7 1.5 5 1.5Z"/><path d="M5 3.5C3.9 3.5 2.9 3.9 2.1 4.7L1.4 4C2.4 3 3.6 2.5 5 2.5C6.4 2.5 7.6 3 8.6 4L7.9 4.7C7.1 3.9 6.1 3.5 5 3.5Z"/><circle cx="5" cy="6.5" r="1"/></svg>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x="0.5" y="0.5" width="17" height="9" rx="2" stroke="white" strokeOpacity="0.5"/><rect x="1.5" y="1.5" width="13" height="7" rx="1.5" fill="white"/><path d="M18.5 3.5V6.5C19.3 6.2 19.3 3.8 18.5 3.5Z" fill="white" opacity="0.5"/></svg>
        </div>
      </div>
      {/* WA header */}
      <div className="wa-card__header">
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.9" style={{ cursor:'pointer' }}>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <div className="wa-card__avatar" style={{ background: chat.avatarColor }}>
            {chat.initials}
          </div>
          <div>
            <div style={{ fontWeight:'600', fontSize:'0.9rem', color:'#fff', lineHeight:'1.2' }}>{chat.contact}</div>
            <div style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.65)' }}>online</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:'18px', alignItems:'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity="0.8"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity="0.8"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </div>
      </div>
    </div>

    {/* Chat body */}
    <div className="wa-card__body">
      {/* Date stamp */}
      <div className="wa-datestamp">TODAY</div>

      {chat.messages.map((msg, i) => (
        <div key={i} className={`wa-msg-row ${msg.from === 'me' ? 'wa-msg-row--me' : 'wa-msg-row--client'}`}>
          <div className={`wa-bubble ${msg.from === 'me' ? 'wa-bubble--me' : 'wa-bubble--client'}`}>
            <span className="wa-bubble__text" dir="rtl">{msg.text}</span>
            <span className="wa-bubble__meta">
              <span className="wa-bubble__time">{msg.time}</span>
              {msg.from === 'me' && <ReadTick />}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Input bar */}
    <div className="wa-card__inputbar">
      <div className="wa-inputbar__emoji">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      </div>
      <div className="wa-inputbar__field">Type a message</div>
      <div className="wa-inputbar__mic">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </div>
    </div>
  </div>
);

// ─── Main section ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.wa-card',
        { opacity: 0, y: 50, rotation: 0 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.wa-grid', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-dark"
      aria-label="Client Testimonials — WhatsApp Reviews"
      style={{ padding: 'var(--section-padding) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{ position:'absolute', top:'20%', left:'-10%', width:'40vw', height:'40vw',
        background:'radial-gradient(circle, rgba(37,211,102,0.04) 0%, transparent 70%)',
        filter:'blur(80px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'10%', right:'-5%', width:'30vw', height:'30vw',
        background:'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        filter:'blur(80px)', pointerEvents:'none' }} />

      <div className="container">
        {/* Heading */}
        <div className="testimonial-heading" style={{ textAlign:'center', marginBottom:'clamp(40px, 6vw, 64px)' }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-heading">What Clients Say</h2>
          <p className="section-subheading" style={{ margin:'1rem auto 0', maxWidth:'480px' }}>
            Real messages from real clients — straight from WhatsApp.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="wa-grid">
          {chats.map((chat, i) => (
            <WACard key={i} chat={chat} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');

        /* ─── Grid ─── */
        .wa-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }

        @media (max-width: 1024px) { .wa-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .wa-grid { grid-template-columns: 1fr; } }

        /* ─── Card (phone mockup) ─── */
        .wa-card {
          border-radius: 18px;
          overflow: hidden;
          background: #111b21;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 20px 60px rgba(0,0,0,0.6),
            0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          font-family: 'Segoe UI', system-ui, sans-serif;
          opacity: 0;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .wa-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 0 0 1px rgba(37,211,102,0.15),
            0 28px 70px rgba(0,0,0,0.65),
            0 0 30px rgba(37,211,102,0.06);
        }

        /* slight tilt on alternating cards for realism */
        .wa-card:nth-child(2) { transform: rotate(0.5deg); }
        .wa-card:nth-child(4) { transform: rotate(-0.4deg); }
        .wa-card:nth-child(6) { transform: rotate(0.3deg); }
        .wa-card:nth-child(2):hover,
        .wa-card:nth-child(4):hover,
        .wa-card:nth-child(6):hover { transform: rotate(0) translateY(-6px) scale(1.01); }

        /* ─── Status bar ─── */
        .wa-card__statusbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 14px 2px;
          background: #1f2c34;
        }

        /* ─── WA header bar ─── */
        .wa-card__topbar { background: #1f2c34; }

        .wa-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px 10px;
          background: #1f2c34;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .wa-card__avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          font-family: 'Cairo', sans-serif;
        }

        /* ─── Chat body ─── */
        .wa-card__body {
          flex: 1;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 Q55 45 60 50 Q55 55 50 50Z' fill='rgba(255,255,255,0.015)'/%3E%3C/svg%3E");
          background-color: #0b141a;
          min-height: 200px;
        }

        .wa-datestamp {
          text-align: center;
          margin: 4px auto 8px;
          background: rgba(0,0,0,0.4);
          border-radius: 6px;
          padding: 3px 10px;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.45);
          width: fit-content;
          letter-spacing: 0.05em;
        }

        /* ─── Message rows ─── */
        .wa-msg-row {
          display: flex;
          margin-bottom: 2px;
        }

        .wa-msg-row--client { justify-content: flex-start; }
        .wa-msg-row--me     { justify-content: flex-end; }

        /* ─── Bubbles ─── */
        .wa-bubble {
          max-width: 82%;
          padding: 7px 10px 5px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          position: relative;
          word-break: break-word;
        }

        .wa-bubble--client {
          background: #202c33;
          border-top-left-radius: 2px;
        }

        .wa-bubble--client::before {
          content: '';
          position: absolute;
          top: 0;
          left: -6px;
          border-width: 0 6px 8px 0;
          border-style: solid;
          border-color: transparent #202c33 transparent transparent;
        }

        .wa-bubble--me {
          background: #005c4b;
          border-top-right-radius: 2px;
        }

        .wa-bubble--me::after {
          content: '';
          position: absolute;
          top: 0;
          right: -6px;
          border-width: 0 0 8px 6px;
          border-style: solid;
          border-color: transparent transparent transparent #005c4b;
        }

        .wa-bubble__text {
          font-size: 0.88rem;
          color: #e9edef;
          line-height: 1.5;
          font-family: 'Cairo', 'Segoe UI', sans-serif;
          display: block;
        }

        .wa-bubble__meta {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2px;
        }

        .wa-bubble__time {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.38);
          white-space: nowrap;
        }

        /* ─── Input bar ─── */
        .wa-card__inputbar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: #1f2c34;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .wa-inputbar__emoji,
        .wa-inputbar__mic {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: default;
        }

        .wa-inputbar__field {
          flex: 1;
          background: #2a3942;
          border-radius: 20px;
          padding: 7px 14px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.25);
          cursor: default;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
