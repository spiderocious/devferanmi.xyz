/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import {
  User,
  Download,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Code,
  Zap,
  Target,
} from "lucide-react";
import { gsap, animateUtils, customEasing } from "../utils/gsap";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const journey = [
    {
      year: "2017",
      title: "The Beginning",
      company: "Self-Taught",
      description:
        "Started coding HTML on Android phone during university strike. Built first CBT system app.",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      year: "2018-2020",
      title: "Frontend Developer",
      company: "QuickSell",
      description:
        "Built foundational e-commerce architecture. Learned React, TypeScript, and modern development practices.",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      year: "2020-2021",
      title: "Software Engineer",
      company: "Amazon",
      description:
        "Developed internal admin platforms. Gained experience in large-scale systems and cloud architecture.",
      icon: Award,
      gradient: "from-orange-500 to-red-500",
    },
    {
      year: "2021-2023",
      title: "Senior Frontend Engineer",
      company: "Ajocard",
      description:
        "Created API switching gateway improving transfers by 30%. Led frontend architecture decisions.",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      year: "2023-Present",
      title: "Senior Software Engineer",
      company: "Moniepoint",
      description:
        "Leading teams building $50M+ loan platforms. Reduced deployment times by 87%. Mentoring 15+ engineers.",
      icon: Target,
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  const achievements = [
    {
      icon: TrendingUp,
      number: "$50M+",
      label: "Transaction Volume",
      description: "Monthly loan processing",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      number: "10M+",
      label: "Users Served",
      description: "KYC verifications completed",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      number: "87%",
      label: "Performance Gain",
      description: "Deployment time reduction",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      number: "99.7%",
      label: "System Reliability",
      description: "Platform uptime achieved",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const skills = [
    "Software Architecture",
    "Micro-frontends",
    "Performance Engineering",
    "Team Leadership",
    "System Design",
    "Technical Strategy",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        animateUtils.textReveal(titleRef.current, {
          duration: 1,
          stagger: 0.04,
        });
      }

      // Hero section animation
      animateUtils.scrollReveal(".about-hero", {
        duration: 1.2,
        start: "top 85%",
        y: 60,
      });

      // Timeline items animation
      animateUtils.scrollReveal(".timeline-item", {
        duration: 1,
        stagger: 0.2,
        start: "top 85%",
        y: 80,
      });

      // Achievements animation
      animateUtils.scrollReveal(".achievement-card", {
        duration: 0.8,
        stagger: 0.15,
        start: "top 85%",
        y: 50,
      });

      // Image parallax effect
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Timeline line animation
      const timelineLine = document.querySelector(".timeline-line");
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 2,
            ease: customEasing.smooth,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: false,
            },
          }
        );
      }

      // Add magnetic effects
      setTimeout(() => {
        document
          .querySelectorAll(".about-card, .timeline-item, .achievement-card")
          .forEach((element) => {
            animateUtils.magneticHover(element, { strength: 10 });
          });
      }, 2000);

      // Background particles
      gsap.utils.toArray(".about-particle").forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 4 + index,
          y: gsap.utils.random(15, 30),
          rotation: gsap.utils.random(-10, 10),
        });
      });

      // Floating animation for skills
      gsap.utils.toArray(".skill-tag").forEach((tag: any, index) => {
        gsap.to(tag, {
          y: "+=3",
          duration: 2 + index * 0.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const resumeURL = null;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl about-particle"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl about-particle"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-xl about-particle"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About me!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From coding on a mobile phone to contributing to systems that
            process billions in transactions
          </p>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Content */}
          <div className="space-y-8">
            <div className="about-hero about-card glass p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Oluwaferanmi Adeniji
                  </h3>
                  <p className="text-blue-400 font-medium">
                    Senior Software Engineer
                  </p>
                  <div className="flex items-center text-gray-400 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Lagos, Nigeria</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>7+ Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                I'm a Senior Software Engineer passionate about building
                scalable fintech systems. My journey started uniquely - coding
                HTML on an Android phone during a university strike. Today, I
                architect platforms processing $50M+ monthly, lead engineering
                teams, and mentor the next generation of developers.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1 glass text-gray-300 rounded-full text-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {resumeURL && (
                <button
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
                  data-magnetic
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Image */}
          <div ref={imageRef} className="relative">
            <div className="about-hero glass p-8 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-all duration-500">
              <img
                src="https://martech3d-customer-portal.s3.eu-west-2.amazonaws.com/images/1752289451_production_Fl6OzdHcHF_20250222-132326-2.jpg"
                alt="Oluwaferanmi Adeniji"
                className="h-80 rounded-lg shadow-2xl transition-all duration-500 hover:scale-105 w-auto"
              />
            </div>
            {/* Floating accent elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg opacity-20 about-particle"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-15 about-particle"></div>
          </div>
        </div>

        {/* Career Timeline */}
        <div ref={timelineRef} className="mb-20 hidden">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Career Timeline
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {journey.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform md:-translate-x-1/2 z-10 border-4 border-gray-900"></div>

                  {/* Content Card */}
                  <div
                    className={`glass p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group ml-16 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-8 md:text-right" : "md:ml-8"
                    } md:w-5/12`}
                  >
                    {/* Year Badge */}
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${item.gradient} bg-opacity-20 rounded-full text-sm font-medium text-white border border-white/10 mb-4`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.year}</span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {item.title}
                    </h4>

                    <p className="text-blue-400 font-medium mb-3">
                      {item.company}
                    </p>

                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div ref={achievementsRef} className="mb-16 hidden">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Key Achievements
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.label}
                className="achievement-card glass p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${achievement.gradient} bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}
                >
                  <achievement.icon
                    className={`w-8 h-8 text-transparent bg-gradient-to-r ${achievement.gradient} bg-clip-text`}
                  />
                </div>

                <div className="text-3xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-1">
                  {achievement.label}
                </div>
                <div className="text-gray-500 text-sm">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-sm uppercase tracking-wider">
              Ready to collaborate
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
