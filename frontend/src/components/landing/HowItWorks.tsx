import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Brain, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Swipe Products',
      description: 'Swipe right on products you love, swipe left on products you pass.',
      icon: <MousePointerClick className="w-6 h-6 text-purple-600" />,
    },
    {
      step: '02',
      title: 'AI Learns Taste',
      description: 'Our neural aesthetic engine decodes your implicit color, texture, and style preferences.',
      icon: <Brain className="w-6 h-6 text-pink-600" />,
    },
    {
      step: '03',
      title: 'Discover Better Drop',
      description: 'Unlock daily personalized drops with high match scores and curated deals.',
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <section id="ai-engine" className="py-24 relative bg-purple-50/40 backdrop-blur-md border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="mint" pixelStar className="mb-3">
            3-STEP PROCESS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How SwipeShop Works
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            No long questionnaires. Just instant intuitive swiping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border border-white/90 shadow-lg relative flex flex-col items-start gap-4"
            >
              <div className="flex items-center justify-between w-full">
                <span className="pixel-font text-3xl font-black text-purple-300">
                  {s.step}
                </span>
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-purple-100">
                  {s.icon}
                </div>
              </div>

              <h3 className="font-extrabold text-xl text-slate-900 mt-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
