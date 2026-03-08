import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect - smooth and subtle
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Content fades out on scroll
      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // Entrance animations
      gsap.fromTo('.hero-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.hero-ctas',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-stats',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.8 }
      );

      // Bounce arrow animation
      gsap.to('.scroll-arrow', {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Solar panels"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f5c518]/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full section-padding pt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-stats inline-flex items-center gap-2 px-4 py-2 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[rgba(245,197,24,0.2)] rounded-full mb-8 opacity-0">
            <Zap className="w-4 h-4 text-[#f5c518]" />
            <span className="text-xs text-white/80">Premium Solar Installations</span>
          </div>

          {/* Headline */}
          <h1
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 opacity-0"
            style={{ fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.05 }}
          >
            Power Your Future
            <br />
            <span className="text-gradient">With Solar Energy</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10 opacity-0">
            Premium solar installations for homes and businesses.
            Save up to <span className="text-white font-medium">78%</span> on energy bills with
            our expert team.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary w-full sm:w-auto group"
            >
              <Zap className="w-4 h-4" />
              Get Free Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('#services')}
              className="btn-secondary w-full sm:w-auto"
            >
              Explore Services
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="hero-stats mt-16 flex flex-wrap items-center justify-center gap-8 opacity-0">
            {[
              { value: '5,000+', label: 'Installations' },
              { value: '25+', label: 'Years Experience' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40">Scroll to explore</span>
        <ChevronDown className="scroll-arrow w-5 h-5 text-[#f5c518]" />
      </div>
    </section>
  );
};

export default Hero;
