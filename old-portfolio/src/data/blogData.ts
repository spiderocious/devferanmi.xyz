import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'From Android Phone to $50M Fintech Systems: My Journey',
    excerpt: 'How I went from coding HTML on a mobile phone during university strike to leading engineering teams at Nigeria\'s largest fintech platform.',
    date: '2024-12-15',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'from-android-phone-to-fintech-systems',
    content: `
      <p>My journey into software engineering started in the most unlikely way - with an HTML Code Play app on my Android phone during a university strike in 2017. Today, I lead engineering teams building systems that process over $50M in transactions at Nigeria's largest fintech platform.</p>
      
      <h2>The Beginning: HTML Code Play</h2>
      <p>During a prolonged university strike, I found myself at home, curious about how electronics worked. That curiosity led me to programming, which reminded me of mathematics - a structured language revealing patterns and logic.</p>
      
      <p>When I got my first Android device, an Itel IT1507, I discovered HTML Code Play. Writing a few lines of code and seeing them rendered felt like discovering a superpower. I built my first app - a Computer-Based Test (CBT) system for students.</p>
      
      <h2>From Self-Taught to Scale</h2>
      <p>What started as curiosity became a career spanning multiple fintech companies:</p>
      
      <ul>
        <li><strong>QuickSell (2015-2020):</strong> Built foundational e-commerce architecture</li>
        <li><strong>Amazon (2020-2021):</strong> Developed internal admin platforms</li>
        <li><strong>Ajocard (2021-2023):</strong> Created API switching gateway improving transfers by 30%</li>
        <li><strong>Moniepoint (2023-Present):</strong> Leading teams building $50M+ loan platforms</li>
      </ul>
      
      <h2>The Transformation</h2>
      <p>At Moniepoint, I've experienced the most significant growth:</p>
      
      <blockquote>
        "From introvert to hosting 200+ attendee engineering sessions - the journey has been transformative."
      </blockquote>
      
      <h3>Technical Achievements</h3>
      <p>Some highlights from my current role:</p>
      
      <ol>
        <li>Built Field Verification System processing $20M+ in loans</li>
        <li>Reduced deployment times by 87% (45 minutes to 6 minutes)</li>
        <li>Led micro-frontend migration reducing feature delivery from 6 weeks to 2 weeks</li>
        <li>Mentored 15+ engineers with 90% receiving above-expectations ratings</li>
      </ol>
      
      <h2>Lessons Learned</h2>
      <p>Key insights from this journey:</p>
      
      <ul>
        <li><strong>Performance Matters:</strong> You cannot optimize what you cannot measure</li>
        <li><strong>Code is Communication:</strong> Write for humans, not just computers</li>
        <li><strong>Think, Jot, Decide, Code:</strong> Planning prevents poor performance</li>
        <li><strong>Share Knowledge:</strong> Teaching others accelerates your own growth</li>
      </ul>
      
      <p>The journey from that HTML Code Play app to leading fintech engineering teams taught me that curiosity, persistence, and continuous learning can take you anywhere. Every challenge is an opportunity to grow.</p>
    `,
    category: 'Career',
    tags: ['Career', 'Fintech', 'Leadership', 'Self-taught'],
    author: {
      name: 'Oluwaferanmi Adeniji',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Senior Software Engineer with 7+ years of fintech experience'
    }
  },
  {
    id: 2,
    title: 'Micro-Frontend Migration: From 6 Weeks to 2 Weeks Delivery',
    excerpt: 'How we transformed Moniepoint\'s monolithic Angular app into a React-based micro-frontend architecture, reducing feature delivery time by 70%.',
    date: '2024-11-20',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'micro-frontend-migration-moniepoint',
    content: `
      <p>At Moniepoint, we faced a classic scaling challenge: our monolithic Angular application was becoming a bottleneck. With 8 engineers across 5 product verticals, feature delivery took 6 weeks on average. Here's how we solved it with micro-frontends.</p>
      
      <h2>The Problem: Monolithic Bottlenecks</h2>
      <p>Our Angular monolith suffered from several issues:</p>
      
      <ul>
        <li>Teams blocked by merge conflicts</li>
        <li>Coupled deployments causing delays</li>
        <li>Difficulty onboarding new engineers</li>
        <li>Technology choices locked to Angular</li>
      </ul>
      
      <h2>The Solution: React-Based Micro-Frontends</h2>
      <p>We designed a migration strategy that allowed parallel development:</p>
      
      <blockquote>
        "The key was enabling teams to build independently while maintaining consistency across all financial products."
      </blockquote>
      
      <h3>Architecture Decisions</h3>
      <ul>
        <li><strong>Module Federation:</strong> Used Webpack 5 for runtime integration</li>
        <li><strong>Component Library:</strong> Shared design system across 12+ apps</li>
        <li><strong>Independent Deployments:</strong> Each team owns their pipeline</li>
        <li><strong>Gradual Migration:</strong> No big-bang rewrites</li>
      </ul>
      
      <h2>Implementation Strategy</h2>
      <p>We followed a phased approach over 4 months:</p>
      
      <ol>
        <li><strong>Foundation:</strong> Built shared component library and design tokens</li>
        <li><strong>Proof of Concept:</strong> Migrated one small feature to validate approach</li>
        <li><strong>Team Training:</strong> Upskilled engineers on React and micro-frontend patterns</li>
        <li><strong>Gradual Rollout:</strong> Migrated features by priority and complexity</li>
      </ol>
      
      <h2>Results: 70% Faster Delivery</h2>
      <p>The transformation delivered measurable improvements:</p>
      
      <ul>
        <li><strong>Feature Delivery:</strong> From 6 weeks to 2 weeks (70% reduction)</li>
        <li><strong>Code Reuse:</strong> 60% reduction in duplication</li>
        <li><strong>Team Velocity:</strong> 40% improvement in development speed</li>
        <li><strong>Bug Rate:</strong> 30% reduction due to better isolation</li>
      </ul>
      
      <h2>Lessons Learned</h2>
      <p>Key insights from our migration:</p>
      
      <ul>
        <li><strong>Start Small:</strong> Validate with low-risk features first</li>
        <li><strong>Invest in Tooling:</strong> Good developer experience is crucial</li>
        <li><strong>Design System First:</strong> Consistency across micro-frontends is hard</li>
        <li><strong>Team Communication:</strong> Clear boundaries prevent conflicts</li>
      </ul>
      
      <p>Micro-frontends aren't a silver bullet, but when implemented thoughtfully, they can transform how large teams build and ship features. The 70% delivery improvement speaks for itself.</p>
    `,
    category: 'Architecture',
    tags: ['Micro-frontends', 'React', 'Angular', 'Performance', 'Migration'],
    author: {
      name: 'Oluwaferanmi Adeniji',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Senior Software Engineer with 7+ years of fintech experience'
    }
  },
  {
    id: 3,
    title: 'How I Reduced Deployment Time by 87% at Moniepoint',
    excerpt: 'From 45 minutes to 6 minutes: the engineering optimizations and automated systems that transformed our deployment pipeline.',
    date: '2024-10-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'reduced-deployment-time-87-percent',
    content: `
      <p>Performance optimization is crucial for modern web applications. Users expect fast, responsive experiences, and search engines reward performant sites with better rankings.</p>
      
      <h2>Core Web Vitals</h2>
      <p>Google's Core Web Vitals are essential metrics for measuring user experience:</p>
      
      <ul>
        <li><strong>Largest Contentful Paint (LCP):</strong> Loading performance</li>
        <li><strong>First Input Delay (FID):</strong> Interactivity</li>
        <li><strong>Cumulative Layout Shift (CLS):</strong> Visual stability</li>
      </ul>
      
      <h2>Image Optimization</h2>
      <p>Images often account for the majority of a page's weight. Optimize them by:</p>
      
      <blockquote>
        "A well-optimized image can reduce page load time by 50% or more while maintaining visual quality."
      </blockquote>
      
      <h3>Image Optimization Techniques</h3>
      <ol>
        <li>Use modern formats (WebP, AVIF)</li>
        <li>Implement responsive images</li>
        <li>Lazy load images below the fold</li>
        <li>Compress images appropriately</li>
        <li>Use CDNs for image delivery</li>
      </ol>
      
      <h2>Code Splitting</h2>
      <p>Code splitting allows you to break your bundle into smaller chunks:</p>
      
      <ul>
        <li>Route-based splitting</li>
        <li>Component-based splitting</li>
        <li>Dynamic imports</li>
        <li>Vendor chunk separation</li>
      </ul>
      
      <h2>Caching Strategies</h2>
      <p>Effective caching can dramatically improve performance:</p>
      
      <h3>Browser Caching</h3>
      <ul>
        <li>Set appropriate cache headers</li>
        <li>Use cache busting for updated assets</li>
        <li>Implement service workers for offline caching</li>
      </ul>
      
      <h3>CDN Caching</h3>
      <ul>
        <li>Cache static assets at edge locations</li>
        <li>Use geographic distribution</li>
        <li>Implement cache invalidation strategies</li>
      </ul>
      
      <h2>JavaScript Optimization</h2>
      <p>Optimize your JavaScript for better performance:</p>
      
      <ol>
        <li>Minimize and compress JavaScript files</li>
        <li>Remove unused code (tree shaking)</li>
        <li>Use efficient algorithms and data structures</li>
        <li>Avoid blocking the main thread</li>
        <li>Implement virtual scrolling for large lists</li>
      </ol>
      
      <h2>Monitoring and Measurement</h2>
      <p>Continuous monitoring is essential:</p>
      
      <ul>
        <li>Use Real User Monitoring (RUM)</li>
        <li>Implement synthetic testing</li>
        <li>Monitor Core Web Vitals</li>
        <li>Set up performance budgets</li>
      </ul>
      
      <p>Remember, performance optimization is an ongoing process. Regular monitoring and optimization ensure your application continues to deliver excellent user experiences.</p>
    `,
    category: 'Performance',
    tags: ['Performance', 'Optimization', 'Core Web Vitals', 'Caching', 'JavaScript'],
    author: {
      name: 'Alex Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Full-stack developer with 5+ years of experience'
    }
  },
  {
    id: 4,
    title: 'Mastering TypeScript for React Development',
    excerpt: 'Deep dive into TypeScript patterns and best practices for building robust React applications.',
    date: '2024-01-01',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'mastering-typescript-react',
    content: `
      <p>TypeScript has become an essential tool for React development, providing type safety and improved developer experience. Let's explore advanced TypeScript patterns for React.</p>
      
      <h2>Advanced Component Patterns</h2>
      <p>TypeScript enables powerful component patterns that improve code quality and maintainability.</p>
      
      <h3>Generic Components</h3>
      <p>Create reusable components with generic types:</p>
      
      <blockquote>
        "Generic components allow you to write once and use everywhere with full type safety."
      </blockquote>
      
      <h2>Type-Safe State Management</h2>
      <p>Ensure your state management is bulletproof with TypeScript:</p>
      
      <ul>
        <li>Strongly typed reducers</li>
        <li>Type-safe action creators</li>
        <li>Discriminated unions for actions</li>
        <li>Typed selectors</li>
      </ul>
      
      <h2>Advanced Hook Patterns</h2>
      <p>Create custom hooks with proper TypeScript support:</p>
      
      <ol>
        <li>Generic custom hooks</li>
        <li>Conditional hook returns</li>
        <li>Hook composition patterns</li>
        <li>Type-safe context hooks</li>
      </ol>
      
      <p>TypeScript and React together create a powerful development experience that catches errors early and improves code maintainability.</p>
    `,
    category: 'TypeScript',
    tags: ['TypeScript', 'React', 'Patterns', 'Hooks', 'State Management'],
    author: {
      name: 'Alex Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Full-stack developer with 5+ years of experience'
    }
  },
  {
    id: 5,
    title: 'Building Accessible Web Applications',
    excerpt: 'A comprehensive guide to creating web applications that work for everyone, including users with disabilities.',
    date: '2023-12-28',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'building-accessible-web-applications',
    content: `
      <p>Web accessibility is not just a legal requirement—it's a moral imperative. Building accessible applications ensures that everyone can use and benefit from your work.</p>
      
      <h2>Understanding WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for accessibility:</p>
      
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
        <li><strong>Operable:</strong> Interface components must be operable</li>
        <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough for various assistive technologies</li>
      </ul>
      
      <h2>Semantic HTML</h2>
      <p>The foundation of accessibility is semantic HTML:</p>
      
      <blockquote>
        "Semantic HTML is like a well-organized library—everything has its place and purpose."
      </blockquote>
      
      <p>Building accessible applications is an investment in your users and your product's long-term success.</p>
    `,
    category: 'Accessibility',
    tags: ['Accessibility', 'WCAG', 'Semantic HTML', 'Inclusive Design'],
    author: {
      name: 'Alex Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Full-stack developer with 5+ years of experience'
    }
  },
  {
    id: 6,
    title: 'Modern CSS Techniques for 2024',
    excerpt: 'Explore the latest CSS features and techniques that are revolutionizing how we style web applications.',
    date: '2023-12-20',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'modern-css-techniques-2024',
    content: `
      <p>CSS continues to evolve with powerful new features that make styling more intuitive and maintainable. Let's explore the latest techniques.</p>
      
      <h2>Container Queries</h2>
      <p>Container queries allow components to respond to their container's size rather than the viewport:</p>
      
      <ul>
        <li>Component-based responsive design</li>
        <li>More flexible layouts</li>
        <li>Better component isolation</li>
      </ul>
      
      <h2>CSS Grid Subgrid</h2>
      <p>Subgrid enables nested grids to participate in their parent's grid:</p>
      
      <blockquote>
        "Subgrid solves the alignment problems we've been working around for years."
      </blockquote>
      
      <p>These modern CSS techniques enable more sophisticated and maintainable styling approaches.</p>
    `,
    category: 'CSS',
    tags: ['CSS', 'Container Queries', 'Grid', 'Modern Web'],
    author: {
      name: 'Alex Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Full-stack developer with 5+ years of experience'
    }
  }
];

export const getRelatedPosts = (currentPostId: number, category: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, limit);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getAllCategories = () => {
  const categories = blogPosts.map(post => post.category);
  return Array.from(new Set(categories));
};