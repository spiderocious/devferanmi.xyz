/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { gsap, customEasing } from "../utils/gsap";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial header animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: customEasing.smooth, delay: 0.2 }
      );

      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: customEasing.back,
          delay: 0.5,
        }
      );

      // Navigation items stagger
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: customEasing.smooth,
          delay: 0.7,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Update progress bar
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${Math.min(progress, 100)}%`,
          duration: 0.1,
          ease: "none",
        });
      }

      // Update active section
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "blog",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      // Open animation
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: customEasing.back }
      );

      gsap.fromTo(
        ".mobile-nav-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.2,
          ease: customEasing.smooth,
        }
      );
    } else {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        ease: customEasing.smooth,
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === "/";

  const navigationItems = isHomePage
    ? ["home", "about", /* "skills", "projects", "blog", */ "contact"]
    : [
        { label: "Home", path: "/" },
        { label: "Blog", path: "/blogs" },
        { label: "Contact", action: () => scrollToSection("contact") },
      ];

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[60]">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100"
          style={{ width: "0%" }}
        ></div>
      </div>

      <header
        ref={headerRef}
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-2xl shadow-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with advanced animation */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div ref={logoRef} className="relative">
                <Code2 className="w-8 h-8 text-blue-500 group-hover:text-purple-500 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 w-8 h-8 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 blur-sm"></div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                Feranmi.dev
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div ref={navRef} className="hidden md:flex items-center space-x-8">
              {isHomePage
                ? // Home page navigation with section indicators
                  navigationItems.map((item: any) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`nav-item relative px-4 py-2 font-medium transition-all duration-300 group ${
                        activeSection === item
                          ? "text-blue-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                      data-magnetic
                    >
                      <span className="relative z-10 capitalize">{item}</span>

                      {/* Active indicator */}
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                          activeSection === item
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></div>

                      {/* Hover background */}
                      <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    </button>
                  ))
                : // Other pages navigation
                  navigationItems.map((item: any, index) => (
                    <div key={index}>
                      {typeof item === "object" && "path" in item ? (
                        <Link
                          to={item.path}
                          className={`nav-item relative px-4 py-2 font-medium transition-all duration-300 group ${
                            location.pathname === item.path ||
                            (item.path === "/blogs" &&
                              location.pathname.includes("/blog"))
                              ? "text-blue-400"
                              : "text-gray-300 hover:text-white"
                          }`}
                          data-magnetic
                        >
                          <span className="relative z-10">{item.label}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                          <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="nav-item relative px-4 py-2 font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                          data-magnetic
                        >
                          <span className="relative z-10">{item.label}</span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                          <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </button>
                      )}
                    </div>
                  ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-blue-500 transition-all duration-300 p-2 hover:bg-white/10 rounded-lg"
              data-magnetic
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden mt-4 py-6 glass rounded-xl backdrop-blur-md border border-gray-800"
            >
              {isHomePage
                ? navigationItems.map((item: any, index) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`mobile-nav-item block w-full text-left px-6 py-3 font-medium transition-all duration-300 hover:bg-white/10 capitalize ${
                        activeSection === item
                          ? "text-blue-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item}
                    </button>
                  ))
                : navigationItems.map((item: any, index) => (
                    <div key={index}>
                      {typeof item === "object" && "path" in item ? (
                        <Link
                          to={item.path}
                          className={`mobile-nav-item block px-6 py-3 font-medium transition-all duration-300 hover:bg-white/10 ${
                            location.pathname === item.path ||
                            (item.path === "/blogs" &&
                              location.pathname.includes("/blog"))
                              ? "text-blue-400"
                              : "text-gray-300 hover:text-white"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="mobile-nav-item block w-full text-left px-6 py-3 font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
