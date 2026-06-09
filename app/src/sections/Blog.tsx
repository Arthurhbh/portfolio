import { useConfig } from '@/hooks/useConfig';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function Blog() {
  const { config } = useConfig();

  if (!config.navigation.showBlog || config.blogPosts.length === 0) {
    return null;
  }

  const featuredPost = config.blogPosts.find(p => p.featured);
  const regularPosts = config.blogPosts.filter(p => !p.featured).slice(0, 3);

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="section-title mb-2">SECTION</div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="neon-text-gradient">RECENT POSTS</span>
            </h2>
            <p className="text-gray-400 mt-2">
              最新的技术文章与思考
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[#00ff9d] hover:text-[#00ff9d]/80 transition-colors font-mono text-sm">
            <span>查看全部</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <article 
              key={post.id}
              className="cyber-card p-6 relative group"
            >
              {/* Corner Brackets */}
              <div className="corner-bracket tl" />
              <div className="corner-bracket tr" />
              <div className="corner-bracket bl" />
              <div className="corner-bracket br" />

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white group-hover:text-[#00ff9d] transition-colors mb-3 line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`tag ${index === 0 ? 'tag-orange' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <button className="flex items-center gap-2 text-[#00ff9d] text-sm font-mono group-hover:gap-3 transition-all">
                <span>{'>'}</span>
                <span>READ_MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <article className="cyber-card p-6 mt-6 relative group">
            {/* Corner Brackets */}
            <div className="corner-bracket tl" />
            <div className="corner-bracket tr" />
            <div className="corner-bracket bl" />
            <div className="corner-bracket br" />

            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff6b35]/20 border border-[#ff6b35]/50 rounded text-[#ff6b35] text-xs font-mono mb-4">
              <span>FEATURED</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-white group-hover:text-[#00ff9d] transition-colors mb-3">
              {featuredPost.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-400 mb-4">
              {featuredPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {featuredPost.tags.map((tag, index) => (
                <span 
                  key={index}
                  className={`tag ${index === 0 ? 'tag-orange' : ''}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Read More */}
            <button className="flex items-center gap-2 text-[#00ff9d] text-sm font-mono group-hover:gap-3 transition-all">
              <span>{'>'}</span>
              <span>READ_MORE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </article>
        )}

        {/* Mobile View All Button */}
        <button className="sm:hidden w-full mt-6 flex items-center justify-center gap-2 text-[#00ff9d] hover:text-[#00ff9d]/80 transition-colors font-mono text-sm py-3 border border-[#00ff9d]/30 rounded">
          <span>查看全部文章</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
