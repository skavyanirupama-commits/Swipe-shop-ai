import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden bg-gradient-to-tr from-purple-200 via-pink-200 to-sky-200 border-2 border-white shadow-2xl glow-lavender"
        >
          <div className="absolute top-6 left-10 text-amber-400 text-2xl animate-pulse select-none">✦</div>
          <div className="absolute bottom-8 right-12 text-purple-600 text-3xl animate-float-slow select-none">✧</div>

          <Badge variant="pixel" pixelStar className="mb-4">
            START SWIPING IN 10 SECONDS
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-purple-950 tracking-tight mb-4">
            Ready to train your personal AI shopper?
          </h2>

          <p className="text-slate-700 max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed font-medium">
            Join thousands of shoppers discovering products they love every day. Free forever.
          </p>

          <div className="flex justify-center items-center gap-4">
            <Link to="/discover">
              <Button variant="primary" size="lg" pixelAccent rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Swiping Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
