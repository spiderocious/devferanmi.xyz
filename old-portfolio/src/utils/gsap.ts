/* eslint-disable @typescript-eslint/no-explicit-any */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Custom easing functions for award-winning feel
export const customEasing = {
  power1: "power1.inOut",
  power2: "power2.inOut", 
  power3: "power3.inOut",
  power4: "power4.inOut",
  back: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  bounce: "bounce.out",
  expo: "expo.inOut",
  circ: "circ.inOut",
  // Custom bezier curves for organic motion
  organic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
  snappy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
};

// Animation utility functions
export const animateUtils = {
  // Staggered reveal animation
  staggerReveal: (elements: string | Element[], options = {}) => {
    const defaults = {
      duration: 1.2,
      ease: customEasing.smooth,
      stagger: 0.1,
      y: 60,
      opacity: 0
    };
    const config = { ...defaults, ...options };
    
    return gsap.fromTo(elements, 
      { 
        y: config.y, 
        opacity: config.opacity,
        transform: "rotateX(10deg) rotateY(5deg)"
      },
      {
        y: 0,
        opacity: 1,
        transform: "rotateX(0deg) rotateY(0deg)",
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
      }
    );
  },

  // Magnetic hover effect
  magneticHover: (element: string | Element, options = {}) => {
    const defaults = {
      strength: 50,
      duration: 0.3
    };
    const config = { ...defaults, ...options };
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;


    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: config.duration,
        ease: customEasing.back
      });
    };

    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Scroll-triggered animation
  scrollReveal: (element: string | Element | Element[], options = {}) => {
    const defaults = {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0
    };
    const config = { ...defaults, ...options };

    // Handle multiple elements
    if (typeof element === 'string') {
      const elements = document.querySelectorAll(element);
      if (elements.length === 0 || !elements[0]) return;
      
      return gsap.fromTo(elements,
        { 
          y: config.y, 
          opacity: config.opacity,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: config.duration,
          ease: customEasing.smooth,
          stagger: config.stagger,
          scrollTrigger: {
            trigger: elements[0],
            start: config.start,
            end: config.end,
            toggleActions: config.toggleActions,
            scrub: false
          }
        }
      );
    }

    return gsap.fromTo(element,
      { 
        y: config.y, 
        opacity: config.opacity,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: config.duration,
        ease: customEasing.smooth,
        scrollTrigger: {
          trigger: config.trigger,
          start: config.start,
          end: config.end,
          toggleActions: config.toggleActions,
          scrub: false
        }
      }
    );
  },

  // Text reveal with split animation
  textReveal: (element: string | Element, options = {}) => {
    const defaults = {
      duration: 0.8,
      stagger: 0.02,
      ease: customEasing.back
    };
    const config = { ...defaults, ...options };

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    // Split text into characters
    const text = el.textContent || '';
    el.innerHTML = text.split('').map(char => 
      char === ' ' ? '<span>&nbsp;</span>' : `<span class="char">${char}</span>`
    ).join('');

    const chars = el.querySelectorAll('.char');
    
    return gsap.fromTo(chars,
      {
        y: 50,
        opacity: 0,
        rotationX: -90
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease
      }
    );
  },

  // Floating animation for background elements
  floatingAnimation: (element: string | Element, options = {}) => {
    const defaults = {
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      y: 20,
      rotation: 5
    };
    const config = { ...defaults, ...options };

    return gsap.to(element, {
      y: `+=${config.y}`,
      rotation: `+=${config.rotation}`,
      duration: config.duration,
      ease: config.ease,
      yoyo: config.yoyo,
      repeat: config.repeat
    });
  },

  // Page transition animation
  pageTransition: {
    enter: (element: string | Element) => {
      return gsap.fromTo(element,
        { 
          opacity: 0,
          y: 30,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: customEasing.smooth
        }
      );
    },
    
    exit: (element: string | Element) => {
      return gsap.to(element, {
        opacity: 0,
        y: -30,
        scale: 1.02,
        duration: 0.5,
        ease: customEasing.smooth
      });
    }
  },

  // Advanced parallax effect
  parallax: (element: string | Element, options = {}) => {
    const defaults = {
      yPercent: -50,
      ease: "none"
    };
    const config = { ...defaults, ...options };

    return gsap.to(element, {
      yPercent: config.yPercent,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  },

  // Morphing animation for shapes
  morphPath: (element: string | Element, newPath: string, options = {}) => {
    const defaults = {
      duration: 1,
      ease: customEasing.smooth
    };
    const config = { ...defaults, ...options };

    return gsap.to(element, {
      attr: { d: newPath },
      duration: config.duration,
      ease: config.ease
    });
  }
};

// Scroll smoother setup
export const setupSmoothScroll = () => {
  // Enhanced scroll trigger configuration
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true
  });
  
  ScrollTrigger.refresh();

  // Add floating animations to particles
  gsap.utils.toArray('.particle').forEach((particle: any) => {
    animateUtils.floatingAnimation(particle, {
      duration: gsap.utils.random(3, 6),
      y: gsap.utils.random(10, 30),
      rotation: gsap.utils.random(-10, 10)
    });
  });
};

// Global GSAP configuration
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// Set global defaults for better performance
gsap.defaults({
  ease: customEasing.organic,
  duration: 0.8
});

export { gsap };
export default gsap;
