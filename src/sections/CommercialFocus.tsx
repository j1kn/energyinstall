import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Clock, Shield, Users, ArrowRight, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: TrendingUp, text: 'ROI-focused system design' },
  { icon: Clock, text: 'Minimal disruption to operations' },
  { icon: Shield, text: 'Commercial-grade warranties' },
  { icon: Users, text: 'Dedicated account management' },
];

const CommercialFocus = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [payback, setPayback] = useState(0);
  const [savings, setSavings] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.commercial-content',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.commercial-image',
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Counter animation
      ScrollTrigger.create({
        trigger: '.commercial-stats',
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to({ val: 0 }, {
            val: 7,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: function () {
              setPayback(Math.round(this.targets()[0].val));
            }
          });
          gsap.to({ val: 0 }, {
            val: 65,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            onUpdate: function () {
              setSavings(Math.round(this.targets()[0].val));
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="commercial" ref={sectionRef} className="section-py bg-[#0a0a0a]">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="commercial-content opacity-0">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <Building2 className="w-3 h-3" />
              For Business
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Commercial <span className="text-gradient">Solar Solutions</span>
            </h2>

            <p className="text-[#a0a0a0] mb-6 leading-relaxed">
              Reduce operational costs, enhance your sustainability profile, and secure
              energy independence for your organization with our tailored commercial installations.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <li key={index} className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                    <span className="w-8 h-8 rounded-md bg-[#f5c518]/10 flex items-center justify-center text-[#f5c518]">
                      <Icon className="w-4 h-4" />
                    </span>
                    {benefit.text}
                  </li>
                );
              })}
            </ul>

            {/* Stats */}
            <div className="commercial-stats flex gap-6 mb-8">
              <div>
                <div
                  className="text-3xl font-semibold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  3-{payback} <span className="text-lg text-[#a0a0a0]">Years</span>
                </div>
                <div className="text-xs text-[#a0a0a0]">Typical Payback</div>
              </div>
              <div className="w-px bg-[rgba(255,255,255,0.08)]" />
              <div>
                <div
                  className="text-3xl font-semibold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {savings}<span className="text-[#f5c518]">%</span>
                </div>
                <div className="text-xs text-[#a0a0a0]">Bill Reduction</div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Request Commercial Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <div className="commercial-image relative opacity-0">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/commercial-building.jpg"
                alt="Commercial solar installation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#141414] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-[#f5c518] flex items-center justify-center text-[#0a0a0a]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Trustworthy Partner</div>
                  <div className="text-[10px] text-[#a0a0a0]">Commercial Installers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialFocus;
