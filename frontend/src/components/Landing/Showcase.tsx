import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { Heart, Star, Sparkles } from 'lucide-react';

export const Showcase: React.FC = () => {
  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-14 gap-6">
          <div>
            <Badge variant="pink" pixelStar className="mb-3">
              CURATED CATALOG
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Trending Aesthetic Drops
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm leading-relaxed">
            Hand-curated items scoring 90%+ AI match index across footwear, apparel, and lifestyle tech.
          </p>
        </div>

        {/* Product Cards Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-white/80 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="pixel" pixelStar>
                    {item.matchScore}% MATCH
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-pink-600 shadow-md">
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold text-purple-900">{item.brand}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 line-clamp-1 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-purple-50/60 p-2.5 rounded-xl border border-purple-100">
                    <Sparkles className="w-3 h-3 text-purple-600 inline mr-1" />
                    {item.aiReason}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-100">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1.5">
                      ${item.originalPrice}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ${item.price}
                    </span>
                  </div>
                  <Badge variant="mint" className="text-xs">
                    Save {item.discount}%
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
