import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, Filter, X, TrendingUp, Eye, BookOpen, Loader } from 'lucide-react';
import { blogPosts, getAllCategories } from '../data/blogData';
import { BlogPost } from '../types';
import { gsap, animateUtils, customEasing } from '../utils/gsap';

interface BlogsPageProps {
  // SSR Props
  initialPosts?: BlogPost[];
  initialCategories?: string[];
  isSSR?: boolean;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ 
  initialPosts = blogPosts, 
  initialCategories = getAllCategories(),
  isSSR = false 
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // State
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [categories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(isSSR);
  const [isHydrated, setIsHydrated] = useState(!isSSR);
  const postsPerPage = 6;

  // SSR Hydration
  useEffect(() => {
    if (isSSR && !isHydrated) {
      // Simulate hydration delay for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsHydrated(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isSSR, isHydrated]);

  // GSAP Animations
  useEffect(() => {
    if (!isHydrated) return;

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.hero-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: customEasing.smooth, delay: 0.3 }
      );

      // Stats animation
      animateUtils.staggerReveal('.blog-stat', {
        duration: 0.8,
        stagger: 0.1,
        delay: 0.8
      });

      // Filters animation
      gsap.fromTo(filtersRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: customEasing.smooth, delay: 1 }
      );

      // Background particles
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.utils.toArray('.blogs-particle').forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 6 + index,
          y: gsap.utils.random(20, 50),
          rotation: gsap.utils.random(-15, 15)
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, [isHydrated]);

  // Animation for blog cards when they change
  useEffect(() => {
    if (!isHydrated || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.blog-card');
    
    gsap.fromTo(cards,
      { y: 30, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.1, 
        ease: customEasing.smooth,
        delay: 0.2
      }
    );

    // Setup hover animations
    cards.forEach((card) => {
      const image = card.querySelector('.blog-image');
      const content = card.querySelector('.blog-content');

      const handleMouseEnter = () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: customEasing.smooth
        });
        
        gsap.to(content, {
          y: -5,
          duration: 0.3,
          ease: customEasing.organic
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: customEasing.smooth
        });
        
        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: customEasing.organic
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Add magnetic effect
      animateUtils.magneticHover(card, { strength: 6 });

      // Cleanup
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [searchTerm, selectedCategory, currentPage, isHydrated]);

  // Filtered posts computation
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Utility functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setCurrentPage(1);

    if (isHydrated) {
      gsap.to('.filter-element', {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | undefined) => {
    if (!category) return;
    setSelectedCategory(category);
    setCurrentPage(1);

    if (isHydrated) {
      const buttons = document.querySelectorAll('.category-btn');
      buttons.forEach(btn => {
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      });
    }
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-6">
          <Loader className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading Articles</h2>
        <p className="text-gray-400">Fetching the latest engineering insights...</p>
      </div>
    </div>
  );

  // Show loading state during SSR hydration
  if (isLoading || !isHydrated) {
    return <LoadingState />;
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black pt-20">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl blogs-particle"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-2xl blogs-particle"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-xl blogs-particle"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Engineering
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Insights
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deep dives into fintech architecture, performance engineering, team leadership, 
              and building systems that scale to millions of users.
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-gray-400 text-sm">Articles</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Readers</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-gray-400 text-sm">Topics</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-gray-400 text-sm">Min Read</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="py-12 bg-gray-900/50 backdrop-blur-sm border-y border-gray-800">
        <div className="container mx-auto px-6">
          <div ref={filtersRef} className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, technologies..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="filter-element w-full pl-12 pr-4 py-3 glass border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:scale-105"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`category-btn filter-element px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    !selectedCategory
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'glass text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`category-btn filter-element px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'glass text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="filter-element flex items-center gap-2 px-4 py-2 glass border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-6 text-gray-400">
            {filteredPosts.length === 0 ? (
              <p>No articles found matching your criteria.</p>
            ) : (
              <p>
                Showing {currentPosts.length} of {filteredPosts.length} articles
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Articles Found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search terms or filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`blog-card glass rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group ${
                    index % 2 === 1 ? 'md:mt-8' : ''
                  } ${
                    index % 3 === 2 ? 'lg:mt-4' : ''
                  }`}
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-image w-full h-48 object-cover transition-all duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="blog-content p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 glass text-gray-400 text-xs rounded-full border border-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group/btn">
                          <span className="font-medium">Read More</span>
                          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-2" />
                        </div>
                        
                        {post.author && (
                          <div className="flex items-center space-x-2">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full object-cover"
                              loading="lazy"
                            />
                            <span className="text-gray-500 text-sm">{post.author.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-16">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 glass border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                Previous
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-110 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'glass border border-gray-700 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 glass border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;