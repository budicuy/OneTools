import { testimonialData } from '../data';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Testimonials() {
  const { theme } = useTheme();

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
      id="testimonials-section"
      className={`py-16 sm:py-24 border-t px-4 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f0f2f5] border-slate-200/60' : 'bg-[#050505] border-white/5'
      }`}
    >
      <div className="absolute top-[20%] right-[15%] w-80 h-80 rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
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
              ? 'bg-purple-50 border-purple-200 text-purple-600' 
              : 'bg-white/5 border-white/10 text-purple-400'
          }`}>
            LOVED BY THE NEXT GENERATION
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-none transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Udah Banyak Yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 font-extrabold">Gak Mau Ribet</span>
          </h2>
          <p className={`max-w-2xl text-xs sm:text-sm mx-auto leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}>
            Dengerin curhatan jujur temen-temen kita yang udah nyobain sandbox One Tools buat nylesaiin sisa tugas kuliah atau kerjaan freelance-nya.
          </p>
        </motion.div>

        {/* Highlight Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {testimonialData.map((item) => (
            <motion.div 
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                borderColor: isLight ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.18)'
              }}
              className={`border rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 ${
                isLight 
                  ? 'bg-white border-slate-200 shadow-sm shadow-slate-100/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-white/5 pointer-events-none" />
              
              <div>
                {/* Visual Rating Stars */}
                <div className="flex items-center gap-1 text-amber-550 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed italic font-semibold transition-colors duration-300 ${
                  isLight ? 'text-slate-800' : 'text-white/80'
                }`}>
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Informative Avatar Rows */}
              <div className={`flex items-center gap-3.5 mt-6 pt-5 border-t transition-colors duration-350 ${
                isLight ? 'border-slate-100' : 'border-white/5'
              }`}>
                <img 
                  src={item.avatar} 
                  className={`h-10 w-10 rounded-xl object-cover border transition-colors ${
                    isLight ? 'border-slate-200' : 'border-white/10'
                  }`} 
                  alt={item.name}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className={`text-sm font-bold transition-colors ${
                    isLight ? 'text-slate-850' : 'text-white'
                  }`}>{item.name}</h4>
                  <p className={`text-[10px] font-mono font-medium transition-colors ${
                    isLight ? 'text-slate-400' : 'text-white/30'
                  }`}>{item.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
