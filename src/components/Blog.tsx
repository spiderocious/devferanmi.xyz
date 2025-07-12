import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Eye, BookOpen, TrendingUp } from 'lucide-react';
import { BlogPost } from '../types';
import { blogService } from '../services/BlogService';
import { gsap, animateUtils, customEasing } from '../utils/gsap';
import { BlogListSkeleton, LoadingOverlay } from './LoadingComponents';
import ErrorBoundary from './ErrorBoundary';

const Blog: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        animateUtils.textReveal(titleRef.current, {
          duration: 1,
          stagger: 0.04
        });
      }

      // Featured post animation
      animateUtils.scrollReveal('.featured-post', {
        duration: 1.2,
        start: "top 85%",
        y: 80,
        scale: 0.95
      });

      // Blog cards stagger
      animateUtils.scrollReveal('.blog-card', {
        duration: 1,
        stagger: 0.15,
        start: "top 85%",
        y: 60
      });

      // Stats animation
      animateUtils.scrollReveal('.blog-stat', {
        duration: 0.8,
        stagger: 0.1,
        start: "top 90%",
        y: 30
      });

      // Background particles
      gsap.utils.toArray('.blog-particle').forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 5 + index,
          y: gsap.utils.random(20, 40),
          rotation: gsap.utils.random(-15, 15)
        });
      });

      // Hover animations setup
      const setupHoverAnimations = () => {
        document.querySelectorAll('.blog-card').forEach((card, index) => {
          const image = card.querySelector('.blog-image');
          const content = card.querySelector('.blog-content');
          const readMore = card.querySelector('.read-more');

          card.addEventListener('mouseenter', () => {
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

            gsap.to(readMore, {
              x: 10,
              duration: 0.3,
              ease: customEasing.organic
            });
          });

          card.addEventListener('mouseleave', () => {
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

            gsap.to(readMore, {
              x: 0,
              duration: 0.3,
              ease: customEasing.organic
            });
          });

          // Add magnetic effect
          animateUtils.magneticHover(card, { strength: 8 });
        });

        // Featured post magnetic effect
        const featuredPost = document.querySelector('.featured-post');
        if (featuredPost) {
          animateUtils.magneticHover(featuredPost, { strength: 12 });
        }
      };

      setTimeout(setupHoverAnimations, 2000);

    }, sectionRef);

    return () => ctx.revert();
  }, [recentPosts]);

  useEffect(() => {
    const fetchPreviewBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await blogService.getPreviewBlogs();
        setRecentPosts(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
        console.error('Error fetching preview blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const featuredPost = recentPosts[0];
  const regularPosts = recentPosts.slice(1);

  return (
    <ErrorBoundary>
      <section 
        ref={sectionRef}
        id="blog" 
        className="py-20 bg-black relative overflow-hidden"
      >
        {/* Enhanced Background */}
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl blog-particle"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl blog-particle"></div>
        <div className="absolute top-0 left-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-xl blog-particle"></div>
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Engineering Insights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Deep dives into fintech architecture, performance engineering, and building scalable systems
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-gray-400 text-sm">Articles</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Views</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-gray-400 text-sm">Engagement</div>
            </div>
            <div className="blog-stat text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-gray-400 text-sm">Minutes Avg</div>
            </div>
          </div>

          {loading && <BlogListSkeleton count={3} />}

          {error && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Posts</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && recentPosts.length > 0 && (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div ref={featuredRef} className="mb-16">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="featured-post block glass rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="blog-image w-full h-64 md:h-80 object-cover transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold">
                            Featured
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                            {featuredPost.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="blog-content p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(featuredPost.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                          {featuredPost.title}
                        </h3>
                        
                        <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                          {featuredPost.excerpt}
                        </p>

                        <div className="read-more flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group/btn">
                          <span className="font-medium">Read Full Article</span>
                          <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Regular Posts Grid */}
              {regularPosts.length > 0 && (
                <div ref={gridRef} className="grid md:grid-cols-2 gap-8 mb-12">
                  {regularPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className={`blog-card glass rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group ${
                        index === 0 ? 'md:mt-8' : ''
                      }`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="blog-image w-full h-48 object-cover transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                            {post.category}
                          </span>
                        </div>
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

                        <div className="read-more flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group/btn">
                          <span className="font-medium">Read More</span>
                          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-2" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center">
                <Link
                  to="/blogs"
                  className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-600 text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 magnetic"
                  data-magnetic
                >
                  <span>Explore All Articles</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}

          {!loading && !error && recentPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">No Posts Available</h3>
              <p className="text-gray-400">Check back later for new content!</p>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Blog;
