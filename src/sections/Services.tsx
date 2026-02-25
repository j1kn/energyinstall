import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, Factory, Battery, Zap, Wrench, ArrowUpRight } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Domestic Solar',
    description: 'Efficient home solar systems that reduce bills and increase energy independence.',
    fullDescription: 'Our domestic solar solutions are designed to help homeowners reduce their energy bills while contributing to a greener future. We use only the highest quality panels and inverters, ensuring maximum efficiency and longevity. Our team handles everything from initial assessment to installation and ongoing maintenance, making the transition to solar energy seamless and hassle-free.',
    features: ['4-8kW systems', 'Battery ready', 'MCS certified', '25-year warranty', 'Smart monitoring'],
    benefits: [
      'Reduce energy bills by up to 78%',
      'Increase property value',
      'Energy independence from grid',
      'Low maintenance requirements',
      'Government grant eligibility'
    ],
    image: '/images/service-domestic.jpg',
    ctaText: 'Get Home Quote',
  },
  {
    icon: Building2,
    title: 'Commercial Solar',
    description: 'Scalable solutions designed to cut operational costs and improve sustainability.',
    fullDescription: 'Transform your business energy strategy with our commercial solar installations. We understand that every business has unique energy needs, which is why we offer customized solutions that maximize ROI while minimizing disruption to your operations. Our commercial systems are designed for optimal performance and rapid payback.',
    features: ['10-500kW systems', 'ROI focused', 'Minimal disruption', 'Tax benefits', 'Asset financing'],
    benefits: [
      'Reduce operational costs significantly',
      'Enhance corporate sustainability profile',
      'Protection against energy price rises',
      'Potential tax advantages',
      'Improved ESG ratings'
    ],
    image: '/images/service-commercial.jpg',
    ctaText: 'Get Business Quote',
  },
  {
    icon: Factory,
    title: 'Industrial Solar',
    description: 'High-capacity systems engineered for factories, warehouses, and large facilities.',
    fullDescription: 'Our industrial solar solutions are built to meet the demanding energy requirements of large-scale operations. From manufacturing plants to distribution centers, we design and install systems that deliver reliable, cost-effective power at scale. Our engineering team ensures optimal panel placement and system configuration for maximum energy generation.',
    features: ['500kW+ systems', 'Custom engineering', '24/7 monitoring', 'Load balancing', 'Grid integration'],
    benefits: [
      'Massive reduction in energy costs',
      'Meet sustainability targets',
      'Energy security for operations',
      'Scalable as business grows',
      'Professional maintenance included'
    ],
    image: '/images/service-industrial.jpg',
    ctaText: 'Get Industrial Quote',
  },
  {
    icon: Battery,
    title: 'Battery Storage',
    description: 'Store excess energy for use when you need it most. Maximize self-consumption.',
    fullDescription: 'Battery storage systems allow you to store surplus solar energy generated during the day for use at night or during peak rate periods. Our cutting-edge battery solutions integrate seamlessly with your solar installation, providing backup power and helping you achieve true energy independence. Smart scheduling ensures optimal charge and discharge cycles.',
    features: ['5-20kWh capacity', 'Smart scheduling', 'Backup power', 'App control', '10-year warranty'],
    benefits: [
      'Use solar energy 24/7',
      'Protection during power cuts',
      'Maximize self-consumption',
      'Reduce grid dependency',
      'Lower energy bills further'
    ],
    image: '/images/service-battery.jpg',
    ctaText: 'Explore Battery Options',
  },
  {
    icon: Zap,
    title: 'EV Charging',
    description: 'Charge your electric vehicle using clean solar power. Fast, efficient, future-ready.',
    fullDescription: 'Combine your solar installation with EV charging to power your electric vehicle with 100% clean energy. Our smart EV chargers integrate with your solar system to prioritize solar power for charging, reducing both your carbon footprint and running costs. Future-proof your home or business as electric mobility becomes the standard.',
    features: ['7-22kW chargers', 'Solar-integrated', 'Smart charging', 'Universal compatibility', 'OCPP enabled'],
    benefits: [
      'Charge with 100% solar power',
      'Lower EV running costs',
      'Future-proof your property',
      'Convenient home charging',
      'Smart scheduling options'
    ],
    image: '/images/service-ev.jpg',
    ctaText: 'Get EV Charger Quote',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Keep your system performing at peak with our comprehensive maintenance packages.',
    fullDescription: 'Protect your solar investment with our comprehensive maintenance and monitoring services. Our expert technicians perform regular inspections, cleaning, and performance checks to ensure your system operates at maximum efficiency. With proactive monitoring, we can identify and resolve issues before they impact your energy generation.',
    features: ['Annual servicing', 'Performance monitoring', 'Rapid response', 'Panel cleaning', 'System upgrades'],
    benefits: [
      'Maintain peak performance',
      'Extend system lifespan',
      'Early issue detection',
      'Protect your investment',
      'Peace of mind guaranteed'
    ],
    image: '/images/service-maintenance.jpg',
    ctaText: 'View Maintenance Plans',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.service-card',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 400);
  };

  return (
    <>
      <section id="services" ref={sectionRef} className="section-py bg-[#0a0a0a]">
        <div className="section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Our Services</div>
            <h2 
              className="services-title text-3xl sm:text-4xl lg:text-5xl font-medium text-white opacity-0"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Solar Solutions for <span className="text-gradient">Every Need</span>
            </h2>
            <p className="mt-4 text-[#a0a0a0] max-w-2xl mx-auto">
              Click on any service to learn more about how we can help you harness the power of solar energy.
            </p>
          </div>

          {/* Grid */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button 
                  key={index}
                  onClick={() => openModal(service)}
                  className="service-card group relative bg-[#141414] rounded-lg overflow-hidden border border-[rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[rgba(245,197,24,0.3)] hover:shadow-[0_0_30px_rgba(245,197,24,0.1)] text-left opacity-0"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute bottom-3 left-4 w-10 h-10 bg-[#f5c518] rounded-md flex items-center justify-center text-[#0a0a0a]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 
                        className="text-lg font-medium text-white group-hover:text-[#f5c518] transition-colors"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {service.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[#a0a0a0] transition-all duration-200 group-hover:text-[#f5c518] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    
                    <p className="text-sm text-[#a0a0a0] mb-3 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <span 
                          key={i}
                          className="text-[10px] px-2 py-1 bg-[#0a0a0a] rounded text-[#a0a0a0]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </>
  );
};

export default Services;
