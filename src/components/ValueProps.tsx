import { valueProps } from '../data';
import { Sparkles, Globe, Award, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const PropIcon = ({ name, className }: { name: any; className?: string }) => {
  // Map standard constructors directly
  if (name === Globe) return <Globe className={className} />;
  if (name === Award) return <Award className={className} />;
  if (name === Shield) return <Shield className={className} />;
  if (name === Zap) return <Zap className={className} />;
  return <Sparkles className={className} />;
};

export default function ValueProps() {
  const { theme } = useTheme();

  const getPropIconColor = (index: number, isLight: boolean) => {
    if (isLight) {
      switch (index % 4) {
        case 0: return { bg: 'bg-cyan-100', text: 'text-cyan-600' };
        case 1: return { bg: 'bg-purple-100', text: 'text-purple-600' };
        case 2: return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
        default: return { bg: 'bg-amber-100', text: 'text-amber-700' };
      }
    } else {
      switch (index % 4) {
        case 0: return { bg: 'bg-cyan-500/20', text: 'text-cyan-400' };
        case 1: return { bg: 'bg-purple-500/20', text: 'text-purple-400' };
        case 2: return { bg: 'bg-emerald-500/20', text: 'text-emerald-400' };
        default: return { bg: 'bg-amber-500/20', text: 'text-amber-400' };
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const isLight = theme === 'light';

  return (
    <section 
      id="why-choose-us"
      className={`py-16 sm:py-24 px-4 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f0f2f5]' : 'bg-[#050505]'
      }`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className={`inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-4 font-sans border transition-all duration-300 ${
            isLight 
              ? 'bg-emerald-50 border-emerald-250 text-emerald-600' 
              : 'bg-white/5 border-white/10 text-emerald-400'
          }`}>
            ANTI OVERCOMPLICATION COMMITMENT
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Emang Beda Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">Simpel & Bersih</span>
          </h2>
          <p className={`max-w-xl text-xs sm:text-sm mx-auto leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}>
            Ngapain pusing pakai tool berbayar yang penuh jebakan paywall bulanan atau iklan aneh? One Tools didesain khusus buat ngebantu produktivitasmu tetap 100% fokus.
          </p>
        </motion.div>

        {/* 4 Items Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {valueProps.map((prop, index) => {
            const iconStyle = getPropIconColor(index, isLight);
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isLight ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.18)'
                }}
                className={`border rounded-2xl p-6 transition-all duration-300 ${
                  isLight 
                    ? 'bg-white border-slate-200 shadow-sm shadow-slate-100/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className={`w-10 h-10 ${iconStyle.bg} ${iconStyle.text} rounded-xl flex items-center justify-center mb-5`}>
                  <PropIcon name={prop.icon} className="h-5 w-5" />
                </div>

                <h3 className={`text-base font-bold mb-1.5 font-sans transition-colors duration-300 ${
                  isLight ? 'text-slate-800' : 'text-white'
                }`}>{prop.title}</h3>
                
                <p className={`text-xs leading-relaxed font-semibold transition-colors duration-300 ${
                  isLight ? 'text-slate-500' : 'text-white/40'
                }`}>{prop.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
