import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Discover', path: '/discover', icon: <Compass className="w-4 h-4" /> },
    { name: 'Features', path: '/#features', icon: <Zap className="w-4 h-4" /> },
    { name: 'AI Engine', path: '/#ai-engine', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'About', path: '/#about', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <nav className="glass-pill px-5 py-3 rounded-full flex items-center justify-between shadow-[0_10px_30px_-5px_rgba(216,180,248,0.35)] border border-white/80 transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-300 via-pink-200 to-sky-200 flex items-center justify-center shadow-md border border-white/80 group-hover:scale-105 transition-transform duration-200">
            <span className="text-purple-950 font-bold text-lg select-none">✦</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-purple-950 via-slate-800 to-purple-900 bg-clip-text text-transparent">
                SwipeShop
              </span>
              <Badge variant="pixel" className="px-1.5 py-0.5 text-[9px]">
                AI
              </Badge>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/40 p-1 rounded-full border border-white/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-purple-950' : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/discover">
            <Button variant="primary" size="sm" pixelAccent>
              Start Swiping
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 rounded-full text-slate-700 hover:bg-white/60 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="sm:hidden glass-panel p-5 rounded-3xl mt-2 flex flex-col gap-3 shadow-xl border border-white/80"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 rounded-2xl hover:bg-purple-100/50 transition-colors"
              >
                <div className="p-2 rounded-xl bg-purple-100/60 text-purple-900">
                  {link.icon}
                </div>
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="h-px bg-purple-200/40 my-1" />
            <div className="flex flex-col gap-2">
              <Link to="/discover" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full" pixelAccent>
                  Start Swiping
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;