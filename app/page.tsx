'use client';
import React, { useState } from 'react';

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

function InstinctRiseLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const d = size === 'sm' ? 36 : size === 'lg' ? 60 : 44;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={d} height={d} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <rect x="60" y="42" width="10" height="22" fill="#1B3A6B" opacity="0.7"/>
        <rect x="72" y="50" width="8"  height="14" fill="#1B3A6B" opacity="0.5"/>
        <rect x="50" y="46" width="9"  height="18" fill="#1B3A6B" opacity="0.6"/>
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
  // 8 equal segments (45° each). 4 inbound orange tones left, 4 outbound blue tones right.
  // Segment midpoints for labels (every 45° starting at -112.5°)
  const cx = 160, cy = 160, outerR = 148, innerR = 68, gap = 2;
  const segments = [
    { label: 'SEO &\nContent',     color: '#E05C1A', side: 'inbound'  },
    { label: 'Google\nLSA',        color: '#CF5218', side: 'inbound'  },
    { label: 'Referral\nFunnels',  color: '#B84610', side: 'inbound'  },
    { label: 'Review\nMarketing',  color: '#A33B0C', side: 'inbound'  },
    { label: 'Direct\nMail',       color: '#1B3A6B', side: 'outbound' },
    { label: 'Cold\nOutreach',     color: '#163060', side: 'outbound' },
    { label: 'Door-to-\nDoor',     color: '#112655', side: 'outbound' },
    { label: 'Geofence\nAds',      color: '#0D1D44', side: 'outbound' },
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

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[320px] drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
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
            {lines.map((ln, li) => (
              <text
                key={li}
                x={lp.x}
                y={lp.y + (li - (lines.length - 1) / 2) * 11}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="white"
                transform={`rotate(${midDeg + 90}, ${lp.x}, ${lp.y})`}
              >
                {ln}
              </text>
            ))}
          </g>
        );
      })}

      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>

      {/* Center: mini logo */}
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
      <text x={cx} y={cy + 46} textAnchor="middle" fontSize="10" fontWeight="800" fill="#1B3A6B">TerritoryIQ</text>
      <text x={cx} y={cy + 58} textAnchor="middle" fontSize="7.5" fill="#94a3b8">1 Trade · 1 ZIP</text>

      {/* Divider line */}
      <line x1={cx} y1={cy - innerR + 4} x2={cx} y2={cy + innerR - 4} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3"/>

      {/* Side labels outside ring */}
      <text x={cx - outerR - 8} y={cy} textAnchor="middle" fontSize="8" fontWeight="800" fill="#E05C1A"
        transform={`rotate(-90, ${cx - outerR - 8}, ${cy})`}>INBOUND</text>
      <text x={cx + outerR + 8} y={cy} textAnchor="middle" fontSize="8" fontWeight="800" fill="#1B3A6B"
        transform={`rotate(90, ${cx + outerR + 8}, ${cy})`}>OUTBOUND</text>
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

function LeadCaptureForm({ initialZip = '', initialTrade = '' }: { initialZip?: string; initialTrade?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', trade: initialTrade, zip: initialZip, phone: '', email: '', message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Configure your form endpoint — sign up free at https://formspree.io
      // Replace YOUR_FORM_ID below with your actual Formspree form ID
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Show success regardless — configure endpoint to capture submissions
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
              'Predictive failure forecasts delivered to your CRM',
              'One job typically covers the full subscription cost',
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
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input
                      required name="name" value={form.name} onChange={handleChange}
                      placeholder="John Smith"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      placeholder="Smith Roofing LLC"
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
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email *</label>
                    <input
                      required name="email" value={form.email} onChange={handleChange} type="email"
                      placeholder="john@smithroofing.com"
                      className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
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
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered   = activeFilter === 'All' ? territories : territories.filter(t => t.trade === activeFilter);
  const available  = filtered.filter(t => t.status === 'Available');
  const claimed    = filtered.filter(t => t.status === 'Claimed');

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
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E05C1A]/20 border border-[#E05C1A]/40 text-orange-300 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"/>
            Flagship Product by InstinctRise
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Stop Fighting <span className="text-[#E05C1A]">3–5 Competitors</span>
            <br/>Own Your Market.
          </h1>
          <p className="text-xl text-blue-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            TerritoryIQ delivers <strong className="text-white">exclusive predictive intelligence</strong> for replacement work —
            one contractor, one trade, one ZIP. Know which homes are failing <em>before</em> your competitors even get the call.
          </p>
          <p className="text-base text-blue-300 mb-10 max-w-2xl mx-auto">
            Roofing. HVAC. Yours alone. No bidding wars. No shared leads. Just you dominating with data.
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

      {/* ── All Channels Diagram ────────────────────────────────────── */}
      <section id="channels" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <InstinctRiseLogo size="lg"/>
            </div>
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Full Marketing Integration</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">Every Channel You Already Run. Supercharged.</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-3">
              TerritoryIQ isn&apos;t a replacement for your marketing — it&apos;s the intelligence layer that makes <strong className="text-[#0a1f44]">every single channel you already use</strong> dramatically more effective.
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Google LSA, cold calls, direct mail, door-to-door, geofence ads, Facebook audiences, your CRM — TerritoryIQ plugs into all of them and tells you exactly which homes to target, so nothing you&apos;re already spending on goes to waste.
            </p>
          </div>

          {/* Three-column layout matching the reference diagram structure */}
          <div className="grid md:grid-cols-3 gap-6 items-center mb-14">

            {/* Left: Inbound */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#E05C1A] text-center md:text-right mb-2">
                Inbound Marketing
              </h3>
              {[
                { label: 'Approach',    text: 'When someone in your ZIP calls from an inbound ad or search, you instantly cross-reference their address against your territory list. You already know if their roof or HVAC is overdue — before the conversation even starts.' },
                { label: 'Focus',       text: 'Your predicted-failure list is ready the moment you subscribe. These are real addresses, scored right now — not leads to wait on. Use them to prioritize every inbound inquiry that comes through.' },
                { label: 'Channels',    text: 'Google LSA, organic SEO, review platforms, referral programs — when a call comes in, you have the homeowner\'s urgency score in hand, so you can close at full ticket instead of discounting to compete.' },
                { label: 'Metrics',     text: 'Track ticket size and close rate against the urgency score. Callers who match a high-urgency address on your list convert at significantly higher rates and require less convincing.' },
              ].map(item => (
                <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-right">
                  <div className="font-bold text-sm text-[#E05C1A] mb-1">{item.label}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>

            {/* Center wheel */}
            <div className="flex flex-col items-center gap-4">
              <MarketingWheel/>
              <div className="flex gap-5 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#E05C1A] inline-block"/><span className="text-[#E05C1A]">Inbound</span></span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#1B3A6B] inline-block"/><span className="text-[#1B3A6B]">Outbound</span></span>
              </div>
              <p className="text-center text-xs text-slate-500 max-w-[230px] leading-relaxed">
                TerritoryIQ powers all 8 channels — one exclusive ZIP, one trade, maximum ROI across every touchpoint.
              </p>
            </div>

            {/* Right: Outbound */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#1B3A6B] text-center md:text-left mb-2">
                Outbound Marketing
              </h3>
              {[
                { label: 'Approach',  text: 'Broad outreach powered by precision. TerritoryIQ pinpoints exactly which homes to target — 15-year-old roof in a saltwater zone, 11-year HVAC in peak FL heat — before the breakdown, not after.' },
                { label: 'Focus',     text: 'Push promotional content to high-urgency homes. Your predicted-failure list is ready to dial. Stop cold-calling blind — call warm with a reason.' },
                { label: 'Channels',  text: 'Cold calls, direct mail blitzes, door-to-door canvassing, geofence ads — all laser-focused on predicted-failure addresses inside your exclusive ZIP.' },
                { label: 'Metrics',   text: 'Resource-intensive but surgically targeted. Track response rates and close ratios with 20–30% better conversion when outbound is driven by predictive failure data.' },
              ].map(item => (
                <div key={item.label} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="font-bold text-sm text-[#1B3A6B] mb-1">{item.label}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Extended channel cards — additional use cases */}
          <div className="mb-6">
            <h3 className="text-center text-lg font-extrabold text-[#0a1f44] mb-6">
              More Ways to Use TerritoryIQ Intelligence
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: '📱',
                  label: 'Digital & Social Ads',
                  tag: 'Digital',
                  tagColor: 'bg-orange-100 text-[#E05C1A]',
                  bar: 'bg-[#E05C1A]',
                  boost: '20–30% better CVR',
                  desc: 'Build custom Facebook and Instagram audiences matched to predicted-failure home profiles. Serve ads to the exact homeowners in your ZIP who are statistically overdue.',
                },
                {
                  icon: '📍',
                  label: 'Geofence Advertising',
                  tag: 'Hyperlocal',
                  tagColor: 'bg-blue-100 text-[#1B3A6B]',
                  bar: 'bg-[#1B3A6B]',
                  boost: 'Saltwater hotspot zones',
                  desc: 'Geofence waterfront neighborhoods, older subdivisions, and post-storm corridors where corrosion and system age intersect — serve ads only to the homes that need you most.',
                },
                {
                  icon: '🗂️',
                  label: 'CRM & Pipeline Automation',
                  tag: 'Operations',
                  tagColor: 'bg-slate-100 text-slate-600',
                  bar: 'bg-slate-500',
                  boost: 'Zero manual sorting',
                  desc: 'Predicted-failure lists export directly into your CRM. Prospects auto-score by urgency so your reps always dial the highest-value homeowners first — no guesswork, no wasted calls.',
                },
                {
                  icon: '🌪️',
                  label: 'Storm / Insurance Canvassing',
                  tag: 'Event-Driven',
                  tagColor: 'bg-amber-100 text-amber-700',
                  bar: 'bg-amber-500',
                  boost: 'Post-event surge windows',
                  desc: 'When a storm hits your ZIP, TerritoryIQ instantly surfaces every home in your territory already scored as high-urgency — roof age, material type, prior storm exposure — and generates a sorted address list you can start knocking the same day. No guessing which streets to hit. You know exactly which houses need you most, ranked and ready to go.',
                },
                {
                  icon: '🏘️',
                  label: 'Neighborhood Clustering',
                  tag: 'Route Efficiency',
                  tagColor: 'bg-green-100 text-green-700',
                  bar: 'bg-green-600',
                  boost: '70% less windshield time',
                  desc: 'Because your territory is a single ZIP, all your predicted prospects are clustered. Run door-to-door routes with 5–10 high-urgency homes on the same block — not scattered across the county.',
                },
                {
                  icon: '🔁',
                  label: 'Preventive Maintenance Upsells',
                  tag: 'Recurring Revenue',
                  tagColor: 'bg-purple-100 text-purple-700',
                  bar: 'bg-purple-600',
                  boost: 'Lock in annual contracts',
                  desc: 'Flag homes 2–3 years before full replacement. Offer a maintenance agreement now — you become the trusted contractor already on-site when the replacement conversation opens.',
                },
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
            <p className="text-sm text-blue-300 uppercase tracking-widest font-semibold mb-2">The Full Loop</p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-bold">
              {['Predict Failure', '→', 'Identify Address', '→', 'Score Urgency', '→', 'Load into CRM', '→', 'Outreach or Inbound Qualifier', '→', 'Close at Full Ticket', '→', 'Upsell Maintenance'].map((s, i) => (
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
