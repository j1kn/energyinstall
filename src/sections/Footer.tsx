import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceLinks = ['Domestic Solar', 'Commercial Solar', 'Industrial Solar', 'Battery Storage', 'EV Charging', 'Maintenance'];
const companyLinks = ['About Us', 'Case Studies', 'FAQs', 'Blog', 'Careers', 'Contact'];
const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.04)]">
      <div className="footer-content section-padding py-12 opacity-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="block mb-4">
              <img 
                src="/images/logo.png" 
                alt="Energy Install" 
                className="h-12 w-auto"
              />
            </a>
            <p className="text-xs text-[#a0a0a0] mb-4 leading-relaxed">
              Powering a sustainable future with premium solar installations across the UK.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-md bg-[#141414] flex items-center justify-center text-[#a0a0a0] transition-all duration-200 hover:bg-[#f5c518] hover:text-[#0a0a0a]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-xs text-[#a0a0a0] transition-colors duration-200 hover:text-[#f5c518]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = link.toLowerCase().replace(' ', '-');
                      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-[#a0a0a0] transition-colors duration-200 hover:text-[#f5c518]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-2 text-xs text-[#a0a0a0]">
              <li>01865 980644</li>
              <li>info@energyinstall.co.uk</li>
              <li>123 Energy Street</li>
              <li>Oxford, OX1 2AB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(255,255,255,0.04)]">
        <div className="section-padding py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[10px] text-[#a0a0a0]">
              © {new Date().getFullYear()} Energy Install. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[10px] text-[#a0a0a0] transition-colors duration-200 hover:text-[#f5c518]"
                >
                  {link}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-md bg-[#141414] flex items-center justify-center text-[#a0a0a0] transition-all duration-200 hover:bg-[#f5c518] hover:text-[#0a0a0a]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
