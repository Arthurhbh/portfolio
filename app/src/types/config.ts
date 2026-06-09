// Personal Portfolio Configuration Types

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  wechat: string;
  phone: string;
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
    name: '胡丙豪',
    title: 'AI产品经理',
    subtitle: '欢迎来到我的数字空间',
    bio: '探索AI的边界，构建有价值的产品。',
    email: '952701694@qq.com',
    wechat: '13783721756',
    phone: '',
    website: 'https://arthurhbh.github.io/portfolio/',
    location: 'Beijing, China',
    avatar: '',
  },
  terminal: {
    username: 'hubinghao',
    hostname: '@macbook pro',
    role: 'AI Product Manager',
    interests: [
      'Open Source',
      'AI & Machine Learning',
    ],
    statusMessage: 'Ready to build amazing things!',
  },
  stats: [
    { id: '1', icon: 'FileText', value: '1', label: 'PATENT', color: 'cyan' },
    { id: '2', icon: 'Code', value: '3', label: 'COMPANY', color: 'cyan' },
    { id: '3', icon: 'Coffee', value: '300+', label: 'CUPS OF COFFEE A YEAR', color: 'orange' },
    { id: '4', icon: 'Zap', value: '5+', label: 'YEARS PM', color: 'cyan' },
  ],
  blogPosts: [],
  projects: [],
  timeline: [
    {
      id: '1780993191321',
      date: '2024-05',
      title: '百度智能云-千帆-Agent策略产品经理',
      description: 'DuMate & 千帆ModelBuilder & 千帆AppBuilder',
      type: 'work',
    },
    {
      id: '1780993145638',
      date: '2021-11',
      title: '小米汽车-自动驾驶-基础模型策略产品经理',
      description: '感知方向-数据闭环业务',
      type: 'work',
    },
    {
      id: '1780993115095',
      date: '2021-05',
      title: '好未来-学而思网校-产品经理',
      description: '直播互动、AI玩法相关',
      type: 'work',
    },
  ],
  navigation: {
    showBlog: false,
    showProjects: false,
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
