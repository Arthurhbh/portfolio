import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { Home, Rss, FolderGit2, Clock, User, Terminal } from 'lucide-react';

// 管理员密码的 SHA-256 哈希（原始密码不出现在代码/打包文件里）
const ADMIN_PASSWORD_HASH = '7618f66753db7ec069c83ed8c197708e1402396774f60961065addd678933871';

// 用浏览器原生 Web Crypto 计算 SHA-256，返回十六进制字符串
async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function Navbar() {
  const { config, isAdmin, setIsAdmin } = useConfig();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'stats', 'blog', 'projects', 'timeline', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = async () => {
    // 比对哈希，而非明文密码
    const inputHash = await sha256Hex(adminPassword);
    if (inputHash === ADMIN_PASSWORD_HASH) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setLoginError('');
      // Navigate to admin page
      window.location.hash = 'admin';
    } else {
      setLoginError('密码错误');
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      e.preventDefault();
      if (isAdmin) {
        window.location.hash = 'admin';
      } else {
        setShowAdminLogin(true);
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, show: true },
    { id: 'blog', label: 'BLOG', icon: Rss, show: config.navigation.showBlog },
    { id: 'projects', label: 'PROJECTS', icon: FolderGit2, show: config.navigation.showProjects },
    { id: 'timeline', label: 'TIMELINE', icon: Clock, show: config.navigation.showTimeline },
    { id: 'about', label: 'ABOUT', icon: User, show: config.navigation.showAbout },
  ].filter(item => item.show);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f14]/90 backdrop-blur-md border-b border-[#1e3a2f]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 group"
            >
              <div className="flex items-center gap-1">
                <Terminal className="w-5 h-5 text-[#00ff9d]" />
                <span className="font-mono text-sm text-[#00ff9d] font-semibold tracking-wider">
                  {config.personal.name.toUpperCase().replace(/\s/g, '.')}
                </span>
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline">
                DIGITAL_SPACE v1.0
              </span>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link flex items-center gap-2 px-4 py-2 text-sm font-mono transition-all ${
                      activeSection === item.id ? 'active text-[#00ff9d]' : 'text-gray-400 hover:text-[#00ff9d]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0d1117] border border-[#1e3a2f] rounded">
                <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
                <span className="font-mono text-sm text-[#00ff9d]">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#1e3a2f]/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeSection === item.id ? 'text-[#00ff9d]' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-mono">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="terminal-window w-full max-w-md mx-4">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-2 text-sm text-gray-400 font-mono">admin@portfolio:~$</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-mono text-[#00ff9d] mb-4">管理员登录</h3>
              <p className="text-sm text-gray-400 mb-4">
                请输入管理员密码以访问配置页面
              </p>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="输入密码..."
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white font-mono text-sm focus:outline-none focus:border-[#00ff9d]"
              />
              {loginError && (
                <p className="mt-2 text-sm text-red-400">{loginError}</p>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAdminLogin}
                  className="btn-primary flex-1 justify-center"
                >
                  登录
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                    setLoginError('');
                  }}
                  className="btn-secondary flex-1 justify-center"
                >
                  取消
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500 text-center">
                提示: 请使用管理员密码登录
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
