import { useConfig } from '@/hooks/useConfig';
import { Rss, FolderGit2, Clock, User } from 'lucide-react';

export function QuickNav() {
  const { config } = useConfig();

  const navItems = [
    {
      id: 'blog',
      title: 'Blog',
      description: '技术文章与思考',
      icon: Rss,
      show: config.navigation.showBlog,
    },
    {
      id: 'projects',
      title: 'Projects',
      description: '开源项目展示',
      icon: FolderGit2,
      show: config.navigation.showProjects,
    },
    {
      id: 'timeline',
      title: 'Timeline',
      description: '成长历程记录',
      icon: Clock,
      show: config.navigation.showTimeline,
    },
    {
      id: 'about',
      title: 'About',
      description: '关于我',
      icon: User,
      show: config.navigation.showAbout,
    },
  ].filter(item => item.show);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="cyber-card p-6 text-left group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff9d]/10 flex items-center justify-center group-hover:bg-[#00ff9d]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#00ff9d]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00ff9d] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
