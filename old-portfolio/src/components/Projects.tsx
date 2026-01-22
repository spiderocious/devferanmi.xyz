/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github, ArrowRight, Zap, Users, DollarSign } from 'lucide-react';
import { gsap, animateUtils, customEasing } from '../utils/gsap';
import { Project } from '../types';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Field Verification System',
      description: 'Core KYC platform processing $20M+ in loans (20% of company revenue) with NPL rate below 0.1%. Verified 10M+ customers across 36 Nigerian states with 99.7% location accuracy.',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['React', 'TypeScript', 'Google Maps API', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com/devferanmi',
      liveUrl: 'https://moniepoint.com',
      metrics: [
        { icon: DollarSign, label: '$20M+', description: 'Loans processed' },
        { icon: Users, label: '10M+', description: 'Customers verified' },
        { icon: Zap, label: '99.7%', description: 'Location accuracy' }
      ],
      featured: true,
      category: 'Fintech Platform'
    },
    {
      id: 2,
      title: 'Micro-Frontend Architecture',
      description: 'Led migration from monolithic Angular to React-based modular system. Reduced feature delivery time from 6 weeks to 2 weeks, created component library used across 12+ applications.',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['React', 'Angular', 'TypeScript', 'Nx', 'Webpack', 'Module Federation'],
      githubUrl: 'https://github.com/devferanmi',
      liveUrl: 'https://moniepoint.com',
      metrics: [
        { icon: Zap, label: '70%', description: 'Faster delivery' },
        { icon: Users, label: '12+', description: 'Applications' },
        { icon: DollarSign, label: '60%', description: 'Code reuse' }
      ],
      featured: true,
      category: 'Architecture'
    },
    {
      id: 3,
      title: 'API Switching Gateway',
      description: 'Built at Ajocard for interbank transfers using React, Golang, and MongoDB. Improved fund transfer speed by 30% and reduced transaction failures by 15% for 500,000+ users.',
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=500',
      technologies: ['React', 'Golang', 'MongoDB', 'REST APIs', 'Financial APIs'],
      githubUrl: 'https://github.com/devferanmi',
      liveUrl: 'https://ajocard.com',
      metrics: [
        { icon: Zap, label: '30%', description: 'Speed improvement' },
        { icon: Users, label: '500K+', description: 'Users served' },
        { icon: DollarSign, label: '15%', description: 'Failure reduction' }
      ],
      featured: false,
      category: 'Payment Gateway'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        animateUtils.textReveal(titleRef.current, {
          duration: 1,
          stagger: 0.04
        });
      }

      // Set initial states for project cards
      gsap.set('.project-card', {
        rotateY: -20,
        rotateX: 15,
        z: -200,
        opacity: 0,
        scale: 0.8
      });

      // Project cards reveal with 3D effect
      animateUtils.scrollReveal('.project-card', {
        duration: 1.5,
        stagger: 0.2,
        start: "top 85%",
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1
      });

      // Floating animation for featured projects
      gsap.utils.toArray('.featured-project').forEach((project: any, index) => {
        gsap.to(project, {
          y: "+=8",
          rotation: `+=${index % 2 === 0 ? 0.5 : -0.5}`,
          duration: 4 + index,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // Hover animations for project cards
      const setupHoverAnimations = () => {
        document.querySelectorAll('.project-card').forEach((card) => {
          const overlay = card.querySelector('.project-overlay');
          const image = card.querySelector('.project-image');
          const content = card.querySelector('.project-content');

          card.addEventListener('mouseenter', () => {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.6,
              ease: customEasing.smooth
            });
            
            gsap.to(overlay, {
              opacity: 1,
              duration: 0.4
            });

            gsap.to(content, {
              y: -10,
              duration: 0.4,
              ease: customEasing.organic
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: customEasing.smooth
            });
            
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.4
            });

            gsap.to(content, {
              y: 0,
              duration: 0.4,
              ease: customEasing.organic
            });
          });

          // Add magnetic effect
          animateUtils.magneticHover(card, { strength: 8 });
        });
      };

      // Setup animations after render
      setTimeout(setupHoverAnimations, 2000);

      // Background particles
      gsap.utils.toArray('.projects-particle').forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 6 + index,
          y: gsap.utils.random(20, 50),
          rotation: gsap.utils.random(-15, 15)
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl projects-particle"></div>
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-purple-500/5 rounded-full blur-2xl projects-particle"></div>
      <div className="absolute top-1/2 left-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-xl projects-particle"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            High-impact projects showcasing technical excellence and business results
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef} className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card glass rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group relative ${
                project.featured ? 'featured-project lg:col-span-2' : ''
              } ${
                index === 1 && !project.featured ? 'md:mt-12' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                  {project.category}
                </span>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold">
                    Featured
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`project-image w-full object-cover transition-all duration-700 ${
                    project.featured ? 'h-64 md:h-80' : 'h-48'
                  }`}
                />
                
                {/* Hover Overlay */}
                <div className="project-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-400 flex items-center justify-center space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="project-content p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <metric.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-lg font-bold text-white">{metric.label}</div>
                      <div className="text-xs text-gray-500">{metric.description}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700 group-hover:border-blue-500/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group/btn"
                  >
                    <span className="font-medium">View Project</span>
                    <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-2" />
                  </a>
                  
                  <div className="flex items-center space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            className="px-8 py-3 border border-gray-600 text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 magnetic"
            data-magnetic
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
