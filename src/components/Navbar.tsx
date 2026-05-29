import { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, ChevronRight, Share2, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1337);
  const { theme, toggleTheme } = useTheme();

  // Animate dynamic user count to simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(1300, Math.min(1500, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'One Tools',
        text: 'Website utility gratis tanpa iklan dengan design modern ala Gen Z! 🚀',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link One Tools berhasil disalin! Bagikan ke circle kamu 🚀');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme === 'light';

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? isLight
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/60 py-4 shadow-lg shadow-slate-100/40'
            : 'bg-[#050505]/90 backdrop-blur-xl border-white/5 py-4 shadow-lg shadow-black/45' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo with Clean Minimalism aesthetic */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-lg tracking-tighter text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105">
              <span>1</span>
            </div>
            <span className={`text-xl sm:text-2xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60'
            } font-sans`}>
              ONETOOLS
            </span>
          </a>

          {/* Center Links (Desktop) */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${
            isLight ? 'text-slate-600' : 'text-white/50'
          }`}>
            <a href="#features-explore" className={`hover:text-purple-600 transition-colors ${isLight ? 'hover:text-purple-600 text-slate-700' : 'hover:text-white'}`}>Features</a>
            <a href="#why-choose-us" className={`hover:text-purple-600 transition-colors ${isLight ? 'hover:text-purple-600 text-slate-700' : 'hover:text-white'}`}>Performance</a>
            <a href="#vote-section" className={`hover:text-purple-600 transition-colors ${isLight ? 'hover:text-purple-600 text-slate-700' : 'hover:text-white'}`}>Upvote & Saran</a>
            <a href="#testimonials-section" className={`hover:text-purple-600 transition-colors ${isLight ? 'hover:text-purple-600 text-slate-700' : 'hover:text-white'}`}>Social Feed</a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors duration-300 ${
              isLight 
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700' 
                : 'border-emerald-500/10 bg-emerald-500/5 text-emerald-400'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{activeUsers} Online</span>
            </div>

            {/* Free badge */}
            <span className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.15em] font-bold rounded-full hidden sm:inline-block border transition-colors duration-300 ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-slate-700' 
                : 'bg-white/5 border-white/10 text-white/90'
            }`}>
              FREE ACCESS
            </span>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all active:scale-95 cursor-pointer ${
                isLight 
                  ? 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm' 
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {isLight ? <Moon className="h-4.5 w-4.5 text-violet-600" /> : <Sun className="h-4.5 w-4.5 text-yellow-400 animate-pulse" />}
            </button>

            {/* Share Button (Mobile/Desktop) */}
            <button 
              id="share-app-button"
              onClick={handleShare}
              className={`flex items-center justify-center gap-2 font-bold text-xs px-4 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm ${
                isLight 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
