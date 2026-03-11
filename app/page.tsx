'use client';
import React, { useState } from 'react';

// ─── Territory Data ───────────────────────────────────────────────────────────

const territories = [
  { zip: '34990', trade: 'Roofing', status: 'Available' },
  { zip: '34990', trade: 'HVAC',    status: 'Available' },
  { zip: '34997', trade: 'Roofing', status: 'Available' },
  { zip: '34997', trade: 'HVAC',    status: 'Available' },
  { zip: '33455', trade: 'Roofing', status: 'Available' },
  { zip: '33455', trade: 'HVAC',    status: 'Available' },
  { zip: '34994', trade: 'Roofing', status: 'Claimed'   },
  { zip: '34986', trade: 'HVAC',    status: 'Claimed'   },
];

// ─── Logo (mp4 → png → SVG fallback) ─────────────────────────────────────────

function InstinctRiseLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed,   setImgFailed]   = useState(false);
  const h = size === 'sm' ? 36 : size === 'lg' ? 64 : 44;

  if (!videoFailed) return (
    <video src="/logo.mp4" autoPlay loop muted playsInline
      style={{ height: h, width: 'auto', objectFit: 'contain', display: 'block' }}
      onError={() => setVideoFailed(true)}/>
  );
  if (!imgFailed) return (
    <img src="/logo.png" alt="InstinctRise"
      style={{ height: h, width: 'auto', display: 'block' }}
      onError={() => setImgFailed(true)}/>
  );

  const d = h;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={d} height={d} viewBox="0 0 100 100" fill="none">
        <circle cx="63" cy="27" r="14" fill="#F5A623"/>
        <line x1="63" y1="7"  x2="63" y2="1"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="63" y1="47" x2="63" y2="53" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="43" y1="27" x2="37" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="83" y1="27" x2="89" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="49" y1="13" x2="45" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="77" y1="13" x2="81" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <rect x="5"  y="52" width="12" height="42" rx="1" fill="#1B3A6B"/>
        <rect x="19" y="38" width="14" height="56" rx="1" fill="#163060"/>
        <rect x="35" y="48" width="10" height="46" rx="1" fill="#1B3A6B"/>
        <polygon points="40,62 65,42 90,62" fill="#E05C1A"/>
        <rect x="48" y="62" width="34" height="32" rx="2" fill="#1B3A6B"/>
        <rect x="58" y="74" width="10" height="20" rx="1" fill="#0f2344"/>
        <rect x="51" y="66" width="10" height="9"  rx="1" fill="#5b8dd9"/>
        <rect x="72" y="66" width="8"  height="9"  rx="1" fill="#5b8dd9"/>
        <path d="M2,96 Q50,86 98,96" stroke="#1B3A6B" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontWeight: 800, fontSize: size === 'lg' ? 22 : size === 'sm' ? 14 : 18, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#1B3A6B' }}>Instinct</span><span style={{ color: '#E05C1A' }}>Rise</span>
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: size === 'sm' ? 8 : 9, letterSpacing: '0.12em', color: '#1B3A6B', textTransform: 'uppercase' }}>
          TerritoryIQ
        </span>
      </div>
    </div>
  );
}

// ─── Marketing Wheel ──────────────────────────────────────────────────────────

function MarketingWheel() {
  const cx = 160, cy = 160, outerR = 148, innerR = 68, gap = 3;

  const segments = [
    { label: 'Proactive\nOutreach',  color: '#1B3A6B', icon: 'person'   },
    { label: 'Storm &\nRouting',     color: '#163060', icon: 'crosshair' },
    { label: 'Outbound\nChannels',   color: '#112655', icon: 'signal'    },
    { label: 'Exclusive\nROI',       color: '#0D1D44', icon: 'chart'     },
    { label: 'Full-Ticket\nValue',   color: '#A33B0C', icon: 'chart'     },
    { label: 'Inbound\nChannels',    color: '#B84610', icon: 'signal'    },
    { label: 'Replacement\nFocus',   color: '#CF5218', icon: 'crosshair' },
    { label: 'Predictive\nData',     color: '#E05C1A', icon: 'person'    },
  ];

  function polarToCart(a: number, r: number) {
    const rad = (a * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function segPath(s: number, e: number) {
    const s1 = polarToCart(s + gap / 2, innerR), s2 = polarToCart(s + gap / 2, outerR);
    const e1 = polarToCart(e - gap / 2, outerR), e2 = polarToCart(e - gap / 2, innerR);
    return `M${s1.x},${s1.y} L${s2.x},${s2.y} A${outerR},${outerR} 0 0,1 ${e1.x},${e1.y} L${e2.x},${e2.y} A${innerR},${innerR} 0 0,0 ${s1.x},${s1.y} Z`;
  }

  function SegIcon({ type }: { type: string }) {
    const sw = 1.3;
    if (type === 'person') return (<>
      <circle r="3.5" fill="white"/>
      <path d="M-5,4.5 C-5,11 -3,12 0,12 C3,12 5,11 5,4.5 Z" fill="white"/>
      <line x1="-9" y1="3" x2="-5.5" y2="3" stroke="white" strokeWidth={sw} strokeLinecap="round"/>
      <polygon points="-5.5,1.5 -5.5,4.5 -3,3" fill="white"/>
      <line x1="5.5" y1="3" x2="9" y2="3" stroke="white" strokeWidth={sw} strokeLinecap="round"/>
      <polygon points="5.5,1.5 5.5,4.5 8,3" fill="white"/>
    </>);
    if (type === 'crosshair') return (<>
      <circle r="7" fill="none" stroke="white" strokeWidth={sw}/>
      <circle r="2" fill="white"/>
      <line x1="-11" y1="0" x2="-8" y2="0" stroke="white" strokeWidth={sw}/>
      <line x1="8"   y1="0" x2="11" y2="0" stroke="white" strokeWidth={sw}/>
      <line x1="0" y1="-11" x2="0" y2="-8" stroke="white" strokeWidth={sw}/>
      <line x1="0" y1="8"   x2="0" y2="11" stroke="white" strokeWidth={sw}/>
    </>);
    if (type === 'signal') return (<>
      <path d="M-10,-2 Q0,-14 10,-2" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M-6,4 Q0,-3 6,4"      fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <circle r="2.5" cy="9" fill="white"/>
    </>);
    return (<>
      <rect x="-9" y="1"  width="5" height="8"  rx="0.5" fill="white" opacity="0.8"/>
      <rect x="-2" y="-3" width="5" height="12" rx="0.5" fill="white"/>
      <rect x="5"  y="-8" width="5" height="17" rx="0.5" fill="white" opacity="0.8"/>
    </>);
  }

  return (
    <svg viewBox="0 0 320 320" style={{ width: '100%', maxWidth: 340, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }}>
      {segments.map((seg, i) => {
        const start = -90 + i * 45, end = start + 45, mid = start + 22.5;
        const lr = (innerR + outerR) / 2, lp = polarToCart(mid, lr);
        return (
          <g key={i}>
            <path d={segPath(start, end)} fill={seg.color}/>
            <g transform={`rotate(${mid + 90}, ${lp.x}, ${lp.y})`}>
              <g transform={`translate(${lp.x}, ${lp.y - 11})`}><SegIcon type={seg.icon}/></g>
              {seg.label.split('\n').map((ln, li) => (
                <text key={li} x={lp.x} y={lp.y + 8 + li * 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontWeight="700" fill="white">{ln}</text>
              ))}
            </g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <g transform="translate(125 108) scale(0.7)">
        <circle cx="63" cy="27" r="14" fill="#F5A623"/>
        <line x1="63" y1="7"  x2="63" y2="1"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="63" y1="47" x2="63" y2="53" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="43" y1="27" x2="37" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="83" y1="27" x2="89" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <polygon points="10,60 50,30 90,60" fill="#E05C1A"/>
        <rect x="18" y="60" width="64" height="34" rx="2" fill="#1B3A6B"/>
        <rect x="40" y="74" width="16" height="20" rx="2" fill="#0f2344"/>
        <rect x="22" y="66" width="14" height="12" rx="1" fill="#5b8dd9"/>
        <rect x="60" y="66" width="14" height="12" rx="1" fill="#5b8dd9"/>
      </g>
      <text x={cx} y={cy + 44} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1B3A6B">TerritoryIQ</text>
      <text x={cx} y={cy + 56} textAnchor="middle" fontSize="7" fill="#94a3b8">1 Trade · 1 ZIP</text>
      <line x1={cx} y1={6} x2={cx} y2={314} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,4"/>
      <circle cx={cx} cy={cy - outerR - 6}  r="3.5" fill="#E05C1A" opacity="0.65"/>
      <circle cx={cx} cy={cy - outerR - 16} r="2.5" fill="#E05C1A" opacity="0.4"/>
      <circle cx={cx} cy={cy + outerR + 6}  r="3.5" fill="#1B3A6B" opacity="0.65"/>
      <circle cx={cx} cy={cy + outerR + 16} r="2.5" fill="#1B3A6B" opacity="0.4"/>
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeTab, setActiveTab]     = useState<'inbound' | 'outbound'>('inbound');
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [formData, setFormData]       = useState({
    businessName: '', contactName: '', phone: '', email: '',
    trade: '', zip: '', bestTime: '', notes: '',
  });

  function setField(key: string, val: string) {
    setFormData(prev => ({ ...prev, [key]: val }));
  }

  async function handleSubmit() {
    if (!formData.businessName || !formData.phone || !formData.trade || !formData.zip) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, message: formData.notes }),
      });
    } catch { /* show success anyway */ }
    setLoading(false);
    setSubmitted(true);
  }

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --orange:      #E05C1A;
      --orange-light:#f07040;
      --orange-dark: #c04c12;
      --navy:        #1B3A6B;
      --navy-dark:   #0f2344;
      --bg:          #ffffff;
      --bg-2:        #f5f7fb;
      --bg-3:        #eaecf4;
      --text:        #1B3A6B;
      --text-mid:    #3d5080;
      --text-light:  #6b7fa8;
      --text-muted:  #9aaabf;
      --green:       #10b981;
      --red:         #ef4444;
      --border:      rgba(27,58,107,0.1);
      --border-mid:  rgba(27,58,107,0.18);
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }

    .nav-link { color: var(--text-mid); text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s; }
    .nav-link:hover { color: var(--orange); }

    .btn-primary { background: var(--orange); color: #fff; border: none; padding: 14px 28px; font-family: inherit; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); }
    .btn-primary:hover { background: var(--orange-dark); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(224,92,26,0.3); }

    .btn-ghost { background: transparent; color: var(--navy); border: 2px solid var(--navy); padding: 12px 28px; font-family: inherit; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
    .btn-ghost:hover { border-color: var(--orange); color: var(--orange); }

    .section-label { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .section-label::before { content: ''; display: block; width: 24px; height: 2px; background: var(--orange); flex-shrink: 0; }

    .headline-xl { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 9vw, 116px); line-height: 0.9; letter-spacing: 0.01em; color: var(--navy); }
    .headline-lg { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 62px); line-height: 0.95; letter-spacing: 0.01em; color: var(--navy); }
    .stat-number  { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px, 4vw, 52px); color: var(--orange); line-height: 1; }

    .card { background: var(--bg-2); border: 1px solid var(--border); padding: 28px; position: relative; transition: all 0.25s; }
    .card:hover { border-color: rgba(224,92,26,0.4); box-shadow: 0 4px 20px rgba(224,92,26,0.08); }
    .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--orange); opacity: 0; transition: opacity 0.25s; }
    .card:hover::before { opacity: 1; }

    .territory-card { background: var(--bg); border: 1px solid var(--border); padding: 22px 24px; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; }
    .territory-card.available:hover { border-color: var(--green); background: rgba(16,185,129,0.03); }

    .badge-available { background: rgba(16,185,129,0.1); color: var(--green); border: 1px solid rgba(16,185,129,0.3); font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; padding: 4px 10px; text-transform: uppercase; }
    .badge-claimed   { background: rgba(239,68,68,0.08); color: var(--red);   border: 1px solid rgba(239,68,68,0.2);  font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; padding: 4px 10px; text-transform: uppercase; }

    .input-field { background: var(--bg); border: 1.5px solid var(--border-mid); color: var(--text); padding: 13px 16px; font-family: inherit; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
    .input-field:focus { border-color: var(--orange); }
    .input-field::placeholder { color: var(--text-muted); }
    select.input-field option { background: #fff; color: var(--text); }

    .tab-btn { padding: 10px 24px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border: 1.5px solid var(--border-mid); background: transparent; color: var(--text-light); transition: all 0.2s; }
    .tab-btn.active { background: var(--orange); color: #fff; border-color: var(--orange); }

    .grid-overlay { background-image: linear-gradient(rgba(27,58,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,107,0.04) 1px, transparent 1px); background-size: 60px 60px; }
    .orange-glow { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(224,92,26,0.08) 0%, transparent 70%); pointer-events: none; }

    .vs-divider { display: flex; align-items: center; gap: 16px; margin: 20px 0; }
    .vs-divider::before, .vs-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .vs-label { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--orange); letter-spacing: 0.1em; }

    .channel-pill { background: var(--bg-3); border: 1px solid var(--border); padding: 7px 14px; font-size: 12px; font-weight: 500; color: var(--text-mid); display: inline-flex; align-items: center; white-space: nowrap; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up         { animation: fadeUp 0.7s ease forwards; }
    .fade-up-delay-1 { animation-delay: 0.15s; opacity: 0; animation-fill-mode: forwards; }
    .fade-up-delay-2 { animation-delay: 0.3s;  opacity: 0; animation-fill-mode: forwards; }
    .fade-up-delay-3 { animation-delay: 0.45s; opacity: 0; animation-fill-mode: forwards; }

    @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .live-dot { width: 8px; height: 8px; background: var(--green); border-radius: 50%; display: inline-block; animation: pulse-dot 2s ease infinite; flex-shrink: 0; }

    .divider { border: none; border-top: 1px solid var(--border); }

    @media (max-width: 768px) {
      .hide-mobile   { display: none !important; }
      .stack-mobile  { flex-direction: column !important; }
      .grid-2        { grid-template-columns: 1fr !important; }
      .grid-4        { grid-template-columns: 1fr 1fr !important; }
      .grid-3        { grid-template-columns: 1fr !important; }
    }
  `;

  // ─── Inline-style helpers ───────────────────────────────────────────────────
  const sec  = (bg = 'var(--bg)')   => ({ padding: '100px 5%', background: bg } as React.CSSProperties);
  const wrap = (maxW = '1200px')    => ({ maxWidth: maxW, margin: '0 auto' } as React.CSSProperties);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', color: 'var(--navy)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, boxShadow: '0 1px 24px rgba(27,58,107,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <InstinctRiseLogo size="md"/>
          <div style={{ width: 1, height: 28, background: 'var(--border-mid)' }} className="hide-mobile"/>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="hide-mobile">
            Territory<span style={{ color: 'var(--orange)' }}>IQ</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hide-mobile">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#channels"     className="nav-link">Channels</a>
          <a href="#tam-market"   className="nav-link">Market</a>
          <a href="#territories"  className="nav-link">Territories</a>
        </div>
        <a href="#get-started" className="btn-primary" style={{ fontSize: 12, padding: '10px 20px' }}>Claim Your ZIP →</a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="grid-overlay" style={{ paddingTop: 140, paddingBottom: 100, paddingLeft: '5%', paddingRight: '5%', position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(155deg, #ffffff 0%, #f0f4fb 100%)' }}>
        <div className="orange-glow" style={{ width: 700, height: 700, top: -200, right: -150 }}/>
        <div style={{ ...wrap(), position: 'relative', zIndex: 1 }}>

          <div style={{ marginBottom: 32 }}>
            <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--green)', fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.12em', padding: '6px 14px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="live-dot"/>&nbsp;Live Territories Available
            </span>
          </div>

          <h1 className="headline-xl fade-up" style={{ maxWidth: 920 }}>
            Stop Fighting<br/>
            <span style={{ color: 'var(--orange)' }}>3–5 Competitors.</span><br/>
            Own Your Market.
          </h1>

          <p className="fade-up fade-up-delay-1" style={{ fontSize: 18, color: 'var(--text-mid)', maxWidth: 560, lineHeight: 1.75, marginTop: 28, marginBottom: 16 }}>
            We use <strong style={{ color: 'var(--navy)' }}>proprietary data to predict roof and HVAC replacements</strong> before the homeowner has to deal with it breaking and start calling around for estimates. One contractor. One trade. One ZIP. You reach them first.
          </p>
          <p className="fade-up fade-up-delay-1" style={{ fontSize: 15, color: 'var(--text-light)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
            These are full replacement jobs — $15k–$25k roofing, $8k–$15k HVAC. Not service calls. Not shared leads. <strong style={{ color: 'var(--navy)' }}>One job pays for itself.</strong>
          </p>

          <div className="fade-up fade-up-delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}>
            <a href="#territories" className="btn-primary">View Available Territories →</a>
            <a href="#how-it-works" className="btn-ghost">How It Works</a>
          </div>

          <div className="fade-up fade-up-delay-3 hide-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border-mid)', background: 'var(--border)' }}>
            {[
              { number: '1',     label: 'Contractor per trade per ZIP' },
              { number: '70%',   label: 'Less driving time' },
              { number: '30%',   label: 'Lower acquisition cost' },
              { number: '$204M', label: 'Martin County TAM' },
            ].map((s, i) => (
              <div key={s.label} style={{ background: '#fff', padding: '24px 28px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div className="stat-number">{s.number}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4, fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────── */}
      <section style={sec('#fff')}>
        <div style={wrap()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="grid-2">

            {/* Left */}
            <div>
              <p className="section-label">The Problem</p>
              <h2 className="headline-lg" style={{ marginBottom: 24 }}>Four Trucks.<br/>One Roof Call.</h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
                Platforms like Angi and HomeAdvisor sell the same lead to 3–5 contractors simultaneously. You slash your price to win. So does everyone else. The homeowner picks the lowest bidder.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '⚔️', title: 'Bidding War Chaos',       desc: 'You slash your price. So does everyone else. Lowest bidder wins — not the most professional.' },
                  { icon: '💸', title: 'Eroded Margins',           desc: '$80–$400 per lead that goes to 3 others simultaneously. You pay for the privilege of losing.' },
                  { icon: '🔄', title: 'Reactive, Not Predictive', desc: 'Emergency calls mean cheap and fast — not the high-ticket planned replacement.' },
                ].map(p => (
                  <div key={p.title} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Old vs TerritoryIQ */}
            <div style={{ background: '#fff', border: '1px solid var(--border-mid)', padding: 32, boxShadow: '0 4px 32px rgba(27,58,107,0.08)' }}>
              <div style={{ padding: 24, background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>Old Way</div>
                <div style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 16 }}>Share leads, race to the bottom, lose on price</div>
                {['3–5 competitors on same lead', '$80–$400 per shared lead', 'Emergency calls only', 'Margin pressure every job'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-light)', marginBottom: 6 }}>
                    <span style={{ color: 'var(--red)' }}>✗</span>{item}
                  </div>
                ))}
              </div>
              <div className="vs-divider"><span className="vs-label">VS</span></div>
              <div style={{ padding: 24, background: 'rgba(224,92,26,0.04)', border: '1px solid rgba(224,92,26,0.2)', borderLeft: '3px solid var(--orange)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 12 }}>TerritoryIQ Way</div>
                <div style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 16 }}>Own your ZIP, predict failures, close at full ticket</div>
                {["You're the only contractor", 'Exclusive territory, locked on sign-up', 'Reach them before the breakdown', 'Close at full replacement price'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-mid)', marginBottom: 6 }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section id="how-it-works" style={sec('var(--bg-2)')}>
        <div style={wrap()}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Predictive Intelligence Engine</p>
            <h2 className="headline-lg">Predict. Outreach. Close.</h2>
            <p style={{ color: 'var(--text-mid)', fontSize: 16, maxWidth: 520, margin: '16px auto 0' }}>
              TerritoryIQ analyzes market signals to flag homes primed for replacements before the leak or breakdown hits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }} className="grid-3">
            {[
              { step: '01', icon: '🎯', title: 'Find Replacement-Ready Homes',
                desc: 'We identify homes in your ZIP due for a full roof or HVAC replacement — before the homeowner has to deal with it breaking and start calling for estimates.',
                points: ['Replacement-ready homes identified before they break', 'You reach out first — not after emergency dispatch', 'Post-storm ZIPs surface immediately'] },
              { step: '02', icon: '🔒', title: 'Own the Territory',
                desc: 'You are the only contractor in your trade for that ZIP. No one else gets your list. Your homes, your pipeline — period. Locked the moment you subscribe.',
                points: ['1 roofer per ZIP code', '1 HVAC contractor per ZIP code', 'Locked the moment you subscribe'] },
              { step: '03', icon: '💰', title: 'Close Full Replacement Jobs',
                desc: 'A homeowner who planned a replacement is a $15k–$25k roofing ticket or an $8k–$15k HVAC replacement. Reach them first — win at full price.',
                points: ['Full replacement tickets — not service calls', "No bidding wars — you're the only contractor", 'One job typically covers your entire year\'s cost'] },
            ].map(s => (
              <div key={s.step} style={{ background: '#fff', border: '1px solid var(--border)', padding: 36, position: 'relative', boxShadow: '0 2px 16px rgba(27,58,107,0.05)' }}>
                <div style={{ position: 'absolute', top: 20, right: 24, fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: 'rgba(27,58,107,0.05)', lineHeight: 1 }}>{s.step}</div>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 20 }}>{s.icon}</span>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 10 }}>Step {s.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.points.map(pt => (
                    <div key={pt} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-mid)' }}>
                      <span style={{ color: 'var(--orange)', flexShrink: 0 }}>✓</span>{pt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="grid-4">
            {[
              { n: '70%',   l: 'Less driving with ZIP-clustered routes' },
              { n: '25%',   l: 'Higher close rates with predicted jobs' },
              { n: '30%',   l: 'Lower CAC vs. shared lead platforms' },
              { n: '1 job', l: 'Pays for your entire year of TerritoryIQ' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center', padding: 24, background: '#fff', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(27,58,107,0.04)' }}>
                <div className="stat-number">{s.n}</div>
                <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNFAIR ADVANTAGES ───────────────────────────────────────── */}
      <section style={sec('#fff')}>
        <div style={wrap()}>
          <div style={{ marginBottom: 56 }}>
            <p className="section-label">Two Unfair Advantages</p>
            <h2 className="headline-lg">Built into every territory.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="grid-2">
            {[
              { icon: '🌪️', title: 'Storm Prediction — Hit the Door First', accent: 'var(--orange)',
                desc: 'When a storm hits your ZIP, TerritoryIQ immediately cross-references storm impact data with homes in your territory already due for a roof replacement. You get a prioritized knock list the same day — no guessing which streets to canvas, no wasted windshield time. You show up before any other contractor even knows where to go.' },
              { icon: '📍', title: 'Cluster Routing — Stop Driving Across Three Counties', accent: 'var(--navy)',
                desc: 'Because your territory is one ZIP, every replacement-ready home is within a few miles of the next one. Hit five homes on the same street in a single afternoon instead of burning two hours across the county for one lead. Less windshield time. More doors knocked. More full-ticket replacements closed.' },
            ].map(adv => (
              <div key={adv.title} style={{ padding: 48, background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: `3px solid ${adv.accent}`, boxShadow: '0 2px 20px rgba(27,58,107,0.05)' }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{adv.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>{adv.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8 }}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANNELS ────────────────────────────────────────────────── */}
      <section id="channels" style={sec('var(--bg-2)')}>
        <div style={wrap()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }} className="grid-2">

            {/* LEFT — tab switcher */}
            <div>
              <p className="section-label">Full Marketing Integration</p>
              <h2 className="headline-lg" style={{ marginBottom: 20 }}>Every Channel You Run.<br/>Supercharged.</h2>
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 28 }}>
                TerritoryIQ isn&apos;t a replacement for your marketing — it&apos;s the intelligence layer that makes every channel you already use dramatically more effective.
              </p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <button className={`tab-btn${activeTab === 'inbound'  ? ' active' : ''}`} onClick={() => setActiveTab('inbound')}>Inbound</button>
                <button className={`tab-btn${activeTab === 'outbound' ? ' active' : ''}`} onClick={() => setActiveTab('outbound')}>Outbound</button>
              </div>

              {activeTab === 'inbound' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Approach</div>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>When someone in your ZIP calls from an inbound ad, you instantly cross-reference their address. You already know if their roof or HVAC is due for replacement — before the conversation even starts.</p>
                  </div>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Channels</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Google LSA', 'Organic SEO', 'Review Platforms', 'Referral Funnels'].map(c => <span className="channel-pill" key={c}>{c}</span>)}
                    </div>
                  </div>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Impact</div>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>Callers who match a replacement-ready address convert at significantly higher rates and require less convincing to close at full ticket.</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Approach</div>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>TerritoryIQ pinpoints exactly which homes to target — 15-year-old roof in a saltwater zone, 11-year HVAC in peak FL heat — before the breakdown, not after. You show up with a reason, not a cold pitch.</p>
                  </div>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Channels</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Cold Calls', 'Direct Mail', 'Door-to-Door', 'Geofence Ads'].map(c => <span className="channel-pill" key={c}>{c}</span>)}
                    </div>
                  </div>
                  <div className="card">
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 8 }}>Impact</div>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>Stop cold-calling blind — call warm with a reason. Track 20–30% better conversion when outbound is driven by replacement-ready address data vs. random canvassing.</p>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — channel list + wheel */}
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14, textTransform: 'uppercase' }}>More ways to use TerritoryIQ</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
                {[
                  { icon: '📱', title: 'Digital & Social Ads',      badge: '20–30% better CVR',         desc: 'Build custom Facebook and Instagram audiences matched to replacement-ready home profiles in your ZIP.' },
                  { icon: '📍', title: 'Geofence Advertising',       badge: 'Saltwater hotspot zones',    desc: 'Geofence waterfront neighborhoods and post-storm corridors where corrosion and age intersect.' },
                  { icon: '🗂️', title: 'CRM & Pipeline Automation', badge: 'Zero manual sorting',        desc: 'Replacement-ready lists export directly into your CRM, sorted by readiness — no guesswork.' },
                  { icon: '🌪️', title: 'Storm Canvassing',          badge: 'Same-day knock lists',       desc: 'When a storm hits, TerritoryIQ instantly surfaces every replacement-ready home, ranked and ready.' },
                  { icon: '🏘️', title: 'Neighborhood Clustering',   badge: '70% less windshield time',   desc: 'Run door-to-door routes with 5–10 replacement-ready homes on the same block.' },
                  { icon: '🔁', title: 'Get There 2 Years Early',   badge: 'Lock in before it bids',     desc: 'Flag homes 1–2 years out from full replacement. Build the relationship before the competition shows up.' },
                ].map(item => (
                  <div key={item.title} style={{ background: '#fff', border: '1px solid var(--border)', padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{item.title}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--orange)', letterSpacing: '0.06em' }}>{item.badge}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-light)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wheel */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '28px 0', background: '#fff', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Intelligence Wheel</div>
                <MarketingWheel/>
                <div style={{ display: 'flex', gap: 20, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }}/><span style={{ color: 'var(--orange)' }}>Inbound</span></span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--navy)',   display: 'inline-block' }}/><span style={{ color: 'var(--navy)'   }}>Outbound</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAM ─────────────────────────────────────────────────────── */}
      <section id="tam-market" style={sec('#fff')}>
        <div style={wrap()}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Annual Addressable Market</p>
            <h2 className="headline-lg">$204M Market.<br/>You Could Own It.</h2>
            <p style={{ color: 'var(--text-mid)', marginTop: 16, fontSize: 16 }}>Why compete for 25% of a shared lead when you can own 100% of the territory?</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="grid-2">
            {[
              { trade: 'Roofing', total: '$120M', perZip: '$4.2M', sampleZip: '$60.6M', color: 'var(--orange)',
                points: ['~6,700 roofs due for replacement annually', 'Avg ticket $15k–$25k', 'Hurricane & saltwater corrosion accelerates cycles', '15-year roof in coastal FL = imminent replacement'] },
              { trade: 'HVAC',    total: '$84M',  perZip: '$2.9M', sampleZip: '$28.5M', color: 'var(--navy)',
                points: ['~8,400 HVAC systems flagged for replacement/year', 'Avg ticket $8k–$15k', 'Salt-air corrosion + heat shortens system life', '10-yr old unit in a hot coastal market = hot prospect'] },
            ].map(t => (
              <div key={t.trade} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: `3px solid ${t.color}`, padding: 40, boxShadow: '0 2px 16px rgba(27,58,107,0.05)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: t.color, textTransform: 'uppercase', marginBottom: 10 }}>{t.trade}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: t.color, lineHeight: 1, marginBottom: 4 }}>{t.total}</div>
                <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 4 }}>Annual Addressable Revenue</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-mid)', marginBottom: 8 }}>Per-ZIP avg: <strong>{t.perZip}</strong></div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: t.color, marginBottom: 24, background: 'rgba(27,58,107,0.04)', padding: '6px 10px', display: 'inline-block' }}>
                  Sample ZIP TAM: {t.sampleZip}
                </div>
                <hr className="divider" style={{ marginBottom: 20 }}/>
                {t.points.map(pt => (
                  <div key={pt} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-mid)', marginBottom: 8 }}>
                    <span style={{ color: t.color, flexShrink: 0 }}>▶</span>{pt}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--navy)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Combined Annual TAM</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 68, color: '#fff', lineHeight: 1 }}>$204M</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 8, maxWidth: 420 }}>Every contractor on shared platforms is fighting over a fraction of this. TerritoryIQ lets you stake your claim — exclusively.</p>
            </div>
            <a href="#get-started" className="btn-primary">Claim Your Territory →</a>
          </div>
        </div>
      </section>

      {/* ── TERRITORY MODEL ─────────────────────────────────────────── */}
      <section style={sec('var(--bg-2)')}>
        <div style={wrap()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="grid-2">

            <div>
              <p className="section-label">Exclusive by Trade, Exclusive by ZIP</p>
              <h2 className="headline-lg" style={{ marginBottom: 24 }}>One Contractor.<br/>One Trade.<br/>One ZIP.<br/>Full Stop.</h2>
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 24 }}>
                We never double-sell a territory. The moment you claim a ZIP for your trade, it&apos;s locked — unavailable to every competitor in your space.
              </p>
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderLeft: '4px solid var(--orange)', padding: 24 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>🔒 The TerritoryIQ Guarantee</div>
                <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7 }}>Different trades can license the same ZIP. But no one in <em>your</em> trade will ever compete in your territory.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { zip: '34990', rows: [{ trade: 'Roofing', status: 'yours' }, { trade: 'HVAC', status: 'available' }, { trade: 'Plumbing', status: 'available' }] },
                { zip: '34997', rows: [{ trade: 'Roofing', status: 'available' }, { trade: 'HVAC', status: 'available' }, { trade: 'Plumbing', status: 'taken' }] },
                { zip: '33455', rows: [{ trade: 'Roofing', status: 'available' }, { trade: 'HVAC', status: 'yours' }, { trade: 'Plumbing', status: 'available' }] },
              ].map(group => (
                <div key={group.zip} style={{ background: '#fff', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 1px 8px rgba(27,58,107,0.05)' }}>
                  <div style={{ padding: '10px 20px', background: 'var(--bg-3)', borderBottom: '1px solid var(--border)', fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-light)', letterSpacing: '0.08em' }}>ZIP {group.zip}</div>
                  {group.rows.map(row => (
                    <div key={row.trade} style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-mid)' }}>{row.trade}</span>
                      {row.status === 'yours'     && <span style={{ background: 'rgba(224,92,26,0.1)', border: '1px solid rgba(224,92,26,0.3)', color: 'var(--orange)', fontFamily: "'DM Mono', monospace", fontSize: 10, padding: '3px 8px', letterSpacing: '0.08em' }}>★ YOUR TERRITORY</span>}
                      {row.status === 'available' && <span className="badge-available">Available</span>}
                      {row.status === 'taken'     && <span className="badge-claimed">Taken</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TERRITORY INVENTORY ──────────────────────────────────────── */}
      <section id="territories" style={sec('#fff')}>
        <div style={wrap()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <p className="section-label">Live Inventory</p>
              <h2 className="headline-lg">Available Territories</h2>
              <p style={{ color: 'var(--text-mid)', marginTop: 12, fontSize: 15 }}>One contractor per trade per ZIP — exclusively. Once claimed, it&apos;s gone.</p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--green)' }}>
              <span className="live-dot"/>&nbsp;Live availability
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 10 }} className="grid-2">
            {territories.filter(t => t.status === 'Available').map(t => (
              <div key={`${t.zip}-${t.trade}`} className="territory-card available" style={{ boxShadow: '0 1px 10px rgba(27,58,107,0.05)' }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--navy)', lineHeight: 1 }}>{t.zip}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>{t.trade}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span className="badge-available">✓ Available</span>
                  <a href="#get-started" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--orange)', textDecoration: 'none', letterSpacing: '0.06em', fontWeight: 600 }}>Claim →</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }} className="grid-2">
            {territories.filter(t => t.status === 'Claimed').map(t => (
              <div key={`${t.zip}-${t.trade}`} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.55 }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--navy)', lineHeight: 1 }}>{t.zip}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>{t.trade}</div>
                </div>
                <span className="badge-claimed">✗ Claimed</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Don&apos;t See Your ZIP?</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)' }}>We&apos;re expanding. Submit your trade and ZIP — we&apos;ll confirm availability within one business day.</div>
            </div>
            <a href="#get-started" className="btn-ghost" style={{ padding: '10px 22px', fontSize: 13 }}>Check My ZIP →</a>
          </div>
        </div>
      </section>

      {/* ── CTA / FORM ───────────────────────────────────────────────── */}
      <section id="get-started" style={{ padding: '100px 5%', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="orange-glow" style={{ width: 800, height: 800, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Secure Your Territory</p>
            <h2 className="headline-lg" style={{ color: '#fff', marginBottom: 16 }}>Stop Splitting Scraps.<br/>Own Your Market.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Tell us your trade and ZIP — we&apos;ll confirm availability and walk you through the rest.
            </p>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['No shared leads — ever', 'Exclusive per trade, per ZIP', 'One job covers your full subscription'].map(pt => (
                <div key={pt} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)', alignItems: 'center' }}>
                  <span style={{ color: 'var(--orange)' }}>✓</span>{pt}
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div style={{ background: '#fff', padding: 64, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: 'var(--navy)', marginBottom: 12 }}>You&apos;re on the list.</h3>
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7 }}>We&apos;ll confirm your ZIP availability and reach out within one business day. No spam. No shared leads.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', padding: 48, boxShadow: '0 8px 48px rgba(0,0,0,0.25)' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--orange)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                Check ZIP Availability — Takes 60 seconds
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="grid-2">
                {[
                  { label: 'Business Name *', placeholder: 'Smith Roofing LLC',        key: 'businessName' },
                  { label: 'Contact Name *',  placeholder: 'John Smith',               key: 'contactName'  },
                  { label: 'Phone *',         placeholder: '(561) 555-0100',            key: 'phone'        },
                  { label: 'Email',           placeholder: 'john@smithroofing.com',     key: 'email'        },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{f.label}</label>
                    <input className="input-field" placeholder={f.placeholder}
                      value={formData[f.key as keyof typeof formData]}
                      onChange={e => setField(f.key, e.target.value)}
                      type={f.key === 'phone' ? 'tel' : f.key === 'email' ? 'email' : 'text'}/>
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Your Trade *</label>
                  <select className="input-field" value={formData.trade} onChange={e => setField('trade', e.target.value)}>
                    <option value="">Select trade...</option>
                    <option>Roofing</option><option>HVAC</option><option>Plumbing</option>
                    <option>Electrical</option><option>Windows / Siding</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Target ZIP *</label>
                  <input className="input-field" placeholder="34997" maxLength={5}
                    value={formData.zip} onChange={e => setField('zip', e.target.value)}/>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Best Time to Contact</label>
                <select className="input-field" value={formData.bestTime} onChange={e => setField('bestTime', e.target.value)}>
                  <option value="">Select a time window...</option>
                  <option>Mornings (8am – 12pm)</option><option>Afternoons (12pm – 5pm)</option>
                  <option>Evenings (5pm – 8pm)</option><option>Anytime</option>
                </select>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Anything else? <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                <textarea className="input-field" rows={3} placeholder="e.g. I also want to cover ZIP 34994..."
                  value={formData.notes} onChange={e => setField('notes', e.target.value)} style={{ resize: 'vertical' }}/>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <button className="btn-primary" onClick={handleSubmit} disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Sending...' : 'Check My ZIP Availability →'}
                </button>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>No spam. No shared leads. Pricing discussed on call.</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '40px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <InstinctRiseLogo size="sm"/>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                Territory<span style={{ color: 'var(--orange)' }}>IQ</span>
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-light)', maxWidth: 320, lineHeight: 1.6 }}>
              TerritoryIQ is the flagship product of InstinctRise — exclusive territory intelligence for contractors.
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'DM Mono', monospace" }}>
              © {new Date().getFullYear()} InstinctRise. All rights reserved.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#get-started" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-light)', textDecoration: 'none', letterSpacing: '0.06em' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
