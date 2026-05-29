import { useState } from 'react';
import { 
  FileImage, Eraser, RefreshCw, ScanText, Calculator, Binary, FilePenLine, Calendar,
  Search, Lock
} from 'lucide-react';
import { toolsData, ToolFeature } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface ToolsGridProps {
  onSelectTool: (tool: ToolFeature) => void;
}

// Custom type-safe lookup component for Lucide Icons
const UtilityIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'FileImage': return <FileImage className={className} />;
    case 'Eraser': return <Eraser className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'ScanText': return <ScanText className={className} />;
    case 'Calculator': return <Calculator className={className} />;
    case 'Binary': return <Binary className={className} />;
    case 'FilePenLine': return <FilePenLine className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    default: return <FileImage className={className} />;
  }
};

export default function ToolsGrid({ onSelectTool }: ToolsGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { theme } = useTheme();

  const categories = [
    { id: 'ALL', name: 'Semua Tools ⚡' },
    { id: 'IMAGE', name: 'Gambar & Foto' },
    { id: 'DOCUMENT', name: 'Dokumen & PDF' },
    { id: 'UTILITY', name: 'Produktif & Kalkulasi' }
  ];

  const getMinimalistIconStyles = (id: string, isLight: boolean) => {
    if (isLight) {
      switch (id) {
        case 'compress':
          return { bg: 'bg-purple-100', text: 'text-purple-600' };
        case 'remove-bg':
          return { bg: 'bg-pink-100', text: 'text-pink-600' };
        case 'convert-file':
          return { bg: 'bg-cyan-100', text: 'text-cyan-600' };
        case 'ocr-copy':
          return { bg: 'bg-orange-100', text: 'text-orange-600' };
        case 'calculator':
          return { bg: 'bg-blue-100', text: 'text-blue-600' };
        case 'binary-convert':
          return { bg: 'bg-green-100', text: 'text-green-600' };
        case 'pdf-editor':
          return { bg: 'bg-indigo-100', text: 'text-indigo-600' };
        case 'calendar-id':
          return { bg: 'bg-red-100', text: 'text-red-600' };
        default:
          return { bg: 'bg-purple-100', text: 'text-purple-600' };
      }
    } else {
      switch (id) {
        case 'compress':
          return { bg: 'bg-purple-500/20', text: 'text-purple-400' };
        case 'remove-bg':
          return { bg: 'bg-pink-500/20', text: 'text-pink-400' };
        case 'convert-file':
          return { bg: 'bg-cyan-500/20', text: 'text-cyan-400' };
        case 'ocr-copy':
          return { bg: 'bg-orange-500/20', text: 'text-orange-400' };
        case 'calculator':
          return { bg: 'bg-blue-500/20', text: 'text-blue-400' };
        case 'binary-convert':
          return { bg: 'bg-green-500/20', text: 'text-green-400' };
        case 'pdf-editor':
          return { bg: 'bg-indigo-500/20', text: 'text-indigo-400' };
        case 'calendar-id':
          return { bg: 'bg-red-500/20', text: 'text-red-400' };
        default:
          return { bg: 'bg-purple-500/20', text: 'text-purple-400' };
      }
    }
  };

  // Helper taxonomy logic
  const getCategoryTheme = (id: string): string => {
    switch (id) {
      case 'compress':
      case 'remove-bg':
      case 'ocr-copy':
        return 'IMAGE';
      case 'convert-file':
      case 'pdf-editor':
        return 'DOCUMENT';
      case 'calculator':
      case 'binary-convert':
      case 'calendar-id':
        return 'UTILITY';
      default:
        return 'IMAGE';
    }
  };

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || getCategoryTheme(tool.id) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isLight = theme === 'light';

  return (
    <section 
      id="features-explore"
      className={`py-14 sm:py-24 px-4 relative overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f0f2f5]' : 'bg-[#050505]'
      }`}
    >
      {/* Decorative Glow Layer inside content section */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left md:flex md:items-end md:justify-between mb-12"
        >
          <div>
            <div className={`inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-4 font-sans border transition-all duration-300 ${
              isLight 
                ? 'bg-purple-50 border-purple-200 text-purple-600' 
                : 'bg-white/5 border-white/10 text-purple-400'
            }`}>
              SUPERCHARGED PRODUCTIVITY
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-none transition-colors duration-300 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">8 Tool Skena</span> Andalan
            </h2>
            <p className={`max-w-3xl text-xs sm:text-sm leading-relaxed font-semibold transition-colors duration-300 ${
              isLight ? 'text-slate-500' : 'text-white/45'
            }`}>
              Pilih tool produktivitas harianmu di bawah ini. Sesuai pesanmu, semuanya masih berstatus landing page dengan simulasi demonstratif (sandbox) interaktif biar lu bisa coba fungsionalnya sebelum di-deploy total!
            </p>
          </div>

          <div className="hidden md:block text-right pt-4 shrink-0 font-mono">
            <span className={`text-[10px] uppercase tracking-widest block mb-1 transition-colors duration-300 ${isLight ? 'text-slate-400' : 'text-white/30'}`}>Integrated Modules:</span>
            <div className={`text-sm font-bold flex items-center justify-end gap-1.5 border px-3 py-1 rounded-full transition-all duration-300 ${
              isLight 
                ? 'bg-white border-slate-200 text-slate-850' 
                : 'bg-white/5 border-white/5 text-white'
            }`}>
              <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse"></span>
              <span className={`text-[11px] tracking-wider transition-colors duration-300 ${isLight ? 'text-slate-700' : 'text-white/80'}`}>LATENCY: 12MS</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Search & Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-4 rounded-2xl mb-10 flex flex-col lg:flex-row items-center gap-4 shadow-xl border transition-all duration-300 ${
            isLight 
              ? 'bg-white border-slate-200/80 shadow-slate-200/20' 
              : 'bg-white/5 border-white/10 shadow-black/60'
          }`}
        >
          
          {/* Search bar inside container */}
          <div className="relative w-full lg:flex-1">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isLight ? 'text-slate-400' : 'text-white/40'}`} />
            <input 
              type="text" 
              placeholder="Cari nama tool (misal: kompres, pdf, kalkulator)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full text-xs pr-4 py-3 pl-11 rounded-xl focus:outline-none transition-all placeholder:transition-colors duration-300 border ${
                isLight 
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-450 hover:border-slate-300 focus:border-purple-500' 
                  : 'bg-[#050505] border border-white/10 text-white placeholder:text-white/30 hover:border-white/20 focus:border-purple-400 hover:shadow-inner'
              }`}
            />
          </div>

          {/* Categories tag toggles */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id 
                    ? isLight
                      ? 'bg-slate-900 text-white border-transparent shadow-sm font-extrabold scale-102 font-sans'
                      : 'bg-white text-black border-transparent shadow-md font-extrabold scale-102 font-sans' 
                    : isLight
                      ? 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-250 font-bold'
                      : 'bg-white/5 text-white/50 border-white/5 hover:text-white hover:bg-white/10 font-bold'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </motion.div>

        {/* Tools Cards Grid */}
        {filteredTools.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => {
                const theme = getMinimalistIconStyles(tool.id, isLight);
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    whileHover={{ 
                      y: -4, 
                      borderColor: isLight ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.2)',
                      backgroundColor: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.08)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 240,
                      damping: 24,
                      opacity: { duration: 0.2 }
                    }}
                    key={tool.id}
                    onClick={() => onSelectTool(tool)}
                    className={`group relative flex flex-col justify-between rounded-2xl p-6 cursor-pointer overflow-hidden h-full border transition-colors duration-300 ${
                      isLight 
                        ? 'bg-white border-slate-200 shadow-sm shadow-slate-100/50' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    {/* Card Top Section */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      
                      {/* Icon & Badge Row */}
                      <div className="flex items-center justify-between mb-5">
                        
                        {/* The Minimalism Icon Container */}
                        <div className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                          <UtilityIcon name={tool.iconName} className={`h-5 w-5 ${theme.text}`} />
                        </div>

                        {/* Gen Z styled badges */}
                        <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md border transition-colors duration-300 ${
                          isLight 
                            ? 'border-slate-300 bg-slate-50 text-slate-600' 
                            : `${tool.badgeColor} bg-white/5`
                        }`}>
                          {tool.badge}
                        </span>

                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-base font-bold mb-1.5 font-sans transition-colors duration-300 ${
                        isLight 
                          ? 'text-slate-800 group-hover:text-purple-600' 
                          : 'text-white group-hover:text-purple-400'
                      }`}>
                        {tool.name}
                      </h3>
                      
                      <p className={`text-xs leading-relaxed font-semibold mb-4 flex-1 transition-colors duration-300 ${
                        isLight ? 'text-slate-500' : 'text-white/40'
                      }`}>
                        {tool.description}
                      </p>

                    </div>

                    {/* Card Bottom / Sandbox trigger */}
                    <div className={`relative z-10 mt-auto pt-4 flex items-center justify-between text-[11px] border-t transition-colors duration-300 ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}>
                      
                      {/* Metric indicator */}
                      <div className={`font-mono font-semibold tracking-wide transition-colors duration-300 ${
                        isLight ? 'text-slate-400/80' : 'text-white/30'
                      }`}>
                        {tool.metrics}
                      </div>

                      {/* Play Link Button */}
                      <button 
                        id={`test-sandbox-${tool.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTool(tool);
                        }}
                        className={`flex items-center gap-1 font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-[10px] ${
                          isLight 
                            ? 'bg-purple-50 text-purple-600 hover:bg-purple-650 hover:text-white border-purple-150' 
                            : 'bg-[#39ff14]/10 text-[#39ff14] hover:bg-[#39ff14] hover:text-black border-[#39ff14]/20'
                        }`}
                      >
                        <span>Try Sandbox</span>
                        <span>→</span>
                      </button>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search Fallback */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-16 rounded-2xl max-w-lg mx-auto border transition-colors duration-300 ${
              isLight 
                ? 'bg-white border-slate-200 shadow-sm' 
                : 'bg-white/5 border-white/10'
            }`}
          >
            <Lock className={`h-10 w-10 mx-auto mb-3 transition-colors duration-300 ${
              isLight ? 'text-slate-300' : 'text-white/30'
            }`} />
            <h4 className={`text-sm font-bold transition-colors duration-300 ${isLight ? 'text-slate-800' : 'text-white'}`}>Tool Gak Ditemuin nih</h4>
            <p className={`text-xs mt-1 max-w-xs mx-auto transition-colors duration-300 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
              Periksa ejaan Anda atau ketik kata kunci lain (seperti &apos;kompres&apos; atau &apos;pdf&apos;) untuk mencari alat yang cocok.
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
