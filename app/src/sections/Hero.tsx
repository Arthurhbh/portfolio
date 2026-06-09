import { useState, useEffect, useRef } from 'react';
import { useConfig } from '@/hooks/useConfig';

export function Hero() {
  const { config } = useConfig();
  const [showCursor, setShowCursor] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullText = config.personal.name;
  const nameParts = fullText.split(' ');
  const firstName = nameParts[0] || 'YOUR';
  const lastName = nameParts.slice(1).join(' ');

  // whoami 联系方式（仅展示已填写的项）
  const contactLines = [
    config.personal.email && `邮箱: ${config.personal.email}`,
    config.personal.wechat && `微信: ${config.personal.wechat}`,
    config.personal.phone && `电话: ${config.personal.phone}`,
  ].filter(Boolean) as string[];

  // Terminal commands
  const terminalCommands = [
    {
      prompt: 'whoami',
      output: [`${config.personal.name} - ${config.terminal.role}`, ...contactLines].join('\n'),
    },
    { prompt: 'cat /var/interests.txt', output: config.terminal.interests.join('\n') },
    { prompt: 'echo $CURRENT_STATUS', output: `[SUCCESS] ${config.terminal.statusMessage}` },
  ];

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (currentLine < terminalCommands.length) {
      const timer = setTimeout(() => {
        const cmd = terminalCommands[currentLine];
        setTerminalLines(prev => [...prev, `> ${cmd.prompt}`, cmd.output]);
        setCurrentLine(prev => prev + 1);
      }, 800 * (currentLine + 1));

      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="status-badge">
              <span>SYSTEM_ONLINE</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">Hello, I'm</span>
              </h1>
              <div className="space-y-1">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold neon-text-cyan tracking-tight">
                  {firstName}
                  {showCursor && <span className="inline-block w-1 h-16 bg-[#00ff9d] ml-1 animate-pulse" />}
                </h2>
                {lastName && (
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold neon-text-orange tracking-tight">
                    {lastName}
                  </h2>
                )}
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex items-center gap-2 text-[#00ff9d] font-mono">
              <span>{'>'}</span>
              {config.personal.subtitle && (
                <span className="whitespace-nowrap">{config.personal.subtitle}</span>
              )}
              <span className="w-3 h-5 bg-[#00ff9d] animate-pulse" />
            </div>

            {/* Bio */}
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              {config.personal.bio}
            </p>
          </div>

          {/* Right Side - Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-2 text-sm text-gray-400 font-mono">
                {config.terminal.username}@{config.terminal.hostname}
              </span>
            </div>
            <div className="terminal-content space-y-2">
              {terminalLines.map((line, index) => {
                const isPrompt = line.startsWith('>');
                const isSuccess = line.startsWith('[SUCCESS]');
                
                if (isPrompt) {
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <span className="terminal-prompt">{'>'}</span>
                      <span className="terminal-command">{line.slice(2)}</span>
                    </div>
                  );
                }
                
                if (isSuccess) {
                  return (
                    <div key={index} className="terminal-success">
                      {line}
                    </div>
                  );
                }
                
                // Multi-line output (interests list)
                return (
                  <div key={index} className="terminal-output pl-4">
                    {line.split('\n').map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[#00ff9d]">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
              
              {/* Active prompt */}
              <div className="flex items-center gap-2">
                <span className="terminal-prompt">{'>'}</span>
                <span className="w-2 h-4 bg-[#00ff9d] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => scrollToSection('stats')}
            className="scroll-indicator hover:text-[#00ff9d] transition-colors"
          >
            <span>SCROLL_DOWN</span>
            <div className="mouse border-[#00ff9d]/50" />
          </button>
        </div>
      </div>
    </section>
  );
}
