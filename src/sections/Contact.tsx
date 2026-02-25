import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Award, Shield, Star, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '01865 980644' },
  { icon: Mail, label: 'Email', value: 'info@solarenergy.co.uk' },
  { icon: MapPin, label: 'Address', value: '123 Energy Street, Oxford' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri: 8am-6pm' },
];

const trustBadges = [
  { icon: Award, text: 'MCS Certified' },
  { icon: Shield, text: 'NICEIC Approved' },
  { icon: Star, text: 'Which? Trusted' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    propertyType: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.contact-right',
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.form-field',
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({ title: 'Request Submitted!', description: 'We will contact you within 24 hours.' });
    setFormData({ name: '', email: '', phone: '', postcode: '', propertyType: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="section-py bg-[#141414]">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Info */}
          <div className="contact-left opacity-0">
            <div className="eyebrow mb-3">Get In Touch</div>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Ready to Go <span className="text-gradient">Solar?</span>
            </h2>
            <p className="text-[#a0a0a0] mb-8 leading-relaxed">
              Get a free assessment and savings forecast. Our experts will design 
              the perfect solar solution for your property.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#0a0a0a] flex items-center justify-center text-[#f5c518]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#a0a0a0] uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm text-white">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a] rounded-md border border-[rgba(255,255,255,0.04)]"
                  >
                    <Icon className="w-3 h-3 text-[#f5c518]" />
                    <span className="text-xs text-[#a0a0a0]">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right opacity-0">
            <form onSubmit={handleSubmit} className="contact-form bg-[#0a0a0a] rounded-lg p-5 border border-[rgba(255,255,255,0.04)]">
              <h3 
                className="text-lg font-medium text-white mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Request Free Assessment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-field sm:col-span-2 opacity-0">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="solar-input"
                  />
                </div>

                <div className="form-field opacity-0">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                    className="solar-input"
                  />
                </div>

                <div className="form-field opacity-0">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                    className="solar-input"
                  />
                </div>

                <div className="form-field opacity-0">
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    required
                    placeholder="Postcode"
                    className="solar-input"
                  />
                </div>

                <div className="form-field opacity-0">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="solar-input"
                  >
                    <option value="">Property Type</option>
                    <option value="detached">Detached House</option>
                    <option value="semi-detached">Semi-Detached</option>
                    <option value="terrace">Terrace</option>
                    <option value="flat">Flat/Apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                <div className="form-field sm:col-span-2 opacity-0">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Message (Optional)"
                    className="solar-input resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="form-field w-full mt-4 btn-primary disabled:opacity-70 opacity-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Assessment
                  </>
                )}
              </button>

              <p className="form-field mt-3 text-[10px] text-[#a0a0a0] text-center opacity-0">
                By submitting, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
