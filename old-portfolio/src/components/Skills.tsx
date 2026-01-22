/* eslint-disable @typescript-eslint/no-explicit-any */
import { Code, Database, Server, Target, Users, Zap } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { animateUtils, gsap } from "../utils/gsap";

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const techCloudRef = useRef<HTMLDivElement>(null);

  const expertiseAreas = [
    {
      id: 1,
      title: "Architecture",
      description: "Building scalable processing systems ",
      icon: Database,
      impact: null,
      technologies: [
        "Microservices",
        "Event Sourcing",
        "CQRS",
        "PostgreSQL",
        "Kafka",
        "Redis",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Frontend Excellence",
      description: "Micro-frontend architectures and performance optimization",
      icon: Code,
      impact: "70% faster delivery",
      technologies: ["React", "TypeScript", "Module Federation", "Vite"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Performance Engineering",
      description: "System optimization and deployment pipeline enhancement",
      icon: Zap,
      impact: "87% deployment improvement",
      technologies: ["CI/CD", "Monitoring", "Caching", "Load Balancing"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Technical Leadership",
      description: "Leading cross-functional teams and mentoring engineers",
      icon: Users,
      impact: "15+ engineers mentored",
      technologies: ["Agile", "Code Review", "Architecture Design", "Strategy"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      title: "System Design",
      description: "Designing resilient, scalable distributed systems",
      icon: Server,
      impact: "99.7% reliability",
      technologies: [
        "Distributed Systems",
        "API Design",
        "Message Queues",
        "Observability",
      ],
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      title: "Product Innovation",
      description:
        "Transforming business requirements into technical solutions",
      icon: Target,
      impact: "20% revenue impact",
      technologies: [
        "Requirements Analysis",
        "Prototyping",
        "MVP Development",
        "Iteration",
      ],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const technicalSkills = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "Svelte", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "Fastify", category: "Backend" },
    { name: "JavaScript", category: "Language" },
    { name: "PHP", category: "Backend" },
    { name: "Laravel", category: "Framework" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "CSS", category: "Styling" },
    { name: "HTML", category: "Markup" },
    { name: "TypeScript", category: "Language" },
    { name: "Golang", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "Orchestration" },
    { name: "GraphQL", category: "API" },
    { name: "Redis", category: "Cache" },
    { name: "GSAP", category: "Animation" },
    { name: "Micro-frontends", category: "Architecture" },
    { name: "Event Sourcing", category: "Pattern" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation
      if (titleRef.current) {
        animateUtils.textReveal(titleRef.current, {
          duration: 1,
          stagger: 0.04,
        });
      }

      // Skills cards animation with sophisticated 3D effect
      gsap.set(".skill-card", {
        rotateY: -15,
        rotateX: 10,
        z: -100,
        opacity: 0,
      });

      // Staggered reveal of skill cards
      animateUtils.scrollReveal(".skill-card", {
        duration: 1.2,
        stagger: 0.15,
        start: "top 85%",
        y: 80,
        rotateY: 0,
        rotateX: 0,
        z: 0,
      });

      // Floating animation for cards
      gsap.utils.toArray(".skill-card").forEach((card: any, index) => {
        gsap.to(card, {
          y: "+=10",
          rotation: `+=${index % 2 === 0 ? 1 : -1}`,
          duration: 4 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Technology cloud animation
      gsap.set(".tech-tag", {
        scale: 0,
        opacity: 0,
      });

      animateUtils.scrollReveal(".tech-tag", {
        duration: 0.6,
        stagger: 0.05,
        start: "top 90%",
        scale: 1,
      });

      // Magnetic effect for cards
      setTimeout(() => {
        document.querySelectorAll(".skill-card").forEach((card) => {
          animateUtils.magneticHover(card, { strength: 10 });
        });
      }, 2000);

      // Background particles animation
      gsap.utils.toArray(".skills-particle").forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 5 + index,
          y: gsap.utils.random(15, 40),
          rotation: gsap.utils.random(-20, 20),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (IconComponent: any) => {
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl skills-particle"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl skills-particle"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl skills-particle"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Expertise & Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Core competencies developed through architecting high-scale fintech
            systems
          </p>
        </div>

        {/* Expertise Areas Grid */}
        <div
          ref={skillsGridRef}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20"
        >
          {expertiseAreas.map((area, index) => (
            <div
              key={area.id}
              className={`skill-card glass p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden ${
                index % 2 === 1 ? "md:mt-12" : ""
              } ${index % 3 === 2 ? "lg:mt-6" : ""}`}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                {/* Icon and Impact Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`text-transparent bg-gradient-to-r ${area.gradient} bg-clip-text`}
                  >
                    {getIcon(area.icon)}
                  </div>
                  {area?.impact && (
                    <div
                      className={`px-3 py-1 bg-gradient-to-r ${area.gradient} bg-opacity-20 rounded-full text-xs font-medium text-white border border-white/10`}
                    >
                      {area?.impact}
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
                  {area.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700 group-hover:border-blue-500/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Ecosystem */}
        <div ref={techCloudRef} className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Technical Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technicalSkills.map((tech, index) => (
              <div
                key={tech.name}
                className={`tech-tag px-4 py-2 glass rounded-full border border-gray-700 hover:border-blue-500/50 transition-all duration-500 group cursor-pointer ${
                  index % 4 === 0
                    ? "hover:scale-110"
                    : index % 4 === 1
                    ? "hover:scale-105 hover:rotate-2"
                    : index % 4 === 2
                    ? "hover:scale-105 hover:-rotate-2"
                    : "hover:scale-110"
                }`}
                data-magnetic
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                    {tech.name}
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-sm uppercase tracking-wider">
              Continuously evolving
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
