import { 
  FileImage, Eraser, RefreshCw, ScanText, Calculator, Binary, FilePenLine, Calendar,
  Zap, Shield, Globe, Award, Sparkles, AlertCircle
} from 'lucide-react';

export interface ToolFeature {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  iconName: string;
  gradient: string;
  badge: '🔥 HOT' | '⚡ SPEEDY' | '💎 PREMIUM' | '✨ NEW' | '🇮🇩 LOKAL';
  badgeColor: string;
  metrics: string;
  demoTitle: string;
  demoPlaceholder: string;
}

export const toolsData: ToolFeature[] = [
  {
    id: 'compress',
    name: 'Kompresi Gambar',
    description: 'Pangkas ukuran file gambar kamu hingga 90% tanpa buram. Instan, tanpa kuota!',
    longDescription: 'Optimasi gambar dengan teknologi mutakhir langsung di browser kamu. Kompres file PNG, JPG, WebP, bahkan GIF favorit dengan drag-and-drop sederhana, pertahankan detail tajam, dan download hasilnya dalam hitungan milidetik secara offline.',
    iconName: 'FileImage',
    gradient: 'from-cyan-400 to-blue-600',
    badge: '🔥 HOT',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    metrics: 'Hingga 90% kompresi',
    demoTitle: 'Uji Coba Kompresi Kilat',
    demoPlaceholder: 'Drag file gambarmu di sini untuk melihat compression ratio...'
  },
  {
    id: 'remove-bg',
    name: 'Remove Background',
    description: 'Potong latar belakang gambar otomatis pake AI dalam 2 detik. Presisi tingkat dewa!',
    longDescription: 'Hapus background foto portrait, produk, atau logo instan. Didukung model AI super presisi yang mampu mendeteksi helaian rambut, tepi lekukan, dan bayangan alami untuk hasil PNG transparan berkualitas tinggi.',
    iconName: 'Eraser',
    gradient: 'from-pink-500 to-rose-600',
    badge: '⚡ SPEEDY',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    metrics: 'AI-Powered 2 Detik',
    demoTitle: 'AI Background Magic',
    demoPlaceholder: 'Upload foto serumit apa pun, lihat background terhapus presisi...'
  },
  {
    id: 'convert-file',
    name: 'Konversi Dokumen',
    description: 'Ubah format PDF, Word, PowerPoint, Excel, & JPEG bolak-balik tanpa berantakan.',
    longDescription: 'Sistem konversi dokumen universal yang tidak merusak susunan paragraf atau tabel. Convert PDF ke DOCX, PPTX ke PDF, Image ke PDF, atau dokumen teks lain dengan mempertahankan alignment font asli kamu.',
    iconName: 'RefreshCw',
    gradient: 'from-purple-500 to-indigo-600',
    badge: '💎 PREMIUM',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    metrics: 'Format PDF, DOCX, PPTX, JPG',
    demoTitle: 'Universal Converter Hub',
    demoPlaceholder: 'Pilih file dokumen apa saja lalu saksikan konversi formatnya...'
  },
  {
    id: 'ocr-copy',
    name: 'Copy Teks dari Gambar',
    description: 'Scan & salin teks dari screenshot, foto catatan, atau buku instan tanpa ngetik ulang.',
    longDescription: 'Alat Optical Character Recognition (OCR) lokal berkekuatan tinggi. Tinggal upload screenshot layar materi atau foto halaman buku, lalu copy semua teks mentahnya ke clipboard dalam sekejap. Sangat membantu tugas kuliah!',
    iconName: 'ScanText',
    gradient: 'from-violet-500 to-fuchsia-600',
    badge: '⚡ SPEEDY',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    metrics: '99.4% OCR Akurasi',
    demoTitle: 'OCR Teks Grabber',
    demoPlaceholder: 'Sinar atau crop gambar teks, salin instan sekali klik...'
  },
  {
    id: 'calculator',
    name: 'Kalkulator Produktif',
    description: 'Kalkulator estetik dengan panel riwayat, rumus cepat, & hitung persentase modern.',
    longDescription: 'Bukan sekadar kalkulator jadul biasa. Kalkulator estetik modern dengan riwayat kalkulasi yang tersimpan lokal, kalkulator persentase diskon belanjaan instan, modul konversi mata uang, serta kalkulator cicilan bulanan.',
    iconName: 'Calculator',
    gradient: 'from-emerald-400 to-teal-600',
    badge: '✨ NEW',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    metrics: 'History & Mode Gelap',
    demoTitle: 'Calculator Pro Sandbox',
    demoPlaceholder: 'Hitung keuangan, diskon belanjaan, dan simpan riwayat di sini...'
  },
  {
    id: 'binary-convert',
    name: 'Konverter Basis Angka',
    description: 'Ubah angka Desimal, Biner, Heksadesimal, dan Oktal secara real-time & detail.',
    longDescription: 'Sangat cocok untuk anak teknik, informatika, atau ilmu komputer. Cukup masukkan angka dalam format apa pun, kalkulator akan secara instan merender representasi biner, heksadesimal, desimal, dan oktal secara simultan.',
    iconName: 'Binary',
    gradient: 'from-amber-400 to-orange-600',
    badge: '✨ NEW',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    metrics: 'Biner / Hex / Dec / Oct',
    demoTitle: 'Number Base Sandbox',
    demoPlaceholder: 'Ketik angka basis apa saja, saksikan konversi real-time ke jenis lain...'
  },
  {
    id: 'pdf-editor',
    name: 'PDF Editor Ringkas',
    description: 'Atur halaman, beri coretan, gabungkan file, atau tanda tangan dokumen gratis.',
    longDescription: 'Beri anotasi penting, gabungkan beberapa file PDF terpisah menjadi satu dokumen padat, atur urutan halaman yang berantakan, bubuhkan tanda tangan elektronik, atau potong margin dokumen dengan aman tanpa watermark.',
    iconName: 'FilePenLine',
    gradient: 'from-yellow-400 to-amber-600',
    badge: '🔥 HOT',
    badgeColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    metrics: 'Merge, Sign, & Text Add',
    demoTitle: 'Interactive PDF Sheet',
    demoPlaceholder: 'Letakkan file PDF, edit urutan halaman, gabungkan fungsional...'
  },
  {
    id: 'calendar-id',
    name: 'Kalender Indonesia',
    description: 'Kalender lengkap hari libur nasional, curi startup cuti nasional, & agenda modern.',
    longDescription: 'Kalender interaktif khusus Indonesia. Dilengkapi semua hari libur nasional resmi, cuti bersama, pengingat hari besar agama, rekomendasi hari jepit untuk cuti panjang (Curi-Cuti Hacks), serta widget reminder estetik.',
    iconName: 'Calendar',
    gradient: 'from-red-500 to-orange-600',
    badge: '🇮🇩 LOKAL',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    metrics: 'Cuti Bersama & Libur 2026/2027',
    demoTitle: 'Hacks Cuti & Libur Harian',
    demoPlaceholder: 'Lihat list tanggal merah terdekat & hacks curi cuti terbaik...'
  }
];

export const valueProps = [
  {
    title: 'Zero Iklan Sampah',
    description: 'Ga ada banner pornografi, pop-up judi, atau link jebakan. One Tools fokus melayanimu bersih tanpa gangguan sama sekali.',
    icon: Globe,
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    title: '100% Gratis Selamanya',
    description: 'Beneran gratis! Ga ada istilah langganan "Pro" bulanan atau fitur premium yang digembok di balik paywall.',
    icon: Award,
    gradient: 'from-purple-400 to-fuchsia-500'
  },
  {
    title: 'Data Tetap Privasi',
    description: 'Keamanan data tingkat dewa. Proses kompresi & convert dilakuin client-side di browsermu, file gak masuk server kami.',
    icon: Shield,
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    title: 'Instan & Responsif',
    description: 'Didesain khusus dengan engine modern untuk load secepat kilat, hemat baterai, dan berjalan mulus di laptop maupun HP.',
    icon: Zap,
    gradient: 'from-amber-400 to-rose-500'
  }
];

export const testimonialData = [
  {
    id: 1,
    name: 'Rian S.',
    role: 'Mahasiswa Informatika ITB',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'Penyelamat pas tugas akhir! Biasanya kompres gambar atau copy teks screenshot harus bayar langganan atau penuh iklan pop-up aneh. Di One Tools semuanya clean, sat-set-sat-set selesai! 🔥'
  },
  {
    id: 2,
    name: 'Amelia Putri',
    role: 'Content Creator & Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'Desainnya kece bgt, ga ngebosenin kek website tool jadul tahun 2010. Fitur beneran gratis, lancar jaya di resolusi Ultra HD, dan sangat membantu kebutuhan harian!'
  },
  {
    id: 3,
    name: 'Dwi Prasetyo',
    role: 'Freelance Social Media Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    comment: 'Fitur Kalender Indonesia + Hacks curi tanggal cuti beneran ngebantu gw buat booking tiket liburan jauh-jauh hari. Gokil bgt inovasinya!'
  }
];
