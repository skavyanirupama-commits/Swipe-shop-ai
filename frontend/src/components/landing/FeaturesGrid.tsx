import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Compass, Heart, Zap, Sparkles, Sliders } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      title: 'Neural AI Recommendations',
      description: 'Every swipe left or right updates your personal aesthetic vector graph in real-time.',
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      accent: 'lavender',
      badge: 'Realtime AI',
    },
    {
      title: 'Smart Aesthetic Discovery',
      description: 'Break free from endless keyword search. Explore products tailored to your visual mood.',
      icon: <Compass className="w-6 h-6 text-pink-600" />,
      accent: 'pink',
      badge: 'Zero Searching',
    },
    {
      title: 'Aesthetic Wishlist Vault',
      description: 'Instantly bookmark products with super-likes and build organized visual moodboards.',
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      accent: 'mint',
      badge: 'Moodboards',
    },
    {
      title: 'Lightning Fast Feed',
      description: '60 FPS drag physics with instant swipe recoils powered by Framer Motion.',
      icon: <Zap className="w-6 h-6 text-sky-600" />,
      accent: 'sky',
      badge: '60 FPS',
    },
    {
      title: 'Personalized Shopping Feed',
      description: 'Daily fresh drops filtered specifically for your style profile and price preferences.',
      icon: <Sparkles className="w-6 h-6 text-orange-600" />,
      accent: 'peach',
      badge: 'Daily Drops',
    },
    {
      title: 'Deep Preference Controls',
      description: 'Tune AI sliders for aesthetic intensity, color palettes, and budget bounds.',
      icon: <Sliders className="w-6 h-6 text-indigo-600" />,
      accent: 'lavender',
      badge: 'Full Control',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="pixel" pixelStar className="mb-3">
            FEATURES
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Designed to feel like{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              magic.
            </span>
          </h2>
          <p className="text-slate-600 mt-4 text-base">
            No clutter. No fake discounts. Just pure AI product discovery tailored to your exact taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl border border-white/80 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-purple-100 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <Badge variant={feature.accent as any} className="text-[10px]">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
