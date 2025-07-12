import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  EyeOff,
  Image, 
  Calendar, 
  Tag, 
  Type, 
  FileText,
  Clock,
  Globe,
  Settings,
  BookOpen,
  BarChart3,
  Users,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import PostPreview from '../components/PostPreview';
import WYSIWYGEditor from '../components/WYSIWYGEditor';
import { BlogPost } from '../types';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    image: '',
    category: '',
    tags: '',
    date: new Date().toISOString().split('T')[0] ?? '',
    readTime: '5 min read',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    slug: '',
    featured: false,
    allowComments: true,
    scheduledDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug,
        seoTitle: value
      }));
    }

    // Auto-generate excerpt from content if not provided
    if (name === 'content' && !formData.excerpt) {
      const plainText = value.replace(/<[^>]*>/g, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      setFormData(prev => ({
        ...prev,
        excerpt,
        seoDescription: excerpt
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));

    // Auto-generate excerpt if not manually set
    if (!formData.excerpt) {
      const plainText = content.replace(/<[^>]*>/g, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      setFormData(prev => ({
        ...prev,
        excerpt,
        seoDescription: excerpt
      }));
    }
  };

  const handleSave = (status: 'draft' | 'published' = 'draft') => {
    const newPost: BlogPost = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      date: formData.date,
      readTime: formData.readTime,
      image: formData.image,
      slug: formData.slug,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: {
        name: 'Alex Developer',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        bio: 'Full-stack developer with 5+ years of experience'
      }
    };

    console.log(`Saving post as ${status}:`, newPost);
    navigate('/admin');
  };

  const previewPost: BlogPost = {
    id: 0,
    title: formData.title || 'Untitled Post',
    excerpt: formData.excerpt || 'No excerpt provided',
    date: formData.date,
    readTime: formData.readTime,
    image: formData.image || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'preview',
    content: formData.content || '<p>No content provided</p>',
    category: formData.category || 'Uncategorized',
    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    author: {
      name: 'Alex Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Full-stack developer with 5+ years of experience'
    }
  };

  const getCompletionStats = () => {
    const fields = [
      formData.title,
      formData.content,
      formData.excerpt,
      formData.image,
      formData.category,
      formData.tags
    ];
    const completed = fields.filter(field => field.trim() !== '').length;
    return { completed, total: fields.length, percentage: Math.round((completed / fields.length) * 100) };
  };

  const stats = getCompletionStats();

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'meta', label: 'Meta & SEO', icon: Settings },
    { id: 'settings', label: 'Settings', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header with Status */}
        <div className="flex items-center justify-between mb-8 animate-organic-fade-up">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
              <p className="text-gray-400">Write and publish your next blog post</p>
            </div>
            
            {/* Completion Stats */}
            <div className="bg-gray-900 px-6 py-4 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-300 text-sm">{stats.completed}/{stats.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            
            <button
              onClick={() => handleSave('draft')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-105"
            >
              <Save className="w-5 h-5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={() => handleSave('published')}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              <Zap className="w-5 h-5" />
              <span>Publish</span>
            </button>
          </div>
        </div>

        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Main Content Area */}
          <div className="space-y-6 animate-organic-fade-up delay-200">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
                <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formData.content.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length}</div>
                <div className="text-gray-400 text-sm">Words</div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
                <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formData.readTime}</div>
                <div className="text-gray-400 text-sm">Read Time</div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
                <Tag className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formData.tags ? formData.tags.split(',').length : 0}</div>
                <div className="text-gray-400 text-sm">Tags</div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formData.status === 'published' ? 'Live' : 'Draft'}</div>
                <div className="text-gray-400 text-sm">Status</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg border border-gray-800">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Title */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                    <Type className="w-5 h-5" />
                    <span>Post Title</span>
                    {formData.title && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter an engaging post title..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg font-semibold"
                  />
                </div>

                {/* Rich Text Editor */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <label className="flex items-center space-x-2 text-white font-semibold mb-4">
                    <FileText className="w-5 h-5" />
                    <span>Content</span>
                    {formData.content && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </label>
                  <WYSIWYGEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Start writing your amazing content..."
                    height={600}
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                    <FileText className="w-5 h-5" />
                    <span>Excerpt</span>
                    {formData.excerpt && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Brief description that will appear in post previews..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
                  />
                  <div className="mt-2 text-sm text-gray-400">
                    {formData.excerpt.length}/160 characters (recommended for SEO)
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meta' && (
              <div className="space-y-6">
                {/* Featured Image */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                    <Image className="w-5 h-5" />
                    <span>Featured Image</span>
                    {formData.image && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                  />
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Category and Tags */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                      <Tag className="w-5 h-5" />
                      <span>Category</span>
                      {formData.category && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select Category</option>
                      <option value="React">React</option>
                      <option value="TypeScript">TypeScript</option>
                      <option value="Performance">Performance</option>
                      <option value="Technology">Technology</option>
                      <option value="CSS">CSS</option>
                      <option value="Accessibility">Accessibility</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                    <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                      <Clock className="w-5 h-5" />
                      <span>Read Time</span>
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleChange}
                      placeholder="5 min read"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <label className="flex items-center space-x-2 text-white font-semibold mb-3">
                    <Tag className="w-5 h-5" />
                    <span>Tags</span>
                    {formData.tags && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, TypeScript, Web Development (comma separated)"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                  />
                  <div className="mt-2 text-sm text-gray-400">
                    Separate tags with commas. Use relevant keywords for better discoverability.
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>SEO Settings</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">SEO Title</label>
                      <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleChange}
                        placeholder="SEO optimized title (max 60 characters)"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      />
                      <div className="mt-1 text-sm text-gray-400">{formData.seoTitle.length}/60 characters</div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">SEO Description</label>
                      <textarea
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Meta description for search engines (max 160 characters)"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
                      />
                      <div className="mt-1 text-sm text-gray-400">{formData.seoDescription.length}/160 characters</div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">URL Slug</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="url-friendly-slug"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      />
                      <div className="mt-1 text-sm text-gray-400">URL: /blog/{formData.slug || 'your-post-slug'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Publishing Settings */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Publishing Settings</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Publish Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Schedule For Later</label>
                      <input
                        type="datetime-local"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Post Options */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Post Options</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-white font-medium">Featured Post</label>
                        <p className="text-gray-400 text-sm">Pin this post to the top of your blog</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-white font-medium">Allow Comments</label>
                        <p className="text-gray-400 text-sm">Enable readers to comment on this post</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="allowComments"
                          checked={formData.allowComments}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Content Analysis */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Content Analysis</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">Readability Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-green-400 font-medium">Good</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">SEO Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-yellow-400 font-medium">Fair</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-blue-300 font-medium">SEO Suggestions</p>
                          <ul className="text-blue-200 text-sm mt-1 space-y-1">
                            <li>• Add more headings to structure your content</li>
                            <li>• Include focus keywords in your meta description</li>
                            <li>• Consider adding internal links</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview */}
          {showPreview && (
            <div className="animate-organic-fade-up delay-400">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Live Preview</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Auto-updating</span>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                  <PostPreview post={previewPost} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;