import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type SiteConfig, defaultConfig } from '@/types/config';

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updatePersonal: (personal: Partial<SiteConfig['personal']>) => void;
  updateTerminal: (terminal: Partial<SiteConfig['terminal']>) => void;
  updateStats: (stats: SiteConfig['stats']) => void;
  updateBlogPosts: (blogPosts: SiteConfig['blogPosts']) => void;
  updateProjects: (projects: SiteConfig['projects']) => void;
  updateTimeline: (timeline: SiteConfig['timeline']) => void;
  updateNavigation: (navigation: Partial<SiteConfig['navigation']>) => void;
  updateTheme: (theme: Partial<SiteConfig['theme']>) => void;
  addBlogPost: (post: Omit<SiteConfig['blogPosts'][0], 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<SiteConfig['blogPosts'][0]>) => void;
  deleteBlogPost: (id: string) => void;
  addProject: (project: Omit<SiteConfig['projects'][0], 'id'>) => void;
  updateProject: (id: string, project: Partial<SiteConfig['projects'][0]>) => void;
  deleteProject: (id: string) => void;
  addTimelineEvent: (event: Omit<SiteConfig['timeline'][0], 'id'>) => void;
  updateTimelineEvent: (id: string, event: Partial<SiteConfig['timeline'][0]>) => void;
  deleteTimelineEvent: (id: string) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (jsonString: string) => boolean;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const CONFIG_STORAGE_KEY = 'portfolio_config';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultConfig, ...JSON.parse(saved) };
        } catch {
          return defaultConfig;
        }
      }
    }
    return defaultConfig;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);

  // Save to localStorage whenever config changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    }
  }, [config]);

  const updateConfig = useCallback((newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const updatePersonal = useCallback((personal: Partial<SiteConfig['personal']>) => {
    setConfig(prev => ({
      ...prev,
      personal: { ...prev.personal, ...personal },
    }));
  }, []);

  const updateTerminal = useCallback((terminal: Partial<SiteConfig['terminal']>) => {
    setConfig(prev => ({
      ...prev,
      terminal: { ...prev.terminal, ...terminal },
    }));
  }, []);

  const updateStats = useCallback((stats: SiteConfig['stats']) => {
    setConfig(prev => ({ ...prev, stats }));
  }, []);

  const updateBlogPosts = useCallback((blogPosts: SiteConfig['blogPosts']) => {
    setConfig(prev => ({ ...prev, blogPosts }));
  }, []);

  const updateProjects = useCallback((projects: SiteConfig['projects']) => {
    setConfig(prev => ({ ...prev, projects }));
  }, []);

  const updateTimeline = useCallback((timeline: SiteConfig['timeline']) => {
    setConfig(prev => ({ ...prev, timeline }));
  }, []);

  const updateNavigation = useCallback((navigation: Partial<SiteConfig['navigation']>) => {
    setConfig(prev => ({
      ...prev,
      navigation: { ...prev.navigation, ...navigation },
    }));
  }, []);

  const updateTheme = useCallback((theme: Partial<SiteConfig['theme']>) => {
    setConfig(prev => ({
      ...prev,
      theme: { ...prev.theme, ...theme },
    }));
  }, []);

  // Blog post CRUD
  const addBlogPost = useCallback((post: Omit<SiteConfig['blogPosts'][0], 'id'>) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
    };
    setConfig(prev => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
  }, []);

  const updateBlogPost = useCallback((id: string, post: Partial<SiteConfig['blogPosts'][0]>) => {
    setConfig(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p =>
        p.id === id ? { ...p, ...post } : p
      ),
    }));
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id),
    }));
  }, []);

  // Project CRUD
  const addProject = useCallback((project: Omit<SiteConfig['projects'][0], 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setConfig(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  }, []);

  const updateProject = useCallback((id: string, project: Partial<SiteConfig['projects'][0]>) => {
    setConfig(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, ...project } : p
      ),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  }, []);

  // Timeline CRUD
  const addTimelineEvent = useCallback((event: Omit<SiteConfig['timeline'][0], 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setConfig(prev => ({
      ...prev,
      timeline: [newEvent, ...prev.timeline],
    }));
  }, []);

  const updateTimelineEvent = useCallback((id: string, event: Partial<SiteConfig['timeline'][0]>) => {
    setConfig(prev => ({
      ...prev,
      timeline: prev.timeline.map(e =>
        e.id === id ? { ...e, ...event } : e
      ),
    }));
  }, []);

  const deleteTimelineEvent = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      timeline: prev.timeline.filter(e => e.id !== id),
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    }
  }, []);

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfig = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      // Validate basic structure
      if (parsed.personal && parsed.terminal && parsed.stats) {
        setConfig({ ...defaultConfig, ...parsed });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const value: ConfigContextType = {
    config,
    updateConfig,
    updatePersonal,
    updateTerminal,
    updateStats,
    updateBlogPosts,
    updateProjects,
    updateTimeline,
    updateNavigation,
    updateTheme,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addProject,
    updateProject,
    deleteProject,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    resetConfig,
    exportConfig,
    importConfig,
    isAdmin,
    setIsAdmin,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
