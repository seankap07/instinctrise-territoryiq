'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────
type Trade = 'hvac' | 'roofing';

// ─── Data ─────────────────────────────────────────────────────────────────────
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

// ─── Logo ─────────────────────────────────────────────────────────────────────
function InstinctRiseLogo({ height = 44 }: { height?: number }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed,   setImgFailed]   = useState(false);

  if (!videoFailed) return (
    <video src="/logo.mp4" autoPlay loop muted playsInline
      style={{ height, width: 'auto', objectFit: 'contain', display: 'block' }}
      onError={() => setVideoFailed(true)}/>
  );
  if (!imgFailed) return (
    <img src="/logo.png" alt="InstinctRise"
      style={{ height, width: 'auto', display: 'block' }}
      onError={() => setImgFailed(true)}/>
  );

  const d = height;
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
        <rect x="35" y="44" width="14" height="50" rx="1" fill="#1B3A6B"/>
        <rect x="51" y="32" width="44" height="62" rx="2" fill="#163060"/>
        <rect x="60" y="60" width="8" height="10" fill="#fff" opacity="0.5"/>
        <rect x="74" y="60" width="8" height="10" fill="#fff" opacity="0.5"/>
        <rect x="67" y="74" width="8" height="20" fill="#fff" opacity="0.7"/>
        <polygon points="48,52 74,38 100,52" fill="#1B3A6B"/>
      </svg>
      <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: height * 0.55, letterSpacing: 2, color: '#1B3A6B' }}>
        InstinctRise
      </span>
    </div>
  );
}

// ─── Marketing Wheel ─────────────────────────────────────────────────────────
function MarketingWheel() {
  const cx = 160, cy = 160, outerR = 148, innerR = 68, gap = 3;
  const segments = [
    { label: 'Proactive\nOutreach',  color: '#1B3A6B', icon: 'person'    },
    { label: 'Storm &\nRouting',     color: '#163060', icon: 'crosshair'  },
    { label: 'Outbound\nChannels',   color: '#112655', icon: 'signal'     },
    { label: 'Exclusive\nROI',       color: '#0D1D44', icon: 'chart'      },
    { label: 'Full-Ticket\nValue',   color: '#A33B0C', icon: 'chart'      },
    { label: 'Inbound\nChannels',    color: '#B84610', icon: 'signal'     },
    { label: 'Replacement\nFocus',   color: '#CF5218', icon: 'crosshair'  },
    { label: 'Predictive\nData',     color: '#E05C1A', icon: 'person'     },
  ];
  const n = segments.length;
  const step = (2 * Math.PI) / n;

  const polarToCart = (r: number, angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  const segPath = (i: number) => {
    const a0 = step * i - Math.PI / 2 + gap / outerR;
    const a1 = step * (i + 1) - Math.PI / 2 - gap / outerR;
    const o0 = polarToCart(outerR, a0), o1 = polarToCart(outerR, a1);
    const i0 = polarToCart(innerR, a0), i1 = polarToCart(innerR, a1);
    return `M${i0.x},${i0.y} L${o0.x},${o0.y} A${outerR},${outerR} 0 0,1 ${o1.x},${o1.y} L${i1.x},${i1.y} A${innerR},${innerR} 0 0,0 ${i0.x},${i0.y}Z`;
  };

  const SegIcon = ({ type, x, y }: { type: string; x: number; y: number }) => {
    const s = 11;
    if (type === 'person')    return <ellipse cx={x} cy={y} rx={s * 0.4} ry={s * 0.55} fill="none" stroke="#fff" strokeWidth="1.6"/>;
    if (type === 'crosshair') return (<g><circle cx={x} cy={y} r={s * 0.55} fill="none" stroke="#fff" strokeWidth="1.6"/><line x1={x - s * 0.55} y1={y} x2={x + s * 0.55} y2={y} stroke="#fff" strokeWidth="1.6"/><line x1={x} y1={y - s * 0.55} x2={x} y2={y + s * 0.55} stroke="#fff" strokeWidth="1.6"/></g>);
    if (type === 'signal')    return (<g><rect x={x-s*.55} y={y-s*.1} width={s*.3} height={s*.55} rx="1" fill="#fff"/><rect x={x-s*.15} y={y-s*.4} width={s*.3} height={s*.85} rx="1" fill="#fff"/><rect x={x+s*.25} y={y-s*.7} width={s*.3} height={s*1.15} rx="1" fill="#fff"/></g>);
    return (<g><polyline points={`${x-s*.5},${y+s*.3} ${x-s*.15},${y-s*.3} ${x+s*.15},${y+s*.1} ${x+s*.5},${y-s*.5}`} fill="none" stroke="#fff" strokeWidth="1.6"/></g>);
  };

  return (
    <svg width={320} height={320} viewBox="0 0 320 320" style={{ maxWidth: '100%' }}>
      {segments.map((seg, i) => {
        const midAngle = step * i + step / 2 - Math.PI / 2;
        const midR = (outerR + innerR) / 2;
        const iconX = cx + midR * Math.cos(midAngle);
        const iconY = cy + midR * Math.sin(midAngle);
        const labelR = outerR + 18;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);
        const lines = seg.label.split('\n');
        return (
          <g key={i}>
            <path d={segPath(i)} fill={seg.color}/>
            <SegIcon type={seg.icon} x={iconX} y={iconY}/>
            <text x={lx} y={ly - (lines.length - 1) * 6} textAnchor="middle" fontSize="7.5" fill="#374151" fontFamily="DM Sans,sans-serif" fontWeight="500">
              {lines.map((l, j) => <tspan key={j} x={lx} dy={j === 0 ? 0 : 13}>{l}</tspan>)}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR - 4} fill="#fff"/>
      <circle cx={cx} cy={cy} r={innerR - 12} fill="#f8f9fa" stroke="#e5e7eb" strokeWidth="1"/>
      <line x1={cx} y1={cy - innerR + 4} x2={cx} y2={cy + innerR - 4} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3"/>
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="8" fill="#1B3A6B" fontFamily="DM Sans,sans-serif" fontWeight="700">TerritoryIQ</text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="6.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Intelligence</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="6.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Engine</text>
    </svg>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  :root {
    --orange: #E05C1A;
    --navy:   #1B3A6B;
    --gold:   #F5A623;
    --bg:     #ffffff;
    --bg-2:   #f5f7fb;
    --bg-3:   #eef1f7;
    --border: #e2e6ef;
    --text:   #111827;
    --muted:  #6b7280;
    --radius: 0px;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--bg); overflow-x: hidden; }

  /* Nav */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.97);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(8px);
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    height: 64px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-links a { font-size: 14px; font-weight: 500; color: var(--muted); text-decoration: none; transition: color .2s; }
  .nav-links a:hover { color: var(--navy); }
  .nav-cta {
    background: var(--orange); color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;
    padding: 10px 20px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
    transition: background .2s;
  }
  .nav-cta:hover { background: #c44c12; }

  /* Sections */
  section { padding: 96px 24px; }
  .container { max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange);
    margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 64px);
    line-height: 1.05; color: var(--navy); margin-bottom: 20px;
  }
  .section-body { font-size: 17px; line-height: 1.7; color: var(--muted); max-width: 640px; }

  /* Hero */
  .hero {
    padding-top: 140px; padding-bottom: 100px;
    background: linear-gradient(165deg, #ffffff 0%, #f0f4fb 60%, #e8edf8 100%);
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(27,58,107,0.04) 39px, rgba(27,58,107,0.04) 40px),
                      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(27,58,107,0.04) 39px, rgba(27,58,107,0.04) 40px);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--orange); font-weight: 500;
    border: 1px solid rgba(224,92,26,0.3); padding: 6px 16px;
    margin-bottom: 28px; background: rgba(224,92,26,0.05);
  }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); animation: pulse 1.8s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
  .hero-headline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 7vw, 88px); line-height: 1.0;
    color: var(--navy); margin-bottom: 24px;
  }
  .hero-headline span { color: var(--orange); }
  .hero-sub { font-size: 19px; line-height: 1.65; color: #374151; max-width: 580px; margin-bottom: 32px; }
  .hero-bullets { list-style: none; margin-bottom: 40px; display: flex; flex-direction: column; gap: 10px; }
  .hero-bullets li { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; color: #374151; }
  .hero-bullets li::before { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: var(--orange); margin-top: 7px; flex-shrink: 0; }
  .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--orange); color: #fff; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 15px;
    padding: 14px 28px; letter-spacing: 0.3px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    transition: background .2s, transform .15s;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { background: #c44c12; transform: translateY(-1px); }
  .btn-secondary {
    background: transparent; color: var(--navy); border: 2px solid var(--navy);
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
    padding: 12px 28px; transition: background .2s, color .2s;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-secondary:hover { background: var(--navy); color: #fff; }
  .hero-stats { display: flex; gap: 40px; margin-top: 52px; padding-top: 40px; border-top: 1px solid var(--border); flex-wrap: wrap; }
  .hero-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: var(--navy); line-height: 1; }
  .hero-stat-val span { color: var(--orange); }
  .hero-stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; letter-spacing: 0.5px; }

  /* Toggle */
  .trade-toggle { display: flex; gap: 0; border: 2px solid var(--navy); overflow: hidden; width: fit-content; }
  .trade-toggle button {
    padding: 10px 28px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
    border: none; cursor: pointer; transition: background .2s, color .2s;
    letter-spacing: 0.5px;
  }
  .trade-toggle button.active-hvac   { background: var(--navy); color: #fff; }
  .trade-toggle button.active-roofing { background: var(--orange); color: #fff; }
  .trade-toggle button:not([class*=active]) { background: transparent; color: var(--muted); }

  /* ZIP Cards */
  .zip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-top: 32px; }
  .zip-card {
    background: #fff; border: 1px solid var(--border); padding: 24px;
    position: relative; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    transition: box-shadow .2s, transform .2s;
  }
  .zip-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .zip-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--stripe-color, var(--orange));
  }
  .zip-code { font-family: 'DM Mono', monospace; font-size: 28px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .zip-label-text { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
  .zip-stat-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--bg-2); }
  .zip-stat-row:last-child { border-bottom: none; }
  .zip-stat-key { font-size: 12px; color: var(--muted); }
  .zip-stat-val { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 600; }
  .zip-entering { font-family: 'Bebas Neue', sans-serif; font-size: 38px; line-height: 1; margin: 12px 0 4px; }
  .zip-entering-label { font-size: 11px; font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); }

  /* Chart */
  .chart-wrap { background: #fff; border: 1px solid var(--border); padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .chart-svg { width: 100%; overflow: visible; }
  .chart-highlight {
    background: linear-gradient(135deg, var(--navy) 0%, #163060 100%);
    color: #fff; padding: 20px 28px; margin-top: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .chart-highlight-text { font-size: 16px; font-weight: 600; line-height: 1.4; }
  .chart-arrow { font-size: 24px; flex-shrink: 0; }

  /* Map */
  .map-wrap {
    height: 440px; border: 1px solid var(--border);
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    overflow: hidden; position: relative;
  }
  .map-note { font-size: 13px; color: var(--muted); margin-top: 16px; line-height: 1.5; }

  /* Meaning cards */
  .meaning-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 40px; }
  .meaning-card {
    background: #fff; border: 1px solid var(--border); padding: 28px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04); position: relative;
  }
  .meaning-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--m-color, var(--orange));
  }
  .meaning-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--navy); margin-bottom: 12px; }
  .meaning-body { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* Steps */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; }
  .step-card {
    background: #fff; border: 1px solid var(--border); padding: 36px 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04); position: relative;
  }
  .step-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 1;
    color: var(--bg-3); position: absolute; top: 12px; right: 20px;
  }
  .step-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 12px; }
  .step-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--navy); margin-bottom: 12px; }
  .step-body { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* Compare */
  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
  .compare-card { padding: 36px 32px; }
  .compare-card.bad  { background: var(--bg-2); border: 1px solid var(--border); }
  .compare-card.good { background: var(--navy); }
  .compare-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 28px; margin-bottom: 24px;
    padding-bottom: 16px; border-bottom: 2px solid;
  }
  .compare-card.bad  .compare-title { color: var(--muted); border-color: var(--border); }
  .compare-card.good .compare-title { color: #fff; border-color: rgba(255,255,255,0.2); }
  .compare-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; font-size: 15px; }
  .compare-card.bad  .compare-item { color: #6b7280; }
  .compare-card.good .compare-item { color: rgba(255,255,255,0.9); }
  .compare-icon { font-size: 14px; margin-top: 2px; flex-shrink: 0; }

  /* Channels section */
  .channels-tabs { display: flex; gap: 0; border: 2px solid var(--border); overflow: hidden; width: fit-content; margin-bottom: 32px; }
  .channels-tabs button {
    padding: 10px 28px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
    border: none; cursor: pointer; background: transparent; color: var(--muted); transition: all .2s;
  }
  .channels-tabs button.active { background: var(--navy); color: #fff; }
  .channel-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .channel-item:last-child { border-bottom: none; }
  .channel-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .channel-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
  .channel-desc { font-size: 13px; color: var(--muted); }

  /* TAM */
  .tam-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
  .tam-card { padding: 40px 32px; background: #fff; border: 1px solid var(--border); text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .tam-trade { font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .tam-total { font-family: 'Bebas Neue', sans-serif; font-size: 80px; line-height: 1; margin-bottom: 8px; }
  .tam-sub { font-size: 13px; color: var(--muted); letter-spacing: 0.5px; }
  .tam-total-box { background: var(--navy); padding: 32px; text-align: center; margin-top: 24px; }
  .tam-total-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
  .tam-total-val { font-family: 'Bebas Neue', sans-serif; font-size: 56px; color: #fff; }

  /* Form */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-field { display: flex; flex-direction: column; gap: 6px; }
  .form-field label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--navy); text-transform: uppercase; }
  .form-field input, .form-field select, .form-field textarea {
    border: 1px solid var(--border); padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 15px;
    background: #fff; color: var(--text); outline: none; transition: border-color .2s;
  }
  .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: var(--orange); }
  .form-full { grid-column: 1/-1; }

  /* Footer */
  .footer { background: var(--navy); padding: 48px 24px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.5); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color .2s; }
  .footer-links a:hover { color: #fff; }

  /* Misc */
  .divider { height: 1px; background: var(--border); }
  .bg-2 { background: var(--bg-2); }
  .bg-navy { background: var(--navy); }
  .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0; }

  @media (max-width: 768px) {
    section { padding: 64px 20px; }
    .nav-links { display: none; }
    .hero-stats { gap: 24px; }
    .compare-grid { grid-template-columns: 1fr; }
    .tam-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .zip-grid { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTrade, setActiveTrade] = useState<Trade>('hvac');
  const [mapTrade,    setMapTrade]    = useState<Trade>('hvac');
  const [activeTab,   setActiveTab]   = useState<'inbound' | 'outbound'>('inbound');
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // Chart dimensions
  const chartW = 600, chartH = 180, padL = 50, padB = 36, padT = 10, padR = 20;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padB - padT;
  const barW = innerW / CHART_DATA.length * 0.55;
  const barGap = innerW / CHART_DATA.length;

  const inboundChannels = [
    { name: 'Homeowner Targeting', desc: 'Direct mail and digital targeting to owners of aging systems.' },
    { name: 'Replacement Cycle Ads', desc: 'Geo-targeted campaigns timed to lifecycle windows.' },
    { name: 'Community Presence', desc: 'Neighborhood brand positioning in high-density zones.' },
    { name: 'Referral Networks', desc: 'Structured referral capture within exclusive territories.' },
  ];
  const outboundChannels = [
    { name: 'Proactive Outreach',  desc: 'Direct contact with homeowners approaching replacement age.' },
    { name: 'Storm & Event Routing', desc: 'Rapid deployment into territories after weather events.' },
    { name: 'Door-to-Door Sequencing', desc: 'Strategic canvassing in ZIP corridors with highest density.' },
    { name: 'B2B Ecosystem Tie-ins', desc: 'Alignment with local property managers and realtors.' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* ── NAV ────────────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <InstinctRiseLogo height={44}/>
          <div className="nav-links">
            <a href="#opportunities">ZIP Opportunities</a>
            <a href="#map">Territory Map</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#get-started">Get Started</a>
          </div>
          <button className="nav-cta" onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}>
            Claim Territory
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-badge">
            <span className="hero-badge-dot"/>
            Exclusive Territory Intelligence — Treasure Coast, FL
          </div>
          <h1 className="hero-headline">
            Stop Fighting<br/>Shared Leads.<br/><span>Own the Territory</span><br/>Instead.
          </h1>
          <p className="hero-sub">
            TerritoryIQ identifies the homes in your ZIP already entering roof and HVAC
            replacement cycles — before competitors start bidding.
          </p>
          <ul className="hero-bullets">
            <li>Exclusive by trade, exclusive by ZIP</li>
            <li>Full-ticket replacement jobs, not service calls</li>
            <li>Replacement-cycle intelligence built from housing lifecycle data</li>
          </ul>
          <div className="hero-ctas">
            <a href="#opportunities" className="btn-primary">
              View Live ZIP Opportunities →
            </a>
            <a href="#how-it-works" className="btn-secondary">
              How TerritoryIQ Works
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val">$<span>204</span>M</div>
              <div className="hero-stat-label">Total Addressable Revenue</div>
            </div>
            <div>
              <div className="hero-stat-val"><span>1</span></div>
              <div className="hero-stat-label">Contractor Per Trade Per ZIP</div>
            </div>
            <div>
              <div className="hero-stat-val"><span>4</span></div>
              <div className="hero-stat-label">Priority ZIPs Available Now</div>
            </div>
            <div>
              <div className="hero-stat-val"><span>5,900</span>+</div>
              <div className="hero-stat-label">Homes Entering Replacement Cycle</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP ZIP OPPORTUNITIES ──────────────────────────────────────── */}
      <section id="opportunities" className="bg-2">
        <div className="container">
          <div className="section-label">Live Territory Intelligence</div>
          <h2 className="section-title">Top ZIP Opportunities</h2>
          <p className="section-body">
            TerritoryIQ analyzes housing infrastructure by ZIP to identify where roof and HVAC
            systems are entering replacement cycles. These territories represent the highest
            concentration of replacement-ready homes.
          </p>

          <div style={{ marginTop: 32 }}>
            <div className="trade-toggle">
              <button
                className={activeTrade === 'hvac' ? 'active-hvac' : ''}
                onClick={() => setActiveTrade('hvac')}
              >
                HVAC
              </button>
              <button
                className={activeTrade === 'roofing' ? 'active-roofing' : ''}
                onClick={() => setActiveTrade('roofing')}
              >
                Roofing
              </button>
            </div>
          </div>

          <div className="zip-grid">
            {ZIP_DATA[activeTrade].map((z, i) => (
              <div
                key={z.zip}
                className="zip-card"
                style={{ '--stripe-color': activeTrade === 'hvac' ? 'var(--navy)' : 'var(--orange)' } as React.CSSProperties}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div className="zip-code">{z.zip}</div>
                    <div className="zip-label-text">{z.label}</div>
                  </div>
                  <div style={{
                    fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 700,
                    background: i === 0 ? (activeTrade === 'hvac' ? 'var(--navy)' : 'var(--orange)') : 'var(--bg-3)',
                    color: i === 0 ? '#fff' : 'var(--muted)',
                    padding: '4px 10px', letterSpacing: 1,
                  }}>
                    #{i + 1}
                  </div>
                </div>

                <div className="zip-entering" style={{ color: activeTrade === 'hvac' ? 'var(--navy)' : 'var(--orange)' }}>
                  {z.entering.toLocaleString()}
                </div>
                <div className="zip-entering-label">Entering Replacement Cycle</div>

                <div style={{ marginTop: 20 }}>
                  <div className="zip-stat-row">
                    <span className="zip-stat-key">Total Homes Analyzed</span>
                    <span className="zip-stat-val">{z.total.toLocaleString()}</span>
                  </div>
                  <div className="zip-stat-row">
                    <span className="zip-stat-key" style={{ color: '#dc2626' }}>Critical</span>
                    <span className="zip-stat-val" style={{ color: '#dc2626' }}>{z.critical.toLocaleString()}</span>
                  </div>
                  <div className="zip-stat-row">
                    <span className="zip-stat-key" style={{ color: '#d97706' }}>High</span>
                    <span className="zip-stat-val" style={{ color: '#d97706' }}>{z.high.toLocaleString()}</span>
                  </div>
                  <div className="zip-stat-row">
                    <span className="zip-stat-key" style={{ color: '#6b7280' }}>Medium</span>
                    <span className="zip-stat-val">{z.medium.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPLACEMENT CYCLE VISUALIZATION ───────────────────────────── */}
      <section id="cycle">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-label">Infrastructure Lifecycle Modeling</div>
              <h2 className="section-title">Replacement Cycles Are Predictable</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', marginBottom: 20 }}>
                Every home follows an infrastructure lifecycle. TerritoryIQ analyzes installation
                history and housing infrastructure data to model when HVAC systems and roofs begin
                entering replacement windows.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
                Contractors using TerritoryIQ focus on neighborhoods where those cycles are already
                active — not where emergencies happen to strike.
              </p>
            </div>
            <div>
              <div className="chart-wrap">
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>
                  Homes Approaching Replacement Cycle
                </div>
                <svg
                  className="chart-svg"
                  viewBox={`0 0 ${chartW} ${chartH}`}
                  aria-label="Bar chart showing homes approaching replacement cycle by year"
                >
                  {/* Y-axis gridlines */}
                  {[0, 0.25, 0.5, 0.75, 1].map(t => {
                    const y = padT + innerH - t * innerH;
                    return (
                      <g key={t}>
                        <line x1={padL} y1={y} x2={padL + innerW} y2={y} stroke="#e5e7eb" strokeWidth="1"/>
                        <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af" fontFamily="DM Sans,sans-serif">
                          {Math.round(t * CHART_MAX)}
                        </text>
                      </g>
                    );
                  })}
                  {/* Bars */}
                  {CHART_DATA.map((d, i) => {
                    const barH = (d.homes / CHART_MAX) * innerH;
                    const x = padL + i * barGap + barGap * 0.225;
                    const y = padT + innerH - barH;
                    const isMax = d.homes === Math.max(...CHART_DATA.map(x => x.homes));
                    return (
                      <g key={d.year}>
                        <rect x={x} y={y} width={barW} height={barH}
                          fill={isMax ? 'var(--orange)' : 'var(--navy)'}
                          opacity={isMax ? 1 : 0.6}
                        />
                        <text x={x + barW / 2} y={padT + innerH + 18} textAnchor="middle"
                          fontSize="11" fill="#6b7280" fontFamily="DM Mono,monospace">
                          {d.year}
                        </text>
                        <text x={x + barW / 2} y={y - 6} textAnchor="middle"
                          fontSize="10" fill={isMax ? 'var(--orange)' : '#9ca3af'} fontWeight={isMax ? '700' : '400'}
                          fontFamily="DM Mono,monospace">
                          {d.homes.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                  {/* X-axis */}
                  <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e5e7eb" strokeWidth="1.5"/>
                </svg>
                <div className="chart-highlight">
                  <div className="chart-arrow">→</div>
                  <div className="chart-highlight-text">
                    Homes installed during these years are now entering their replacement cycle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERRITORY MAP ──────────────────────────────────────────────── */}
      <section id="map" className="bg-2">
        <div className="container">
          <div className="section-label">Spatial Intelligence</div>
          <h2 className="section-title">See Where Replacement Demand Is Concentrated</h2>
          <p className="section-body" style={{ marginBottom: 32 }}>
            Interactive replacement-density map of the Treasure Coast. Darker areas represent
            higher concentrations of homes entering replacement cycles.
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <div className="trade-toggle">
              <button
                className={mapTrade === 'hvac' ? 'active-hvac' : ''}
                onClick={() => setMapTrade('hvac')}
              >
                HVAC
              </button>
              <button
                className={mapTrade === 'roofing' ? 'active-roofing' : ''}
                onClick={() => setMapTrade('roofing')}
              >
                Roofing
              </button>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                <div style={{ width: 16, height: 16, background: mapTrade === 'hvac' ? '#1B3A6B' : '#E05C1A', opacity: 0.9 }}/>
                Highest Density
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                <div style={{ width: 16, height: 16, background: mapTrade === 'hvac' ? '#8096b8' : '#f0a882', opacity: 0.75 }}/>
                Moderate Density
              </div>
            </div>
          </div>

          <div className="map-wrap">
            <MapComponent trade={mapTrade}/>
          </div>
          <p className="map-note">
            Darker areas represent higher concentrations of homes entering replacement cycles.
            Hover over any ZIP to see full replacement data. This helps contractors focus sales
            efforts where installs are statistically approaching.
          </p>
        </div>
      </section>

      {/* ── WHAT THE NUMBERS MEAN ──────────────────────────────────────── */}
      <section id="numbers">
        <div className="container">
          <div className="section-label">Data Interpretation</div>
          <h2 className="section-title">Understanding Replacement Status</h2>
          <p className="section-body">
            TerritoryIQ classifies homes using system lifecycle data and housing infrastructure
            lifecycle analysis to assign replacement urgency scores.
          </p>
          <div className="meaning-grid">
            {[
              { title: 'Critical', body: 'Homes highly likely to require system replacement now. These properties are beyond typical system lifecycle benchmarks and represent the most immediate install opportunities.', color: '#dc2626' },
              { title: 'High',     body: 'Homes currently inside the expected replacement window based on installation history modeling. Active outreach converts these to full-ticket installs.', color: '#d97706' },
              { title: 'Medium',   body: 'Homes approaching replacement age identified through housing infrastructure lifecycle analysis. Ideal for proactive pipeline development.', color: '#6b7280' },
              { title: 'Entering Replacement', body: 'The total count of homes in the ZIP currently entering the replacement cycle across all urgency tiers — and worth active sales outreach.', color: 'var(--orange)' },
            ].map(m => (
              <div className="meaning-card" key={m.title} style={{ '--m-color': m.color } as React.CSSProperties}>
                <div className="meaning-title" style={{ color: m.color }}>{m.title}</div>
                <p className="meaning-body">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW CONTRACTORS USE TERRITORYIQ ───────────────────────────── */}
      <section id="how-it-works" className="bg-2">
        <div className="container">
          <div className="section-label">Operational Workflow</div>
          <h2 className="section-title">How Contractors Use TerritoryIQ</h2>
          <div className="steps-grid">
            {[
              { num: '01', step: 'Step 1', label: 'Predict', body: 'Identify homes entering HVAC or roof replacement cycles using replacement-cycle modeling and housing infrastructure lifecycle analysis.' },
              { num: '02', step: 'Step 2', label: 'Outreach', body: 'Focus sales activity in neighborhoods where replacement windows are active — not where competitors happen to be running ads.' },
              { num: '03', step: 'Step 3', label: 'Close', body: 'Convert full-ticket replacement installs before competitors appear. Exclusive territory control means no shared bids, no price wars.' },
            ].map(s => (
              <div className="step-card" key={s.num}>
                <div className="step-num">{s.num}</div>
                <div className="step-label">{s.step}</div>
                <div className="step-title">{s.label}</div>
                <p className="step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS BEATS SHARED LEADS ───────────────────────────────── */}
      <section id="comparison">
        <div className="container">
          <div className="section-label">Competitive Position</div>
          <h2 className="section-title">Shared Lead Platforms Sell Panic.<br/>TerritoryIQ Sells Timing.</h2>
          <div className="compare-grid">
            <div className="compare-card bad">
              <div className="compare-title">Shared Lead Platforms</div>
              {[
                '3–5 contractors competing on the same lead',
                'Immediate price race to the bottom',
                'Emergency-only, reactive mindset',
                'No ZIP exclusivity — anyone can bid',
                'Pay per lead, lose on margin',
              ].map(t => (
                <div className="compare-item" key={t}>
                  <span className="compare-icon">✕</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="compare-card good">
              <div className="compare-title">TerritoryIQ</div>
              {[
                'Exclusive ZIP control — one contractor per trade',
                'Replacement-cycle intelligence, not emergency chasing',
                'Full-ticket install positioning before demand peaks',
                'Predictive outreach, not reactive bidding',
                'Own the territory, own the margin',
              ].map(t => (
                <div className="compare-item" key={t}>
                  <span className="compare-icon" style={{ color: 'var(--gold)' }}>✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHANNELS + MARKETING WHEEL ─────────────────────────────────── */}
      <section id="channels" className="bg-2">
        <div className="container">
          <div className="section-label">Intelligence Engine</div>
          <h2 className="section-title">The Full-Channel Advantage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                TerritoryIQ integrates inbound demand generation with outbound precision targeting —
                a complete intelligence engine for replacement-cycle contractors.
              </p>
              <div className="channels-tabs">
                <button className={activeTab === 'inbound' ? 'active' : ''} onClick={() => setActiveTab('inbound')}>Inbound</button>
                <button className={activeTab === 'outbound' ? 'active' : ''} onClick={() => setActiveTab('outbound')}>Outbound</button>
              </div>
              <div>
                {(activeTab === 'inbound' ? inboundChannels : outboundChannels).map(c => (
                  <div className="channel-item" key={c.name}>
                    <div className="channel-dot" style={{ background: activeTab === 'inbound' ? 'var(--orange)' : 'var(--navy)' }}/>
                    <div>
                      <div className="channel-name" style={{ color: activeTab === 'inbound' ? 'var(--orange)' : 'var(--navy)' }}>{c.name}</div>
                      <div className="channel-desc">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center' }}>
                Intelligence Wheel
              </div>
              <MarketingWheel/>
              <div style={{ display: 'flex', gap: 24, justifyContent: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, background: 'var(--orange)', borderRadius: 2 }}/> Inbound
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, background: 'var(--navy)', borderRadius: 2 }}/> Outbound
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAM ────────────────────────────────────────────────────────── */}
      <section id="tam">
        <div className="container">
          <div className="section-label">Market Size</div>
          <h2 className="section-title">Total Addressable Revenue</h2>
          <p className="section-body" style={{ marginBottom: 40 }}>
            Exclusive territory control across these two trades represents over $200M in annual
            addressable revenue — captured by one contractor per ZIP.
          </p>
          <div className="tam-grid">
            {[
              { trade: 'Roofing', total: '$120M', color: 'var(--orange)' },
              { trade: 'HVAC',    total: '$84M',  color: 'var(--navy)'   },
            ].map(t => (
              <div className="tam-card" key={t.trade}>
                <div className="tam-trade">{t.trade}</div>
                <div className="tam-total" style={{ color: t.color }}>{t.total}</div>
                <div className="tam-sub">Annual Addressable Revenue</div>
              </div>
            ))}
          </div>
          <div className="tam-total-box">
            <div className="tam-total-label">Combined TAM</div>
            <div className="tam-total-val">$204M</div>
          </div>
        </div>
      </section>

      {/* ── FORM / CTA ─────────────────────────────────────────────────── */}
      <section id="get-started" style={{ background: 'var(--bg-2)', padding: '96px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="section-label">Claim Your Territory</div>
              <h2 className="section-title">One Contractor.<br/>One Trade.<br/>One ZIP.</h2>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 32 }}>
                TerritoryIQ is not a shared lead platform. It&apos;s exclusive intelligence access.
                Once a ZIP is claimed, it&apos;s off the market for that trade.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Exclusive Access', val: 'One contractor per trade per ZIP' },
                  { label: 'Full Pipeline',    val: 'Replacement cycle homes only — no service calls' },
                  { label: 'Live Intelligence', val: 'Ongoing lifecycle analysis updates' },
                ].map(i => (
                  <div key={i.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', marginTop: 6, flexShrink: 0 }}/>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', marginBottom: 2 }}>{i.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{i.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--navy)', marginBottom: 12 }}>Request Received</div>
                  <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                    We&apos;ll review your territory request and reach out within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--navy)', marginBottom: 24 }}>
                    Request Territory Access
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Business Name *</label>
                      <input type="text" placeholder="Your Company" {...field('businessName')}/>
                    </div>
                    <div className="form-field">
                      <label>Contact Name</label>
                      <input type="text" placeholder="Your Name" {...field('contactName')}/>
                    </div>
                    <div className="form-field">
                      <label>Phone *</label>
                      <input type="tel" placeholder="(555) 000-0000" {...field('phone')}/>
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input type="email" placeholder="you@company.com" {...field('email')}/>
                    </div>
                    <div className="form-field">
                      <label>Trade *</label>
                      <select {...field('trade')}>
                        <option value="">Select Trade</option>
                        <option value="roofing">Roofing</option>
                        <option value="hvac">HVAC</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Target ZIP(s) *</label>
                      <input type="text" placeholder="34997, 34990…" {...field('zip')}/>
                    </div>
                    <div className="form-field form-full">
                      <label>Best Time to Reach You</label>
                      <input type="text" placeholder="e.g. Weekdays 9am–12pm" {...field('bestTime')}/>
                    </div>
                    <div className="form-field form-full">
                      <label>Notes</label>
                      <textarea rows={3} placeholder="Anything else we should know…" style={{ resize: 'vertical' }} {...field('notes')}/>
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Claim My Territory →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <InstinctRiseLogo height={36}/>
          <div className="footer-copy">
            © {new Date().getFullYear()} InstinctRise · TerritoryIQ · All rights reserved
          </div>
          <div className="footer-links">
            <a href="#opportunities">ZIP Opportunities</a>
            <a href="#map">Territory Map</a>
            <a href="#get-started">Claim Territory</a>
          </div>
        </div>
      </footer>
    </>
  );
}
