/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle, CheckCircle, Github, Mail, MapPin, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { animateUtils, customEasing, gsap } from '../utils/gsap';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        animateUtils.textReveal(titleRef.current, {
          duration: 1,
          stagger: 0.04
        });
      }

      // Contact info cards animation
      animateUtils.scrollReveal('.contact-card', {
        duration: 1,
        stagger: 0.2,
        start: "top 85%",
        y: 60
      });

      // Form animation
      animateUtils.scrollReveal('.form-group', {
        duration: 0.8,
        stagger: 0.1,
        start: "top 85%",
        y: 40
      });

      // Social links floating animation
      gsap.utils.toArray('.social-link').forEach((link: any, index) => {
        gsap.to(link, {
          y: "+=5",
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // Background particles
      gsap.utils.toArray('.contact-particle').forEach((particle: any, index) => {
        animateUtils.floatingAnimation(particle, {
          duration: 4 + index,
          y: gsap.utils.random(15, 30),
          rotation: gsap.utils.random(-10, 10)
        });
      });

      // Add magnetic effects
      setTimeout(() => {
        document.querySelectorAll('.contact-card, .social-link, .submit-btn').forEach(element => {
          animateUtils.magneticHover(element, { strength: 12 });
        });
      }, 1500);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Add focus animation
    const field = e.target;
    gsap.to(field, {
      scale: 1.02,
      duration: 0.2,
      ease: customEasing.organic
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target;
    gsap.to(field, {
      scale: 1,
      duration: 0.2,
      ease: customEasing.organic
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      const errorFields = Object.keys(errors);
      errorFields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
          gsap.to(field, {
            keyframes: { x: [-10, 10, -10, 10, 0] },
            duration: 0.4,
            ease: "power2.inOut"
          });
        }
      });
      return;
    }

    setIsSubmitting(true);
    
    // Submit animation
    const submitBtn = document.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'devferanmi@gmail.com',
      description: 'Send me an email',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nigeria',
      description: 'Available remotely',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/spiderocious/', label: 'GitHub' },
    // { icon: Linkedin, url: 'https://linkedin.com/in/oluwaferanmi-adeniji', label: 'LinkedIn' },
    // { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl contact-particle"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-2xl contact-particle"></div>
      <div className="absolute top-1/2 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-xl contact-particle"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to discuss your next project or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, challenging problems, 
                and innovative projects. Whether you're looking to build something amazing or 
                just want to connect, let's start a conversation.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="contact-card glass p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-500 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} bg-opacity-20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <info.icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${info.gradient} bg-clip-text`} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{info.label}</h4>
                      <p className="text-blue-400 font-medium">{info.value}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-white font-semibold mb-6">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-500 border border-gray-700"
                    data-magnetic
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="glass p-8 rounded-xl border border-gray-800">
            <form ref={formRef} className="space-y-6" action="https://formsubmit.co/devferanmi@gmail.com" method="POST">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <input type="hidden" name="_subject" value="New submission!" />
                  <input type="hidden" name="_template" value="box" />
                  <input type="hidden" name="_next" value={window.location.href} />
                  <input type="hidden" name="_captcha" value="false" />
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 glass border rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 glass border rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="block text-white font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 glass border rounded-lg text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 ${
                    errors.subject ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full px-4 py-3 glass border rounded-lg text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  data-magnetic
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Try Again</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  Something went wrong. Please try again or send me an email directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
