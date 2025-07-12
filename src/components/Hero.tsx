import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Mail } from 'lucide-react';
import { gsap, animateUtils, customEasing } from '../utils/gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Background particles animation
      gsap.set('.hero-particle', {
        opacity: 0,
        scale: 0
      });

      // Animate background particles
      gsap.to('.hero-particle', {
        opacity: 0.6,
        scale: 1,
        duration: 2,
        stagger: 0.2,
        ease: customEasing.back,
        delay: 0.2
      });

      // Main title animation with 3D effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = titleText.split('').map((char) => 
          char === ' ' ? '<span>&nbsp;</span>' : `<span class="char" style="display: inline-block;">${char}</span>`
        ).join('');

        const titleChars = titleRef.current.querySelectorAll('.char');
        
        tl.fromTo(titleChars,
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "center bottom"
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: customEasing.back
          }, 0.3
        );
      }

      // Subtitle with gradient reveal
      if (subtitleRef.current) {
        const subtitleText = subtitleRef.current.textContent || '';
        subtitleRef.current.innerHTML = subtitleText.split(' ').map(word => 
          `<span class="word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`
        ).join(' ');

        const words = subtitleRef.current.querySelectorAll('.word span');
        
        tl.fromTo(words,
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: customEasing.smooth
          }, 0.8
        );
      }

      // Description reveal
      tl.fromTo(descriptionRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: customEasing.smooth
        }, 1.2
      );

      // Buttons with magnetic preview
      tl.fromTo('.hero-button',
        {
          y: 30,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: customEasing.back
        }, 1.5
      );

      // Social links floating in
      tl.fromTo('.social-link',
        {
          y: 30,
          opacity: 0,
          rotation: -180,
          scale: 0
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: customEasing.elastic
        }, 1.8
      );

      // Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: customEasing.smooth
        }, 2.0
      );

      // Continuous floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Parallax effect on scroll
      gsap.to('.hero-particle', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Add magnetic effect to buttons after animation
      setTimeout(() => {
        document.querySelectorAll('.hero-button').forEach(button => {
          animateUtils.magneticHover(button, { strength: 20 });
        });
      }, 2500);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced Background with 3D Particles */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Large floating orbs */}
        <div className="hero-particle absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="hero-particle absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="hero-particle absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"></div>
        
        {/* Smaller accent particles */}
        <div className="hero-particle absolute top-1/6 right-1/4 w-32 h-32 bg-pink-500/8 rounded-full blur-xl"></div>
        <div className="hero-particle absolute bottom-1/4 left-1/6 w-40 h-40 bg-indigo-500/8 rounded-full blur-xl"></div>
        <div className="hero-particle absolute top-3/4 right-1/6 w-24 h-24 bg-emerald-500/10 rounded-full blur-lg"></div>
        
        {/* Geometric shapes */}
        <div className="hero-particle absolute top-1/3 right-1/2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 transform rotate-45 blur-sm"></div>
        <div className="hero-particle absolute bottom-1/2 left-1/3 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-full blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8 max-w-5xl mx-auto">
          
          {/* Pre-title */}
          <div className="overflow-hidden">
            <p className="text-gray-400 text-lg tracking-widest uppercase opacity-0 transform translate-y-4" 
               style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards' }}>
              Senior Software Engineer
            </p>
          </div>

          {/* Main Title with 3D effect */}
          <div className="overflow-hidden">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none text-white"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              Feranmi.
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="overflow-hidden">
            <h2 
              ref={subtitleRef}
              className="text-2xl md:text-4xl lg:text-5xl text-gray-300 font-light tracking-wide"
            >
              Crafting Digital Experiences
            </h2>
          </div>
          
          {/* Description */}
          <div className="overflow-hidden">
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Transforming complex fintech challenges into elegant solutions. 
              From processing $50M+ transactions to leading teams that build the future of finance.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="hero-button group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden hidden"
              data-magnetic
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="hero-button group px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:border-white hover:shadow-xl relative overflow-hidden"
              data-magnetic
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Social Links with Floating Animation */}
          <div ref={socialRef} className="flex items-center justify-center space-x-8 mt-12">
            <a
              href="https://github.com/spiderocious/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link text-gray-400 hover:text-white transition-all duration-500 p-3 rounded-full border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
              data-magnetic
            >
              <Github className="w-6 h-6" />
            </a>
            {/* <a
              href="https://linkedin.com/in/oluwaferanmi-adeniji"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link text-gray-400 hover:text-white transition-all duration-500 p-3 rounded-full border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
              data-magnetic
            >
              <Linkedin className="w-6 h-6" />
            </a> */}
            <a
              href="mailto:devferanmi@gmail.com"
              className="social-link text-gray-400 hover:text-white transition-all duration-500 p-3 rounded-full border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
              data-magnetic
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        
      </div>

      {/* Custom CSS for additional animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-button {
          transform: perspective(1000px) rotateX(0deg);
          transition: transform 0.3s ease;
        }
        
        .hero-button:hover {
          transform: perspective(1000px) rotateX(-5deg) translateY(-2px);
        }
        
        .social-link {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
      <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-all duration-500"
            data-magnetic
          >
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            <span className="text-xs uppercase tracking-wider">Scroll</span>
          </button>
        </div>
    </section>
  );
};

export default Hero;
