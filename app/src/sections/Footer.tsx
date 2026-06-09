import { useConfig } from '@/hooks/useConfig';
import { Terminal, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const { config } = useConfig();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[#1e3a2f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00ff9d]" />
              <span className="font-mono text-sm text-[#00ff9d] font-semibold tracking-wider">
                {config.personal.name.toUpperCase().replace(/\s/g, '.')}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>© {currentYear}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-[#ff6b35]" /> by
              </span>
              <span className="text-[#00ff9d]">{config.personal.name}</span>
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ff9d] transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-lg border border-gray-700 group-hover:border-[#00ff9d]/50 flex items-center justify-center transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Terminal Quote */}
        <div className="mt-8 pt-8 border-t border-[#1e3a2f]/30 text-center">
          <p className="font-mono text-sm text-gray-600">
            <span className="text-[#00ff9d]">{'>'}</span>
            <span className="ml-2">echo "Stay curious, keep building."</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
