import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { getProducts } from "../../services/productService";

import { SwipeCard } from "./SwipeCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

interface Product {
  id: string;
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  tags: string[];
  aiReason: string;
  matchScore: number;
}

interface SwipeDeckProps {
  selectedCategory?: string;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({ selectedCategory = "All" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [likedCount, setLikedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [aiConfidence, setAiConfidence] = useState(84);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (selectedCategory && selectedCategory !== "All") {
        params.category = selectedCategory;
      }

      const data = await getProducts(params);
      const apiProducts = data.products || [];

      // Transform backend fields to match UI prop expectations cleanly
      const formattedProducts: Product[] = apiProducts.map((p: any, idx: number) => ({
        id: p._id,
        _id: p._id,
        name: p.title || p.name,
        brand: p.brand || "SwipeShop",
        category: p.category || "General",
        price: p.price,
        originalPrice: p.originalPrice || Math.round(p.price * 1.25),
        rating: p.rating || 4.8,
        reviewsCount: p.reviewsCount || 12,
        imageUrl:
          (p.images && p.images.length > 0 ? p.images[0] : p.thumbnail) ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        tags: p.tags && p.tags.length > 0 ? p.tags : [p.category || "trending"],
        aiReason:
          p.description ||
          "High alignment with your aesthetic preferences and trending styles.",
        matchScore: Math.min(99, 85 + (idx % 12)),
      }));

      setProducts(formattedProducts);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load products from server";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleSwipe = (direction: "left" | "right") => {
    if (products.length === 0) return;

    if (direction === "right") {
      setLikedCount((prev) => prev + 1);
      setAiConfidence((prev) => Math.min(99, prev + 3));
    } else {
      setPassedCount((prev) => prev + 1);
      setAiConfidence((prev) => Math.min(99, prev + 1));
    }

    setProducts((prev) => prev.slice(1));
  };

  const handleReset = () => {
    setLikedCount(0);
    setPassedCount(0);
    setAiConfidence(84);
    fetchProducts();
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
        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-xl border border-white/80 animate-pulse">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            <h3 className="font-extrabold text-lg text-purple-950">
              Fetching AI Recommendations...
            </h3>
            <p className="text-xs text-slate-500">
              Connecting to SwipeShop product catalog
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-xl border border-white/80">
            <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-900">
              Unable to Load Products
            </h3>
            <p className="text-xs text-slate-600 max-w-xs">{error}</p>
            <Button
              variant="primary"
              size="md"
              onClick={fetchProducts}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              pixelAccent
            >
              Retry Connection
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {products.length > 0 ? (
              products
                .slice(0, 2)
                .map((product, index) => {
                  const isTop = index === 0;
                  return (
                    <SwipeCard
                      key={product.id}
                      product={product as any}
                      onSwipe={handleSwipe}
                      isTopCard={isTop}
                    />
                  );
                })
                .reverse()
            ) : (
              /* Empty State */
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
        )}
      </div>
    </div>
  );
};

export default SwipeDeck;
