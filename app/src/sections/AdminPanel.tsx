import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { 
  User, Terminal, BarChart3, Rss, FolderGit2, Clock, 
  Save, Download, Upload, RotateCcw,
  Plus, Trash2, Edit2, Check, X,
  LogOut, Palette, Layout
} from 'lucide-react';

type TabType = 'personal' | 'terminal' | 'stats' | 'blog' | 'projects' | 'timeline' | 'navigation' | 'theme';

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

export function AdminPanel() {
  const { 
    config, 
    updatePersonal, 
    updateTerminal, 
    updateStats,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addProject,
    updateProject,
    deleteProject,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    updateNavigation,
    updateTheme,
    resetConfig,
    exportConfig,
    importConfig,
    isAdmin,
    setIsAdmin,
  } = useConfig();

  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [saveMessage, setSaveMessage] = useState('');

  // Form states
  const [personalForm, setPersonalForm] = useState(config.personal);
  const [terminalForm, setTerminalForm] = useState(config.terminal);
  const [newInterest, setNewInterest] = useState('');
  const [importData, setImportData] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // Editing states
  const [editingBlogPost, setEditingBlogPost] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingTimelineEvent, setEditingTimelineEvent] = useState<string | null>(null);

  // New item forms
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min',
    tags: [] as string[],
    featured: false,
    slug: '',
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    tags: [] as string[],
    githubUrl: '',
    demoUrl: '',
    featured: false,
  });
  const [newTimelineEvent, setNewTimelineEvent] = useState({
    date: new Date().toISOString().split('T')[0].slice(0, 7),
    title: '',
    description: '',
    type: 'work' as const,
  });

  useEffect(() => {
    setPersonalForm(config.personal);
    setTerminalForm(config.terminal);
  }, [config.personal, config.terminal]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="terminal-window w-full max-w-md mx-4 p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">需要管理员权限</h2>
          <p className="text-gray-400 mb-6">
            请按住 Shift 键点击网站 Logo 进行登录
          </p>
          <button 
            onClick={() => window.location.hash = ''}
            className="btn-primary"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleSavePersonal = () => {
    updatePersonal(personalForm);
    showSaveMessage('个人信息已保存');
  };

  const handleSaveTerminal = () => {
    updateTerminal(terminalForm);
    showSaveMessage('终端信息已保存');
  };

  const showSaveMessage = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleExport = () => {
    const data = exportConfig();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSaveMessage('配置已导出');
  };

  const handleImport = () => {
    if (importConfig(importData)) {
      setShowImportModal(false);
      setImportData('');
      showSaveMessage('配置已导入');
    } else {
      alert('导入失败：无效的 JSON 格式');
    }
  };

  const tabs = [
    { id: 'personal' as TabType, label: '个人信息', icon: User },
    { id: 'terminal' as TabType, label: '终端设置', icon: Terminal },
    { id: 'stats' as TabType, label: '统计数据', icon: BarChart3 },
    { id: 'blog' as TabType, label: '博客文章', icon: Rss },
    { id: 'projects' as TabType, label: '项目展示', icon: FolderGit2 },
    { id: 'timeline' as TabType, label: '时间线', icon: Clock },
    { id: 'navigation' as TabType, label: '导航设置', icon: Layout },
    { id: 'theme' as TabType, label: '主题设置', icon: Palette },
  ];



  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              <span className="neon-text-cyan">{'>'}</span> 管理后台
            </h1>
            <p className="text-gray-400 text-sm">配置你的个人网站内容</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Save Message */}
            {saveMessage && (
              <span className="text-[#00ff9d] text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                {saveMessage}
              </span>
            )}
            
            {/* Export/Import */}
            <button onClick={handleExport} className="btn-secondary text-sm py-2 px-3">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">导出</span>
            </button>
            <button onClick={() => setShowImportModal(true)} className="btn-secondary text-sm py-2 px-3">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">导入</span>
            </button>
            
            {/* Logout */}
            <button 
              onClick={() => {
                setIsAdmin(false);
                window.location.hash = '';
              }}
              className="btn-secondary text-sm py-2 px-3 text-red-400 border-red-400/30 hover:border-red-400/60"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">退出</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="cyber-card p-2 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id 
                        ? 'bg-[#00ff9d]/10 text-[#00ff9d]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Personal Info */}
            {activeTab === 'personal' && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00ff9d]" />
                  个人信息
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">姓名</label>
                    <input
                      type="text"
                      value={personalForm.name}
                      onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">职位/头衔</label>
                    <input
                      type="text"
                      value={personalForm.title}
                      onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">副标题</label>
                    <input
                      type="text"
                      value={personalForm.subtitle}
                      onChange={(e) => setPersonalForm({ ...personalForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">位置</label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                    <input
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">个人简介</label>
                    <textarea
                      value={personalForm.bio}
                      onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button onClick={handleSavePersonal} className="btn-primary">
                    <Save className="w-4 h-4" />
                    <span>保存更改</span>
                  </button>
                </div>
              </div>
            )}

            {/* Terminal Settings */}
            {activeTab === 'terminal' && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#00ff9d]" />
                  终端设置
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">用户名</label>
                    <input
                      type="text"
                      value={terminalForm.username}
                      onChange={(e) => setTerminalForm({ ...terminalForm, username: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">主机名</label>
                    <input
                      type="text"
                      value={terminalForm.hostname}
                      onChange={(e) => setTerminalForm({ ...terminalForm, hostname: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">角色描述</label>
                    <input
                      type="text"
                      value={terminalForm.role}
                      onChange={(e) => setTerminalForm({ ...terminalForm, role: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">状态消息</label>
                    <input
                      type="text"
                      value={terminalForm.statusMessage}
                      onChange={(e) => setTerminalForm({ ...terminalForm, statusMessage: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">兴趣列表</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {terminalForm.interests.map((interest, index) => (
                        <span key={index} className="tag flex items-center gap-1">
                          {interest}
                          <button
                            onClick={() => setTerminalForm({
                              ...terminalForm,
                              interests: terminalForm.interests.filter((_, i) => i !== index)
                            })}
                            className="hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newInterest.trim()) {
                            setTerminalForm({
                              ...terminalForm,
                              interests: [...terminalForm.interests, newInterest.trim()]
                            });
                            setNewInterest('');
                          }
                        }}
                        placeholder="添加兴趣..."
                        className="flex-1 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                      />
                      <button
                        onClick={() => {
                          if (newInterest.trim()) {
                            setTerminalForm({
                              ...terminalForm,
                              interests: [...terminalForm.interests, newInterest.trim()]
                            });
                            setNewInterest('');
                          }
                        }}
                        className="btn-primary py-2 px-3"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button onClick={handleSaveTerminal} className="btn-primary">
                    <Save className="w-4 h-4" />
                    <span>保存更改</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            {activeTab === 'stats' && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#00ff9d]" />
                  统计数据
                </h2>
                
                <div className="space-y-4">
                  {config.stats.map((stat, index) => (
                    <div key={stat.id} className="flex items-center gap-4 p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f]">
                      <div className="flex-1 grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...config.stats];
                            newStats[index].value = e.target.value;
                            updateStats(newStats);
                          }}
                          className="px-3 py-2 bg-[#161b22] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                          placeholder="数值"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...config.stats];
                            newStats[index].label = e.target.value;
                            updateStats(newStats);
                          }}
                          className="px-3 py-2 bg-[#161b22] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                          placeholder="标签"
                        />
                        <select
                          value={stat.color}
                          onChange={(e) => {
                            const newStats = [...config.stats];
                            newStats[index].color = e.target.value as 'cyan' | 'orange' | 'blue' | 'purple';
                            updateStats(newStats);
                          }}
                          className="px-3 py-2 bg-[#161b22] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                        >
                          <option value="cyan">青色</option>
                          <option value="orange">橙色</option>
                          <option value="blue">蓝色</option>
                          <option value="purple">紫色</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Posts */}
            {activeTab === 'blog' && (
              <div className="space-y-4">
                {/* Add New */}
                <div className="cyber-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#00ff9d]" />
                    添加新文章
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newBlogPost.title}
                      onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                      placeholder="文章标题"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="date"
                      value={newBlogPost.date}
                      onChange={(e) => setNewBlogPost({ ...newBlogPost, date: e.target.value })}
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="text"
                      value={newBlogPost.readTime}
                      onChange={(e) => setNewBlogPost({ ...newBlogPost, readTime: e.target.value })}
                      placeholder="阅读时间 (如: 5 min)"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="text"
                      value={newBlogPost.slug}
                      onChange={(e) => setNewBlogPost({ ...newBlogPost, slug: e.target.value })}
                      placeholder="URL Slug"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <textarea
                      value={newBlogPost.excerpt}
                      onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                      placeholder="文章摘要"
                      rows={3}
                      className="sm:col-span-2 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                    />
                    <div className="sm:col-span-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newBlogPost.featured}
                          onChange={(e) => setNewBlogPost({ ...newBlogPost, featured: e.target.checked })}
                          className="w-4 h-4 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                        />
                        设为精选
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (newBlogPost.title && newBlogPost.excerpt) {
                        addBlogPost(newBlogPost);
                        setNewBlogPost({
                          title: '',
                          excerpt: '',
                          date: new Date().toISOString().split('T')[0],
                          readTime: '5 min',
                          tags: [],
                          featured: false,
                          slug: '',
                        });
                        showSaveMessage('文章已添加');
                      }
                    }}
                    className="mt-4 btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>添加文章</span>
                  </button>
                </div>

                {/* Existing Posts */}
                {config.blogPosts.map((post) => (
                  <div key={post.id} className="cyber-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {editingBlogPost === post.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={post.title}
                              onChange={(e) => updateBlogPost(post.id, { title: e.target.value })}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                            />
                            <textarea
                              value={post.excerpt}
                              onChange={(e) => updateBlogPost(post.id, { excerpt: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="text-white font-medium">{post.title}</h4>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                              {post.featured && (
                                <span className="text-[#ff6b35]">精选</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingBlogPost(editingBlogPost === post.id ? null : post.id)}
                          className="p-2 text-gray-400 hover:text-[#00ff9d] transition-colors"
                        >
                          {editingBlogPost === post.id ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => {
                            deleteBlogPost(post.id);
                            showSaveMessage('文章已删除');
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {/* Add New */}
                <div className="cyber-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#00ff9d]" />
                    添加新项目
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="项目名称"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="url"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      placeholder="图片 URL"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      placeholder="GitHub URL"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <input
                      type="url"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      placeholder="Demo URL"
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="项目描述"
                      rows={3}
                      className="sm:col-span-2 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                    />
                    <div className="sm:col-span-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                          className="w-4 h-4 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                        />
                        设为精选
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (newProject.title && newProject.description) {
                        addProject(newProject);
                        setNewProject({
                          title: '',
                          description: '',
                          image: '',
                          tags: [],
                          githubUrl: '',
                          demoUrl: '',
                          featured: false,
                        });
                        showSaveMessage('项目已添加');
                      }
                    }}
                    className="mt-4 btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>添加项目</span>
                  </button>
                </div>

                {/* Existing Projects */}
                {config.projects.map((project) => (
                  <div key={project.id} className="cyber-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {editingProject === project.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(project.id, { title: e.target.value })}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                            />
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(project.id, { description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="text-white font-medium">{project.title}</h4>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {project.featured && (
                                <span className="text-xs text-[#ff6b35]">精选</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                          className="p-2 text-gray-400 hover:text-[#00ff9d] transition-colors"
                        >
                          {editingProject === project.id ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => {
                            deleteProject(project.id);
                            showSaveMessage('项目已删除');
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                {/* Add New */}
                <div className="cyber-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#00ff9d]" />
                    添加新事件
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="month"
                      value={newTimelineEvent.date}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, date: e.target.value })}
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <select
                      value={newTimelineEvent.type}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, type: e.target.value as typeof newTimelineEvent.type })}
                      className="px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    >
                      <option value="work">工作</option>
                      <option value="education">教育</option>
                      <option value="project">项目</option>
                      <option value="award">奖项</option>
                    </select>
                    <input
                      type="text"
                      value={newTimelineEvent.title}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, title: e.target.value })}
                      placeholder="事件标题"
                      className="sm:col-span-2 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                    />
                    <textarea
                      value={newTimelineEvent.description}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, description: e.target.value })}
                      placeholder="事件描述"
                      rows={3}
                      className="sm:col-span-2 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (newTimelineEvent.title && newTimelineEvent.description) {
                        addTimelineEvent(newTimelineEvent);
                        setNewTimelineEvent({
                          date: new Date().toISOString().split('T')[0].slice(0, 7),
                          title: '',
                          description: '',
                          type: 'work',
                        });
                        showSaveMessage('事件已添加');
                      }
                    }}
                    className="mt-4 btn-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span>添加事件</span>
                  </button>
                </div>

                {/* Existing Events */}
                {config.timeline.map((event) => (
                  <div key={event.id} className="cyber-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {editingTimelineEvent === event.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={event.title}
                              onChange={(e) => updateTimelineEvent(event.id, { title: e.target.value })}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                            />
                            <textarea
                              value={event.description}
                              onChange={(e) => updateTimelineEvent(event.id, { description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d] resize-none"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${typeBgColors[event.type]} ${typeColors[event.type]}`}>
                                {event.type === 'work' && '工作'}
                                {event.type === 'education' && '教育'}
                                {event.type === 'project' && '项目'}
                                {event.type === 'award' && '奖项'}
                              </span>
                              <span className="text-xs text-gray-500">{event.date}</span>
                            </div>
                            <h4 className="text-white font-medium">{event.title}</h4>
                            <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTimelineEvent(editingTimelineEvent === event.id ? null : event.id)}
                          className="p-2 text-gray-400 hover:text-[#00ff9d] transition-colors"
                        >
                          {editingTimelineEvent === event.id ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => {
                            deleteTimelineEvent(event.id);
                            showSaveMessage('事件已删除');
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            {activeTab === 'navigation' && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-[#00ff9d]" />
                  导航设置
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f] cursor-pointer hover:border-[#00ff9d]/50 transition-colors">
                    <span className="text-white">显示博客</span>
                    <input
                      type="checkbox"
                      checked={config.navigation.showBlog}
                      onChange={(e) => updateNavigation({ showBlog: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f] cursor-pointer hover:border-[#00ff9d]/50 transition-colors">
                    <span className="text-white">显示项目</span>
                    <input
                      type="checkbox"
                      checked={config.navigation.showProjects}
                      onChange={(e) => updateNavigation({ showProjects: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f] cursor-pointer hover:border-[#00ff9d]/50 transition-colors">
                    <span className="text-white">显示时间线</span>
                    <input
                      type="checkbox"
                      checked={config.navigation.showTimeline}
                      onChange={(e) => updateNavigation({ showTimeline: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f] cursor-pointer hover:border-[#00ff9d]/50 transition-colors">
                    <span className="text-white">显示关于</span>
                    <input
                      type="checkbox"
                      checked={config.navigation.showAbout}
                      onChange={(e) => updateNavigation({ showAbout: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Theme */}
            {activeTab === 'theme' && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#00ff9d]" />
                  主题设置
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">主色调</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-12 h-10 rounded bg-transparent border border-[#1e3a2f] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">强调色</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="w-12 h-10 rounded bg-transparent border border-[#1e3a2f] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="flex-1 px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm focus:outline-none focus:border-[#00ff9d]"
                      />
                    </div>
                  </div>
                  
                  <label className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#1e3a2f] cursor-pointer hover:border-[#00ff9d]/50 transition-colors">
                    <span className="text-white">显示网格背景</span>
                    <input
                      type="checkbox"
                      checked={config.theme.showGridBackground}
                      onChange={(e) => updateTheme({ showGridBackground: e.target.checked })}
                      className="w-5 h-5 rounded border-[#1e3a2f] bg-[#0d1117] text-[#00ff9d] focus:ring-[#00ff9d]"
                    />
                  </label>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-500 font-medium mb-1">重置所有设置</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        这将清除所有自定义配置并恢复到默认状态。此操作不可撤销。
                      </p>
                      <button
                        onClick={() => {
                          if (confirm('确定要重置所有设置吗？此操作不可撤销。')) {
                            resetConfig();
                            showSaveMessage('配置已重置');
                          }
                        }}
                        className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm hover:bg-red-500/30 transition-colors"
                      >
                        重置配置
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="terminal-window w-full max-w-lg">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="ml-2 text-sm text-gray-400 font-mono">导入配置</span>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-4">
                粘贴之前导出的 JSON 配置数据：
              </p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                placeholder="{...}"
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#1e3a2f] rounded text-white text-sm font-mono focus:outline-none focus:border-[#00ff9d] resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={handleImport} className="btn-primary flex-1 justify-center">
                  <Upload className="w-4 h-4" />
                  <span>导入</span>
                </button>
                <button 
                  onClick={() => {
                    setShowImportModal(false);
                    setImportData('');
                  }}
                  className="btn-secondary flex-1 justify-center"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
