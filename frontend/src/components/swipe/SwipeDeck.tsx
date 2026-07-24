import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { MOCK_PRODUCTS, type Product } from '../../data/mockProducts';
import { SwipeCard } from './SwipeCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const SwipeDeck: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [likedCount, setLikedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [aiConfidence, setAiConfidence] = useState(84);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (products.length === 0) return;

    if (direction === 'right') {
      setLikedCount((prev) => prev + 1);
      setAiConfidence((prev) => Math.min(99, prev + 3));
    } else {
      setPassedCount((prev) => prev + 1);
      setAiConfidence((prev) => Math.min(99, prev + 1));
    }

    setProducts((prev) => prev.slice(1));
  };

  const handleReset = () => {
    setProducts(MOCK_PRODUCTS);
    setLikedCount(0);
    setPassedCount(0);
    setAiConfidence(84);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
      {/* AI Telemetry Header Bar */}
      <div className="w-full glass-panel px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm border border-white/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-slate-700">AI Personalizing</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="pixel" className="text-[10px]">
            ✦ {aiConfidence}% CONFIDENCE
          </Badge>
          <span className="text-xs text-slate-500 font-mono">
            {likedCount} liked • {passedCount} passed
          </span>
        </div>
      </div>

      {/* Card Deck Container */}
      <div className="relative w-full h-[540px] flex items-center justify-center">
        <AnimatePresence>
          {products.length > 0 ? (
            products.slice(0, 2).map((product, index) => {
              const isTop = index === 0;
              return (
                <SwipeCard
                  key={product.id}
                  product={product}
                  onSwipe={handleSwipe}
                  isTopCard={isTop}
                />
              );
            }).reverse()
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-xl border border-white/80"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-200 via-pink-200 to-emerald-200 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-purple-900" />
              </div>
              <h3 className="font-extrabold text-2xl text-purple-950">
                You've Trained Your AI!
              </h3>
              <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                Your Neural Aesthetic Profile has updated with {likedCount} liked items. Ready for your fresh batch?
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleReset}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                pixelAccent
              >
                Reload Product Deck
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
