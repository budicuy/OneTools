/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import ValueProps from './components/ValueProps';
import FeatureVoter from './components/FeatureVoter';
import PrivacyBanner from './components/PrivacyBanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import TeaserModal from './components/TeaserModal';
import { ToolFeature } from './data';
import { AnimatePresence } from 'motion/react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<ToolFeature | null>(null);
  const { theme } = useTheme();

  const handleSelectTool = (tool: ToolFeature) => {
    setSelectedTool(tool);
  };

  const handleCloseModal = () => {
    setSelectedTool(null);
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans overflow-x-hidden antialiased ${
      isLight 
        ? 'bg-[#f7f8fa] text-slate-900 selection:bg-purple-600 selection:text-white' 
        : 'bg-[#050505] text-white selection:bg-purple-500 selection:text-white'
    }`}>
      
      {/* Background radial highlight layout */}
      <div className="absolute top-0 left-0 right-0 w-full h-[800px] pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-300 ${
          isLight ? 'bg-purple-400/5' : 'bg-purple-600/10'
        }`} />
        <div className={`absolute top-[20%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-colors duration-300 ${
          isLight ? 'bg-cyan-400/5' : 'bg-cyan-600/10'
        }`} />
      </div>

      {/* Structured Pages Elements */}
      <Navbar />
      
      <Hero />
      
      <ToolsGrid onSelectTool={handleSelectTool} />
      
      <ValueProps />
      
      <FeatureVoter />
      
      <PrivacyBanner />
      
      <Testimonials />
      
      <Footer />

      {/* Demo Sandbox Modal with clean mounting transitions */}
      <AnimatePresence>
        {selectedTool && (
          <TeaserModal 
            toolId={selectedTool.id}
            isOpen={!!selectedTool}
            onClose={handleCloseModal}
            toolName={selectedTool.name}
            toolDescription={selectedTool.longDescription}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
