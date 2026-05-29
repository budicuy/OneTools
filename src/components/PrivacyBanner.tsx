import React from 'react';
import { ShieldCheck, EyeOff, Github, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyBanner() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section 
      id="privacy-transparency"
      className={`py-16 px-4 relative overflow-hidden border-t transition-colors duration-300 ${
        isLight ? 'bg-[#f0f2f5] border-slate-200/65' : 'bg-[#050505] border-white/5'
      }`}
    >
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-[30%] left-[5%] w-72 h-72 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-72 h-72 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className={`inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-3 font-sans border transition-all duration-300 ${
            isLight 
              ? 'bg-purple-50 border-purple-200 text-purple-600' 
              : 'bg-white/5 border-white/10 text-purple-400'
          }`}>
            COMMITMENT & TRANSPARENCY
          </div>
          <h2 className={`text-2xl sm:text-4xl font-black tracking-tight mb-3 transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Transparansi Kode & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Jaminan Privasi 100%</span>
          </h2>
          <p className={`max-w-xl text-xs sm:text-sm mx-auto leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}>
            Kami percaya bahwa peralatan kerja harian harus aman, terpercaya, dan bebas dari pelacakan tersembunyi yang merusak fokus Anda.
          </p>
        </motion.div>

        {/* Informative Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Box 1: Open Source & Security Audit */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              isLight 
                ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100/50' 
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/10 text-purple-400'
              }`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className={`text-lg font-bold mb-3 font-sans transition-colors ${
                isLight ? 'text-slate-800' : 'text-white'
              }`}>
                100% Open Source & Audit Terbuka
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed font-semibold transition-colors ${
                isLight ? 'text-slate-500' : 'text-white/40'
              }`}>
                Aplikasi ini sepenuhnya bersifat open-source dan transparan. Siapa pun boleh meninjau, menguji, dan mengaudit kode sumber kami kapan saja demi kenyamanan bersama. Kami menjamin tidak ada kode tersembunyi atau celah keamanan ilegal yang masuk ke sistem kami. Seluruh kode asli dapat diakses bebas di repositori resmi GitHub kami.
              </p>
            </div>
            
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                  isLight 
                    ? 'bg-slate-900 border-transparent text-white hover:bg-slate-800' 
                    : 'bg-white border-transparent text-black hover:bg-neutral-100'
                }`}
              >
                <Github className="h-4 w-4" />
                <span>Audit Kode di GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Box 2: Secure Non-Sensitive Data Only */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              isLight 
                ? 'bg-white border-slate-200/90 shadow-sm shadow-slate-100/50' 
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                isLight ? 'bg-cyan-100 text-cyan-600' : 'bg-cyan-500/10 text-cyan-400'
              }`}>
                <EyeOff className="h-5 w-5" />
              </div>
              <h3 className={`text-lg font-bold mb-3 font-sans transition-colors ${
                isLight ? 'text-slate-800' : 'text-white'
              }`}>
                Privasi Terjaga Tanpa Pengumpulan Data Pribadi
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed font-semibold transition-colors ${
                isLight ? 'text-slate-500' : 'text-white/40'
              }`}>
                Kami sama sekali tidak mengumpulkan akun, sandi, email, atau berkas pribadi Anda saat diproses di sandbox ini. Satu-satunya data yang kami kumpulkan hanyalah masukan yang bersifat umum demi fungsionalitas backlog, seperti pilihan suara (voting) fitur Anda, usul alat baru, feedback instan, serta ulasan komentar. Semua itu Anda kirimkan secara anonim, sukarela, dan tanpa pakasaan apa pun.
              </p>
            </div>
            
            <div className={`mt-6 pt-5 border-t flex items-center gap-2 text-[10px] font-semibold transition-colors cursor-default ${
              isLight ? 'border-slate-100 text-slate-400' : 'border-white/5 text-white/30'
            }`}>
              <HeartHandshake className="h-4 w-4 text-cyan-500" />
              <span>Saran dsb dikirim anonim tanpa melacak informasi personal Anda.</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
