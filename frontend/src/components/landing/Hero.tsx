import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SwipeDeck } from '../swipe/SwipeDeck';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Ambient Blurred Pastel Blobs Background */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-purple-200/50 blur-3xl -z-10 animate-float-slow" />
      <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full bg-pink-200/50 blur-3xl -z-10 animate-float-reverse" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl -z-10 animate-pulse-soft" />

      {/* Floating Pixel Stars */}
      <div className="absolute top-24 left-10 text-amber-400 text-xl animate-pulse select-none">✦</div>
      <div className="absolute top-1/3 right-12 text-pink-400 text-2xl animate-float-slow select-none">✧</div>
      <div className="absolute bottom-20 left-16 text-purple-400 text-lg animate-float-reverse select-none">✦</div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Top AI Badge */}
          <Badge variant="pixel" pixelStar className="py-1 px-3">
            NEXT-GEN AI SHOPPING DISCOVERY
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Discover Products You'll{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 bg-clip-text text-transparent">
              Actually Love.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
            Swipe products. Train your personal AI. Get smarter, hyper-personalized aesthetic recommendations every single day.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/discover">
              <Button variant="primary" size="lg" pixelAccent rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Swiping
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Play className="w-4 h-4 fill-purple-900 text-purple-900" />}
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-purple-200/50 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>100% Privacy Protected AI</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-pink-500" />
              <span>500k+ Aesthetic Swipes Daily</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating Phone Mockup with Live Interactive Swipe Deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Ambient Shadow Glow behind phone */}
            <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-r from-purple-300 via-pink-300 to-sky-300 opacity-60 blur-2xl -z-10 animate-pulse-soft" />

            {/* Phone Frame */}
            <div className="glass-panel rounded-[42px] p-4 shadow-2xl border-4 border-white/90 bg-white/40">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-slate-800/20 backdrop-blur-md rounded-full mx-auto mb-3" />

              {/* Interactive Swipe Deck */}
              <SwipeDeck />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;