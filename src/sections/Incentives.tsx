import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, BatteryCharging, Percent, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const incentives = [
  {
    icon: Home,
    amount: 'Up to £7,500',
    title: 'Warm Homes Grant',
    description: 'Government grant covering energy efficiency improvements including ASHP and AC units.',
    eligibility: 'ASHP (Max £7,500), Air Conditioning (Up to £1,500)',
    highlight: 'ASHP & AC Grant',
    color: '#f5c518',
  },
  {
    icon: BatteryCharging,
    amount: '£80-170/year',
    title: 'Smart Export Guarantee (SEG)',
    description: 'Homeowners can earn money by exporting excess solar electricity back to the grid. Requires a smart meter.',
    eligibility: 'All solar system owners with smart meter',
    highlight: 'Ongoing Income',
    color: '#3b82f6',
  },
  {
    icon: Percent,
    amount: '0% VAT',
    title: 'VAT Exemption',
    description: '0% VAT on solar panels and batteries until March 2027 for residential installations.',
    eligibility: 'All residential installations',
    highlight: 'Save ~£2,850',
    color: '#a855f7',
  },
];

const Incentives = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.incentives-title',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.incentive-card',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.incentives-stack', start: 'top 80%' }
        }
      );

      gsap.fromTo('.calculator-card',
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.incentives-stack', start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="incentives" ref={sectionRef} className="section-py bg-[#141414]">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">Financial Support</div>
          <h2
            className="incentives-title text-3xl sm:text-4xl lg:text-5xl font-medium text-white opacity-0"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Government <span className="text-gradient">Incentives</span>
          </h2>
          <p className="mt-4 text-[#a0a0a0] max-w-2xl mx-auto">
            Take advantage of significant financial support available for solar installations in the UK.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="incentives-stack grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Left - Stacked Incentive Cards */}
          <div className="lg:col-span-3 space-y-4">
            {incentives.map((incentive, index) => {
              const Icon = incentive.icon;
              return (
                <div
                  key={index}
                  className="incentive-card group relative bg-[#0a0a0a] rounded-xl p-5 border border-[rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[rgba(245,197,24,0.2)] hover:translate-x-2 opacity-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Icon & Amount */}
                    <div className="flex items-center gap-4 sm:w-48 flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${incentive.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: incentive.color }} />
                      </div>
                      <div>
                        <div
                          className="text-xl font-semibold"
                          style={{ color: incentive.color, fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {incentive.amount}
                        </div>
                        <div className="text-[10px] text-[#a0a0a0]">{incentive.highlight}</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-12 bg-[rgba(255,255,255,0.06)]" />

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="text-base font-medium text-white mb-1"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {incentive.title}
                      </h3>
                      <p className="text-sm text-[#a0a0a0] mb-2">
                        {incentive.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#a0a0a0]">
                        <CheckCircle2 className="w-3 h-3" style={{ color: incentive.color }} />
                        {incentive.eligibility}
                      </div>
                    </div>
                  </div>

                  {/* Connector line (except last) */}
                  {index < incentives.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-4 left-10 w-0.5 h-4 bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right - Calculator CTA Card */}
          <div className="lg:col-span-2">
            <div className="calculator-card sticky top-24 bg-gradient-to-br from-[#f5c518]/10 to-[#f5c518]/5 rounded-xl p-6 border border-[rgba(245,197,24,0.2)] opacity-0">
              <div className="w-14 h-14 rounded-lg bg-[#f5c518]/20 flex items-center justify-center mb-4">
                <Calculator className="w-7 h-7 text-[#f5c518]" />
              </div>

              <h3
                className="text-xl font-medium text-white mb-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Calculate Your Savings
              </h3>

              <p className="text-sm text-[#a0a0a0] mb-6">
                Find out how much you could save with solar panels and which grants you qualify for.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                  </div>
                  <span className="text-white">Instant estimate</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                  </div>
                  <span className="text-white">Grant eligibility check</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                  </div>
                  <span className="text-white">No obligation</span>
                </div>
              </div>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full btn-primary group"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Trust note */}
              <p className="mt-4 text-[10px] text-[#a0a0a0] text-center">
                Our team can help you apply for all available grants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incentives;
