import { useEffect, useState } from 'react';
import { ConfigProvider, useConfig } from '@/hooks/useConfig';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { QuickNav } from '@/sections/QuickNav';
import { Stats } from '@/sections/Stats';
import { Blog } from '@/sections/Blog';
import { Projects } from '@/sections/Projects';
import { Timeline } from '@/sections/Timeline';
import { About } from '@/sections/About';
import { Footer } from '@/sections/Footer';
import { AdminPanel } from '@/sections/AdminPanel';
import './App.css';

function AppContent() {
  const [hash, setHash] = useState(window.location.hash);
  const { config } = useConfig();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update CSS variables based on theme config
  useEffect(() => {
    document.documentElement.style.setProperty('--neon-cyan', config.theme.primaryColor);
    document.documentElement.style.setProperty('--neon-orange', config.theme.accentColor);
  }, [config.theme.primaryColor, config.theme.accentColor]);

  // Show admin panel when hash is #admin
  if (hash === '#admin') {
    return (
      <div className="min-h-screen bg-[#0a0f14]">
        <Navbar />
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f14]">
      {/* Grid Background */}
      {config.theme.showGridBackground && <div className="grid-bg" />}
      
      <Navbar />
      
      <main>
        <Hero />
        <QuickNav />
        <Stats />
        <Blog />
        <Projects />
        <Timeline />
        <About />
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}

export default App;
