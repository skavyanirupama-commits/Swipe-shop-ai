import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { TrendingUp, Users, ShoppingBag, Sparkles, Search, Plus, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Admin: React.FC = () => {
  const kpis = [
    { title: 'Total Swipes Today', value: '142,890', change: '+18.4%', icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, accent: 'mint' },
    { title: 'Active Neural Users', value: '28,450', change: '+12.1%', icon: <Users className="w-5 h-5 text-purple-600" />, accent: 'lavender' },
    { title: 'AI Match Accuracy', value: '96.8%', change: '+3.2%', icon: <Sparkles className="w-5 h-5 text-pink-600" />, accent: 'pink' },
    { title: 'Conversion Rate', value: '8.4%', change: '+1.5%', icon: <ShoppingBag className="w-5 h-5 text-sky-600" />, accent: 'sky' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto w-full flex-1">
        {/* Admin Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pixel" pixelStar>
                ADMIN TELEMETRY
              </Badge>
              <span className="text-xs font-mono text-purple-700">v2.4.0-LIVE</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Neural Analytics & Inventory
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or users..."
                className="pl-10 pr-4 py-2 text-xs font-semibold rounded-full glass-panel border border-white/80 focus:outline-none focus:ring-2 focus:ring-purple-300 w-56"
              />
            </div>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} pixelAccent>
              Add Product
            </Button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi) => (
            <motion.div
              key={kpi.title}
              whileHover={{ y: -3 }}
              className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600">{kpi.title}</span>
                <div className="p-2.5 rounded-xl bg-white shadow-sm border border-purple-100">
                  {kpi.icon}
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  {kpi.value}
                </div>
                <Badge variant={kpi.accent as any} className="text-[10px] py-0 px-2">
                  {kpi.change} vs last week
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics Visual Chart & Telemetry Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Simulated Chart Container */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Swipe Engagement Telemetry
                </h3>
                <p className="text-xs text-slate-500">Real-time hourly swipe volume & conversion graph</p>
              </div>
              <Badge variant="mint" className="text-[10px]">
                Live Stream
              </Badge>
            </div>

            {/* Custom Pastel Bar Chart Visualization */}
            <div className="h-56 w-full flex items-end justify-between gap-3 px-4 pt-4 border-b border-purple-100">
              {[40, 65, 85, 45, 95, 75, 110, 80, 125, 90, 140, 115].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / 150) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-purple-300 via-pink-300 to-sky-300 group-hover:from-purple-400 group-hover:to-pink-400 shadow-sm transition-all"
                  />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-purple-900">
                    {i + 1}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Category Weights */}
          <div className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-4">
                Category Distribution
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
                    <span>Retro Footwear</span>
                    <span>38%</span>
                  </div>
                  <div className="h-2 rounded-full bg-purple-100 overflow-hidden">
                    <div className="h-full bg-purple-400 w-[38%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
                    <span>Pastel Apparel</span>
                    <span>28%</span>
                  </div>
                  <div className="h-2 rounded-full bg-pink-100 overflow-hidden">
                    <div className="h-full bg-pink-400 w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
                    <span>Minimalist Tech</span>
                    <span>21%</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-100 overflow-hidden">
                    <div className="h-full bg-sky-400 w-[21%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
                    <span>Home & Lifestyle</span>
                    <span>13%</span>
                  </div>
                  <div className="h-2 rounded-full bg-emerald-100 overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[13%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 mt-6">
              <p className="text-xs text-purple-950 font-medium">
                ✦ AI Insight: Footwear swipe-right velocity grew +24% this week.
              </p>
            </div>
          </div>
        </div>

        {/* Product Inventory Table */}
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-xl text-slate-900">
              Live Product Catalog ({MOCK_PRODUCTS.length})
            </h3>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="pb-3 px-3">Product</th>
                  <th className="pb-3 px-3">Brand</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 px-3">AI Match Index</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/60 font-medium">
                {MOCK_PRODUCTS.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img src={p.imageUrl} alt="" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
                      <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                    </td>
                    <td className="py-3 px-3 text-purple-900 font-bold">{p.brand}</td>
                    <td className="py-3 px-3 font-black text-slate-900">${p.price}</td>
                    <td className="py-3 px-3">
                      <Badge variant="pixel" className="text-[9px]">
                        ✦ {p.matchScore}%
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{p.category}</td>
                    <td className="py-3 px-3 text-right">
                      <Badge variant="mint" className="text-[9px] py-0.5 px-2">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
