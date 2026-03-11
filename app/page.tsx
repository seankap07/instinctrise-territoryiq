'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────
type Trade = 'hvac' | 'roofing';

// ── Data ──────────────────────────────────────────────────────────────────────
const ZIP_DATA: Record<Trade, {
  zip: string; label: string; total: number;
  entering: number; critical: number; high: number; medium: number;
}[]> = {
  hvac: [
    { zip: '34997', label: 'Highest HVAC Replacement Density', total: 14750, entering: 1662, critical: 161, high: 694, medium: 807 },
    { zip: '34990', label: 'Premium Coastal Territory',        total: 12058, entering: 1560, critical: 143, high: 658, medium: 759 },
    { zip: '33455', label: 'Strong Mid-Market Opportunity',    total: 8108,  entering: 1047, critical: 96,  high: 417, medium: 534 },
    { zip: '34957', label: 'Focused Install Territory',        total: 6229,  entering: 711,  critical: 67,  high: 298, medium: 346 },
  ],
  roofing: [
    { zip: '34990', label: 'Best Roofing Territory',           total: 12058, entering: 1871, critical: 897, high: 680, medium: 294 },
    { zip: '34997', label: 'High Replacement Concentration',   total: 14750, entering: 1595, critical: 841, high: 500, medium: 254 },
    { zip: '33455', label: 'Insurance Cycle Territory',        total: 8108,  entering: 879,  critical: 418, high: 301, medium: 160 },
    { zip: '34957', label: 'Dense Roofing Opportunity',        total: 6229,  entering: 857,  critical: 488, high: 266, medium: 103 },
  ],
};

const CHART_DATA = [
  { year: 2008, homes: 820  },
  { year: 2009, homes: 1040 },
  { year: 2010, homes: 1280 },
  { year: 2011, homes: 1140 },
  { year: 2012, homes: 930  },
];
const CHART_MAX = 1400;

const STATUS_CARDS = [
  { zip: '34997', trade: 'HVAC',    status: 'available' as const },
  { zip: '34990', trade: 'Roofing', status: 'reserved'  as const },
  { zip: '33455', trade: 'HVAC',    status: 'locked'    as const },
  { zip: '34957', trade: 'HVAC',    status: 'available' as const },
];

const ANALYTICS = [
  { val: '50,000+', label: 'Homes Analyzed'          },
  { val: '35,000+', label: 'Homes With Lifecycle Data'},
  { val: '20,000+', label: 'HVAC Systems Modeled'    },
  { val: '20,000+', label: 'Roofing Systems Modeled' },
  { val: '4',       label: 'Prime Territory Markets' },
];

// ── Logo ──────────────────────────────────────────────────────────────────────
function InstinctRiseLogo({ height = 44 }: { height?: number }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed,   setImgFailed]   = useState(false);
  if (!videoFailed) return (
    <video src="/logo.mp4" autoPlay loop muted playsInline
      style={{ height, width: 'auto', objectFit: 'contain', display: 'block' }}
      onError={() => setVideoFailed(true)}/>
  );
  if (!imgFailed) return (
    <img src="/logo.png" alt="InstinctRise" style={{ height, width: 'auto', display: 'block' }}
      onError={() => setImgFailed(true)}/>
  );
  const d = height;
  return (
    <div className="flex items-center gap-2">
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
        <rect x="35" y="44" width="14" height="50" rx="1" fill="#1B3A6B"/>
        <rect x="51" y="32" width="44" height="62" rx="2" fill="#163060"/>
        <rect x="60" y="60" width="8"  height="10" fill="#fff" opacity="0.5"/>
        <rect x="74" y="60" width="8"  height="10" fill="#fff" opacity="0.5"/>
        <rect x="67" y="74" width="8"  height="20" fill="#fff" opacity="0.7"/>
        <polygon points="48,52 74,38 100,52" fill="#1B3A6B"/>
      </svg>
      <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: d * 0.55, letterSpacing: 2, color: '#1B3A6B' }}>
        InstinctRise
      </span>
    </div>
  );
}

// ── Marketing Wheel ───────────────────────────────────────────────────────────
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
  const n = segments.length;
  const step = (2 * Math.PI) / n;
  const polarToCart = (r: number, angle: number) => ({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
  const segPath = (i: number) => {
    const a0 = step * i - Math.PI / 2 + gap / outerR;
    const a1 = step * (i + 1) - Math.PI / 2 - gap / outerR;
    const o0 = polarToCart(outerR, a0), o1 = polarToCart(outerR, a1);
    const i0 = polarToCart(innerR, a0), i1 = polarToCart(innerR, a1);
    return `M${i0.x},${i0.y} L${o0.x},${o0.y} A${outerR},${outerR} 0 0,1 ${o1.x},${o1.y} L${i1.x},${i1.y} A${innerR},${innerR} 0 0,0 ${i0.x},${i0.y}Z`;
  };
  const Icon = ({ type, x, y }: { type: string; x: number; y: number }) => {
    const s = 11;
    if (type === 'person')    return <ellipse cx={x} cy={y} rx={s*.4} ry={s*.55} fill="none" stroke="#fff" strokeWidth="1.6"/>;
    if (type === 'crosshair') return (<g><circle cx={x} cy={y} r={s*.55} fill="none" stroke="#fff" strokeWidth="1.6"/><line x1={x-s*.55} y1={y} x2={x+s*.55} y2={y} stroke="#fff" strokeWidth="1.6"/><line x1={x} y1={y-s*.55} x2={x} y2={y+s*.55} stroke="#fff" strokeWidth="1.6"/></g>);
    if (type === 'signal')    return (<g><rect x={x-s*.55} y={y-s*.1} width={s*.3} height={s*.55} rx="1" fill="#fff"/><rect x={x-s*.15} y={y-s*.4} width={s*.3} height={s*.85} rx="1" fill="#fff"/><rect x={x+s*.25} y={y-s*.7} width={s*.3} height={s*1.15} rx="1" fill="#fff"/></g>);
    return (<g><polyline points={`${x-s*.5},${y+s*.3} ${x-s*.15},${y-s*.3} ${x+s*.15},${y+s*.1} ${x+s*.5},${y-s*.5}`} fill="none" stroke="#fff" strokeWidth="1.6"/></g>);
  };
  return (
    <svg width={280} height={280} viewBox="0 0 320 320" className="w-full max-w-xs mx-auto">
      {segments.map((seg, i) => {
        const mid = step * i + step / 2 - Math.PI / 2;
        const midR = (outerR + innerR) / 2;
        const ix = cx + midR * Math.cos(mid), iy = cy + midR * Math.sin(mid);
        const lx = cx + (outerR + 18) * Math.cos(mid), ly = cy + (outerR + 18) * Math.sin(mid);
        const lines = seg.label.split('\n');
        return (
          <g key={i}>
            <path d={segPath(i)} fill={seg.color}/>
            <Icon type={seg.icon} x={ix} y={iy}/>
            <text x={lx} y={ly - (lines.length - 1) * 6} textAnchor="middle" fontSize="7.5" fill="#374151" fontFamily="DM Sans,sans-serif" fontWeight="500">
              {lines.map((l, j) => <tspan key={j} x={lx} dy={j === 0 ? 0 : 13}>{l}</tspan>)}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR - 4} fill="#fff"/>
      <circle cx={cx} cy={cy} r={innerR - 12} fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
      <line x1={cx} y1={cy - innerR + 4} x2={cx} y2={cy + innerR - 4} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3"/>
      <text x={cx} y={cy - 8}  textAnchor="middle" fontSize="8"   fill="#1B3A6B" fontFamily="DM Sans,sans-serif" fontWeight="700">TerritoryIQ</text>
      <text x={cx} y={cy + 4}  textAnchor="middle" fontSize="6.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Intelligence</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="6.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Engine</text>
    </svg>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_META = {
  available: { label: 'Available', dot: 'bg-green-500',   badge: 'bg-green-50 text-green-700 border-green-200',  border: 'border-green-200' },
  reserved:  { label: 'Reserved',  dot: 'bg-[#E05C1A]',   badge: 'bg-orange-50 text-[#E05C1A] border-orange-200', border: 'border-orange-200' },
  locked:    { label: 'Locked',    dot: 'bg-slate-400',   badge: 'bg-slate-50 text-slate-500 border-slate-200',  border: 'border-slate-200'  },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTrade,   setActiveTrade]   = useState<Trade>('hvac');
  const [mapTrade,      setMapTrade]      = useState<Trade>('hvac');
  const [activeChannel, setActiveChannel] = useState<'inbound' | 'outbound'>('inbound');
  const [formData, setFormData] = useState({
    businessName: '', contactName: '', phone: '', email: '',
    trade: '', zip: '', bestTime: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!formData.businessName || !formData.phone || !formData.trade || !formData.zip) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, message: formData.notes }),
      });
    } catch { /* show success anyway */ }
    setLoading(false);
    setSubmitted(true);
  };

  const field = (key: keyof typeof formData) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData(p => ({ ...p, [key]: e.target.value })),
  });

  // Chart math
  const cW = 560, cH = 180, pL = 48, pB = 32, pT = 8, pR = 16;
  const iW = cW - pL - pR, iH = cH - pB - pT;
  const bW = (iW / CHART_DATA.length) * 0.5;
  const bGap = iW / CHART_DATA.length;

  const inbound = [
    { name: 'Homeowner Targeting',    desc: 'Direct mail and digital targeting to owners of aging systems.' },
    { name: 'Replacement-Cycle Ads',  desc: 'Geo-targeted campaigns timed to lifecycle windows.' },
    { name: 'Community Presence',     desc: 'Neighborhood brand positioning in high-density zones.' },
    { name: 'Referral Networks',      desc: 'Structured referral capture within exclusive territories.' },
  ];
  const outbound = [
    { name: 'Proactive Outreach',     desc: 'Direct contact with homeowners approaching replacement age.' },
    { name: 'Routing Clusters',       desc: 'Rapid deployment into territories with the highest install density.' },
    { name: 'Territory ROI',          desc: 'Track installs, close rate, and revenue per ZIP quarter over quarter.' },
    { name: 'B2B Ecosystem',          desc: 'Alignment with local property managers and real estate networks.' },
  ];

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 border-b border-slate-200 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <InstinctRiseLogo height={40}/>
          <div className="hidden md:flex items-center gap-8">
            {['#opportunities','#map','#how-it-works','#comparison'].map((href, i) => (
              <a key={href} href={href} className="text-sm font-medium text-slate-500 hover:text-[#1B3A6B] transition-colors">
                {['ZIP Opportunities','Territory Map','How It Works','Why TerritoryIQ'][i]}
              </a>
            ))}
          </div>
          <a href="#get-started"
            className="btn-clip bg-[#E05C1A] text-white font-bold text-sm px-5 py-2.5 whitespace-nowrap hover:bg-[#c44c12] transition-colors">
            Claim Territory
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-gradient-to-br from-white via-[#f0f4fb] to-[#e8edf8] overflow-hidden">
        {/* grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(27,58,107,0.04) 39px,rgba(27,58,107,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(27,58,107,0.04) 39px,rgba(27,58,107,0.04) 40px)' }}/>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* badge */}
          <div className="inline-flex items-center gap-2 font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] border border-[#E05C1A]/30 bg-[#E05C1A]/5 px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05C1A] animate-pulse"/>
            Live Territory Intelligence — Treasure Coast, FL
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="headline-bebas text-5xl md:text-7xl text-[#1B3A6B] leading-none mb-6">
                Stop Fighting<br/>Shared Leads.<br/><span className="text-[#E05C1A]">Own the Territory</span><br/>Instead.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 max-w-xl">
                TerritoryIQ identifies the homes in your market already entering HVAC and roof
                replacement cycles — before competitors start bidding.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Exclusive by trade, exclusive by ZIP',
                  'Full-ticket replacement opportunities',
                  'Lifecycle infrastructure intelligence',
                ].map(b => (
                  <li key={b} className="flex items-start gap-3 text-slate-700 text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E05C1A] mt-2 flex-shrink-0"/>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a href="#opportunities"
                  className="btn-clip bg-[#E05C1A] text-white font-bold text-base px-7 py-3.5 hover:bg-[#c44c12] transition-colors inline-flex items-center gap-2">
                  View Live ZIP Opportunities →
                </a>
                <a href="#how-it-works"
                  className="inline-flex items-center gap-2 border-2 border-[#1B3A6B] text-[#1B3A6B] font-semibold text-base px-7 py-3 hover:bg-[#1B3A6B] hover:text-white transition-colors">
                  How TerritoryIQ Works
                </a>
              </div>
            </div>

            {/* Hero stat block */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '$204M', label: 'Total Addressable Revenue', sub: 'across roofing + HVAC' },
                { val: '1',     label: 'Contractor Per Trade', sub: 'per ZIP, no exceptions' },
                { val: '4',     label: 'Active ZIPs',          sub: 'high-density territories' },
                { val: '5,900+',label: 'Replacement-Ready',   sub: 'homes entering cycle now' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-5">
                  <div className="headline-bebas text-4xl md:text-5xl text-[#1B3A6B]">{s.val}</div>
                  <div className="font-semibold text-sm text-slate-800 mt-1">{s.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — LIVE TERRITORY STATUS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#1B3A6B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-2">Real-Time Availability</div>
              <h2 className="headline-bebas text-3xl md:text-5xl text-white">Live Territory Status</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
              Updated continuously
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUS_CARDS.map(card => {
              const meta = STATUS_META[card.status];
              return (
                <div key={`${card.zip}-${card.trade}`}
                  className={`bg-white/5 border rounded-2xl p-5 ${meta.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="font-mono-label text-2xl font-bold text-white">{card.zip}</div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`}/>
                      {meta.label}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white/80">{card.trade}</div>
                  <div className="text-xs text-white/40 mt-1">
                    {card.status === 'available' ? 'Open for registration' : card.status === 'reserved' ? 'Pending confirmation' : 'Territory secured'}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-white/40 text-center">
            Once a ZIP is claimed for a trade, it is permanently removed from availability.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — ANALYTICS STRIP
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {ANALYTICS.map(a => (
              <div key={a.label} className="text-center">
                <div className="headline-bebas text-4xl md:text-5xl text-[#1B3A6B]">{a.val}</div>
                <div className="text-xs font-medium text-slate-500 mt-1 leading-snug">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — PRODUCT CONSOLE PREVIEW
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Platform Preview</div>
            <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B]">Inside the TerritoryIQ Intelligence Console</h2>
            <p className="text-base md:text-lg text-slate-500 mt-4 max-w-xl mx-auto">
              Built for contractors, not data scientists. Every number tells you where to focus next.
            </p>
          </div>

          {/* Mock console */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
            {/* Console header */}
            <div className="bg-[#0f1a2e] px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"/><div className="w-3 h-3 rounded-full bg-yellow-500/80"/><div className="w-3 h-3 rounded-full bg-green-500/80"/></div>
              <span className="font-mono-label text-xs text-white/50 ml-2">TerritoryIQ Intelligence Console — ZIP 34997</span>
            </div>

            {/* Search bar */}
            <div className="bg-[#111c30] px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 max-w-sm">
                <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span className="font-mono-label text-sm text-white/30">Search address or ZIP…</span>
              </div>
            </div>

            {/* Console body */}
            <div className="bg-[#141f33] p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Property panel */}
              <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="font-mono-label text-[10px] tracking-widest uppercase text-[#E05C1A] mb-3">Property Analysis</div>
                <div className="space-y-2.5">
                  {[
                    { key: 'HVAC Age',            val: '14.8 years', color: 'text-yellow-400' },
                    { key: 'Roof Age',             val: '18.9 years', color: 'text-red-400'    },
                    { key: 'Replacement Status',   val: 'HIGH',       color: 'text-red-400'    },
                    { key: 'Cluster',              val: '144',        color: 'text-white'      },
                    { key: 'ZIP',                  val: '34997',      color: 'text-white'      },
                  ].map(r => (
                    <div key={r.key} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">{r.key}</span>
                      <span className={`font-mono-label text-sm font-bold ${r.color}`}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunity panel */}
              <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="font-mono-label text-[10px] tracking-widest uppercase text-green-400 mb-3">Nearby Opportunity</div>
                <div className="mb-4">
                  <div className="headline-bebas text-5xl text-white">17</div>
                  <div className="text-xs text-white/40 mt-0.5">homes entering replacement nearby</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-xs font-semibold text-red-400">Critical</span>
                    <span className="font-mono-label font-bold text-red-400">5</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-xs font-semibold text-yellow-400">High</span>
                    <span className="font-mono-label font-bold text-yellow-400">8</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-xs font-semibold text-white/50">Medium</span>
                    <span className="font-mono-label font-bold text-white/70">4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Console footer */}
            <div className="bg-[#0f1a2e] px-5 py-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              <span className="font-mono-label text-[10px] text-white/30">Live infrastructure lifecycle intelligence — updated continuously</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — TOP ZIP OPPORTUNITIES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="opportunities" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Live Territory Intelligence</div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B]">Top ZIP Opportunities</h2>
            {/* Toggle */}
            <div className="flex border-2 border-[#1B3A6B] overflow-hidden self-start sm:self-auto flex-shrink-0">
              <button
                onClick={() => setActiveTrade('hvac')}
                className={`px-6 py-2 font-bold text-sm transition-colors ${activeTrade === 'hvac' ? 'bg-[#1B3A6B] text-white' : 'bg-white text-slate-500 hover:text-[#1B3A6B]'}`}>
                HVAC
              </button>
              <button
                onClick={() => setActiveTrade('roofing')}
                className={`px-6 py-2 font-bold text-sm transition-colors ${activeTrade === 'roofing' ? 'bg-[#E05C1A] text-white' : 'bg-white text-slate-500 hover:text-[#E05C1A]'}`}>
                Roofing
              </button>
            </div>
          </div>
          <p className="text-base text-slate-500 mb-10 max-w-2xl">
            Replacement density rankings by ZIP based on housing infrastructure lifecycle analysis.
            Territories are scored by the concentration of homes actively entering replacement windows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {ZIP_DATA[activeTrade].map((z, i) => {
              const accent = activeTrade === 'hvac' ? '#1B3A6B' : '#E05C1A';
              const isTop  = i === 0;
              return (
                <div key={z.zip}
                  className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden card-hover flex flex-col">
                  {/* Top accent bar */}
                  <div className="h-1" style={{ background: accent }}/>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-mono-label text-2xl font-bold text-[#1B3A6B]">{z.zip}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{z.label}</div>
                      </div>
                      <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${isTop ? 'text-white' : 'text-slate-400 bg-slate-100'}`}
                        style={isTop ? { background: accent } : {}}>
                        #{i + 1}
                      </div>
                    </div>

                    {/* Big number */}
                    <div className="mb-4">
                      <div className="headline-bebas text-5xl" style={{ color: accent }}>{z.entering.toLocaleString()}</div>
                      <div className="font-mono-label text-[10px] tracking-widest uppercase text-slate-400 mt-0.5">Entering Replacement Cycle</div>
                    </div>

                    {/* Stats */}
                    <div className="mt-auto space-y-2 pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Homes</span>
                        <span className="font-mono-label font-semibold">{z.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-500 font-medium">Critical</span>
                        <span className="font-mono-label font-bold text-red-500">{z.critical.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-500 font-medium">High</span>
                        <span className="font-mono-label font-bold text-amber-500">{z.high.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Medium</span>
                        <span className="font-mono-label font-semibold text-slate-600">{z.medium.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — REPLACEMENT CYCLE MODEL
      ════════════════════════════════════════════════════════════════════ */}
      <section id="cycle" className="py-16 md:py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Infrastructure Lifecycle Modeling</div>
              <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-6">Replacement Cycles Are Predictable</h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
                Every home follows an infrastructure lifecycle. TerritoryIQ models installation history
                and housing infrastructure data to identify where replacement demand is forming — before
                it becomes emergency demand.
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                Contractors using TerritoryIQ focus on neighborhoods where those cycles are already
                active, not where emergencies happen to strike.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-6">
              <div className="font-mono-label text-[10px] tracking-widest uppercase text-slate-400 mb-5">
                Homes Approaching Replacement Cycle — Install Cohort Analysis
              </div>
              <div className="w-full overflow-hidden">
                <svg viewBox={`0 0 ${cW} ${cH}`} className="w-full" aria-label="Bar chart showing homes approaching replacement cycle">
                  {[0, 0.25, 0.5, 0.75, 1].map(t => {
                    const y = pT + iH - t * iH;
                    return (
                      <g key={t}>
                        <line x1={pL} y1={y} x2={pL + iW} y2={y} stroke="#f1f5f9" strokeWidth="1"/>
                        <text x={pL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="DM Mono,monospace">
                          {Math.round(t * CHART_MAX)}
                        </text>
                      </g>
                    );
                  })}
                  {CHART_DATA.map((d, i) => {
                    const barH = (d.homes / CHART_MAX) * iH;
                    const x = pL + i * bGap + bGap * 0.25;
                    const y = pT + iH - barH;
                    const isMax = d.homes === Math.max(...CHART_DATA.map(c => c.homes));
                    return (
                      <g key={d.year}>
                        <rect x={x} y={y} width={bW} height={barH}
                          fill={isMax ? '#E05C1A' : '#1B3A6B'}
                          opacity={isMax ? 1 : 0.55}
                          rx="2"/>
                        <text x={x + bW / 2} y={pT + iH + 20} textAnchor="middle"
                          fontSize="10" fill="#94a3b8" fontFamily="DM Mono,monospace">{d.year}</text>
                        <text x={x + bW / 2} y={y - 5} textAnchor="middle"
                          fontSize="10" fontWeight={isMax ? '700' : '400'}
                          fill={isMax ? '#E05C1A' : '#94a3b8'} fontFamily="DM Mono,monospace">{d.homes.toLocaleString()}</text>
                      </g>
                    );
                  })}
                  <line x1={pL} y1={pT + iH} x2={pL + iW} y2={pT + iH} stroke="#e2e8f0" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="mt-5 bg-[#1B3A6B] rounded-xl p-4 flex items-center gap-3">
                <span className="text-white text-lg flex-shrink-0">→</span>
                <p className="text-white text-sm font-medium leading-snug">
                  Homes installed during these years are now entering their replacement cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7 — REPLACEMENT DENSITY MAP
      ════════════════════════════════════════════════════════════════════ */}
      <section id="map" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Spatial Intelligence</div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6">
            <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B]">See Where Replacement Demand Is Concentrated</h2>
            <div className="flex border-2 border-[#1B3A6B] overflow-hidden self-start flex-shrink-0">
              <button onClick={() => setMapTrade('hvac')}
                className={`px-5 py-2 font-bold text-sm transition-colors ${mapTrade === 'hvac' ? 'bg-[#1B3A6B] text-white' : 'bg-white text-slate-500'}`}>
                HVAC
              </button>
              <button onClick={() => setMapTrade('roofing')}
                className={`px-5 py-2 font-bold text-sm transition-colors ${mapTrade === 'roofing' ? 'bg-[#E05C1A] text-white' : 'bg-white text-slate-500'}`}>
                Roofing
              </button>
            </div>
          </div>

          <div className="h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <MapComponent trade={mapTrade}/>
          </div>

          <div className="mt-5 flex flex-wrap gap-6 items-center">
            <p className="text-sm text-slate-400 leading-relaxed flex-1 min-w-[240px]">
              Darker areas represent higher concentrations of homes entering replacement cycles.
              Hover over any ZIP to view full replacement data.
            </p>
            <div className="flex gap-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-4 h-4 rounded" style={{ background: mapTrade === 'hvac' ? '#1B3A6B' : '#E05C1A' }}/>
                Highest Density
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-4 h-4 rounded" style={{ background: mapTrade === 'hvac' ? '#7b9cbf' : '#f0a882' }}/>
                Moderate Density
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8 — REPLACEMENT STATUS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Data Interpretation</div>
          <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-4">Understanding Replacement Status</h2>
          <p className="text-base text-slate-500 mb-10 max-w-xl">
            TerritoryIQ classifies homes using installation history modeling and housing infrastructure
            lifecycle analysis to assign replacement urgency scores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Critical',              color: '#dc2626', body: 'Homes highly likely to require system replacement now. These properties are beyond typical lifecycle benchmarks and represent immediate install opportunities.' },
              { title: 'High',                  color: '#d97706', body: 'Homes currently inside the expected replacement window based on installation history modeling. Active outreach converts these to full-ticket installs.' },
              { title: 'Medium',                color: '#64748b', body: 'Homes approaching replacement age identified through housing infrastructure lifecycle analysis. Ideal for proactive pipeline development.' },
              { title: 'Entering Replacement',  color: '#E05C1A', body: 'The total count of homes in the ZIP currently entering the replacement cycle across all urgency tiers — worth active sales outreach today.' },
            ].map(m => (
              <div key={m.title} className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1" style={{ background: m.color }}/>
                <div className="headline-bebas text-2xl mt-1 mb-3" style={{ color: m.color }}>{m.title}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9 — HOW CONTRACTORS USE TERRITORYIQ
      ════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Operational Workflow</div>
          <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-10">How Contractors Use TerritoryIQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', step: 'Step 1', title: 'Predict',  body: 'Identify homes entering HVAC or roof replacement cycles using replacement-cycle modeling and housing infrastructure lifecycle analysis.' },
              { num: '02', step: 'Step 2', title: 'Outreach', body: 'Focus sales activity in neighborhoods where replacement windows are active — not where competitors happen to be running ads today.' },
              { num: '03', step: 'Step 3', title: 'Close',    body: 'Convert full-ticket replacement installs before competitors appear. Exclusive territory control means no shared bids, no price wars.' },
            ].map(s => (
              <div key={s.num} className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-7 relative overflow-hidden">
                <div className="absolute top-3 right-4 headline-bebas text-7xl text-slate-100 leading-none select-none">{s.num}</div>
                <div className="font-mono-label text-[10px] tracking-widest uppercase text-[#E05C1A] mb-2">{s.step}</div>
                <div className="headline-bebas text-3xl text-[#1B3A6B] mb-3">{s.title}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10 — COMPETITIVE POSITION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="comparison" className="py-16 md:py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Competitive Position</div>
          <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-10">
            Shared Lead Platforms Sell Panic.<br/>TerritoryIQ Sells Timing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bad */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-7">
              <div className="headline-bebas text-2xl text-slate-400 mb-6 pb-4 border-b border-slate-100">Shared Lead Platforms</div>
              {[
                '3–5 contractors competing on the same lead',
                'Immediate price race to the bottom',
                'Emergency-only, reactive mindset',
                'No ZIP exclusivity — anyone can bid',
                'Pay per lead, lose on margin',
              ].map(t => (
                <div key={t} className="flex items-start gap-3 mb-4 text-slate-500 text-sm">
                  <span className="text-slate-300 mt-0.5 flex-shrink-0 text-base">✕</span>
                  {t}
                </div>
              ))}
            </div>
            {/* Good */}
            <div className="bg-[#1B3A6B] rounded-2xl shadow-[0_10px_30px_rgba(27,58,107,0.3)] p-7">
              <div className="headline-bebas text-2xl text-white mb-6 pb-4 border-b border-white/20">TerritoryIQ</div>
              {[
                'Exclusive ZIP control — one contractor per trade',
                'Replacement-cycle intelligence, not emergency chasing',
                'Full-ticket install positioning before demand peaks',
                'Predictive outreach, not reactive bidding',
                'Own the territory, own the margin',
              ].map(t => (
                <div key={t} className="flex items-start gap-3 mb-4 text-white/90 text-sm">
                  <span className="text-[#F5A623] mt-0.5 flex-shrink-0 text-base">✓</span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 11 — FULL CHANNEL ADVANTAGE
      ════════════════════════════════════════════════════════════════════ */}
      <section id="channels" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Intelligence Engine</div>
          <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-4">The Full-Channel Advantage</h2>
          <p className="text-base text-slate-500 mb-10 max-w-xl">
            TerritoryIQ integrates inbound demand generation with outbound precision targeting — a
            complete intelligence engine for replacement-cycle contractors.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Channel tabs */}
              <div className="flex border-2 border-slate-200 overflow-hidden mb-7 w-fit">
                {(['inbound', 'outbound'] as const).map(t => (
                  <button key={t} onClick={() => setActiveChannel(t)}
                    className={`px-7 py-2.5 font-semibold text-sm capitalize transition-colors ${activeChannel === t ? 'bg-[#1B3A6B] text-white' : 'text-slate-400 hover:text-[#1B3A6B]'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="space-y-0">
                {(activeChannel === 'inbound' ? inbound : outbound).map(c => (
                  <div key={c.name} className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: activeChannel === 'inbound' ? '#E05C1A' : '#1B3A6B' }}/>
                    <div>
                      <div className="font-semibold text-sm mb-1" style={{ color: activeChannel === 'inbound' ? '#E05C1A' : '#1B3A6B' }}>{c.name}</div>
                      <div className="text-sm text-slate-500">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="font-mono-label text-[10px] tracking-widest uppercase text-slate-400">Intelligence Wheel</div>
              <MarketingWheel/>
              <div className="flex gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#E05C1A]"/>Inbound</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#1B3A6B]"/>Outbound</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 12 — TOTAL ADDRESSABLE REVENUE
      ════════════════════════════════════════════════════════════════════ */}
      <section id="tam" className="py-16 md:py-24 bg-[#f6f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Market Size</div>
          <h2 className="headline-bebas text-3xl md:text-5xl text-[#1B3A6B] mb-4">Total Addressable Revenue</h2>
          <p className="text-base text-slate-500 mb-10 max-w-xl">
            Exclusive territory control across these two trades represents over $200M in annual
            addressable revenue — captured by one contractor per ZIP.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { trade: 'Roofing',  val: '$120M', color: '#E05C1A', label: 'Annual Addressable Revenue' },
              { trade: 'HVAC',     val: '$84M',  color: '#1B3A6B', label: 'Annual Addressable Revenue' },
              { trade: 'Combined', val: '$204M', color: '#0f1a2e', label: 'Total Combined TAM',         dark: true },
            ].map(t => (
              <div key={t.trade}
                className={`rounded-2xl border shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-8 text-center ${t.dark ? 'bg-[#1B3A6B] border-[#1B3A6B]' : 'bg-white border-slate-200'}`}>
                <div className={`font-mono-label text-xs tracking-widest uppercase mb-4 ${t.dark ? 'text-white/50' : 'text-slate-400'}`}>{t.trade}</div>
                <div className="headline-bebas text-6xl md:text-7xl" style={{ color: t.dark ? '#F5A623' : t.color }}>{t.val}</div>
                <div className={`text-xs mt-3 ${t.dark ? 'text-white/40' : 'text-slate-400'}`}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 13 — CLAIM TERRITORY FORM
      ════════════════════════════════════════════════════════════════════ */}
      <section id="get-started" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <div className="font-mono-label text-[11px] tracking-widest uppercase text-[#E05C1A] mb-3">Claim Your Territory</div>
              <h2 className="headline-bebas text-4xl md:text-6xl text-[#1B3A6B] leading-none mb-6">
                One Contractor.<br/>One Trade.<br/>One ZIP.
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                TerritoryIQ is not a shared lead platform. It&apos;s exclusive intelligence access.
                Once a ZIP is claimed, it&apos;s off the market for that trade — permanently.
              </p>
              <div className="space-y-5">
                {[
                  { label: 'Exclusive Access',   val: 'One contractor per trade per ZIP, no exceptions' },
                  { label: 'Full Pipeline',       val: 'Replacement cycle homes only — no service call noise' },
                  { label: 'Live Intelligence',   val: 'Ongoing lifecycle analysis and territory updates' },
                ].map(i => (
                  <div key={i.label} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#E05C1A] mt-1.5 flex-shrink-0"/>
                    <div>
                      <div className="font-bold text-sm text-[#1B3A6B]">{i.label}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{i.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.10)] p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div className="headline-bebas text-3xl text-[#1B3A6B] mb-3">Request Received</div>
                  <p className="text-slate-500 text-sm">We&apos;ll review your territory request and reach out within one business day.</p>
                </div>
              ) : (
                <>
                  <div className="headline-bebas text-2xl text-[#1B3A6B] mb-6">Request Territory Access</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Business Name *', key: 'businessName' as const, type: 'text',  ph: 'Your Company',    span: false },
                      { label: 'Contact Name',    key: 'contactName'  as const, type: 'text',  ph: 'Your Name',       span: false },
                      { label: 'Phone *',         key: 'phone'        as const, type: 'tel',   ph: '(555) 000-0000',  span: false },
                      { label: 'Email',           key: 'email'        as const, type: 'email', ph: 'you@company.com', span: false },
                      { label: 'Target ZIP(s) *', key: 'zip'          as const, type: 'text',  ph: '34997, 34990…',   span: false },
                      { label: 'Best Time',       key: 'bestTime'     as const, type: 'text',  ph: 'Weekdays 9–12',   span: false },
                    ].map(f => (
                      <div key={f.key} className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">{f.label}</label>
                        <input type={f.type} placeholder={f.ph} {...field(f.key)}
                          className="border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#E05C1A] focus:ring-1 focus:ring-[#E05C1A]/20 transition-all bg-white w-full"/>
                      </div>
                    ))}
                    {/* Trade select — full width */}
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Trade *</label>
                      <select {...field('trade')}
                        className="border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#E05C1A] focus:ring-1 focus:ring-[#E05C1A]/20 transition-all bg-white w-full">
                        <option value="">Select Trade</option>
                        <option value="roofing">Roofing</option>
                        <option value="hvac">HVAC</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    {/* Notes — full width */}
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Notes</label>
                      <textarea rows={3} placeholder="Anything we should know…" {...field('notes')}
                        className="border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#E05C1A] focus:ring-1 focus:ring-[#E05C1A]/20 transition-all resize-none bg-white w-full"/>
                    </div>
                  </div>
                  <button onClick={handleSubmit} disabled={loading}
                    className="mt-6 w-full btn-clip bg-[#E05C1A] text-white font-bold text-base py-4 hover:bg-[#c44c12] transition-colors disabled:opacity-60">
                    {loading ? 'Sending…' : 'Claim My Territory →'}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">No spam. Dedicated onboarding call within 24 hours.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0f1a2e] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <InstinctRiseLogo height={34}/>
            <p className="text-xs text-white/30 text-center">
              © {new Date().getFullYear()} InstinctRise · TerritoryIQ · All rights reserved
            </p>
            <div className="flex gap-6">
              {[['ZIP Opportunities','#opportunities'],['Territory Map','#map'],['Claim Territory','#get-started']].map(([label,href]) => (
                <a key={href} href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
