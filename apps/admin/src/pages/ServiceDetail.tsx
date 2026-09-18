import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown, CheckCircle2, ShieldCheck, Ruler, ArrowRight, HardHat } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { servicesData, mockProjects, mockEquipment } from '../data/mockData';
import ctaBg from '../assets/images/hero/cta_bg.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // If service not found, redirect to main services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Get a few relevant projects and equipment
  const relatedProjects = mockProjects.slice(0, 2);
  const relatedEquipment = mockEquipment.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-brand-950 overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/30" />
        </div>
        
        <div className="container-custom relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-4">
              <Link to="/services" className="text-brand-400 font-bold tracking-widest uppercase text-sm hover:text-white transition-colors">
                ← Back to Services
              </Link>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {service.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-brand-950 leading-relaxed">
              {service.intro}
            </h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto mt-12" />
          </div>
        </div>
      </section>

      {/* SECTION 3 - WHAT WE DO */}
      <section className="section-padding bg-brand-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <h2 className="text-4xl font-bold text-brand-950 mb-8">What We Do</h2>
              <div className="space-y-6">
                {service.whatWeDo.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brand-100">
                    <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
                    <span className="text-lg font-medium text-brand-900">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img src={service.heroImage} alt="Service Execution" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-600/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - OUR PROCESS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-950">The Execution Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-brand-100" />
            {['Planning', 'Preparation', 'Execution', 'Inspection'].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative text-center">
                <div className="w-16 h-16 mx-auto bg-brand-950 text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10 mb-6 border-4 border-white shadow-md">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-900">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - EQUIPMENT USED & QUALITY */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="flex items-center gap-3 mb-6 text-brand-400">
                <HardHat className="w-8 h-8" />
                <h2 className="text-3xl font-bold text-white">Specialized Equipment</h2>
              </div>
              <p className="text-brand-200 mb-8">We deploy industry-leading machinery to ensure maximum efficiency and precision for {service.title.toLowerCase()} projects.</p>
              <div className="space-y-4">
                {relatedEquipment.map(eq => (
                  <div key={eq.id} className="bg-brand-900/50 p-4 rounded-xl flex items-center justify-between">
                    <span className="font-bold">{eq.name}</span>
                    <span className="text-brand-400 text-sm">{eq.type}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <div className="flex items-center gap-3 mb-6 text-brand-400">
                <ShieldCheck className="w-8 h-8" />
                <h2 className="text-3xl font-bold text-white">Quality & Safety</h2>
              </div>
              <p className="text-brand-200 mb-8">Uncompromising standards define every aspect of our operations, guaranteeing durability and workforce protection.</p>
              <ul className="space-y-4">
                <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0"/> ISO 9001 Certified Quality Management</li>
                <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0"/> Strict OSHA Safety Compliance</li>
                <li className="flex gap-3"><CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0"/> Continuous Material Testing</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - PROJECT EXAMPLES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-bold text-brand-950">Related Projects</h2>
            <Link to="/projects" className="text-brand-600 font-bold hover:text-brand-800 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedProjects.map(proj => (
              <Link key={proj.id} to="/projects" className="group block overflow-hidden rounded-2xl relative aspect-video">
                <img src={proj.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={proj.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">{proj.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - FAQ */}
      <section className="section-padding bg-brand-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-brand-950 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
                <button 
                  className="w-full px-6 py-6 text-left flex justify-between items-center font-bold text-lg text-brand-950"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-brand-600' : 'text-brand-300'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-brand-700 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 lg:py-32 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-900/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Need {service.title} Services?</h2>
          <Link to="/contact">
            <Button size="lg" className="bg-brand-500 hover:bg-brand-400 text-white rounded-none h-14 px-10 text-lg">
              Get a Quote Today
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
