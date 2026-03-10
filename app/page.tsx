'use client';
import React, { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const territories = [
  { zip: '34990', trade: 'Roofing', leads: 200, urgency: 'High', price: 1500, status: 'Available' },
  { zip: '34990', trade: 'HVAC', leads: 187, urgency: 'High', price: 1500, status: 'Available' },
  { zip: '34997', trade: 'Roofing', leads: 144, urgency: 'Medium', price: 1500, status: 'Available' },
  { zip: '34997', trade: 'HVAC', leads: 131, urgency: 'Medium', price: 1200, status: 'Available' },
  { zip: '33455', trade: 'Roofing', leads: 95, urgency: 'Medium', price: 1200, status: 'Available' },
  { zip: '33455', trade: 'HVAC', leads: 88, urgency: 'Low', price: 1200, status: 'Available' },
  { zip: '34994', trade: 'Roofing', leads: 172, urgency: 'High', price: 1500, status: 'Claimed' },
  { zip: '34986', trade: 'HVAC', leads: 210, urgency: 'High', price: 1500, status: 'Claimed' },
];

const navLinks = ['How It Works', 'TAM & Market', 'Territories', 'Pricing'];

// ─── Logo SVG ────────────────────────────────────────────────────────────────

function InstinctRiseLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? 36 : size === 'lg' ? 60 : 44;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={dims} height={dims} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun rays */}
        <circle cx="62" cy="28" r="14" fill="#F5A623" />
        <line x1="62" y1="8" x2="62" y2="2" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="62" y1="48" x2="62" y2="54" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="42" y1="28" x2="36" y2="28" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="82" y1="28" x2="88" y2="28" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="48" y1="14" x2="44" y2="10" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        <line x1="76" y1="14" x2="80" y2="10" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"/>
        {/* House roof */}
        <polygon points="10,60 50,30 90,60" fill="#C0392B" />
        <polygon points="14,60 50,33 86,60" fill="#E05C1A" />
        {/* House body */}
        <rect x="18" y="60" width="64" height="34" rx="2" fill="#1B3A6B" />
        {/* Door */}
        <rect x="40" y="74" width="16" height="20" rx="2" fill="#0f2344" />
        {/* Window */}
        <rect x="22" y="66" width="14" height="12" rx="1" fill="#5b8dd9" />
        <rect x="60" y="66" width="14" height="12" rx="1" fill="#5b8dd9" />
        {/* City buildings behind */}
        <rect x="60" y="42" width="10" height="22" fill="#1B3A6B" opacity="0.7"/>
        <rect x="72" y="50" width="8" height="14" fill="#1B3A6B" opacity="0.5"/>
        <rect x="50" y="46" width="9" height="18" fill="#1B3A6B" opacity="0.6"/>
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

// ─── Marketing Wheel Diagram ─────────────────────────────────────────────────

function MarketingWheelDiagram() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* Inbound Column */}
        <div className="space-y-5">
          <h3 className="text-xl font-extrabold text-[#E05C1A] text-center md:text-right">Inbound Marketing</h3>
          {[
            { label: 'Approach', text: 'TerritoryIQ qualifies inbound leads (Google LSAs, SEO) pre-call — routing only high-urgency homes to your pipeline.' },
            { label: 'Focus', text: 'Engage audiences already searching for replacements. TerritoryIQ flags which ZIP-code homes are 90 days from failure.' },
            { label: 'Channels', text: 'Blogs, SEO, Google LSA, email campaigns enriched with predictive failure data from your exclusive territory.' },
            { label: 'Costs & Metrics', text: 'Cost-effective. Measure audience engagement, site traffic, lead quality score, and conversion rate from predicted homes.' },
          ].map((item) => (
            <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-right">
              <div className="font-bold text-sm text-[#E05C1A] mb-1">{item.label}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>

        {/* Center Wheel SVG */}
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 300 300" className="w-full max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            {/* Outer ring segments - Inbound (orange shades, left) */}
            {/* Segment 1 - top left */}
            <path d="M150,150 L80,40 A130,130 0 0,1 150,20 Z" fill="#E05C1A" opacity="0.9"/>
            {/* Segment 2 - middle left */}
            <path d="M150,150 L20,100 A130,130 0 0,1 80,40 Z" fill="#C94E15" opacity="0.9"/>
            {/* Segment 3 - bottom-mid left */}
            <path d="M150,150 L20,200 A130,130 0 0,1 20,100 Z" fill="#A83D0E" opacity="0.9"/>
            {/* Segment 4 - bottom left */}
            <path d="M150,150 L80,270 A130,130 0 0,1 20,200 Z" fill="#8B3209" opacity="0.9"/>

            {/* Outer ring segments - Outbound (blue shades, right) */}
            {/* Segment 5 - top right */}
            <path d="M150,150 L150,20 A130,130 0 0,1 220,40 Z" fill="#1B3A6B" opacity="0.9"/>
            {/* Segment 6 - middle right */}
            <path d="M150,150 L220,40 A130,130 0 0,1 280,100 Z" fill="#163060" opacity="0.9"/>
            {/* Segment 7 - bottom-mid right */}
            <path d="M150,150 L280,100 A130,130 0 0,1 280,200 Z" fill="#112655" opacity="0.9"/>
            {/* Segment 8 - bottom right */}
            <path d="M150,150 L280,200 A130,130 0 0,1 220,270 Z" fill="#0D1D44" opacity="0.9"/>

            {/* Bottom segments */}
            <path d="M150,150 L220,270 A130,130 0 0,1 150,280 Z" fill="#1B3A6B" opacity="0.9"/>
            <path d="M150,150 L150,280 A130,130 0 0,1 80,270 Z" fill="#E05C1A" opacity="0.9"/>

            {/* Inner white circle */}
            <circle cx="150" cy="150" r="75" fill="white" stroke="#e2e8f0" strokeWidth="2"/>

            {/* Center text */}
            <text x="150" y="138" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1B3A6B">TerritoryIQ</text>
            <text x="150" y="155" textAnchor="middle" fontSize="10" fill="#64748b">Predictive</text>
            <text x="150" y="169" textAnchor="middle" fontSize="10" fill="#64748b">Intelligence</text>

            {/* Small icons / dots */}
            {[50, 110, 170, 230].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 150 + 100 * Math.cos(rad);
              const y = 150 + 100 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="6" fill="white" opacity="0.3"/>;
            })}

            {/* Left/Right labels */}
            <text x="30" y="155" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" transform="rotate(-90, 30, 155)">INBOUND</text>
            <text x="270" y="155" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" transform="rotate(90, 270, 155)">OUTBOUND</text>
          </svg>

          {/* Legend */}
          <div className="flex gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#E05C1A]"></div>
              <span className="text-[#E05C1A]">Inbound</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#1B3A6B]"></div>
              <span className="text-[#1B3A6B]">Outbound</span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 max-w-[220px]">
            TerritoryIQ powers both channels — one exclusive ZIP, one trade, maximum ROI.
          </p>
        </div>

        {/* Outbound Column */}
        <div className="space-y-5">
          <h3 className="text-xl font-extrabold text-[#1B3A6B] text-center md:text-left">Outbound Marketing</h3>
          {[
            { label: 'Approach', text: 'Broad outreach powered by precision. TerritoryIQ pinpoints which homes to target — before the breakdown, not after.' },
            { label: 'Focus', text: 'Push promotional content to high-urgency homes. Your 15-year-old roof in a saltwater zone list is already waiting.' },
            { label: 'Channels', text: 'Cold calls, direct mailers, geofence ads, Facebook targeting — all laser-focused on predicted-failure homes in your ZIP.' },
            { label: 'Costs & Metrics', text: 'Resource-intensive but surgically targeted. Track impressions-to-close rates with 20–30% better conversion from predicted lists.' },
          ].map((item) => (
            <div key={item.label} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="font-bold text-sm text-[#1B3A6B] mb-1">{item.label}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAM Bars ────────────────────────────────────────────────────────────────

function TAMSection() {
  const tam = [
    {
      trade: 'Roofing',
      total: 120,
      color: '#E05C1A',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      facts: ['~6,700 roofs due for replacement annually', 'Avg ticket $15k–$25k', 'Hurricane & saltwater corrosion accelerates cycles', '15-year roof in coastal FL = imminent replacement'],
    },
    {
      trade: 'HVAC',
      total: 84,
      color: '#1B3A6B',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      facts: ['~8,400 HVAC systems flagged for replacement/year', 'Avg ticket $8k–$15k', 'Salt-air corrosion + FL heat shortens system life', '10-yr old unit in Martin County = hot prospect'],
    },
  ];

  return (
    <section id="tam-market" className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-400 font-semibold tracking-widest text-sm uppercase mb-3">Martin County, FL — Annual TAM</p>
          <h2 className="text-4xl font-extrabold mb-4">
            $204M Market. <span className="text-orange-400">You Could Own It.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Why compete for 25% of a shared lead when you can own 100% of the territory?
            Here&apos;s what&apos;s at stake in Martin County alone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {tam.map((t) => (
            <div key={t.trade} className={`rounded-2xl border-2 p-8 bg-slate-800 border-slate-700`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: t.color }}>{t.trade}</div>
                  <div className="text-5xl font-extrabold">${t.total}M</div>
                  <div className="text-slate-400 text-sm mt-1">Annual Addressable Revenue</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs">Per-ZIP avg opportunity</div>
                  <div className="text-2xl font-bold mt-1" style={{ color: t.color }}>
                    ${t.trade === 'Roofing' ? '4.2M' : '2.9M'}
                  </div>
                </div>
              </div>

              {/* Bar */}
              <div className="h-3 rounded-full bg-slate-700 mb-6 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(t.total / 204) * 100}%`, backgroundColor: t.color }}
                />
              </div>

              <ul className="space-y-2">
                {t.facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 text-xs" style={{ color: t.color }}>▶</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Combined total */}
        <div className="rounded-2xl bg-gradient-to-r from-[#E05C1A] to-[#1B3A6B] p-px">
          <div className="bg-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Combined Annual TAM — Martin County</p>
            <div className="text-6xl font-extrabold mb-2">$204M</div>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every contractor on shared lead platforms is fighting over a fraction of this.
              TerritoryIQ lets you stake your claim — exclusively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredTerritories = activeFilter === 'All'
    ? territories
    : territories.filter(t => t.trade === activeFilter);

  const available = filteredTerritories.filter(t => t.status === 'Available');
  const claimed = filteredTerritories.filter(t => t.status === 'Claimed');

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 overflow-x-hidden">

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <InstinctRiseLogo size="md" />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-sm font-medium text-slate-600 hover:text-[#1B3A6B] transition"
              >
                {link}
              </a>
            ))}
          </div>
          <button className="bg-[#E05C1A] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition shadow">
            Claim Your ZIP
          </button>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0a1f44] via-[#1B3A6B] to-[#0a1f44] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-full"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          {/* Product badge */}
          <div className="inline-flex items-center gap-2 bg-[#E05C1A]/20 border border-[#E05C1A]/40 text-orange-300 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Flagship Product by InstinctRise
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Stop Fighting{' '}
            <span className="text-[#E05C1A]">3–5 Competitors</span>
            <br />
            <span className="text-white">Own Your Market.</span>
          </h1>

          <p className="text-xl text-blue-200 mb-4 max-w-3xl mx-auto leading-relaxed">
            TerritoryIQ delivers <strong className="text-white">exclusive predictive intelligence</strong> for replacement work —
            one contractor, one trade, one ZIP code. Know which homes are failing before your competitors
            even get the call.
          </p>
          <p className="text-base text-blue-300 mb-10 max-w-2xl mx-auto">
            Roofing. HVAC. Yours alone. No bidding wars. No shared leads. Just you dominating with data.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#territories">
              <button className="bg-[#E05C1A] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl">
                View Available Territories →
              </button>
            </a>
            <a href="#how-it-works">
              <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
                How It Works
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: '1', label: 'Contractor per trade per ZIP' },
              { stat: '70%', label: 'Less driving time' },
              { stat: '30%', label: 'Lower customer acquisition cost' },
              { stat: '$204M', label: 'Martin County TAM' },
            ].map((item) => (
              <div key={item.stat} className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-extrabold text-[#E05C1A]">{item.stat}</div>
                <div className="text-xs text-blue-300 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Statement ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">The Problem With Shared Leads</p>
            <h2 className="text-4xl font-extrabold mb-4 text-[#0a1f44]">
              Four Trucks. One Roof Call.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Platforms like Angi and HomeAdvisor sell the same lead to 3–5 contractors simultaneously.
              Here&apos;s what happens next.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: '⚔️',
                title: 'Bidding War Chaos',
                desc: 'You slash your price to win. So does everyone else. The homeowner picks the lowest bidder — often the one with the worst margin and the least professionalism.',
                color: 'border-red-200 bg-red-50',
                textColor: 'text-red-700',
              },
              {
                icon: '💸',
                title: 'Eroded Margins',
                desc: 'Shared platforms charge $80–$400 per lead — leads that go to 3 other contractors. You pay for the privilege of a bidding war that destroys your profitability.',
                color: 'border-amber-200 bg-amber-50',
                textColor: 'text-amber-700',
              },
              {
                icon: '🔄',
                title: 'Reactive, Not Predictive',
                desc: 'You only hear about failures after they happen. Emergency calls mean homeowners want it done cheap and fast — not the high-ticket planned replacement you deserve.',
                color: 'border-orange-200 bg-orange-50',
                textColor: 'text-orange-700',
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl border-2 p-6 ${card.color}`}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${card.textColor}`}>{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* VS Divider */}
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

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Predictive Intelligence Engine</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">
              Predict. Outreach. Close.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              TerritoryIQ analyzes market signals to flag homes primed for upgrades
              before the leak or breakdown hits. Your insider edge — delivered daily.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: '01',
                title: 'Predict Failures',
                desc: 'We analyze roof age, HVAC vintage, material data, climate exposure (saltwater, UV, humidity), and neighborhood patterns to score every home in your ZIP for replacement urgency.',
                icon: '🎯',
                examples: ['15-yr roof in saltwater zone = high urgency', '11-yr HVAC in coastal FL = prime prospect', 'Post-storm neighborhood = surge window'],
              },
              {
                step: '02',
                title: 'Own the Territory',
                desc: 'You are the only contractor in your trade for that ZIP. No one else gets your list. Your predictions, your homeowners, your pipeline — period.',
                icon: '🔒',
                examples: ['1 roofer per ZIP code', '1 HVAC contractor per ZIP code', 'Locked the moment you subscribe'],
              },
              {
                step: '03',
                title: 'Close More Deals',
                desc: 'Reach out before the emergency. A homeowner who planned the replacement is a $15k–$25k ticket. The one with a leak at 2am is a $4k patch job — to whoever answers first.',
                icon: '💰',
                examples: ['25% higher close rates for reps', 'Full-ticket planned replacements', 'Recurring revenue via preventive upsells'],
              },
            ].map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-[#E05C1A] font-black text-sm tracking-widest mb-1">STEP {step.step}</div>
                  <h3 className="text-xl font-extrabold text-[#0a1f44] mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-[#E05C1A] font-bold mt-0.5">✓</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Connector arrow */}
                {step.step !== '03' && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 h-8 items-center justify-center">
                    <span className="text-slate-300 text-2xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Results metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: '70%', label: 'Less driving with concentrated ZIP routes', color: 'text-[#E05C1A]' },
              { metric: '25%', label: 'Higher close rates with predicted jobs', color: 'text-[#1B3A6B]' },
              { metric: '30%', label: 'Lower CAC vs. shared lead platforms', color: 'text-[#E05C1A]' },
              { metric: '1 job', label: 'Pays for your entire year of TerritoryIQ', color: 'text-[#1B3A6B]' },
            ].map((m) => (
              <div key={m.metric} className="text-center bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className={`text-4xl font-extrabold ${m.color} mb-2`}>{m.metric}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marketing Integration Diagram ────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Channel Integration</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">
              TerritoryIQ Supercharges Every Channel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you run inbound or outbound — or both — TerritoryIQ injects predictive intelligence
              into every touchpoint. More conversions, less waste, across your entire marketing mix.
            </p>
          </div>
          <MarketingWheelDiagram />

          {/* Channel breakdown pills */}
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {[
              { channel: 'Google LSA / Inbound Calls', type: 'Inbound', boost: '+35% ticket size', desc: 'Pre-qualify callers against your predicted-failure list. Only route high-urgency homes to your calendar.' },
              { channel: 'Cold Outreach / Direct Mail', type: 'Outbound', boost: '+40% response rate', desc: 'Mail only to homes flagged as 90-day replacement candidates. Stop wasting budget on unqualified addresses.' },
              { channel: 'Facebook / Display Ads', type: 'Digital', boost: '20–30% better CVR', desc: 'Target custom audiences matched to your predicted-failure home profiles in your exclusive ZIP.' },
              { channel: 'Geofence Advertising', type: 'Geofence', boost: 'Hotspot targeting', desc: 'Hit waterfront zones, older subdivisions, and storm-damaged corridors where corrosion and age align.' },
            ].map((ch) => (
              <div key={ch.channel} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
                <div className={`shrink-0 w-2 rounded-full ${ch.type === 'Inbound' || ch.type === 'Digital' ? 'bg-[#E05C1A]' : 'bg-[#1B3A6B]'}`}></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-800">{ch.channel}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ch.type === 'Inbound' || ch.type === 'Digital' ? 'bg-orange-100 text-[#E05C1A]' : 'bg-blue-100 text-[#1B3A6B]'}`}>
                      {ch.boost}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAM Section ───────────────────────────────────────────────── */}
      <TAMSection />

      {/* ── ZIP Exclusive Section ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Exclusive by Trade, Exclusive by ZIP</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">
              One Contractor. One Trade. One ZIP. <span className="text-[#E05C1A]">Full Stop.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We never double-sell a territory. The moment you claim a ZIP for your trade,
              it&apos;s yours — locked, exclusive, and unavailable to every competitor.
            </p>
          </div>

          {/* Visual trade grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { zip: '34990', roofing: 'YOU', hvac: 'Available', plumbing: 'Available' },
              { zip: '34997', roofing: 'Available', hvac: 'Available', plumbing: 'Claimed' },
              { zip: '33455', roofing: 'Available', hvac: 'YOU', plumbing: 'Available' },
            ].map((z) => (
              <div key={z.zip} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-[#0a1f44] text-white text-center py-3 font-bold text-lg">
                  ZIP {z.zip}
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { trade: 'Roofing', status: z.roofing },
                    { trade: 'HVAC', status: z.hvac },
                    { trade: 'Plumbing', status: z.plumbing },
                  ].map((t) => (
                    <div key={t.trade} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{t.trade}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        t.status === 'YOU'
                          ? 'bg-[#E05C1A] text-white'
                          : t.status === 'Claimed'
                          ? 'bg-slate-300 text-slate-600'
                          : 'bg-green-100 text-green-700'
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
              Every contractor in a different trade can still license the same ZIP.
              But no one in <em>your</em> trade will ever compete in your territory.
              That&apos;s the TerritoryIQ guarantee.
            </p>
            <button className="bg-[#E05C1A] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Check Your ZIP Availability →
            </button>
          </div>
        </div>
      </section>

      {/* ── Territory Inventory ───────────────────────────────────────── */}
      <section id="territories" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">Live Inventory</p>
            <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">Current Florida Territories</h2>
            <p className="text-slate-600">Martin County ZIP codes with available exclusive licenses. Territories go fast — once claimed, they&apos;re gone.</p>
          </div>

          {/* Trade filter */}
          <div className="flex gap-3 justify-center mb-8">
            {['All', 'Roofing', 'HVAC'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
                  activeFilter === f
                    ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-[#1B3A6B]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Available */}
          {available.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
              <div className="bg-green-50 px-6 py-3 border-b border-slate-200">
                <span className="font-semibold text-green-700 text-sm">✓ Available Territories ({available.length})</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-semibold text-sm">ZIP Code</th>
                    <th className="p-4 font-semibold text-sm">Trade</th>
                    <th className="p-4 font-semibold text-sm">Ready Prospects</th>
                    <th className="p-4 font-semibold text-sm">Urgency</th>
                    <th className="p-4 font-semibold text-sm">Monthly License</th>
                    <th className="p-4 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {available.map((t) => (
                    <tr key={`${t.zip}-${t.trade}`} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-bold text-[#1B3A6B]">{t.zip}</td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.trade === 'Roofing' ? 'bg-orange-100 text-[#E05C1A]' : 'bg-blue-100 text-[#1B3A6B]'}`}>
                          {t.trade}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{t.leads} units</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          t.urgency === 'High' ? 'bg-red-100 text-red-700' :
                          t.urgency === 'Medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {t.urgency}
                        </span>
                      </td>
                      <td className="p-4 font-bold">${t.price}/mo</td>
                      <td className="p-4">
                        <button className="bg-[#E05C1A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition">
                          Claim Territory →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Claimed */}
          {claimed.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden opacity-60">
              <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                <span className="font-semibold text-slate-500 text-sm">✗ Claimed Territories ({claimed.length}) — No longer available</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-semibold text-sm">ZIP Code</th>
                    <th className="p-4 font-semibold text-sm">Trade</th>
                    <th className="p-4 font-semibold text-sm">Ready Prospects</th>
                    <th className="p-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claimed.map((t) => (
                    <tr key={`${t.zip}-${t.trade}`} className="border-b border-slate-100">
                      <td className="p-4 font-bold text-slate-400">{t.zip}</td>
                      <td className="p-4 text-slate-400 text-sm">{t.trade}</td>
                      <td className="p-4 text-slate-400">{t.leads} units</td>
                      <td className="p-4">
                        <span className="text-xs font-semibold bg-slate-200 text-slate-500 px-2 py-1 rounded-full">Taken</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── Pricing / ROI CTA ─────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#E05C1A] font-semibold tracking-widest text-sm uppercase mb-3">The No-Brainer Math</p>
          <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-6">
            One Job Pays For <span className="text-[#E05C1A]">The Whole Year</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            At $1,200–$1,500/month, TerritoryIQ costs $14,400–$18,000/year.
            A single $15k roofing or HVAC job — landed via a predicted prospect — covers your entire subscription.
            Every close after that is pure margin.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Starter Territory', price: '$1,200/mo', details: ['1 ZIP code', '1 trade', '~95–144 ready prospects', 'Full predictive scoring', 'CRM export'], highlight: false },
              { label: 'Prime Territory', price: '$1,500/mo', details: ['1 high-volume ZIP', '1 trade', '~144–210 ready prospects', 'Full predictive scoring', 'Priority support'], highlight: true },
              { label: 'Multi-Territory', price: 'Custom', details: ['2+ ZIP codes', 'Multiple trades', 'Volume pricing', 'Dedicated account rep', 'White-glove onboarding'], highlight: false },
            ].map((plan) => (
              <div
                key={plan.label}
                className={`rounded-2xl border-2 p-7 ${plan.highlight
                  ? 'border-[#E05C1A] bg-gradient-to-b from-orange-50 to-white shadow-lg'
                  : 'border-slate-200'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-[#E05C1A] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="font-bold text-lg text-[#0a1f44] mb-1">{plan.label}</div>
                <div className={`text-3xl font-extrabold mb-5 ${plan.highlight ? 'text-[#E05C1A]' : 'text-[#1B3A6B]'}`}>{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-[#E05C1A] font-bold">✓</span> {d}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition ${
                  plan.highlight
                    ? 'bg-[#E05C1A] text-white hover:bg-orange-600'
                    : 'border-2 border-[#1B3A6B] text-[#1B3A6B] hover:bg-blue-50'
                }`}>
                  {plan.price === 'Custom' ? 'Contact Us' : 'Claim This Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0a1f44] via-[#1B3A6B] to-[#0a1f44] py-24 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Stop Splitting Scraps.<br />
            <span className="text-[#E05C1A]">Start Owning the Market.</span>
          </h2>
          <p className="text-blue-200 text-lg mb-4 max-w-xl mx-auto">
            Smart operators in Martin County are staking their claim now.
            Once a territory is taken, it&apos;s gone. Don&apos;t let a competitor lock you out of your own backyard.
          </p>
          <p className="text-blue-300 text-sm mb-10">
            TerritoryIQ by InstinctRise — Predict. Dominate. Profit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#E05C1A] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl">
              Claim Your ZIP Now →
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <InstinctRiseLogo size="sm" />
          <p className="text-xs text-center">
            TerritoryIQ is the flagship product of InstinctRise — exclusive territory intelligence for contractors.
            <br />© {new Date().getFullYear()} InstinctRise. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
