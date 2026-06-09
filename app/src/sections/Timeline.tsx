import { useConfig } from '@/hooks/useConfig';
import { Briefcase, GraduationCap, Trophy, Code, type LucideIcon } from 'lucide-react';

const typeIcons: Record<string, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  award: Trophy,
  project: Code,
};

const typeColors: Record<string, string> = {
  work: 'text-[#00ff9d]',
  education: 'text-[#00d4ff]',
  award: 'text-[#ff6b35]',
  project: 'text-[#a855f7]',
};

const typeBgColors: Record<string, string> = {
  work: 'bg-[#00ff9d]/10',
  education: 'bg-[#00d4ff]/10',
  award: 'bg-[#ff6b35]/10',
  project: 'bg-[#a855f7]/10',
};

export function Timeline() {
  const { config } = useConfig();

  if (!config.navigation.showTimeline || config.timeline.length === 0) {
    return null;
  }

  // Sort timeline by date (newest first)
  const sortedTimeline = [...config.timeline].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-title justify-center mb-2">SECTION</div>
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="neon-text-gradient">TIMELINE</span>
          </h2>
          <p className="text-gray-400 mt-2">
            成长与探索的足迹
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff9d] via-[#00ff9d]/50 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {sortedTimeline.map((event, index) => {
              const Icon = typeIcons[event.type] || Code;
              const colorClass = typeColors[event.type] || 'text-[#00ff9d]';
              const bgClass = typeBgColors[event.type] || 'bg-[#00ff9d]/10';
              const isLeft = index % 2 === 0;

              return (
                <div 
                  key={event.id}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ml-12 sm:ml-0 ${
                    isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                  }`}>
                    <div className="cyber-card p-5 relative group">
                      {/* Corner Brackets */}
                      <div className="corner-bracket tl" />
                      <div className="corner-bracket tr" />
                      <div className="corner-bracket bl" />
                      <div className="corner-bracket br" />

                      {/* Date */}
                      <div className={`text-sm font-mono ${colorClass} mb-2 ${
                        isLeft ? 'sm:text-right' : ''
                      }`}>
                        {event.date}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#00ff9d] transition-colors mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-6">
                    <div className={`w-10 h-10 rounded-full ${bgClass} border border-[#00ff9d]/30 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colorClass}`} />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
