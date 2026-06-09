import { useConfig } from '@/hooks/useConfig';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

export function Projects() {
  const { config } = useConfig();

  if (!config.navigation.showProjects || config.projects.length === 0) {
    return null;
  }

  const featuredProjects = config.projects.filter(p => p.featured).slice(0, 2);
  const regularProjects = config.projects.filter(p => !p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="section-title mb-2">SECTION</div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="neon-text-gradient">PROJECTS</span>
            </h2>
            <p className="text-gray-400 mt-2">
              开源项目与实验作品
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[#00ff9d] hover:text-[#00ff9d]/80 transition-colors font-mono text-sm">
            <span>查看全部</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {featuredProjects.map((project) => (
              <article 
                key={project.id}
                className="cyber-card overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#00ff9d]/10 to-[#ff6b35]/10 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-[#00ff9d]/20">
                      {'</>'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#00ff9d] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regularProjects.map((project) => (
              <article 
                key={project.id}
                className="cyber-card p-5 group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-[#00ff9d] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag text-[10px] px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <button className="sm:hidden w-full mt-6 flex items-center justify-center gap-2 text-[#00ff9d] hover:text-[#00ff9d]/80 transition-colors font-mono text-sm py-3 border border-[#00ff9d]/30 rounded">
          <span>查看全部项目</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
