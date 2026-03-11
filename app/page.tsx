'use client';
import React, { useState, useEffect } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const navLinks = [
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'All Channels',  href: '#channels' },
  { label: 'Market Size',   href: '#tam-market' },
  { label: 'Territories',   href: '#territories' },
];

// ─── Logo ──────────────────────────────────────────────────────────────────────
// Priority order: /public/logo.mp4 → /public/logo.png → SVG fallback

function InstinctRiseLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed,   setImgFailed]   = useState(false);
  const hClass = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-20' : 'h-12';

  if (!videoFailed) {
    return (
      <video
        src="/logo.mp4"
        autoPlay loop muted playsInline
        className={`${hClass} w-auto object-contain`}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (!imgFailed) {
    return (
      <img
        src="/logo.png"
        alt="InstinctRise"
        className={`${hClass} w-auto`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  // Fallback SVG if neither media file exists yet
  const d = size === 'sm' ? 36 : size === 'lg' ? 60 : 44;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={d} height={d} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun */}
        <circle cx="63" cy="27" r="14" fill="#F5A623"/>
        <line x1="63" y1="7"  x2="63" y2="1"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="63" y1="47" x2="63" y2="53" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="43" y1="27" x2="37" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="83" y1="27" x2="89" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="49" y1="13" x2="45" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="77" y1="13" x2="81" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        {/* Buildings */}
        <rect x="5"  y="52" width="12" height="42" rx="1" fill="#1B3A6B"/>
        <rect x="19" y="38" width="14" height="56" rx="1" fill="#163060"/>
        <rect x="35" y="48" width="10" height="46" rx="1" fill="#1B3A6B"/>
        {/* House */}
        <polygon points="40,62 65,42 90,62" fill="#E05C1A"/>
        <rect x="48" y="62" width="34" height="32" rx="2" fill="#1B3A6B"/>
        <rect x="58" y="74" width="10" height="20" rx="1" fill="#0f2344"/>
        <rect x="51" y="66" width="10" height="9"  rx="1" fill="#5b8dd9"/>
        <rect x="72" y="66" width="8"  height="9"  rx="1" fill="#5b8dd9"/>
        {/* Swoosh underline */}
        <path d="M2,96 Q50,86 98,96" stroke="#1B3A6B" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={`font-extrabold tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'}`}>
          <span className="text-[#1B3A6B]">Instinct</span><span className="text-[#E05C1A]">Rise</span>
        </span>
        <span className={`font-semibold tracking-widest text-[#1B3A6B] uppercase ${size === 'sm' ? 'text-[8px]' : 'text-[10px]'}`}>
          TerritoryIQ
        </span>
      </div>
    </div>
  );
}

// ─── Marketing Wheel ──────────────────────────────────────────────────────────

function MarketingWheel() {
  const cx = 160, cy = 160, outerR = 148, innerR = 68, gap = 3;

  // Orange on LEFT = inbound, Navy on RIGHT = outbound
  // i=0 starts at -90° (top) and goes clockwise
  const segments = [
    { label: 'Proactive\nOutreach',  color: '#1B3A6B', icon: 'person'    }, // top-right
    { label: 'Storm &\nRouting',     color: '#163060', icon: 'crosshair'  }, // upper-right
    { label: 'Outbound\nChannels',   color: '#112655', icon: 'signal'     }, // lower-right
    { label: 'Exclusive\nROI',       color: '#0D1D44', icon: 'chart'      }, // bottom-right
    { label: 'Full-Ticket\nValue',   color: '#A33B0C', icon: 'chart'      }, // bottom-left
    { label: 'Inbound\nChannels',    color: '#B84610', icon: 'signal'     }, // lower-left
    { label: 'Replacement\nFocus',   color: '#CF5218', icon: 'crosshair'  }, // upper-left
    { label: 'Predictive\nData',     color: '#E05C1A', icon: 'person'     }, // top-left
  ];

  function polarToCart(angleDeg: number, r: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function segPath(startDeg: number, endDeg: number) {
    const s1 = polarToCart(startDeg + gap / 2, innerR);
    const s2 = polarToCart(startDeg + gap / 2, outerR);
    const e1 = polarToCart(endDeg - gap / 2, outerR);
    const e2 = polarToCart(endDeg - gap / 2, innerR);
    return `M${s1.x},${s1.y} L${s2.x},${s2.y} A${outerR},${outerR} 0 0,1 ${e1.x},${e1.y} L${e2.x},${e2.y} A${innerR},${innerR} 0 0,0 ${s1.x},${s1.y} Z`;
  }

  function SegIcon({ type }: { type: string }) {
    const sw = 1.3;
    switch (type) {
      case 'person': return (
        <>
          <circle r="3.5" fill="white"/>
          <path d="M-5,4.5 C-5,11 -3,12 0,12 C3,12 5,11 5,4.5 Z" fill="white"/>
          <line x1="-9" y1="3" x2="-5.5" y2="3" stroke="white" strokeWidth={sw} strokeLinecap="round"/>
          <polygon points="-5.5,1.5 -5.5,4.5 -3,3" fill="white"/>
          <line x1="5.5" y1="3" x2="9" y2="3" stroke="white" strokeWidth={sw} strokeLinecap="round"/>
          <polygon points="5.5,1.5 5.5,4.5 8,3" fill="white"/>
        </>
      );
      case 'crosshair': return (
        <>
          <circle r="7" fill="none" stroke="white" strokeWidth={sw}/>
          <circle r="2" fill="white"/>
          <line x1="-11" y1="0" x2="-8" y2="0" stroke="white" strokeWidth={sw}/>
          <line x1="8" y1="0" x2="11" y2="0" stroke="white" strokeWidth={sw}/>
          <line x1="0" y1="-11" x2="0" y2="-8" stroke="white" strokeWidth={sw}/>
          <line x1="0" y1="8" x2="0" y2="11" stroke="white" strokeWidth={sw}/>
        </>
      );
      case 'signal': return (
        <>
          <path d="M-10,-2 Q0,-14 10,-2" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M-6,4 Q0,-3 6,4" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <circle r="2.5" cy="9" fill="white"/>
        </>
      );
      case 'chart': return (
        <>
          <rect x="-9" y="1" width="5" height="8" rx="0.5" fill="white" opacity="0.8"/>
          <rect x="-2" y="-3" width="5" height="12" rx="0.5" fill="white"/>
          <rect x="5" y="-8" width="5" height="17" rx="0.5" fill="white" opacity="0.8"/>
        </>
      );
      default: return null;
    }
  }

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[360px] drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      {segments.map((seg, i) => {
        const startDeg = -90 + i * 45;
        const endDeg   = startDeg + 45;
        const midDeg   = startDeg + 22.5;
        const labelR   = (innerR + outerR) / 2;
        const lp       = polarToCart(midDeg, labelR);
        const lines    = seg.label.split('\n');
        return (
          <g key={i}>
            <path d={segPath(startDeg, endDeg)} fill={seg.color}/>
            <g transform={`rotate(${midDeg + 90}, ${lp.x}, ${lp.y})`}>
              {/* Icon centered slightly above midpoint */}
              <g transform={`translate(${lp.x}, ${lp.y - 11})`}>
                <SegIcon type={seg.icon}/>
              </g>
              {/* Text labels below icon */}
              {lines.map((ln, li) => (
                <text key={li} x={lp.x} y={lp.y + 8 + li * 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontWeight="700" fill="white">
                  {ln}
                </text>
              ))}
            </g>
          </g>
        );
      })}

      {/* Inner white circle */}
      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>

      {/* Center: mini InstinctRise logo */}
      <g transform="translate(125 108) scale(0.7)">
        <circle cx="63" cy="27" r="14" fill="#F5A623"/>
        <line x1="63" y1="7"  x2="63" y2="1"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="63" y1="47" x2="63" y2="53" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="43" y1="27" x2="37" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="83" y1="27" x2="89" y2="27" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="49" y1="13" x2="45" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="77" y1="13" x2="81" y2="9"  stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <polygon points="10,60 50,30 90,60" fill="#E05C1A"/>
        <rect x="18" y="60" width="64" height="34" rx="2" fill="#1B3A6B"/>
        <rect x="40" y="74" width="16" height="20" rx="2" fill="#0f2344"/>
        <rect x="22" y="66" width="14" height="12" rx="1" fill="#5b8dd9"/>
        <rect x="60" y="66" width="14" height="12" rx="1" fill="#5b8dd9"/>
      </g>
      <text x={cx} y={cy + 44} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1B3A6B">TerritoryIQ</text>
      <text x={cx} y={cy + 56} textAnchor="middle" fontSize="7" fill="#94a3b8">1 Trade · 1 ZIP</text>

      {/* Full-height dashed divider */}
      <line x1={cx} y1={6} x2={cx} y2={314} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,4"/>

      {/* Decorative dots along divider (outside ring) */}
      <circle cx={cx} cy={cy - outerR - 6}  r="3.5" fill="#E05C1A" opacity="0.65"/>
      <circle cx={cx} cy={cy - outerR - 16} r="2.5" fill="#E05C1A" opacity="0.4"/>
      <circle cx={cx} cy={cy + outerR + 6}  r="3.5" fill="#1B3A6B" opacity="0.65"/>
      <circle cx={cx} cy={cy + outerR + 16} r="2.5" fill="#1B3A6B" opacity="0.4"/>
    </svg>
  );
}

// ─── TAM Section ──────────────────────────────────────────────────────────────

function TAMSection() {
  const trades = [
    {
      trade: 'Roofing', total: 120, perZip: '$4.2M', color: '#E05C1A',
      facts: ['~6,700 roofs due for replacement annually', 'Avg ticket $15k–$25k', 'Hurricane & saltwater corrosion accelerates cycles', '15-year roof in coastal FL = imminent replacement'],
    },
    {
      trade: 'HVAC', total: 84, perZip: '$2.9M', color: '#1B3A6B',
      facts: ['~8,400 HVAC systems flagged for replacement/year', 'Avg ticket $8k–$15k', 'Salt-air corrosion + FL heat shortens system life', '10-yr old unit in Martin County = hot prospect'],
    },
  ];
  return (
    <section id="tam-market" className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-400 font-semibold tracking-widest text-sm uppercase mb-3">Martin County, FL — Annual TAM</p>
          <h2 className="text-4xl font-extrabold mb-4">$204M Market. <span className="text-orange-400">You Could Own It.</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Why compete for 25% of a shared lead when you can own 100% of the territory? Here&apos;s what&apos;s at stake.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {trades.map((t) => (
            <div key={t.trade} className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: t.color }}>{t.trade}</div>
                  <div className="text-5xl font-extrabold">${t.total}M</div>
                  <div className="text-slate-400 text-sm mt-1">Annual Addressable Revenue</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs">Per-ZIP avg opportunity</div>
                  <div className="text-2xl font-bold mt-1" style={{ color: t.color }}>{t.perZip}</div>
                </div>
              </div>
              <div className="h-3 rounded-full bg-slate-700 mb-6 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(t.total / 204) * 100}%`, backgroundColor: t.color }}/>
              </div>
              <ul className="space-y-2">
                {t.facts.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 text-xs" style={{ color: t.color }}>▶</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-[#E05C1A] to-[#1B3A6B] p-px">
          <div className="bg-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Combined Annual TAM — Martin County</p>
            <div className="text-6xl font-extrabold mb-2">$204M</div>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every contractor on shared platforms is fighting over a fraction of this.
              TerritoryIQ lets you stake your claim — exclusively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Info Capture Form ────────────────────────────────────────────────────────

function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({
    businessName: '', contactName: '', phone: '', email: '',
    trade: '', zip: '', bestTime: '', message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Show success even if network error — submission is logged server-side
    }
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="get-started" className="py-24 px-6 bg-gradient-to-br from-[#0a1f44] via-[#1B3A6B] to-[#0a1f44] text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div>
          <p className="text-orange-400 font-semibold tracking-widest text-sm uppercase mb-4">Secure Your Territory</p>
          <h2 className="text-4xl font-extrabold mb-5 leading-tight">
            Stop Splitting Scraps.<br/>
            <span className="text-[#E05C1A]">Own Your Market.</span>
          </h2>
          <p className="text-blue-200 text-lg mb-6">
            Smart operators in Martin County are staking their claim now.
            Once a territory is taken, it&apos;s gone. Tell us your trade and ZIP — we&apos;ll confirm availability and walk you through the rest.
          </p>
          <ul className="space-y-3">
            {[
              'No shared leads — ever',
              'Exclusive per trade, per ZIP',
              'Replacement job predictions delivered before homeowners call anyone',
              'One replacement job covers the full subscription cost',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#E05C1A] flex items-center justify-center text-white text-xs font-bold shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-extrabold text-[#1B3A6B] mb-2">You&apos;re on the list.</h3>
              <p className="text-slate-600">We&apos;ll check your ZIP and trade availability and reach out within one business day.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-extrabold text-[#1B3A6B] mb-1">Check ZIP Availability</h3>
              <p className="text-slate-500 text-sm mb-6">Takes 60 seconds. We&apos;ll handle the rest.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Name *</label>
                    <input
                      required name="businessName" value={form.businessName} onChange={handleChange}
                      placeholder="Smith Roofing LLC"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Name *</label>
                    <input
                      required name="contactName" value={form.contactName} onChange={handleChange}
                      placeholder="John Smith"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone *</label>
                    <input
                      required name="phone" value={form.phone} onChange={handleChange} type="tel"
                      placeholder="(561) 555-0100"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                    <input
                      name="email" value={form.email} onChange={handleChange} type="email"
                      placeholder="john@smithroofing.com"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Trade *</label>
                    <select
                      required name="trade" value={form.trade} onChange={handleChange}
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] bg-white"
                    >
                      <option value="">Select trade...</option>
                      <option>Roofing</option>
                      <option>HVAC</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>Windows / Siding</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target ZIP *</label>
                    <input
                      required name="zip" value={form.zip} onChange={handleChange}
                      placeholder="34990"
                      maxLength={5}
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Best Time to Contact *</label>
                  <select
                    required name="bestTime" value={form.bestTime} onChange={handleChange}
                    className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] bg-white"
                  >
                    <option value="">Select a time window...</option>
                    <option>Mornings (8am – 12pm)</option>
                    <option>Afternoons (12pm – 5pm)</option>
                    <option>Evenings (5pm – 8pm)</option>
                    <option>Anytime</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Anything else? <span className="font-normal normal-case text-slate-400">(optional)</span></label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={2}
                    placeholder="e.g. I also want to cover ZIP 34997..."
                    className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E05C1A] text-white py-3.5 rounded-xl font-bold text-base hover:bg-orange-600 transition shadow-lg disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Check My ZIP Availability →'}
                </button>
                <p className="text-center text-xs text-slate-400">No spam. No shared leads. Pricing discussed on our call.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <InstinctRiseLogo size="md"/>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600 hover:text-[#1B3A6B] transition">{l.label}</a>
            ))}
          </div>
          <a href="#get-started" className="inline-block bg-[#E05C1A] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition shadow">
            Claim Your ZIP
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0a1f44] via-[#1B3A6B] to-[#0a1f44] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute border border-white rounded-full" style={{
              width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`,
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            }}/>
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
          {/* Logo + product name */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <InstinctRiseLogo size="lg"/>
            <span className="text-2xl font-black tracking-[0.18em] text-white uppercase mt-1">TerritoryIQ</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Stop Fighting <span className="text-[#E05C1A]">3–5 Competitors</span>
            <br/>Own Your Market.
          </h1>
          <p className="text-xl text-blue-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            We use <strong className="text-white">proprietary data to predict roof and HVAC replacements</strong> before the homeowner has to deal with it breaking and start calling around for estimates.
            One contractor. One trade. One ZIP. You reach them first.
          </p>
          <p className="text-base text-blue-300 mb-10 max-w-2xl mx-auto">
            These are full replacement jobs — $15k–$25k roofing, $8k–$15k HVAC. Not service calls. Not shared leads. <strong className="text-white">One job pays for itself.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#territories" className="inline-block bg-[#E05C1A] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl text-center">
              View Available Territories →
            </a>
            <a href="#how-it-works" className="inline-block border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition text-center">
              How It Works
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: '1',     label: 'Contractor per trade per ZIP' },
              { stat: '70%',   label: 'Less driving time' },
              { stat: '30%',   label: 'Lower customer acquisition cost' },
              { stat: '$204M', label: 'Martin County TAM' },
            ].map(item => (
              <div key={item.stat} className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-extrabold text-[#E05C1A]">{item.stat}</div>
                <div className="text-xs text-blue-300 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">The Problem With Shared Leads</p>
            <h2 className="text-4xl font-extrabold mb-4 text-[#0a1f44]">Four Trucks. One Roof Call.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Platforms like Angi and HomeAdvisor sell the same lead to 3–5 contractors simultaneously. Here&apos;s what happens.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '⚔️', title: 'Bidding War Chaos',       textColor: 'text-red-700',    bg: 'border-red-200 bg-red-50',    desc: 'You slash your price to win. So does everyone else. The homeowner picks the lowest bidder — often the least professional.' },
              { icon: '💸', title: 'Eroded Margins',           textColor: 'text-amber-700',  bg: 'border-amber-200 bg-amber-50', desc: 'Shared platforms charge $80–$400 per lead — leads that go to 3 others simultaneously. You pay for the privilege of losing.' },
              { icon: '🔄', title: 'Reactive, Not Predictive', textColor: 'text-orange-700', bg: 'border-orange-200 bg-orange-50', desc: 'You only hear about failures after they happen. Emergency calls mean cheap, fast — not the high-ticket planned replacement.' },
            ].map(c => (
              <div key={c.title} className={`rounded-2xl border-2 p-6 ${c.bg}`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${c.textColor}`}>{c.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-[#E05C1A] to-[#1B3A6B] rounded-2xl p-px">
            <div className="bg-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Old Way</div>
                <div className="font-bold text-lg text-slate-700">Share leads, race to the bottom, lose on price</div>
              </div>
              <div className="text-4xl font-black text-slate-300">VS</div>
              <div className="text-center md:text-right">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#E05C1A] mb-1">TerritoryIQ Way</div>
                <div className="font-bold text-lg text-[#1B3A6B]">Own your ZIP, predict failures, close at full ticket</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Predictive Intelligence Engine</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">Predict. Outreach. Close.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              TerritoryIQ analyzes market signals to flag homes primed for upgrades before the leak or breakdown hits.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { step: '01', icon: '🎯', title: 'Find Replacement-Ready Homes', desc: 'We use proprietary data to identify homes in your ZIP that are due for a full roof or HVAC replacement — before the homeowner has to deal with it breaking and start calling around for estimates.', bullets: ['Replacement-ready homes identified before they break', 'You reach out first — not after an emergency dispatch', 'Post-storm ZIPs surface immediately so you can move fast'] },
              { step: '02', icon: '🔒', title: 'Own the Territory',            desc: 'You are the only contractor in your trade for that ZIP. No one else gets your list. Your homes, your pipeline — period. The moment you subscribe, that territory is locked.', bullets: ['1 roofer per ZIP code', '1 HVAC contractor per ZIP code', 'Locked the moment you subscribe'] },
              { step: '03', icon: '💰', title: 'Close Full Replacement Jobs',  desc: 'These are not service calls or patch jobs. A homeowner who planned a replacement is a $15k–$25k roofing ticket or an $8k–$15k HVAC replacement. Reach them before the emergency and you win at full price.', bullets: ['Full replacement tickets — not service calls', 'No bidding wars — you\'re the only contractor with this list', 'One replacement job typically covers the entire year\'s cost'] },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 h-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="text-[#E05C1A] font-black text-sm tracking-widest mb-1">STEP {s.step}</div>
                  <h3 className="text-xl font-extrabold text-[#0a1f44] mb-3">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-[#E05C1A] font-bold mt-0.5">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < 2 && <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 h-8 items-center justify-center"><span className="text-slate-300 text-2xl">→</span></div>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: '70%',   label: 'Less driving with concentrated ZIP routes',  color: 'text-[#E05C1A]' },
              { metric: '25%',   label: 'Higher close rates with predicted jobs',      color: 'text-[#1B3A6B]' },
              { metric: '30%',   label: 'Lower CAC vs. shared lead platforms',         color: 'text-[#E05C1A]' },
              { metric: '1 job', label: 'Pays for your entire year of TerritoryIQ',   color: 'text-[#1B3A6B]' },
            ].map(m => (
              <div key={m.metric} className="text-center bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className={`text-4xl font-extrabold ${m.color} mb-2`}>{m.metric}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Storm + Cluster Routing ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0a1f44] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-orange-400 font-semibold tracking-widest text-sm uppercase mb-2">Two Unfair Advantages</p>
            <h2 className="text-3xl font-extrabold">Built into every territory.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-7">
              <div className="text-4xl mb-4">🌪️</div>
              <h3 className="text-xl font-extrabold text-[#E05C1A] mb-2">Storm Prediction — Hit the Door First</h3>
              <p className="text-blue-200 leading-relaxed">
                When a storm hits your ZIP, TerritoryIQ immediately cross-references storm impact data with homes in your territory that our data already shows are due for a roof replacement. You get a prioritized knock list the same day — no guessing which streets to canvas, no wasted windshield time chasing the wrong addresses. You show up before any other contractor even knows where to go.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-7">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-extrabold text-[#F5A623] mb-2">Cluster Routing — Stop Driving Across Three Counties</h3>
              <p className="text-blue-200 leading-relaxed">
                Because your territory is one ZIP, every replacement-ready home on your list is within a few miles of the next one. Hit five homes on the same street in a single afternoon instead of burning two hours driving across the county for one lead. Less windshield time. More doors knocked. More full-ticket replacements closed — and your crews are already in the neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Channels Diagram ────────────────────────────────────── */}
      <section id="channels" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <InstinctRiseLogo size="lg"/>
            </div>
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Intelligence Across Every Channel</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">Every Channel You Already Run. Supercharged.</h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              TerritoryIQ isn&apos;t a replacement for your marketing — it&apos;s the <strong className="text-[#0a1f44]">predictive intelligence layer</strong> that makes everything you already spend money on dramatically more effective.
            </p>
          </div>

          {/* ── Reference-style 3-column: [Inbound] [Wheel] [Outbound] ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-10 items-center mb-16">

            {/* LEFT — Inbound Marketing */}
            <div>
              <h3 className="text-2xl font-black text-[#E05C1A] mb-7 text-center lg:text-right">
                Inbound<br/>Marketing
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Predictive Intelligence', text: 'We use proprietary data to identify homes in your ZIP approaching replacement age — before the homeowner knows they have a problem. You\'re the first call, not the last.' },
                  { label: 'Replacement Focus',       text: 'These are $15k–$25k roofing jobs and $8k–$15k HVAC replacements — not service calls, not patches. Your exclusive replacement list is ready the day you subscribe.' },
                  { label: 'Your Inbound Channels',   text: 'Google LSA, organic SEO, referral programs, review platforms — every inbound inquiry is cross-referenced against your territory so you know its replacement potential before you pick up the phone.' },
                  { label: 'Full-Ticket Value',       text: 'No bidding wars. No race to the bottom. Higher close rates on every inbound call because you\'re talking to homeowners genuinely due for a replacement. One job covers your subscription.' },
                ].map(item => (
                  <div key={item.label} className="text-left lg:text-right">
                    <div className="font-bold text-[#E05C1A] text-sm mb-1">{item.label}:</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER — Wheel */}
            <div className="flex flex-col items-center gap-5">
              <MarketingWheel/>
              <div className="flex gap-6 text-xs font-bold">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#E05C1A] inline-block"/><span className="text-[#E05C1A]">Inbound</span></span>
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#1B3A6B] inline-block"/><span className="text-[#1B3A6B]">Outbound</span></span>
              </div>
              <p className="text-center text-xs text-slate-400 max-w-[240px] leading-relaxed">
                One exclusive ZIP. One trade. Every channel powered by replacement intelligence.
              </p>
            </div>

            {/* RIGHT — Outbound Marketing */}
            <div>
              <h3 className="text-2xl font-black text-[#1B3A6B] mb-7 text-center lg:text-left">
                Outbound<br/>Marketing
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Proactive Outreach',    text: 'A targeted, data-driven approach: reach replacement-ready homeowners before they hit a crisis, before any competitor knows the opportunity exists. You show up with a reason — not a cold pitch.' },
                  { label: 'Storm & Cluster Routing', text: 'Post-storm knock lists generated same-day. Cluster routing keeps every outbound visit in one tight zone — hit five replacement-ready homes on the same block in a single afternoon.' },
                  { label: 'Your Outbound Channels', text: 'Cold calls, direct mail, door-to-door canvassing, geofence ads — all pointed at verified replacement-ready addresses inside your exclusive ZIP. One territory. Zero overlap.' },
                  { label: 'Exclusive ZIP ROI',      text: 'One contractor per trade, per ZIP. Every dollar you spend on outreach hits a qualified replacement address. No wasted impressions. One replacement job covers the entire cost of TerritoryIQ.' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="font-bold text-[#1B3A6B] text-sm mb-1">{item.label}:</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Extended channel cards ── */}
          <div className="mb-8">
            <h3 className="text-center text-lg font-extrabold text-[#0a1f44] mb-6">More Ways to Use TerritoryIQ Intelligence</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📱', label: 'Digital & Social Ads',       tag: 'Digital',        tagColor: 'bg-orange-100 text-[#E05C1A]', bar: 'bg-[#E05C1A]', boost: '20–30% better CVR',          desc: 'Build Facebook and Instagram audiences matched to replacement-ready home profiles in your ZIP. Serve ads only to homeowners who are actually due — not the entire market.' },
                { icon: '📍', label: 'Geofence Advertising',        tag: 'Hyperlocal',     tagColor: 'bg-blue-100 text-[#1B3A6B]',   bar: 'bg-[#1B3A6B]', boost: 'Saltwater hotspot zones',    desc: 'Geofence waterfront neighborhoods, older subdivisions, and post-storm corridors where replacement cycles are accelerated — serve ads only to the homes that actually need you.' },
                { icon: '🗂️', label: 'CRM & Pipeline Automation',  tag: 'Operations',     tagColor: 'bg-slate-100 text-slate-600',   bar: 'bg-slate-500',  boost: 'Zero manual sorting',       desc: 'Replacement-ready address lists export directly into your CRM — sorted by readiness so your reps always call the right homeowner first. No guesswork, no wasted dials.' },
                { icon: '🌪️', label: 'Storm Canvassing',           tag: 'Event-Driven',   tagColor: 'bg-amber-100 text-amber-700',   bar: 'bg-amber-500',  boost: 'Same-day knock lists',      desc: 'When a storm hits your ZIP, TerritoryIQ instantly surfaces homes our data already shows are due for replacement — roof age, material, storm exposure factored in. Sorted and ready to knock, same day.' },
                { icon: '🏘️', label: 'Neighborhood Clustering',    tag: 'Route Efficiency',tagColor: 'bg-green-100 text-green-700',   bar: 'bg-green-600',  boost: '70% less windshield time',  desc: 'Because your territory is a single ZIP, every replacement-ready home is clustered together. Hit 5–10 homes on the same block in one route — not scattered across the county.' },
                { icon: '🔁', label: 'Get There 2 Years Early',    tag: 'Long Game',       tagColor: 'bg-purple-100 text-purple-700', bar: 'bg-purple-600', boost: 'Lock in the job before it bids', desc: 'Our data flags homes 1–2 years out from needing a full replacement. Get in front of them now, build the relationship, and be the obvious first call when the time comes.' },
              ].map(ch => (
                <div key={ch.label} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{ch.icon}</span>
                      <span className="font-bold text-sm text-slate-800">{ch.label}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${ch.tagColor}`}>{ch.tag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-1 rounded-full ${ch.bar} w-8`}/>
                    <span className="text-xs font-bold text-slate-500">{ch.boost}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CRM flow banner */}
          <div className="bg-gradient-to-r from-[#0a1f44] to-[#1B3A6B] rounded-2xl p-6 text-white text-center">
            <p className="text-sm text-blue-300 uppercase tracking-widest font-semibold mb-3">The Full Loop</p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-bold">
              {['Predict Replacement', '→', 'Identify Address', '→', 'Load into CRM', '→', 'Outbound Outreach', '→', 'Qualify Inbound Call', '→', 'Close at Full Ticket'].map((s, i) => (
                <span key={i} className={s === '→' ? 'text-orange-400' : 'bg-white/10 px-3 py-1 rounded-full text-xs'}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAM ─────────────────────────────────────────────────────── */}
      <TAMSection/>

      {/* ── ZIP Exclusive ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Exclusive by Trade, Exclusive by ZIP</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">
              One Contractor. One Trade. One ZIP. <span className="text-[#E05C1A]">Full Stop.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We never double-sell a territory. The moment you claim a ZIP for your trade,
              it&apos;s locked — unavailable to every competitor in your space.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { zip: '34990', roofing: 'YOU',       hvac: 'Available', plumbing: 'Available' },
              { zip: '34997', roofing: 'Available', hvac: 'Available', plumbing: 'Claimed'   },
              { zip: '33455', roofing: 'Available', hvac: 'YOU',       plumbing: 'Available' },
            ].map(z => (
              <div key={z.zip} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-[#0a1f44] text-white text-center py-3 font-bold text-lg">ZIP {z.zip}</div>
                <div className="p-4 space-y-3">
                  {[{ trade: 'Roofing', status: z.roofing }, { trade: 'HVAC', status: z.hvac }, { trade: 'Plumbing', status: z.plumbing }].map(t => (
                    <div key={t.trade} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{t.trade}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        t.status === 'YOU'     ? 'bg-[#E05C1A] text-white' :
                        t.status === 'Claimed' ? 'bg-slate-300 text-slate-600' :
                                                 'bg-green-100 text-green-700'
                      }`}>
                        {t.status === 'YOU' ? '★ YOUR TERRITORY' : t.status === 'Claimed' ? 'Taken' : 'Available'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-[#0a1f44] to-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-extrabold mb-3">Your Territory. Your Rules.</h3>
            <p className="text-blue-200 max-w-xl mx-auto mb-6">
              Different trades can license the same ZIP. But no one in <em>your</em> trade will ever
              compete in your territory. That&apos;s the TerritoryIQ guarantee.
            </p>
            <a href="#get-started" className="inline-block bg-[#E05C1A] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Check Your ZIP Availability →
            </a>
          </div>
        </div>
      </section>

      {/* ── Territory Inventory ──────────────────────────────────────── */}
      <section id="territories" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Live Inventory — Martin County, FL</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">Available Territories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              One contractor per trade per ZIP — exclusively. Once a territory is claimed, it&apos;s gone.
              These are full replacement job pipelines, not shared leads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {territories.map(t => (
              <div key={`${t.zip}-${t.trade}`} className={`rounded-2xl border-2 p-5 flex flex-col gap-3 ${t.status === 'Available' ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-[#1B3A6B]">{t.zip}</div>
                    <div className={`text-xs font-bold mt-0.5 px-2 py-0.5 rounded-full inline-block ${t.trade === 'Roofing' ? 'bg-orange-100 text-[#E05C1A]' : 'bg-blue-100 text-[#1B3A6B]'}`}>{t.trade}</div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                    {t.status === 'Available' ? '✓ Available' : '✗ Claimed'}
                  </span>
                </div>
                {t.status === 'Available' ? (
                  <a href="#get-started" className="inline-block w-full text-center bg-[#E05C1A] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition mt-1">
                    Claim This Territory →
                  </a>
                ) : (
                  <div className="w-full text-center bg-slate-200 text-slate-400 px-4 py-2.5 rounded-lg text-sm font-bold mt-1">
                    No Longer Available
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#0a1f44] to-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <p className="text-blue-300 text-sm uppercase tracking-widest font-semibold mb-2">Don&apos;t See Your ZIP?</p>
            <h3 className="text-2xl font-extrabold mb-3">We&apos;re expanding. Tell us where you operate.</h3>
            <p className="text-blue-200 max-w-xl mx-auto mb-6">
              Submit your trade and ZIP below — we&apos;ll confirm availability and reach out within one business day.
            </p>
            <a href="#get-started" className="inline-block bg-[#E05C1A] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Check My ZIP →
            </a>
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ─────────────────────────────────────────── */}
      <LeadCaptureForm/>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <InstinctRiseLogo size="sm"/>
          <p className="text-xs text-center">
            TerritoryIQ is the flagship product of InstinctRise — exclusive territory intelligence for contractors.
            <br/>© {new Date().getFullYear()} InstinctRise. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#get-started" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
