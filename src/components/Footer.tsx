import { Zap, Heart, Disc, Github, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  
  const isLight = theme === 'light';

  return (
    <footer 
      id="main-footer"
      className={`py-12 px-4 relative z-10 font-sans border-t transition-colors duration-300 ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#050505] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and Tagline matching Clean Minimalism style */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-xs tracking-tighter text-white shadow-lg shadow-purple-500/20 animate-pulse">
              <span>1</span>
            </div>
            <span className={`text-sm font-black tracking-tight font-sans transition-colors ${
              isLight ? 'text-slate-900' : 'text-white/90'
            }`}>
              ONETOOLS
            </span>
          </div>
          <p className={`text-[10px] max-w-sm font-semibold transition-colors ${
            isLight ? 'text-slate-450' : 'text-white/30'
          }`}>
            Koleksi alat produktivitas super kilat tanpa iklan, tanpa paywall, & 100% aman untuk kebutuhan sehari-hari pekerja produktif dan pelajar masa kini.
          </p>
        </div>

        {/* Center community credentials / disclaimer */}
        <div className="text-center font-medium">
          <p className={`text-[11px] flex items-center justify-center gap-1 font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-600' : 'text-white/40'
          }`}>
            Build with <Heart className="h-3 w-3 text-pink-500 fill-pink-500" /> for the Indonesian developer community.
          </p>
          <p className={`text-[10px] mt-1 uppercase tracking-[0.15em] font-mono transition-colors duration-300 ${
            isLight ? 'text-slate-400' : 'text-white/30'
          }`}>
            &copy; {currentYear} ONETOOLS PROJECT • ZERO ADS • MAX PERFORMANCE
          </p>
        </div>

        {/* Social Icons Links */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-xs' 
                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10'
            }`}
            title="GitHub Codebase"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-xs' 
                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10'
            }`}
            title="Twitter / X Feed"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-xs' 
                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10'
            }`}
            title="Join Discord Circle"
          >
            <Disc className="h-4 w-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
