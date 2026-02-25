import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowRight, Check, Phone, Mail, Calendar } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    fullDescription: string;
    features: string[];
    benefits: string[];
    image: string;
    icon: React.ElementType;
    ctaText: string;
  } | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && service) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate in
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, service]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const scrollToContact = () => {
    handleClose();
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  if (!isOpen || !service) return null;

  const Icon = service.icon;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto opacity-0"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-10 w-12 h-12 bg-[#141414] border border-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center text-white hover:bg-[#f5c518] hover:text-[#0a0a0a] hover:border-[#f5c518] transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      <div ref={contentRef} className="opacity-0">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 section-padding pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f5c518] rounded-lg flex items-center justify-center text-[#0a0a0a]">
                <Icon className="w-6 h-6" />
              </div>
              <span className="eyebrow">Our Services</span>
            </div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {service.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 
                  className="text-2xl font-medium text-white mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Overview
                </h2>
                <p className="text-[#a0a0a0] leading-relaxed text-lg">
                  {service.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-10">
                <h2 
                  className="text-2xl font-medium text-white mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-[#141414] rounded-lg border border-[rgba(255,255,255,0.04)]"
                    >
                      <Check className="w-5 h-5 text-[#f5c518] flex-shrink-0" />
                      <span className="text-white text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 
                  className="text-2xl font-medium text-white mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#a0a0a0]">
                      <span className="w-1.5 h-1.5 bg-[#f5c518] rounded-full mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-[#141414] rounded-xl p-6 border border-[rgba(255,255,255,0.04)]">
                <h3 
                  className="text-lg font-medium text-white mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Get Started
                </h3>
                <p className="text-sm text-[#a0a0a0] mb-6">
                  Ready to explore {service.title.toLowerCase()}? Contact us for a free consultation and quote.
                </p>
                
                <button
                  onClick={scrollToContact}
                  className="w-full btn-primary mb-4 group"
                >
                  {service.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  <a href="tel:01865980644" className="flex items-center gap-3 text-sm text-[#a0a0a0] hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-[#f5c518]" />
                    01865 980644
                  </a>
                  <a href="mailto:info@energyinstall.co.uk" className="flex items-center gap-3 text-sm text-[#a0a0a0] hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-[#f5c518]" />
                    info@energyinstall.co.uk
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                    <Calendar className="w-4 h-4 text-[#f5c518]" />
                    Mon-Fri: 8am-6pm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Preview */}
        <div className="section-padding py-12 border-t border-[rgba(255,255,255,0.04)]">
          <p className="text-center text-[#a0a0a0] text-sm mb-4">
            Explore more of our services
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleClose}
              className="btn-secondary"
            >
              View All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
