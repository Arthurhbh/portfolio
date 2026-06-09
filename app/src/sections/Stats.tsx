import { useConfig } from '@/hooks/useConfig';
import { FileText, Code, Coffee, Zap, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Code,
  Coffee,
  Zap,
};

export function Stats() {
  const { config } = useConfig();

  return (
    <section id="stats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="neon-text-gradient">BY THE NUMBERS</span>
          </h2>
          <p className="text-gray-400 text-lg">
            一些数字，记录成长的轨迹
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-2 h-2 bg-[#00ff9d] rounded-full" />
            <span className="w-8 h-0.5 bg-gradient-to-r from-[#00ff9d] to-[#ff6b35]" />
            <span className="w-2 h-2 bg-[#ff6b35] rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {config.stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Zap;
            const colorClass = stat.color === 'orange' ? 'text-[#ff6b35]' : 'text-[#00ff9d]';
            const bgClass = stat.color === 'orange' ? 'bg-[#ff6b35]/10' : 'bg-[#00ff9d]/10';
            
            return (
              <div 
                key={stat.id}
                className="cyber-card p-8 text-center group"
              >
                <div className={`w-14 h-14 mx-auto rounded-xl ${bgClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colorClass}`} />
                </div>
                <div className={`text-4xl font-bold ${colorClass} mb-2 font-mono`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-mono tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
