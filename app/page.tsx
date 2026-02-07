import React from 'react';

const territories = [
  { zip: '34990', price: 1500, leads: 200, status: 'Available' },
  { zip: '34997', price: 1500, leads: 144, status: 'Available' },
  { zip: '33455', price: 1200, leads: 95, status: 'Available' },
];

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-blue-900">
          Stop Buying Leads. <span className="text-orange-600">Own Your ZIP Code.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          We license exclusive territory intelligence to one contractor per trade. 
          When you own the territory, you own the data, the route, and the market.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition">
            View Available Territories
          </button>
        </div>
      </section>

      {/* The Power of the Model */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Zero Competition</h3>
            <p className="text-slate-500">We never sell the same lead twice. Your territory is locked to your business only.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Predictable ROI</h3>
            <p className="text-slate-500">Fixed monthly cost. No bidding wars. One high-ticket install pays for the whole year.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Route Efficiency</h3>
            <p className="text-slate-500">Concentrated leads mean 70% less driving time for your estimators and techs.</p>
          </div>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Current Florida Territories</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold">ZIP Code</th>
                <th className="p-4 font-semibold">Ready Prospects</th>
                <th className="p-4 font-semibold">Monthly License</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {territories.map((t) => (
                <tr key={t.zip} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium">{t.zip}</td>
                  <td className="p-4">{t.leads} Units</td>
                  <td className="p-4">${t.price}/mo</td>
                  <td className="p-4">
                    <button className="text-blue-600 font-bold hover:underline">Claim Territory →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
