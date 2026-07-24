import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { SwipeDeck } from '../../components/swipe/SwipeDeck';
import { Badge } from '../../components/ui/Badge';

export const Discover: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Footwear', 'Apparel', 'Tech & Lifestyle', 'Home Tech', 'Accessories'];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 px-4 max-w-5xl mx-auto w-full flex-1 flex flex-col items-center">
        {/* Top Discovery Header */}
        <div className="text-center mb-8 max-w-xl mx-auto">
          <Badge variant="pixel" pixelStar className="mb-2">
            TINDER-STYLE AI DISCOVERY
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Swipe. Train. Discover.
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Swipe right to save and train your neural taste profile. Swipe left to pass.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-2 px-1 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md transition-all whitespace-nowrap select-none cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-950 text-white shadow-md'
                  : 'glass-panel text-slate-700 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Swipe Deck Interface */}
        <div className="w-full flex justify-center">
          <SwipeDeck />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
