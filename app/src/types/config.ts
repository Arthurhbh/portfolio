// Personal Portfolio Configuration Types

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  website: string;
  location: string;
  avatar: string;
}

export interface TerminalInfo {
  username: string;
  hostname: string;
  role: string;
  interests: string[];
  statusMessage: string;
}

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
  color: 'cyan' | 'orange' | 'blue' | 'purple';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'project' | 'award';
}

export interface SiteConfig {
  personal: PersonalInfo;
  terminal: TerminalInfo;
  stats: StatItem[];
  blogPosts: BlogPost[];
  projects: Project[];
  timeline: TimelineEvent[];
  navigation: {
    showBlog: boolean;
    showProjects: boolean;
    showTimeline: boolean;
    showAbout: boolean;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    showGridBackground: boolean;
    showScanline: boolean;
  };
}

// Default configuration
export const defaultConfig: SiteConfig = {
  personal: {
    name: 'YOUR NAME',
    title: 'Developer / Creator / Tech Enthusiast',
    subtitle: '欢迎来到我的数字空间',
    bio: '这里记录着技术探索、项目开发与思考感悟。探索代码的边界，构建有价值的产品。',
    email: 'hello@example.com',
    website: 'https://example.com',
    location: 'Beijing, China',
    avatar: '',
  },
  terminal: {
    username: 'guest',
    hostname: 'portfolio.online',
    role: 'Developer / Creator / Tech Enthusiast',
    interests: [
      'Full-stack Development',
      'System Architecture',
      'Open Source',
      'AI & Machine Learning',
    ],
    statusMessage: 'Ready to build amazing things!',
  },
  stats: [
    { id: '1', icon: 'FileText', value: '4+', label: 'BLOG POSTS', color: 'cyan' },
    { id: '2', icon: 'Code', value: '10+', label: 'PROJECTS', color: 'cyan' },
    { id: '3', icon: 'Coffee', value: '500+', label: 'CUPS OF COFFEE', color: 'orange' },
    { id: '4', icon: 'Zap', value: '5+', label: 'YEARS CODING', color: 'cyan' },
  ],
  blogPosts: [
    {
      id: '1',
      title: 'GUI Agent 的现实拐点：从模型崇拜到数据与系统的时代',
      excerpt: '我们将开源目前最大规模的web端真实人工轨迹数据集。',
      date: '2025-12-14',
      readTime: '6 min',
      tags: ['GUI AGENT', '数据', 'WEBCHAIN', '强化学习', '开源'],
      featured: false,
      slug: 'gui-agent-turning-point',
    },
    {
      id: '2',
      title: '从豆包手机看GUI Agent的未来',
      excerpt: '智能体（Agent）正在取代传统的交互范式，由被动响应工具向主动执行决策系统跃迁。这对 GUI agent 技术本身，以及我们理解未来人机交互的方式，都提出了全新的问题和方向。',
      date: '2025-12-10',
      readTime: '10 min',
      tags: ['GUI AGENT', 'AI', '人机交互', '智能体'],
      featured: false,
      slug: 'doubao-phone-gui-agent',
    },
    {
      id: '3',
      title: '语义通胀下的冷思考：2025不一定是Agent元年，而是"Agent"一词的滥用之年',
      excerpt: '我们需要剥离资本市场的语义泡沫，回归到强化学习定义的那个原始命题：在不确定性环境中，如何实现真正的马尔可夫决策过程。',
      date: '2025-10-11',
      readTime: '6 min',
      tags: ['AI AGENT', 'REINFORCEMENT LEARNING', '行业观察'],
      featured: false,
      slug: 'semantic-inflation-agent',
    },
    {
      id: '4',
      title: '从生成式走向执行式：GUI Agent',
      excerpt: '当前的 AI 浪潮被"内容生成"所定义，但真正的范式转移正在"内容"之外发生。GUI Agent 不是一种新的内容输出方式，而是一种Side Effect制造系统。它标志着 AI 从概率性的"描述世界"，转向了确定性的"改变世界"。',
      date: '2025-09-24',
      readTime: '6 min',
      tags: ['GUI AGENT', 'AI', '生成式AI', '执行式AI'],
      featured: true,
      slug: 'generative-to-executive',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'WebChain Data Platform',
      description: 'A large-scale web interaction dataset for GUI agent training',
      image: '',
      tags: ['Python', 'React', 'Machine Learning'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      featured: true,
    },
  ],
  timeline: [
    {
      id: '1',
      date: '2024-01',
      title: 'Joined Tech Company',
      description: 'Started as Senior Full-stack Developer',
      type: 'work',
    },
  ],
  navigation: {
    showBlog: true,
    showProjects: true,
    showTimeline: true,
    showAbout: true,
  },
  theme: {
    primaryColor: '#00ff9d',
    accentColor: '#ff6b35',
    showGridBackground: true,
    showScanline: false,
  },
};
