/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Eye, ArrowRight, User, Hash, MessageCircle, Heart, ExternalLink } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogData';
import { BlogPost } from '../types';
import { gsap, animateUtils, customEasing } from '../utils/gsap';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        if (foundPost.category) {
          setRelatedPosts(getRelatedPosts(foundPost.id, foundPost.category));
        }
        setIsHydrated(true);
      } else {
        navigate('/blogs');
      }
    }
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHydrated || !post) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: customEasing.smooth, delay: 0.3 }
      );

      // Breadcrumb animation
      gsap.fromTo('.breadcrumb',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: customEasing.smooth, delay: 0.1 }
      );

      // Content reveal with stagger
      animateUtils.scrollReveal('.content-section', {
        duration: 1,
        stagger: 0.2,
        start: "top 85%",
        y: 50
      });

      // Sidebar animations
      animateUtils.scrollReveal('.sidebar-card', {
        duration: 0.8,
        stagger: 0.15,
        start: "top 85%",
        y: 40
      });

      // Related posts
      animateUtils.scrollReveal('.related-post', {
        duration: 1,
        stagger: 0.2,
        start: "top 85%",
        y: 60
      });

      // Floating particles
      gsap.utils.toArray('.blog-particle').forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 5 + index,
          y: gsap.utils.random(20, 40),
          rotation: gsap.utils.random(-15, 15)
        });
      });

      // Add magnetic effects
      setTimeout(() => {
        document.querySelectorAll('.magnetic').forEach(element => {
          animateUtils.magneticHover(element, { strength: 8 });
        });
      }, 1500);

    }, pageRef);

    return () => ctx.revert();
  }, [isHydrated, post]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      gsap.to('.share-feedback', {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: customEasing.back,
        onComplete: () => {
          gsap.to('.share-feedback', {
            opacity: 0,
            y: 0,
            duration: 0.3,
            delay: 2,
            ease: customEasing.smooth
          });
        }
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Heart animation
    const heart = document.querySelector('.like-heart');
    if (heart) {
      gsap.to(heart, {
        scale: 1.3,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    // Bookmark animation
    const bookmark = document.querySelector('.bookmark-icon');
    if (bookmark) {
      gsap.to(bookmark, {
        rotationY: 180,
        duration: 0.6,
        ease: customEasing.back
      });
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Article</h2>
          <p className="text-gray-400">Fetching the latest insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      {/* Enhanced Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Share Feedback */}
      <div className="share-feedback fixed top-20 right-6 bg-green-500 text-white px-4 py-2 rounded-lg opacity-0 z-50">
        Link copied to clipboard!
      </div>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl blog-particle"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-2xl blog-particle"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-xl blog-particle"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced Navigation */}
          <div className="breadcrumb mb-8">
            <nav className="flex items-center space-x-4 text-sm">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <Link
                to="/blogs"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Blog
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-blue-400">{post.category}</span>
            </nav>
            
            <Link
              to="/blogs"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 mt-4 magnetic"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="hero-content max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            {/* Enhanced Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-green-400" />
                <span>1.2k views</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-orange-400" />
                <span>23 comments</span>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleShare}
                className="magnetic flex items-center space-x-2 px-6 py-3 glass border border-gray-700 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              
              <button
                onClick={handleBookmark}
                className={`magnetic flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isBookmarked
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'glass border border-gray-700 text-gray-300 hover:border-purple-500/50 hover:text-white'
                }`}
              >
                <Bookmark className={`bookmark-icon w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleLike}
                className={`magnetic flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isLiked
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                    : 'glass border border-gray-700 text-gray-300 hover:border-red-500/50 hover:text-white'
                }`}
              >
                <Heart className={`like-heart w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Article Image */}
      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="content-section max-w-4xl mx-auto">
            <div className="relative group">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Article Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div ref={contentRef} className="lg:col-span-3">
                <div className="content-section">
                  <div 
                    className="prose prose-lg prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    style={{
                      '--tw-prose-body': '#d1d5db',
                      '--tw-prose-headings': '#ffffff',
                      '--tw-prose-links': '#3b82f6',
                      '--tw-prose-bold': '#ffffff',
                      '--tw-prose-quotes': '#9ca3af',
                      '--tw-prose-quote-borders': '#374151',
                      '--tw-prose-code': '#e5e7eb',
                      '--tw-prose-pre-code': '#e5e7eb',
                      '--tw-prose-pre-bg': '#1f2937',
                    } as React.CSSProperties}
                  />
                </div>

                {/* Enhanced Tags Section */}
                {post.tags && (
                  <div className="content-section mt-12 pt-8 border-t border-gray-800">
                    <div className="flex items-center space-x-3 mb-6">
                      <Hash className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-semibold">Topics Covered</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={tag}
                          className="magnetic px-4 py-2 glass border border-gray-700 text-gray-300 rounded-full text-sm hover:border-blue-500/50 hover:text-white transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Actions */}
                <div className="content-section mt-12 pt-8 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={handleLike}
                        className={`magnetic flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{likeCount} likes</span>
                      </button>
                      
                      <button className="magnetic flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                        <MessageCircle className="w-5 h-5" />
                        <span>23 comments</span>
                      </button>
                    </div>

                    <button
                      onClick={handleShare}
                      className="magnetic flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share Article</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div ref={sidebarRef} className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Author Card */}
                  {post.author && (
                    <div className="sidebar-card glass p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="text-white font-bold text-lg">{post.author.name}</h4>
                          <p className="text-blue-400 text-sm font-medium">Senior Engineer</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{post.author.bio}</p>
                      <div className="flex space-x-2">
                        <button className="magnetic flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                          Follow
                        </button>
                        <button className="magnetic p-2 glass border border-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-300">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Table of Contents */}
                  <div className="sidebar-card glass p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500">
                    <h4 className="text-white font-bold mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-purple-400" />
                      Quick Navigation
                    </h4>
                    <nav className="space-y-3">
                      {['Introduction', 'Technical Deep Dive', 'Implementation', 'Best Practices', 'Conclusion'].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm py-1 border-l-2 border-transparent hover:border-purple-400 pl-3"
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Reading Stats */}
                  <div className="sidebar-card glass p-6 rounded-xl border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                    <h4 className="text-white font-bold mb-4">Reading Progress</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-green-400">{Math.round(readingProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${readingProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>~12 min read</span>
                        <span>1,847 words</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Continue Reading</h3>
                <p className="text-gray-400">More insights from the engineering team</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className={`related-post magnetic glass rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group ${
                      index === 1 ? 'md:mt-8' : ''
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(relatedPost.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group/btn">
                          <span className="font-medium">Read Article</span>
                          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-2" />
                        </div>
                        
                        {relatedPost.author && (
                          <img
                            src={relatedPost.author.avatar}
                            alt={relatedPost.author.name}
                            className="w-8 h-8 rounded-full object-cover opacity-75"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;