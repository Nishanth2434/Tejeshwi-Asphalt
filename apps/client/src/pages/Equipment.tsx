import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, Wrench, ChevronRight } from 'lucide-react';
import { mockEquipment } from '../data/mockData';
import ctaBg from '../assets/images/hero/cta_bg.jpg';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useSiteContent } from '../lib/getContent';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Equipment = () => {
  const heroBadge = useSiteContent('equipment.hero.badge', 'Machinery & Assets');
  const heroHeadline = useSiteContent('equipment.hero.headline', 'Powering Progress with Precision.');
  const heroDesc = useSiteContent('equipment.hero.description', 'Our fleet of state-of-the-art construction machinery guarantees unmatched efficiency, quality, and safety on every site.');
  const fleetHeadline = useSiteContent('equipment.showcase.headline', 'The Apex Fleet');
  const ctaHeadline = useSiteContent('equipment.cta.headline', 'Need Heavy Machinery for Your Project?');
  const ctaButtonText = useSiteContent('equipment.cta.buttonText', 'Contact Us Today');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* SECTION 1 - HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-brand-950 overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img src={mockEquipment[0].image} alt="Fleet" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-brand-950/70" />
        </div>
        
        <div className="container-custom relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="text-brand-400 font-bold tracking-widest uppercase text-sm">{heroBadge}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
              {heroHeadline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-brand-200">
              {heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - MACHINERY SHOWCASE */}
      <section className="section-padding bg-brand-50 flex-grow">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-brand-950 flex items-center justify-center gap-4">
              <Wrench className="w-10 h-10 text-brand-500" /> {fleetHeadline}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockEquipment.map((eq) => (
              <motion.div 
                key={eq.id} 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-100 group hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={eq.image} 
                    alt={eq.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-brand-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                    {eq.type}
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col relative bg-white">
                  <h3 className="text-2xl font-bold text-brand-950 mb-2">{eq.name}</h3>
                  <p className="text-brand-600/80 mb-6 text-sm flex-grow">
                    {eq.desc}
                  </p>
                  
                  {/* Hover Revealed Specifications */}
                  <div className="space-y-3 pt-6 border-t border-brand-100 relative overflow-hidden h-[120px]">
                    <div className="absolute inset-0 bg-white z-10 group-hover:-translate-y-full transition-transform duration-500 ease-in-out flex items-center text-brand-600 font-bold">
                      View Specifications <ChevronRight className="ml-1 w-5 h-5" />
                    </div>
                    {eq.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-brand-900 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - CTA */}
      <section className="relative py-16 lg:py-32 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-900/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 px-4">{ctaHeadline}</h2>
          <Link to="/contact">
            <Button size="lg" className="bg-brand-500 hover:bg-brand-400 text-white rounded-none h-14 px-10 text-lg">
              {ctaButtonText}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

