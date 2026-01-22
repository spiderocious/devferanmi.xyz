import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

interface CustomCursorProps {
  className?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ className = '' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Initialize cursor as visible
    gsap.set([cursor, follower], {
      opacity: 1
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Move cursor instantly
      gsap.set(cursor, {
        x: x - 8,
        y: y - 8
      });

      // Move follower with delay
      gsap.to(follower, {
        x: x - 20,
        y: y - 20,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3
      });
    };

    // Add magnetic effect to interactive elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('button, a, [data-magnetic]');
      
      magneticElements.forEach(el => {
        const handleElementHover = () => {
          isHovering.current = true;
          gsap.to(cursor, {
            scale: 0.5,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
          gsap.to(follower, {
            scale: 1.5,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        };

        const handleElementLeave = () => {
          isHovering.current = false;
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
          gsap.to(follower, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        };

        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };

    // Set up event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add magnetic effects with delay to ensure DOM is ready
    setTimeout(addMagneticEffect, 100);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] ${className}`}
        style={{
          mixBlendMode: 'difference'
        }}
      >
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>

      {/* Cursor follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] ${className}`}
      >
        <div 
          className="w-full h-full border border-white/30 rounded-full"
          style={{
            mixBlendMode: 'difference'
          }}
        ></div>
      </div>
    </>
  );
};

export default CustomCursor;