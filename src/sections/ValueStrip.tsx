import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1200, prefix: '£', suffix: '+', label: 'Yearly Savings' },
  { value: 8, prefix: '', suffix: ' Years', label: 'Avg Payback' },
  { value: 25, prefix: '', suffix: '+', label: 'Years Lifespan' },
  { value: 15000, prefix: '£', suffix: '', label: 'Max Grant' },
  { value: 0, prefix: '', suffix: '% VAT', label: 'On Install' },
];

const ValueStrip = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Animate container
        gsap.fromTo('.stats-container',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );

        // Animate numbers quickly
        stats.forEach((stat, index) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 0.8,
            delay: 0.2 + index * 0.08,
            ease: 'power2.out',
            onUpdate: () => {
              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = Math.round(obj.val);
                return newCounts;
              });
            }
          });
        });
      }
    });

    return () => trigger.kill();
  }, []);

  const formatValue = (index: number) => {
    const stat = stats[index];
    const count = counts[index];
    if (stat.value >= 1000) {
      return `${stat.prefix}${count.toLocaleString()}${stat.suffix}`;
    }
    return `${stat.prefix}${count}${stat.suffix}`;
  };

  return (
    <section ref={sectionRef} className="relative py-6 bg-[#141414] border-y border-[rgba(255,255,255,0.04)]">
      <div className="section-padding">
        <div className="stats-container grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-0 opacity-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center ${index === 4 ? 'col-span-3 md:col-span-1' : ''} ${index > 2 ? 'hidden md:block' : ''}`}
            >
              <div 
                className="text-xl sm:text-2xl font-semibold text-white mb-0.5"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {formatValue(index)}
              </div>
              <div className="text-[10px] sm:text-xs text-[#a0a0a0]">{stat.label}</div>
            </div>
          ))}
          
          {/* Mobile: Show VAT in center of last row */}
          <div className="col-span-3 md:hidden text-center">
            <div 
              className="text-xl font-semibold text-white mb-0.5"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              0% VAT
            </div>
            <div className="text-[10px] text-[#a0a0a0]">On Install</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStrip;
