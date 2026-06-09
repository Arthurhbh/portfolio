import { useConfig } from '@/hooks/useConfig';
import { Mail, Globe, MapPin } from 'lucide-react';

export function About() {
  const { config } = useConfig();

  if (!config.navigation.showAbout) {
    return null;
  }

  const socialLinks = [
    { icon: Mail, href: `mailto:${config.personal.email}`, label: 'Email' },
    { icon: Globe, href: config.personal.website, label: 'Website' },
  ].filter(link => link.href);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-title justify-center mb-2">SECTION</div>
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="neon-text-gradient">ABOUT ME</span>
          </h2>
        </div>

        {/* Profile Card */}
        <div className="cyber-card p-8 relative">
          {/* Corner Brackets */}
          <div className="corner-bracket tl" />
          <div className="corner-bracket tr" />
          <div className="corner-bracket bl" />
          <div className="corner-bracket br" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00ff9d]/20 to-[#ff6b35]/20 flex items-center justify-center border-2 border-[#00ff9d]/30">
                {config.personal.avatar ? (
                  <img 
                    src={config.personal.avatar}
                    alt={config.personal.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-[#00ff9d]">
                    {config.personal.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00ff9d] rounded-full border-4 border-[#0d1117]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">
                {config.personal.name}
              </h3>
              <p className="text-[#00ff9d] font-mono text-sm mb-3">
                {config.personal.title}
              </p>
              
              {config.personal.location && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{config.personal.location}</span>
                </div>
              )}

              <p className="text-gray-400 mb-6">
                {config.personal.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center text-[#00ff9d] hover:bg-[#00ff9d]/20 hover:border-[#00ff9d]/50 transition-all"
                      title={link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skills/Interests */}
        <div className="mt-8 cyber-card p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-[#00ff9d]">{'>'}</span>
            <span>Interests & Skills</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {config.terminal.interests.map((interest, index) => (
              <span key={index} className="tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
