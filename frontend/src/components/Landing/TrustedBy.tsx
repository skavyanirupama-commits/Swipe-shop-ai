import React from 'react';
import { motion } from 'framer-motion';

export const TrustedBy: React.FC = () => {
  const brands = [
    { name: 'NIKE AURA', icon: '✦' },
    { name: 'NORDIC AUDIO', icon: '✧' },
    { name: 'MAISON CLAIRE', icon: '✦' },
    { name: 'LUMINA LIGHTS', icon: '✧' },
    { name: 'LOOM & THREAD', icon: '✦' },
    { name: 'COSMOS LABS', icon: '✧' },
  ];

  return (
    <section className="py-12 border-y border-purple-200/40 bg-white/30 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
          CURATING TRENDS FOR TOP GEN-Z BRANDS
        </p>

        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14 opacity-70">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base tracking-wider hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-purple-600 text-xs">{brand.icon}</span>
              <span>{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
