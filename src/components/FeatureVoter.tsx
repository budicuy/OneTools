import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Plus, CheckCircle, HelpCircle, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface VoteCount {
  [key: string]: number;
}

export default function FeatureVoter() {
  const { theme } = useTheme();
  const [votes, setVotes] = useState<VoteCount>({
    compress: 421,
    'remove-bg': 512,
    'convert-file': 209,
    'ocr-copy': 314,
    calculator: 104,
    'binary-convert': 95,
    'pdf-editor': 288,
    'calendar-id': 340
  });

  const [votedKeys, setVotedKeys] = useState<string[]>([]);
  const [customSuggestion, setCustomSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Load votes and already voted keys from localStorage on mount
  useEffect(() => {
    try {
      const savedVotes = localStorage.getItem('one-tools-votes');
      const savedVotedKeys = localStorage.getItem('one-tools-voted-keys');
      
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes));
      }
      if (savedVotedKeys) {
        setVotedKeys(JSON.parse(savedVotedKeys));
      }
    } catch (e) {
      // LocalStorage blocked or empty
    }
  }, []);

  const handleVote = (key: string) => {
    if (votedKeys.includes(key)) {
      setToastMsg('Kamu udah upvote fitur ini, thank you bgt! ❤️');
      setTimeout(() => setToastMsg(''), 3050);
      return;
    }

    const updatedVotes = {
      ...votes,
      [key]: votes[key] + 1
    };
    const updatedVotedKeys = [...votedKeys, key];

    setVotes(updatedVotes);
    setVotedKeys(updatedVotedKeys);

    try {
      localStorage.setItem('one-tools-votes', JSON.stringify(updatedVotes));
      localStorage.setItem('one-tools-voted-keys', JSON.stringify(updatedVotedKeys));
    } catch (e) {
      // LocalStorage full or blocked
    }

    setToastMsg('Votemu Berhasil Dicatat! Developer langsung kebut pengerjaan 🚀');
    setTimeout(() => setToastMsg(''), 3050);
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSuggestion.trim()) return;

    setSuggestionSubmitted(true);
    setCustomSuggestion('');
    setTimeout(() => setSuggestionSubmitted(false), 5000);
  };

  // Convert keys to readable titles
  const getReadableTitle = (key: string): string => {
    switch (key) {
      case 'compress': return 'Kompresi Gambar';
      case 'remove-bg': return 'Remove BG AI';
      case 'convert-file': return 'Dokumen Converter';
      case 'ocr-copy': return 'Copy Teks OCR';
      case 'calculator': return 'Kalkulator Pro';
      case 'binary-convert': return 'Konverter Basis';
      case 'pdf-editor': return 'PDF Editor';
      case 'calendar-id': return 'Kalender Cuti';
      default: return key;
    }
  };

  // Calculate percentages
  const totalVotes = (Object.values(votes) as number[]).reduce((sum, current) => sum + current, 0);

  const isLight = theme === 'light';

  return (
    <section 
      id="vote-section"
      className={`py-16 sm:py-24 border-t border-b px-4 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f0f2f5] border-slate-200/60' : 'bg-[#050505] border-white/5'
      }`}
    >
      {/* Toast Alert Banner inside component scope */}
      {toastMsg && (
        <div id="voter-toast" className={`fixed top-24 right-4 z-50 flex items-center gap-2 font-bold px-5 py-3 rounded-full border animate-bounce shadow-xl transition-colors duration-300 ${
          isLight 
            ? 'bg-white text-slate-900 border-slate-200 shadow-slate-200/50' 
            : 'bg-white text-black border-white/10 shadow-black/80'
        }`}>
          <Heart className={`h-4 w-4 animate-pulse ${isLight ? 'text-red-500 fill-red-500' : 'text-black fill-black'}`} />
          <span className="text-xs">{toastMsg}</span>
        </div>
      )}

      {/* Floating glowing graphics */}
      <div className="absolute top-[30%] -left-32 w-64 h-64 rounded-full bg-violet-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-32 w-64 h-64 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className={`inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-3 font-sans border transition-all duration-300 ${
            isLight 
              ? 'bg-purple-50 border-purple-200 text-purple-600' 
              : 'bg-white/5 border-white/10 text-purple-400'
          }`}>
            COMMUNITY ORIENTED
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-none transition-colors duration-300 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Pilih Fitur Favoritmu Terlebih Dahulu!
          </h2>
          <p className={`max-w-xl text-xs sm:text-sm mx-auto leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}>
            Sesuai instruksimu, fitur-fitur lanjutan akan dibangun berkala! Upvote tool prioritasmu biar developer kita langsung bergadang menyelesaikannya!
          </p>
        </motion.div>

        {/* Voting lists and bars layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors duration-300 ${
            isLight 
              ? 'bg-white border-slate-200 shadow-slate-100/50' 
              : 'bg-white/5 border-white/10 shadow-none'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-semibold pb-4 border-b transition-colors duration-300 ${
            isLight ? 'text-slate-500 border-slate-150' : 'text-white/45 border-white/5'
          }`}>
            <span>Daftar Tool Rencana Rilis</span>
            <span>Total: <b className={`font-mono ${isLight ? 'text-slate-800' : 'text-white'}`}>{totalVotes}</b> Voted</span>
          </div>

          <div className="space-y-4">
            {Object.keys(votes).map((key, index) => {
              const count = votes[key] as number;
              const isVoted = votedKeys.includes(key);
              const percentage = totalVotes ? Math.round((count / totalVotes) * 100) : 0;

              return (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={key} 
                  className="space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold flex items-center gap-2 group-hover:text-purple-600 transition-colors ${
                      isLight ? 'text-slate-800' : 'text-white group-hover:text-purple-400'
                    }`}>
                      {isVoted && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                      {getReadableTitle(key)}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[10px] transition-colors duration-300 ${
                        isLight ? 'text-slate-400' : 'text-white/30'
                      }`}>{count} Votes ({percentage}%)</span>
                      <button
                        onClick={() => handleVote(key)}
                        className={`text-[10px] font-bold px-3.5 py-1.5 rounded-full border transition-all active:scale-95 cursor-pointer ${
                          isVoted 
                            ? isLight 
                              ? 'bg-slate-900 text-white border-transparent font-extrabold' 
                              : 'bg-white text-black border-transparent font-extrabold'
                            : isLight 
                              ? 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-200 font-bold' 
                              : 'bg-white/5 text-white/55 border-white/10 hover:border-white/20 hover:bg-white/10 font-bold'
                        }`}
                      >
                        {isVoted ? 'Voted!' : 'Vote 🔥'}
                      </button>
                    </div>
                  </div>
                  {/* Progress bar container */}
                  <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${
                    isLight ? 'bg-slate-100' : 'bg-white/5'
                  }`}>
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, Math.max(2, (percentage as number) * 3))}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* Dynamic suggestion card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`border rounded-2xl p-6 sm:p-8 transition-colors duration-300 shadow-sm ${
            isLight 
              ? 'bg-white border-slate-200 shadow-slate-100/50' 
              : 'bg-white/5 border-white/10'
          }`}
        >
          <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 font-sans transition-colors duration-300 ${
            isLight ? 'text-slate-800' : 'text-white'
          }`}>
            <MessageSquare className="h-5 w-5 text-cyan-500" />
            Punya Saran Tool Khusus Lainnya?
          </h3>
          <p className={`text-xs mb-6 leading-relaxed font-semibold transition-colors duration-300 ${
            isLight ? 'text-slate-500' : 'text-white/40'
          }`}>
            Nggak nemu tool produktivitas impianmu di daftar di atas? Ketik aja di bawah ini, admin kita bakal langsung dengerin saran gokil dari kamu!
          </p>

          {suggestionSubmitted ? (
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-xs text-center text-emerald-400 font-bold animate-pulse">
              🚀 Saran kamu berhasil mendarat di database backlog kami! Makasih bgt masukannya!
            </div>
          ) : (
            <form onSubmit={handleSuggestionSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Contoh: Generator QR Code Estetik, Pengubah Suara AI, Grid Banner, dll..."
                value={customSuggestion}
                onChange={(e) => setCustomSuggestion(e.target.value)}
                className={`w-full flex-1 text-xs p-3.5 rounded-xl focus:outline-none transition-colors border ${
                  isLight 
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500' 
                    : 'bg-[#050505] border border-white/10 text-white placeholder:text-white/30 focus:border-purple-400'
                }`}
              />
              <button
                type="submit"
                className={`w-full sm:w-auto font-extrabold px-6 py-3.5 rounded-full cursor-pointer shrink-0 transition-all active:scale-95 shadow-sm duration-300 ${
                  isLight 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                Kirim Saran Fitur
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
