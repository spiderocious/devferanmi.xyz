/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blogData';

// Simulated API delay for realistic loading states
const SIMULATED_DELAY = 800;

export interface CreateBlogPostDto {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;
}

export interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {
  id: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export interface BlogSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: 'date' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}

class BlogService {
  private api: AxiosInstance;
  private mockData: BlogPost[] = [...blogPosts];

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.REACT_APP_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );
  }

  private async simulateDelay<T>(data: T): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return data;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private filterPosts(posts: BlogPost[], params: BlogSearchParams): BlogPost[] {
    let filtered = [...posts];

    // Search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter(post => post.category === params.category);
    }

    // Sorting
    if (params.sortBy) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (params.sortBy) {
          case 'date':
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'readTime':
            aValue = parseInt(a.readTime.split(' ')[0] ?? '0') || 0;
            bValue = parseInt(b.readTime.split(' ')[0] ?? '0') || 0;
            break;
          default:
            return 0;
        }

        if (params.sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    } else {
      // Default sort by date desc
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return filtered;
  }

  // Get preview blogs for home page (3 most recent)
  async getPreviewBlogs(): Promise<BlogPost[]> {
    try {
      // In real API: return this.api.get<BlogPost[]>('/blogs/preview').then(res => res.data);
      const recent = this.mockData
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      
      return this.simulateDelay(recent);
    } catch (error) {
      console.error('Error fetching preview blogs:', error);
      throw new Error('Failed to fetch preview blogs');
    }
  }

  // Get all blogs with pagination and filtering
  async getAllBlogs(params: BlogSearchParams = {}): Promise<BlogListResponse> {
    try {
      const { page = 1, limit = 6 } = params;
      
      // In real API: return this.api.get<BlogListResponse>('/blogs', { params }).then(res => res.data);
      const filtered = this.filterPosts(this.mockData, params);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = filtered.slice(startIndex, endIndex);

      const response: BlogListResponse = {
        posts: paginatedPosts,
        total: filtered.length,
        page,
        limit,
      };

      return this.simulateDelay(response);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      throw new Error('Failed to fetch blogs');
    }
  }

  // Get blog details by slug
  async getBlogDetails(slug: string): Promise<BlogPost> {
    try {
      // In real API: return this.api.get<BlogPost>(`/blogs/${slug}`).then(res => res.data);
      const post = this.mockData.find(p => p.slug === slug);
      
      if (!post) {
        throw new Error('Blog post not found');
      }

      return this.simulateDelay(post);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      throw new Error('Failed to fetch blog details');
    }
  }

  // Get blog by ID (for editing)
  async getBlogById(id: number): Promise<BlogPost> {
    try {
      // In real API: return this.api.get<BlogPost>(`/blogs/edit/${id}`).then(res => res.data);
      const post = this.mockData.find(p => p.id === id);
      
      if (!post) {
        throw new Error('Blog post not found');
      }

      return this.simulateDelay(post);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  // Create new blog post
  async createBlog(blogData: CreateBlogPostDto): Promise<BlogPost> {
    try {
      // In real API: return this.api.post<BlogPost>('/blogs', blogData).then(res => res.data);
      const newPost: BlogPost = {
        id: Math.max(...this.mockData.map(p => p.id)) + 1,
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        image: blogData.image,
        category: blogData.category,
        tags: blogData.tags,
        readTime: blogData.readTime,
        date: new Date().toISOString().split('T')[0] ?? '',
        slug: this.generateSlug(blogData.title),
        author: {
          name: 'Oluwaferanmi Adeniji',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
          bio: 'Senior Software Engineer with 7+ years of fintech experience'
        }
      };

      this.mockData.unshift(newPost);
      return this.simulateDelay(newPost);
    } catch (error) {
      console.error('Error creating blog:', error);
      throw new Error('Failed to create blog post');
    }
  }

  // Update existing blog post
  async updateBlog(updateData: UpdateBlogPostDto): Promise<BlogPost> {
    try {
      // In real API: return this.api.put<BlogPost>(`/blogs/${updateData.id}`, updateData).then(res => res.data);
      const postIndex = this.mockData.findIndex(p => p.id === updateData.id);
      
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }

      const updatedPost: any = {
        ...this.mockData[postIndex],
        ...updateData,
        slug: updateData.title ? this.generateSlug(updateData.title) : this.mockData[postIndex]?.slug ?? '',
      };

      this.mockData[postIndex] = updatedPost;
      return this.simulateDelay(updatedPost);
    } catch (error) {
      console.error('Error updating blog:', error);
      throw new Error('Failed to update blog post');
    }
  }

  // Delete blog post
  async deleteBlog(id: number): Promise<{ success: boolean; message: string }> {
    try {
      // In real API: return this.api.delete(`/blogs/${id}`).then(res => res.data);
      const postIndex = this.mockData.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }

      this.mockData.splice(postIndex, 1);
      
      const response = { success: true, message: 'Blog post deleted successfully' };
      return this.simulateDelay(response);
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw new Error('Failed to delete blog post');
    }
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    try {
      // In real API: return this.api.get<string[]>('/blogs/categories').then(res => res.data);
      const categories = Array.from(new Set(this.mockData.map(post => post.category).filter((cat): cat is string => typeof cat === 'string'))) ?? [];
      return this.simulateDelay(categories) ?? [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Get related posts
  async getRelatedPosts(currentPostId: number, category: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      // In real API: return this.api.get<BlogPost[]>(`/blogs/${currentPostId}/related`, { params: { category, limit } }).then(res => res.data);
      const related = this.mockData
        .filter(post => post.id !== currentPostId && post.category === category)
        .slice(0, limit);
      
      return this.simulateDelay(related);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      throw new Error('Failed to fetch related posts');
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();
export default blogService;
