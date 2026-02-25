import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, TrendingDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    image: '/images/case-manufacturing.jpg',
    location: 'Birmingham',
    system: '245kW Manufacturing',
    result: '65% cost reduction',
    savings: '£42,000',
    featured: true,
  },
  {
    image: '/images/case-home.jpg',
    location: 'Oxford',
    system: '4.5kW Home System',
    result: '78% bill reduction',
    savings: '£1,200',
  },
  {
    image: '/images/case-retail.jpg',
    location: '3 Locations',
    system: '120kW Retail Chain',
    result: '4.8 year payback',
    savings: '£54,000',
  },
  {
    image: '/images/case-warehouse.jpg',
    location: 'Manchester',
    system: '500kW Warehouse',
    result: '40% carbon cut',
    savings: '£85,000',
  },
];

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.case-studies-title',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.case-card',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.case-studies-grid', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="section-py bg-[#0a0a0a]">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="eyebrow mb-3">Our Work</div>
          <h2 
            className="case-studies-title text-3xl sm:text-4xl lg:text-5xl font-medium text-white opacity-0"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Success <span className="text-gradient">Stories</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="case-studies-grid grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className={`case-card group relative rounded-lg overflow-hidden border border-[rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[rgba(245,197,24,0.2)] opacity-0 ${
                study.featured ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className={`relative ${study.featured ? 'aspect-square' : 'aspect-[4/3]'}`}>
                <img
                  src={study.image}
                  alt={study.system}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-3 lg:p-4 flex flex-col justify-end">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-[10px] lg:text-xs text-[#f5c518] mb-1">
                    <MapPin className="w-3 h-3" />
                    {study.location}
                  </div>

                  {/* System */}
                  <h3 
                    className={`font-medium text-white mb-1 ${study.featured ? 'text-base lg:text-lg' : 'text-xs lg:text-sm'}`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {study.system}
                  </h3>

                  {/* Result */}
                  <p className={`text-[#a0a0a0] mb-1 ${study.featured ? 'text-sm' : 'text-[10px] lg:text-xs'}`}>
                    {study.result}
                  </p>

                  {/* Savings */}
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-green-400" />
                    <span className={`text-green-400 font-medium ${study.featured ? 'text-sm' : 'text-[10px] lg:text-xs'}`}>
                      {study.savings}/year
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-sm"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
