import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HardHat, ArrowRight, TrendingUp, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSiteContent } from '../lib/getContent';

// Asset Imports
import heroBg from '../assets/images/services/service_construction.jpg';
import ctaBg from '../assets/images/hero/cta_bg.jpg';
import { servicesData } from '../data/mockData';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Services = () => {
  const heroBadge = useSiteContent('services.hero.badge', 'Capabilities');
  const heroHeadline = useSiteContent('services.hero.headline', 'Comprehensive Infrastructure Solutions.');
  const heroDesc = useSiteContent('services.hero.description', 'From greenfield highway construction to precision asphalt paving, we deliver engineering excellence at every scale.');
  const ctaHeadline = useSiteContent('services.cta.headline', 'Ready to break ground?');
  const ctaButtonText = useSiteContent('services.cta.buttonText', 'Get a Quote Today');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* SECTION 1 - HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-brand-950 overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Our Services" className="w-full h-full object-cover opacity-30" />
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


      {/* SECTION 2 - SERVICES OVERVIEW GRID */}
      <section className="section-padding bg-brand-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <motion.div key={service.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Link to={`/services/${service.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={service.heroImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-brand-950/40 transition-colors" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-brand-950 mb-3">{service.title}</h3>
                    <p className="text-brand-700/80 mb-6 line-clamp-2">{service.intro}</p>
                    <div className="flex items-center text-brand-600 font-bold group-hover:text-brand-500 transition-colors">
                      Explore Service <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - PROCESS OVERVIEW */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950">How We Work</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Consultation', desc: 'Detailed site analysis and project scoping.' },
              { num: '02', title: 'Engineering', desc: 'Precision planning and material mix design.' },
              { num: '03', title: 'Execution', desc: 'Deployment of state-of-the-art machinery.' },
              { num: '04', title: 'Quality QA/QC', desc: 'Rigorous testing and final handover.' }
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
                <div className="w-20 h-20 mx-auto bg-brand-50 rounded-full flex items-center justify-center mb-6 border border-brand-100">
                  <span className="text-3xl font-black text-brand-600">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-950 mb-2">{step.title}</h3>
                <p className="text-brand-700/80 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - WHY CHOOSE US */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The Apex Difference</h2>
              <div className="space-y-6">
                {[
                  { title: 'Industry-Leading Machinery', icon: <HardHat /> },
                  { title: 'Proprietary Asphalt Mixes', icon: <TrendingUp /> },
                  { title: 'Rigorous Safety Standards', icon: <ShieldCheck /> },
                  { title: 'On-Time Project Delivery', icon: <Clock /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-brand-900/50 p-4 rounded-xl">
                    <div className="text-brand-400">{item.icon}</div>
                    <div className="text-lg font-medium">{item.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-brand-800">
              <img src={heroBg} className="w-full h-full object-cover" alt="Construction Quality" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - CTA */}
      <section className="relative py-16 lg:py-32 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-900/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 whitespace-pre-line">{ctaHeadline}</h2>
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
