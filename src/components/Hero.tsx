import React, { useState, useEffect } from 'react';
import { ArrowDown, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0);
  const { theme } = useTheme();
  const words = ['KILAT', 'GRATIS', 'NO-ADS', 'AESTHETIC'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord(prev => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('features-explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const isLight = theme === 'light';

  return (
    <section 
      id="hero-section"
      className={`relative min-h-screen pt-36 pb-20 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 px-4 ${
        isLight ? 'bg-[#f7f8fa]' : 'bg-[#050505]'
      }`}
    >
      {/* Background glow effects - Clean Minimalism alignment with smooth motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          variants={glowVariants}
          animate="animate"
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-300 ${
            isLight ? 'bg-purple-500/10' : 'bg-purple-600/20'
          }`}
        />
        <motion.div 
          variants={glowVariants}
          animate="animate"
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-300 ${
            isLight ? 'bg-cyan-500/10' : 'bg-cyan-600/20'
          }`}
        />
        
        {/* Subtle grid pattern background */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] transition-opacity duration-300 ${
          isLight ? 'opacity-[0.05]' : 'opacity-[0.02]'
        }`} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        
        {/* Clean minimalism tracking badge */}
        <motion.div 
          variants={itemVariants}
          className={`inline-block px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-8 border transition-all duration-300 ${
            isLight 
              ? 'bg-purple-50 border-purple-250 text-purple-600' 
              : 'bg-white/5 border-white/10 text-purple-400'
          }`}
        >
          Zero Ads • Zero Fees • Max Performance
        </motion.div>

        {/* Dynamic Bold Typography Heading representing Gen Z with Clean Minimalism layout */}
        <motion.h1 
          variants={itemVariants}
          className={`text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight leading-[1.05] sm:leading-[0.95] mb-6 select-none transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Apaan tuh iklan?, Fu*k Ngapain bayar Langganan, <br />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Kita Kerja bukan Bayar iklan Samp*h!.
          </span>
        </motion.h1>

        {/* Sleek word switcher sub-heading */}
        <motion.div 
          variants={itemVariants}
          className="h-12 flex items-center justify-center overflow-hidden mb-6"
        >
          <p className={`text-base sm:text-l md:text-xl font-medium flex items-center gap-2 transition-colors duration-300 ${
            isLight ? 'text-slate-600' : 'text-white/50'
          }`}>
            Semua utility tools yang lu butuhin, jaminan 
            <span className="relative inline-flex font-bold w-[120px] h-8 items-center overflow-hidden text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[activeWord]}
                  initial={{ y: 15, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -15, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`absolute left-0 font-extrabold tracking-wide transition-colors duration-300 ${
                    isLight ? 'text-purple-600' : 'text-[#39ff14]'
                  }`}
                >
                  {words[activeWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
        </motion.div>

        {/* Gen Z friendly subheadline */}
        <motion.p 
          variants={itemVariants}
          className={`max-w-2xl text-sm sm:text-base mb-10 leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}
        >
          Nggak ada lagi pop-up jebakan, gembok premium bulanan, atau loading lemot. 
          Kompres gambar, hapus background, convert PDF & docx, OCR teks, hingga kalkulator kustom, 
          semuanya dikerjain instan di browsermu. 100% private, aman, & super kencang!
        </motion.p>

        {/* Interactive action controls aligned to Clean Minimalism */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4"
        >
          
          <button 
            id="hero-explore-button"
            onClick={handleScrollToGrid}
            className="group relative w-full sm:w-auto overflow-hidden rounded-full font-bold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
          >
            <div className={`relative flex items-center justify-center gap-2 text-sm px-8 py-4 rounded-full font-bold transition-all ${
              isLight 
                ? 'text-white bg-slate-900 hover:bg-slate-800' 
                : 'text-black bg-white hover:bg-neutral-100'
            }`}>
              <Zap className={`h-4 w-4 ${isLight ? 'text-white fill-white' : 'text-black fill-black'}`} />
              <span>Gasken Pakai Tools</span>
            </div>
          </button>

          <a 
            href="#why-choose-us"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border transition-all text-sm font-semibold px-8 py-4 rounded-full hover:scale-[1.02] ${
              isLight 
                ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700' 
                : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
            }`}
          >
            <ShieldCheck className={`h-4 w-4 ${isLight ? 'text-slate-600' : 'text-white/60'}`} />
            <span>Mekanisme Fungsional</span>
          </a>

        </motion.div>

        {/* Live status indicators */}
        <motion.div 
          variants={itemVariants}
          className={`mt-14 flex items-center flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.15em] font-mono transition-colors duration-300 ${
            isLight ? 'text-slate-400' : 'text-white/30'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <span>Client-side Process</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
            <span>Uncapped speed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>No limit count</span>
          </div>
        </motion.div>

        {/* Scroll Indicator Icon */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 animate-bounce"
        >
          <a
            href="#features-explore"
            onClick={handleScrollToGrid}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              isLight 
                ? 'border-slate-300 bg-white text-slate-500 hover:text-slate-800' 
                : 'border-white/10 bg-white/5 text-white/45 hover:text-white hover:border-white/20'
            }`}
            aria-label="Scroll Down"
          >
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

      </motion.div>

      {/* Decorative Wave/Border Cut */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t pointer-events-none transition-colors duration-300 ${
        isLight ? 'from-[#f7f8fa] to-transparent' : 'from-[#050505] to-transparent'
      }`} />
    </section>
  );
}
