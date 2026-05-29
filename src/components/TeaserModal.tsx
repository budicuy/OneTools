import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Download, Check, RefreshCw, Copy, Trash2, 
  Percent, ArrowRight, HelpCircle, AlertCircle, Calendar as CalendarIcon, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pure framer-motion Confetti Particle burst for rewarding completion animation
function ConfettiBurst() {
  const colors = [
    '#39ff14', // Neon Green
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#10b981', // Emerald
    '#3b82f6', // Blue
  ];
  const shapes = ['circle', 'square', 'triangle', 'bar'];

  // Create 70 particles with rich variety
  const particles = Array.from({ length: 70 }).map((_, i) => {
    // Determine a random angle (skewed upwards, so between 140 and 400 degrees)
    const angle = (140 + Math.random() * 260) * (Math.PI / 180);
    const speed = 10 + Math.random() * 15;
    
    // Final coordinate calculations
    const xDist = Math.cos(angle) * speed * 22;
    const yDist = Math.sin(angle) * speed * 22 - 120; // push gravitational shift
    
    const size = 5 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const delay = Math.random() * 0.15;
    const rotation = Math.random() * 720 - 360;

    return {
      id: i,
      x: xDist,
      y: yDist,
      size,
      color,
      shape,
      delay,
      rotation,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100] flex items-center justify-center">
      {particles.map((p) => {
        let styleObj: React.CSSProperties = {
          position: 'absolute',
          width: `${p.size}px`,
          height: `${p.size}px`,
          backgroundColor: p.color,
        };

        if (p.shape === 'circle') {
          styleObj.borderRadius = '50%';
        } else if (p.shape === 'triangle') {
          styleObj.width = 0;
          styleObj.height = 0;
          styleObj.backgroundColor = 'transparent';
          styleObj.borderLeft = `${p.size / 2}px solid transparent`;
          styleObj.borderRight = `${p.size / 2}px solid transparent`;
          styleObj.borderBottom = `${p.size}px solid ${p.color}`;
        } else if (p.shape === 'bar') {
          styleObj.width = `${p.size * 2.5}px`;
          styleObj.height = `${p.size / 3}px`;
        }

        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: 0, 
              y: 40, 
              scale: 0, 
              rotate: 0, 
              opacity: 1 
            }}
            animate={{ 
              x: p.x, 
              y: [40, p.y + 10, p.y + 60, p.y + 180], // Gravity arc effect
              scale: [0, 1.2, 1, 0.8, 0], 
              rotate: p.rotation, 
              opacity: [1, 1, 0.9, 0.6, 0] 
            }}
            transition={{ 
              duration: 2.0 + Math.random() * 0.8, 
              ease: "easeOut",
              delay: p.delay 
            }}
            style={styleObj}
          />
        );
      })}
    </div>
  );
}

interface TeaserModalProps {
  toolId: string;
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolDescription: string;
}

export default function TeaserModal({ toolId, isOpen, onClose, toolName, toolDescription }: TeaserModalProps) {
  if (!isOpen) return null;

  // Global Sandbox States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [confettiActive, setConfettiActive] = useState(false);

  // Helper trigger
  const triggerConfetti = () => {
    setConfettiActive(false);
    setTimeout(() => {
      setConfettiActive(true);
    }, 10);
    setTimeout(() => {
      setConfettiActive(false);
    }, 3500);
  };

  // 1. Image Compress State
  const [compressRatio, setCompressRatio] = useState(70);
  const [compressResult, setCompressResult] = useState<any>(null);

  // 2. BG Remover state
  const [sliderPos, setSliderPos] = useState(50);

  // 3. Document convert state
  const [sourceFormat, setSourceFormat] = useState('PDF');
  const [targetFormat, setTargetFormat] = useState('DOCX');
  const [convertedFile, setConvertedFile] = useState(false);

  // 4. OCR text state
  const [ocrSample, setOcrSample] = useState(0);
  const ocrTexts = [
    {
      imgUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80',
      title: 'Nota Kedai Kopi',
      fullText: "WARUNG KOPI NUSANTARA\nJl. Senopati No. 42B, Jaksel\n\n1x Iced Americano      Rp 38.000\n1x Avocado Toast       Rp 52.000\nSubtotal               Rp 90.000\nTax 10%                Rp 9.000\nTOTAL                  Rp 99.000\n\nTerima kasih, dilarang ngantuk!"
    },
    {
      imgUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80',
      title: 'Snippet Code React',
      fullText: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Total Like: {count}\n    </button>\n  );\n}"
    }
  ];
  const [ocrResult, setOcrResult] = useState('');

  // 5. Calculator state
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // 6. Binary/Hex Base state
  const [decVal, setDecVal] = useState('42');
  const [binVal, setBinVal] = useState('101010');
  const [hexVal, setHexVal] = useState('2A');
  const [octVal, setOctVal] = useState('52');

  // 7. PDF Editor Annotation State
  const [pdfTexts, setPdfTexts] = useState<Array<{id: number, text: string, x: number, y: number}>>([
    { id: 1, text: 'Tanda tangan di sini', x: 200, y: 350 },
    { id: 2, text: 'Halaman 1 dari 1', x: 20, y: 20 }
  ]);
  const [newPdfText, setNewPdfText] = useState('');

  // 8. Kalender Indonesia cuti hacks
  const [cutiHackSel, setCutiHackSel] = useState(0);
  const cutiHacks = [
    {
      title: 'Hacks Cuti Idul Fitri 🚀',
      dateRange: 'Rekomendasi Cuti: 30-31 Maret & 1 April 2026',
      totalHoliday: 'Total 9 Hari Libur Beruntun!',
      detail: 'Gabungkan Libur Hari Raya Idul Fitri yang jatuh di tanggal merah dengan sela cuti bersama nasional.'
    },
    {
      title: 'Long Weekend Kemerdekaan 🇮🇩',
      dateRange: 'Rekomendasi Cuti: 14 Agustus 2026',
      totalHoliday: 'Total 4 Hari Libur Beruntun!',
      detail: 'Tanggal 17 Agustus hari Senin (Kemerdekaan). Ambil cuti di hari Jumat tanggal 14 Agustus untuk istirahat maksimal!'
    }
  ];

  // Helper Toast
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle calculator press
  const handleCalcPress = (char: string) => {
    if (char === '=') {
      try {
        // Safe evaluation without eval using simple math
        // Clean input from hazardous characters
        const cleanInput = calcInput.replace(/[^0-9+\-*/.]/g, '');
        if (!cleanInput) return;
        
        // Use a Function constructor to safely evaluate math logic locally
        const resultValue = new Function(`return (${cleanInput})`)();
        setCalcResult(String(resultValue));
        setCalcHistory(prev => [`${calcInput} = ${resultValue}`, ...prev.slice(0, 4)]);
      } catch (err) {
        setCalcResult('Error');
      }
    } else if (char === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (char === 'DEL') {
      setCalcInput(prev => prev.slice(0, -1));
    } else {
      setCalcInput(prev => prev + char);
    }
  };

  // Base Conversion Sync
  const handleBaseConvert = (val: string, type: 'dec' | 'bin' | 'hex' | 'oct') => {
    try {
      if (!val) {
        setDecVal('');
        setBinVal('');
        setHexVal('');
        setOctVal('');
        return;
      }

      let decimalNum = 0;
      if (type === 'dec') {
        decimalNum = parseInt(val, 10);
        setDecVal(val);
      } else if (type === 'bin') {
        decimalNum = parseInt(val, 2);
        setBinVal(val);
      } else if (type === 'hex') {
        decimalNum = parseInt(val, 16);
        setHexVal(val);
      } else if (type === 'oct') {
        decimalNum = parseInt(val, 8);
        setOctVal(val);
      }

      if (isNaN(decimalNum)) return;

      if (type !== 'dec') setDecVal(decimalNum.toString(10));
      if (type !== 'bin') setBinVal(decimalNum.toString(2));
      if (type !== 'hex') setHexVal(decimalNum.toString(16).toUpperCase());
      if (type !== 'oct') setOctVal(decimalNum.toString(8));
    } catch (e) {
      // Ignore conversion syntax errors
    }
  };

  // Run Compression simulation
  const handleCompressSimulation = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const originalSize = 1024 * 3.4; // 3.4 MB
      const compRatio = compressRatio / 100;
      const optimizedSize = originalSize * (compRatio * 0.4); // compressed size proxy
      setCompressResult({
        saved: Math.round(((originalSize - optimizedSize) / originalSize) * 100),
        before: '3.4 MB',
        after: `${(optimizedSize / 1024).toFixed(2)} MB`,
        filename: 'foto_wisuda_compressed.jpg'
      });
      showToast('Gambar Berhasil Dikompres Tanpa Kurangi Detail! 🎉');
      triggerConfetti();
    }, 1500);
  };

  // Run Document Conversion simulation
  const handleDocConvertSimulation = () => {
    setLoading(true);
    setConvertedFile(false);
    setTimeout(() => {
      setLoading(false);
      setConvertedFile(true);
      showToast('Dokumen Berhasil Dikonversi! 🚀');
      triggerConfetti();
    }, 1800);
  };

  // Run OCR Simulation
  const handleOcrSimulation = () => {
    setLoading(true);
    setOcrResult('');
    setTimeout(() => {
      setLoading(false);
      setOcrResult(ocrTexts[ocrSample].fullText);
      showToast('Teks Berhasil Diekstrak! Salin sekarang! 📝');
      triggerConfetti();
    }, 2005);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer"
    >
      
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div id="toast-banner" className="fixed top-24 right-4 z-50 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg border border-emerald-400/30 animate-bounce">
          <Check className="h-4 w-4" />
          <span className="text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Confetti Animation Layer */}
      <AnimatePresence>
        {confettiActive && <ConfettiBurst />}
      </AnimatePresence>

      {/* Main Modal Panel */}
      <motion.div 
        id="teaser-modal-panel"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] cursor-default"
      >
        
        {/* Floating background gradient spots */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-fuchsia-500/10 blur-xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative p-6 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-xl font-bold text-white font-sans">{toolName}</h3>
              <span className="text-[10px] font-bold tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">SANDBOX</span>
            </div>
            <p className="text-xs text-slate-400">{toolDescription}</p>
          </div>
          <button 
            id="modal-close-button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          
          {/* BANNER GIMMICK */}
          <div className="flex items-start gap-3 bg-slate-950 border border-slate-850 p-3.5 rounded-2xl mb-6 text-xs text-slate-400">
            <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-amber-300 font-bold block mb-0.5">Teaser Sandbox Demonstratif</span>
              Kamu bisa mencoba visual simulasi keunggulan tool kami langsung secara client-side di bawah ini. Bebas biaya dan instan!
            </div>
          </div>

          {/* SIMULATOR RENDERING BLOCK DEPENDING ON TOOL ID */}
          
          {/* ===================== 1. KOMPRESI GAMBAR ===================== */}
          {toolId === 'compress' && (
            <div className="space-y-4">
              <div className="border border-dashed border-slate-800 bg-slate-950/60 p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[140px]">
                <FileText className="h-8 w-8 text-slate-500 mb-2" />
                <p className="text-xs font-semibold text-slate-300">File Simulasi: <span className="text-cyan-400">dokumentasi_bali.png (3.4 MB)</span></p>
                <span className="text-[10px] text-slate-500 mt-1">Ready to compress</span>
              </div>

              {/* Slider ratio */}
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Ubah Kualitas Output:</span>
                  <span className="text-cyan-400 font-mono text-sm">{compressRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="95" 
                  value={compressRatio} 
                  onChange={(e) => setCompressRatio(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Paling Kecil (Kompresi Ekstrim)</span>
                  <span>Paling Jernih (Sangat Detail)</span>
                </div>
              </div>

              {/* Submit simulation */}
              <button
                onClick={handleCompressSimulation}
                disabled={loading}
                className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 font-bold py-3 px-4 rounded-xl cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Re-encoding File Pixel...</span>
                  </>
                ) : (
                  <span>Gass Kompres Gambar ⚡</span>
                )}
              </button>

              {/* Compress Result */}
              {success && compressResult && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between items-center text-emerald-400 font-bold mb-1">
                    <span>Sukses Mengurangi Berat File!</span>
                    <span>-{compressResult.saved}% Hemat Space!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-slate-400">
                    <div className="font-mono">Ukuran Asli: <span className="line-through text-slate-500 font-semibold">{compressResult.before}</span></div>
                    <div className="font-mono">Hasil Kompresi: <span className="text-emerald-400 font-semibold">{compressResult.after}</span></div>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Mengunduh Dummy Image Terkompresi!');
                    }}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900 text-emerald-400 font-semibold p-2.5 rounded-xl text-xs"
                  >
                    <Download className="h-4 w-4" />
                    Download File Terkompresi
                  </button>
                </div>
              )}
            </div>
          )}


          {/* ===================== 2. REMOVE BACKGROUND ===================== */}
          {toolId === 'remove-bg' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 text-center mb-1">Slide kursor atau swipe di gambar buat bandingin Before vs After BG Removal kami!</p>
              
              {/* Image Compare Slider Simulator */}
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                
                {/* Background Checkerboard (After) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundSize: '20px 20px',
                    backgroundImage: 'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' 
                  }}
                />

                {/* Left Side Original Image */}
                <div 
                  className="absolute inset-y-0 left-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80")',
                    width: `${sliderPos}%`
                  }}
                />

                {/* Right Side Subject with BG Removed */}
                <div 
                  className="absolute inset-y-0 right-0 bg-contain bg-no-repeat bg-center mix-blend-normal"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80")',
                    backgroundBlendMode: 'normal',
                    left: `${sliderPos}%`,
                    pointerEvents: 'none'
                  }}
                />

                {/* Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-[2px] bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                />

                {/* Slider Handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full border-2 border-sky-400 bg-slate-950 text-sky-400 font-bold flex items-center justify-center text-xs shadow-lg z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  ⇄
                </div>
              </div>

              {/* Slider Controller */}
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl space-y-2">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>BEFORE (FOTO ASLI)</span>
                  <span>AFTER (CLEAN PNG)</span>
                </div>
              </div>

              <div className="text-center text-xs text-slate-500">
                Pencet tombol di atas & slide untuk melihat seberapa teliti kecerdasan visual AI kami memotong outline terkecil.
              </div>
            </div>
          )}


          {/* ===================== 3. KONVERSI DOKUMEN ===================== */}
          {toolId === 'convert-file' && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 items-center gap-2 bg-slate-950 p-4 border border-slate-850 rounded-2xl">
                
                <div className="col-span-2 space-y-1 text-center">
                  <span className="text-[10px] text-slate-500 block font-bold font-mono">DARI</span>
                  <select 
                    value={sourceFormat}
                    onChange={(e) => setSourceFormat(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="PDF">Document (PDF)</option>
                    <option value="DOCX">Microsoft Word (DOCX)</option>
                    <option value="PPTX">PowerPoint (PPTX)</option>
                    <option value="JPG">Image (JPG)</option>
                  </select>
                </div>

                <div className="col-span-1 flex justify-center text-slate-600">
                  <ArrowRight className="h-5 w-5 animate-pulse text-indigo-400" />
                </div>

                <div className="col-span-2 space-y-1 text-center">
                  <span className="text-[10px] text-slate-500 block font-bold font-mono">MENJADI</span>
                  <select 
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="DOCX">Word (DOCX)</option>
                    <option value="PDF">Acrobat PDF (PDF)</option>
                    <option value="PPTX">Presentation (PPTX)</option>
                    <option value="HTML">Web Code (HTML)</option>
                  </select>
                </div>

              </div>

              {/* Upload mock info */}
              <div className="border border-slate-800 p-6 rounded-2xl bg-slate-950/40 text-center text-xs">
                <p className="font-semibold text-slate-300">File Simulasi Konversi:</p>
                <p className="text-slate-500 font-mono mt-1">Surat_Lamaran_Kerja.{sourceFormat.toLowerCase()} (1.2 MB)</p>
              </div>

              {/* Action triggering */}
              <button
                onClick={handleDocConvertSimulation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Menyusun Alignment Font & Paragraf...
                  </span>
                ) : (
                  <span>Convert File Sekarang!</span>
                )}
              </button>

              {convertedFile && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl space-y-2 text-xs">
                  <p className="text-emerald-400 font-bold flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Konversi Selesai Sempurna!
                  </p>
                  <p className="text-slate-300">File baru berhasil disiapkan tanpa merusak tata letak dokumen.</p>
                  <button 
                    onClick={() => alert('Mengunduh mock file hasil konversi')}
                    className="w-full mt-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 p-2.5 rounded-lg font-mono text-xs text-white flex items-center justify-center gap-2 hover:border-emerald-500/30"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Surat_Lamaran_Kerja.{targetFormat.toLowerCase()}
                  </button>
                </div>
              )}
            </div>
          )}


          {/* ===================== 4. COPY TEKS DARI GAMBAR (OCR) ===================== */}
          {toolId === 'ocr-copy' && (
            <div className="space-y-4">
              <div className="font-semibold text-xs text-slate-400 mb-1">Pilih Gambar Target Deteksi:</div>
              <div className="grid grid-cols-2 gap-3">
                {ocrTexts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setOcrSample(idx);
                      setOcrResult('');
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                      ocrSample === idx 
                        ? 'border-violet-500 bg-violet-500/10 text-white' 
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <img 
                      src={item.imgUrl} 
                      className="h-10 w-10 object-cover rounded-md" 
                      alt="" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs font-semibold">{item.title}</div>
                  </button>
                ))}
              </div>

              {/* Laser scanning visualization container */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img 
                  src={ocrTexts[ocrSample].imgUrl} 
                  className="h-full w-full object-cover opacity-40" 
                  alt="" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Laser animation */}
                {loading && (
                  <div className="absolute inset-x-0 h-[2px] bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,1)] z-20 animate-bounce" />
                )}

                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-sm p-3.5 rounded-xl max-w-sm text-center">
                    <p className="text-[11px] font-mono text-violet-400">Target OCR Scanner ready!</p>
                    <p className="text-[10px] text-slate-500 mt-1">Menggunakan model ekstraksi lokal secepat kilat</p>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <button
                onClick={handleOcrSimulation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Membaca Baris demi Baris Teks Gambar...
                  </span>
                ) : (
                  <span>Sinar dan Copy Teks Gambar!</span>
                )}
              </button>

              {/* Output OCR Text Area */}
              {ocrResult && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Hasil Deteksi Teks:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(ocrResult);
                        showToast('Teks berhasil dicopy ke Clipboards!');
                      }}
                      className="text-violet-400 hover:text-violet-300 font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Salin Teks
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={ocrResult}
                    className="w-full h-32 bg-slate-950 border border-slate-850 rounded-xl p-3 font-mono text-xs text-white focus:outline-none resize-none"
                  />
                </div>
              )}
            </div>
          )}


          {/* ===================== 5. KALKULATOR PRODUKTIF ===================== */}
          {toolId === 'calculator' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl shadow-inner">
                {/* Visual Monitor */}
                <div className="text-right p-2 font-mono space-y-1">
                  <div className="text-[11px] text-slate-500 min-h-[16px]">{calcInput || '0'}</div>
                  <div className="text-2xl font-bold text-white min-h-[32px]">{calcResult || '0'}</div>
                </div>
              </div>

              {/* Button grid layout */}
              <div className="grid grid-cols-4 gap-2">
                {['C', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '00', '='].map((char) => (
                  <button
                    key={char}
                    onClick={() => handleCalcPress(char)}
                    className={`py-3.5 px-2 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                      char === '=' 
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 col-span-1' 
                        : char === 'C' || char === 'DEL' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20' 
                        : ['+', '-', '*', '/', '%'].includes(char) 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>

              {/* Calculations history logs */}
              {calcHistory.length > 0 && (
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-850 text-[11px]">
                  <p className="font-semibold text-slate-400 mb-1 font-mono">Riwayat Perhitungan:</p>
                  <ul className="space-y-1 text-slate-500 font-mono">
                    {calcHistory.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>#{calcHistory.length - idx}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}


          {/* ===================== 6. KONVERTER BASIS ANGKA ===================== */}
          {toolId === 'binary-convert' && (
            <div className="space-y-4 font-mono">
              <p className="text-[11px] text-slate-400 text-center font-sans mb-1">
                Ketik angka di kolom mana saja. Kolom lain akan langsung terkonversi otomatis secara real-time!
              </p>

              <div className="space-y-3 font-mono text-xs text-white">
                <div>
                  <label className="block text-slate-500 text-[10px] font-bold mb-1 font-sans">DESIMAL (BASIS 10)</label>
                  <input
                    type="number"
                    value={decVal}
                    onChange={(e) => handleBaseConvert(e.target.value, 'dec')}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400/50 text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] font-bold mb-1 font-sans">BINER (BASIS 2)</label>
                  <input
                    type="text"
                    value={binVal}
                    onChange={(e) => handleBaseConvert(e.target.value, 'bin')}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400/50 text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] font-bold mb-1 font-sans">HEKSADESIMAL (BASIS 16)</label>
                  <input
                    type="text"
                    value={hexVal}
                    onChange={(e) => handleBaseConvert(e.target.value.toUpperCase(), 'hex')}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400/50 text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] font-bold mb-1 font-sans">OKTAL (BASIS 8)</label>
                  <input
                    type="text"
                    value={octVal}
                    onChange={(e) => handleBaseConvert(e.target.value, 'oct')}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400/50 text-amber-300"
                  />
                </div>
              </div>
            </div>
          )}


          {/* ===================== 7. PDF EDITOR RINGKAS ===================== */}
          {toolId === 'pdf-editor' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tambahkan anotasi teks..."
                  value={newPdfText}
                  onChange={(e) => setNewPdfText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-850 text-xs text-white rounded-xl py-2.5 px-3 focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={() => {
                    if (!newPdfText) return;
                    setPdfTexts(prev => [
                      ...prev,
                      { id: Date.now(), text: newPdfText, x: 50 + Math.random() * 150, y: 100 + Math.random() * 150 }
                    ]);
                    setNewPdfText('');
                    showToast('Teks anotasi berhasil ditambahkan ke lembar PDF! 📄');
                    triggerConfetti();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Tambah Teks
                </button>
              </div>

              {/* Visual PDF Mock Sheet */}
              <div className="relative h-64 w-full rounded-2xl border border-slate-800 bg-white shadow-inner overflow-hidden select-none">
                <div className="absolute inset-0 opacity-1 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
                
                {/* Watermark grid background */}
                <div className="absolute inset-x-0 top-1/3 text-center text-slate-200 uppercase font-bold text-4xl leading-none">
                  Laporan_Bulanan.pdf
                </div>

                {/* Annotation Text Layer (Can drag and delete list) */}
                {pdfTexts.map((node) => (
                  <div
                    key={node.id}
                    className="absolute bg-slate-950/90 text-white border border-yellow-400/40 text-[10px] font-sans px-2 py-1 rounded cursor-move shadow-md"
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  >
                    <span>{node.text}</span>
                    <button
                      onClick={() => setPdfTexts(prev => prev.filter(t => t.id !== node.id))}
                      className="ml-2 text-rose-400 hover:text-rose-300 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Total <b>{pdfTexts.length}</b> anotasi aktif</span>
                <span className="text-yellow-500 font-semibold cursor-pointer" onClick={() => setPdfTexts([])}>Reset Halaman</span>
              </div>
            </div>
          )}


          {/* ===================== 8. KALENDER INDONESIA ===================== */}
          {toolId === 'calendar-id' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-xs text-slate-400">Pilih Hacks Hari Kejepit Liburan:</div>
                <div className="flex gap-1.5 font-mono">
                  {['Idul Fitri', 'RI 17 Agst'].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCutiHackSel(idx)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                        cutiHackSel === idx 
                          ? 'border-red-500 bg-red-500/10 text-red-500' 
                          : 'border-slate-800 bg-slate-950 text-slate-500'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Hacks Display Card */}
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                  {cutiHacks[cutiHackSel].title}
                </h4>
                <div className="text-xs text-red-400 font-mono font-bold bg-red-500/5 border border-red-500/10 p-2 rounded-xl">
                  {cutiHacks[cutiHackSel].dateRange}
                </div>
                <div className="text-xs text-emerald-400 font-bold">
                  {cutiHacks[cutiHackSel].totalHoliday}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-900">
                  {cutiHacks[cutiHackSel].detail}
                </p>
              </div>

              {/* Mini Calendar visualization mapping standard may days */}
              <div className="bg-slate-950/50 p-4 border border-slate-850 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-300">
                  <span>Mei 2026 (Simulasi Kalender Merah)</span>
                  <span className="text-[10px] text-red-500 font-bold font-mono">3 Hari Libur Nasional</span>
                </div>
                {/* Days identifier */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-slate-500 mb-1">
                  <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span className="text-red-500">M</span>
                </div>
                {/* Matrix days */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                  {Array.from({ length: 31 }, (_, idx) => {
                    const day = idx + 1;
                    const isHoliday = [1, 14, 25].includes(day); // Mock holidays
                    const isSunday = day % 7 === 3; // Mock sundays
                    return (
                      <div
                        key={day}
                        className={`py-1.5 rounded-lg font-bold ${
                          isHoliday 
                            ? 'bg-red-500/20 text-red-500 border border-red-500/30' 
                            : isSunday 
                            ? 'text-red-400' 
                            : 'text-slate-400'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Client-side, No tracking cookies</span>
          </div>
          <button
            onClick={() => {
              onClose();
              showToast('Lanjutkan voting fitur kesukaanmu!');
            }}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-white font-medium text-xs py-2 px-4 rounded-xl transition-all cursor-pointer"
          >
            Tutup Demo Sandbox
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}
