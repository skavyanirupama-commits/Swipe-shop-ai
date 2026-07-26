import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Sparkles, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24 border-t border-purple-200/40 bg-gradient-to-b from-white/40 to-purple-100/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-300 to-pink-200 flex items-center justify-center shadow-sm">
                <span className="text-purple-950 font-bold text-sm">✦</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-950 to-pink-900 bg-clip-text text-transparent">
                SwipeShop
              </span>
              <Badge variant="pink" className="text-[10px]">
                Gen Z AI
              </Badge>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              AI-powered shopping discovery where every swipe trains your personal aesthetic recommendation engine. Discover products you'll actually love.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#community"
                aria-label="Community"
                className="w-8 h-8 rounded-full bg-white/70 border border-purple-200/60 flex items-center justify-center text-slate-600 hover:text-purple-900 hover:bg-white transition-all shadow-sm"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#share"
                aria-label="Share"
                className="w-8 h-8 rounded-full bg-white/70 border border-purple-200/60 flex items-center justify-center text-slate-600 hover:text-purple-900 hover:bg-white transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#chat"
                aria-label="Support"
                className="w-8 h-8 rounded-full bg-white/70 border border-purple-200/60 flex items-center justify-center text-slate-600 hover:text-purple-900 hover:bg-white transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide uppercase text-xs">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/discover" className="hover:text-purple-900 transition-colors">
                  AI Swipe Deck
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-purple-900 transition-colors">
                  Personalization
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-purple-900 transition-colors">
                  Curated Catalog
                </a>
              </li>
              <li>
                <Link to="/profile" className="hover:text-purple-900 transition-colors">
                  Aesthetic Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide uppercase text-xs">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#about" className="hover:text-purple-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-purple-900 transition-colors flex items-center gap-1.5">
                  Careers
                  <Badge variant="mint" className="py-0 px-1.5 text-[9px]">Hiring</Badge>
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-purple-900 transition-colors">
                  Aesthetic AI Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide uppercase text-xs">
              Legal & Safety
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#privacy" className="hover:text-purple-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-purple-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-purple-900 transition-colors">
                  AI Ethics
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-200/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SwipeShop Inc. Crafted with precision for Gen Z shoppers.</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="font-semibold text-slate-700">Neural Aesthetic Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
