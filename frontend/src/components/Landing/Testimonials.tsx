import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sophia Chen',
      handle: '@sophiastyle',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      text: 'SwipeShop completely transformed how I discover indie fashion brands. It actually knows my aesthetic better than I do!',
      role: 'Fashion Content Creator',
    },
    {
      name: 'Liam Vance',
      handle: '@liamvance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      text: 'The UI is insanely fluid. 60fps card tilt physics and zero spammy ads. It feels like Tinder for curated tech gear.',
      role: 'Design Engineer',
    },
    {
      name: 'Maya Patel',
      handle: '@mayapatel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      text: 'Finally an e-commerce platform that looks like a modern Apple or Linear app instead of a messy 2010 marketplace.',
      role: 'Product Strategist',
    },
  ];

  return (
    <section className="py-24 relative bg-purple-50/30 border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="sky" pixelStar className="mb-3">
            COMMUNITY LOVE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by 100,000+ Shoppers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-white/90 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-purple-100">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{r.name}</h4>
                  <p className="text-xs text-purple-700 font-medium">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
