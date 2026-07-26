import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the SwipeShop AI algorithm learn my taste?',
      a: 'Our neural recommendation engine tracks implicit swipe vectors—analyzing product silhouettes, color palettes, price bands, and brand archetypes to fine-tune your personalized recommendations after as few as 5 swipes.',
    },
    {
      q: 'Is SwipeShop an e-commerce store or a discovery feed?',
      a: 'SwipeShop is a next-generation AI discovery platform. We connect you directly to authentic brand checkouts with curated member discounts and zero marketplace clutter.',
    },
    {
      q: 'Can I tune or reset my AI aesthetic profile?',
      a: 'Yes! You can adjust your preference sliders anytime inside your Profile dashboard or completely reset your neural weights with a single click.',
    },
    {
      q: 'Is my data private and secure?',
      a: '100%. We never sell your personal data or browsing history to third-party ad networks. Your swipes train your personal local AI model exclusively.',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="peach" pixelStar className="mb-3">
            FREQUENTLY ASKED
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="glass-panel rounded-2xl overflow-hidden border border-white/80 transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div className={`p-2 rounded-xl bg-purple-100/60 text-purple-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-purple-100/60 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
