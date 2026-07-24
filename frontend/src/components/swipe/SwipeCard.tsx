import React from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, X, Bookmark, Star } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface SwipeCardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right') => void;
  isTopCard?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  product,
  onSwipe,
  isTopCard = false,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0.4, 1, 1, 1, 0.4]);

  // Dynamic overlays during drag
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      triggerConfetti();
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D8B4F8', '#FFD1DC', '#34D399', '#38BDF8'],
    });
  };

  return (
    <motion.div
      style={{
        x: isTopCard ? x : 0,
        rotate: isTopCard ? rotate : 0,
        opacity: isTopCard ? opacity : 1,
      }}
      drag={isTopCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className={`absolute inset-0 w-full h-full glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/80 select-none flex flex-col justify-between transition-shadow duration-300 ${
        isTopCard ? 'cursor-grab z-20 hover:shadow-[0_25px_60px_-15px_rgba(216,180,248,0.4)]' : 'z-10 scale-[0.96] translate-y-3 opacity-90'
      }`}
    >
      {/* Swipe Overlay Badges */}
      {isTopCard && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-6 left-6 z-30 bg-emerald-400/90 text-white font-extrabold px-5 py-2 rounded-2xl border-2 border-white shadow-lg text-lg tracking-wider transform -rotate-12 backdrop-blur-md"
          >
            LIKE ♥
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-6 right-6 z-30 bg-pink-500/90 text-white font-extrabold px-5 py-2 rounded-2xl border-2 border-white shadow-lg text-lg tracking-wider transform rotate-12 backdrop-blur-md"
          >
            PASS ✕
          </motion.div>
        </>
      )}

      {/* Product Image Area */}
      <div className="relative h-[62%] w-full overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <Badge variant="pixel" pixelStar>
            {product.matchScore}% MATCH
          </Badge>
          <Badge variant="pink" className="bg-white/80 backdrop-blur-md">
            {product.brand}
          </Badge>
        </div>

        {/* Floating Rating & Discount */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 text-white">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-200 block mb-0.5">
              {product.category}
            </span>
            <h3 className="font-extrabold text-xl leading-tight line-clamp-1 drop-shadow-sm">
              {product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs text-slate-300 line-through">
              ${product.originalPrice}
            </span>
            <span className="text-2xl font-black text-emerald-300 drop-shadow">
              ${product.price}
            </span>
          </div>
        </div>
      </div>

      {/* Product AI Explanation & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white/70 backdrop-blur-md">
        {/* AI Explanation Box */}
        <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200/60 flex items-start gap-2.5 shadow-inner">
          <div className="p-1.5 rounded-xl bg-purple-200/70 text-purple-900 shrink-0">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <p className="text-xs text-purple-950 leading-relaxed font-medium">
            <span className="font-bold">AI Insight:</span> {product.aiReason}
          </p>
        </div>

        {/* Tags Row */}
        <div className="flex items-center gap-1.5 flex-wrap my-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80"
            >
              #{tag}
            </span>
          ))}
          <span className="ml-auto text-xs font-bold text-amber-600 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Swipe Action Buttons */}
        {isTopCard && (
          <div className="flex items-center justify-center gap-5 pt-1">
            <Button
              variant="outline"
              size="md"
              onClick={() => onSwipe('left')}
              className="w-13 h-13 rounded-full !p-0 border-pink-300/80 hover:bg-pink-100/60 text-pink-600 shadow-md"
              aria-label="Pass Product"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-11 h-11 rounded-full !p-0 border-sky-300 text-sky-600 shadow-md"
              aria-label="Save to Wishlist"
            >
              <Bookmark className="w-5 h-5" />
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                triggerConfetti();
                onSwipe('right');
              }}
              className="w-13 h-13 rounded-full !p-0 bg-gradient-to-r from-emerald-300 to-mint-100 text-emerald-950 border-emerald-300 shadow-lg glow-mint"
              aria-label="Like Product"
            >
              <Heart className="w-6 h-6 fill-emerald-800" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
