import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ValueStrip from './sections/ValueStrip';
import Services from './sections/Services';
import HowSolarWorks from './sections/HowSolarWorks';
import CommercialFocus from './sections/CommercialFocus';
import Incentives from './sections/Incentives';
import CaseStudies from './sections/CaseStudies';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { Toaster } from './hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <ValueStrip />
        <Services />
        <HowSolarWorks />
        <CommercialFocus />
        <Incentives />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
