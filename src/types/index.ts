export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metrics: any[];
  featured: boolean;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  content?: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number;
}