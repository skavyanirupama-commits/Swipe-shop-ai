import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { Sparkles, Heart, Cpu, Settings, ArrowUpRight } from 'lucide-react';

export const Profile: React.FC = () => {
  const favoriteBrands = ['AURA STUDIO', 'NORDIC AUDIO', 'LOOM & THREAD', 'MAISON CLAIRE'];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto w-full flex-1">
        {/* User Hero Banner */}
        <div className="glass-panel rounded-3xl p-8 mb-10 border border-white/80 shadow-xl bg-gradient-to-r from-purple-100/70 via-pink-100/60 to-sky-100/70">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Aria Vance
                  </h1>
                  <Badge variant="pixel" pixelStar>
                    PRO AI MEMBER
                  </Badge>
                </div>
                <p className="text-xs text-purple-900 font-semibold mt-1">
                  Shopping Personality: <span className="underline decoration-pink-400 font-bold">Aesthetic Minimalist</span>
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-600 font-medium">
                  <span>142 Total Swipes</span>
                  <span>•</span>
                  <span>38 Liked Items</span>
                  <span>•</span>
                  <span>96% AI Precision</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
              Edit AI Weights
            </Button>
          </div>
        </div>

        {/* AI Insights & Shopping Personality Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* AI Neural Aesthetic Breakdown */}
          <div className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  AI Taste Vector
                </h3>
                <Badge variant="lavender" className="text-[10px]">
                  Updated Live
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Your neural matrix prioritizes pastel tones, clean lines, and retro-modern silhouettes.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Pastel Palette Affinity</span>
                    <span className="text-purple-700">94%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-purple-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Minimalist Tech</span>
                    <span className="text-sky-700">88%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Sustainable Fabrics</span>
                    <span className="text-emerald-700">82%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full w-[82%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Brands */}
          <div className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Favorite Brands
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {favoriteBrands.map((brand) => (
                  <Badge key={brand} variant="pink" className="py-1.5 px-3">
                    ✦ {brand}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <p className="text-xs text-pink-950 font-medium leading-relaxed">
                <span className="font-bold">Next Recommended Brand Drop:</span> Studio Minimal (Releasing Tomorrow)
              </p>
            </div>
          </div>

          {/* AI Shopping Personality Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/80 shadow-lg bg-gradient-to-br from-white/80 to-purple-100/50 flex flex-col justify-between">
            <div>
              <Badge variant="pixel" pixelStar className="mb-3">
                AI PERSONALITY CODE
              </Badge>
              <h3 className="font-extrabold text-2xl text-purple-950 mb-2">
                #PastelVisionary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You prefer high quality over mass quantity, leaning towards muted pastel palettes and clean spatial designs.
              </p>
            </div>
            <Button variant="primary" size="sm" className="mt-4 w-full" pixelAccent>
              Share Aesthetic Profile
            </Button>
          </div>
        </div>

        {/* Saved Wishlist Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              Liked Products Vault ({MOCK_PRODUCTS.length})
            </h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Export Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/80 shadow-md p-3 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="pixel" className="text-[9px]">
                      {prod.matchScore}% MATCH
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-800 uppercase">
                    {prod.brand}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {prod.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-100">
                    <span className="font-black text-slate-900 text-sm">
                      ${prod.price}
                    </span>
                    <Badge variant="mint" className="text-[10px] py-0 px-2">
                      In Stock
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
