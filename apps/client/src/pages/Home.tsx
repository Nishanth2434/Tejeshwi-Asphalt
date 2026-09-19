import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView, type Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Award, HardHat, TrendingUp, ShieldCheck, 
  MapPin, Clock, Settings, ChevronRight, ChevronLeft, Star, Quote
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';
import { useSiteContent } from '../lib/getContent';

// Asset Imports
import carousel1 from '../assets/images/hero/carousel_1.jpg';
import carousel2 from '../assets/images/hero/carousel_2.jpg';
import carousel3 from '../assets/images/hero/carousel_3.jpg';
import carousel6 from '../assets/images/hero/carousel_6.jpg';

import aboutImg from '../assets/images/about/about_team.jpg';
import projectHighway from '../assets/images/projects/project_highway.jpg';
import projectDowntown from '../assets/images/projects/project_downtown.jpg';
import servicePaving from '../assets/images/services/service_paving.jpg';
import serviceConst from '../assets/images/services/service_construction.jpg';
import serviceInfra from '../assets/images/services/service_infra.jpg';
import eqPaver from '../assets/images/equipment/eq_paver.jpg';
import eqRoller from '../assets/images/equipment/eq_roller.jpg';
import ctaBg from '../assets/images/hero/cta_bg.jpg';
import client1 from '../assets/images/testimonials/client_1.jpg';
import client2 from '../assets/images/testimonials/client_2.jpg';
import client3 from '../assets/images/testimonials/client_3.jpg';


const heroImages = [carousel1, carousel2, carousel3, carousel6];

const showcaseServices = [
  { title: 'Road Construction', desc: 'Building durable road networks engineered for long-term performance and high traffic capacity.', img: serviceConst, link: '/services/road-construction' },
  { title: 'Asphalt Paving', desc: 'Premium quality asphalt applications for highways, municipal roads, and urban streets.', img: servicePaving, link: '/services/asphalt-paving' },
  { title: 'Road Maintenance', desc: 'Comprehensive preservation and structural repair to extend infrastructure lifespan.', img: projectDowntown, link: '/services/road-maintenance' },
  { title: 'Highway Development', desc: 'Large-scale structural development for major interstate and regional projects.', img: projectHighway, link: '/services/infrastructure' },
  { title: 'Urban Infrastructure', desc: 'Precision grading, earthwork, and paving for complex city environments.', img: projectDowntown, link: '/services' },
  { title: 'Other Services', desc: 'Specialized structural and civil engineering capabilities for unique challenges.', img: eqPaver, link: '/services' },
];

const showcaseProjects = [
  { title: 'Interstate 95 Expansion', loc: 'North Region', type: 'Highway Construction', status: 'Completed', img: projectHighway },
  { title: 'Downtown Resurfacing', loc: 'City Center', type: 'Asphalt Paving', status: 'In Progress', img: projectDowntown },
  { title: 'Airport Runway Alpha', loc: 'Regional Airport', type: 'Infrastructure', status: 'Completed', img: serviceConst },
  { title: 'Urban Highway Development', loc: 'Metropolitan Area', type: 'Civil Engineering', status: 'Completed', img: projectHighway },
  { title: 'Regional Infrastructure', loc: 'Eastern District', type: 'Road Maintenance', status: 'In Progress', img: projectDowntown }
];

// Reusable Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", title }: { end: number, suffix?: string, title: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-brand-100">
      <div className="text-5xl md:text-6xl font-bold text-brand-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-brand-900 font-medium text-lg">{title}</div>
    </div>
  );
};

export const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  // Dynamic Site Content Hooks
  const heroBadge = useSiteContent('home.hero.badge', 'Premium Infrastructure Solutions');
  const heroHeadline = useSiteContent('home.hero.headline', 'Building Roads.\nConnecting Progress.');
  const heroDesc = useSiteContent('home.hero.description', 'Delivering premium asphalt paving, structural road construction, and comprehensive infrastructure solutions engineered for durability and scale.');
  const heroPrimaryText = useSiteContent('home.hero.primaryCtaText', 'Explore Projects');
  const heroPrimaryLink = useSiteContent('home.hero.primaryCtaLink', '/projects');
  const heroSecondaryText = useSiteContent('home.hero.secondaryCtaText', 'Request a Quote');
  const heroSecondaryLink = useSiteContent('home.hero.secondaryCtaLink', '/contact');
  const heroSlides = useSiteContent('home.hero.carouselImages', heroImages);

  const legacyNum = useSiteContent('home.legacy.sectionNumber', '01');
  const legacyBadge = useSiteContent('home.legacy.badge', 'Our Legacy');
  const legacyHeadline = useSiteContent('home.legacy.headline', 'Engineering excellence.');
  const legacyBody = useSiteContent('home.legacy.body', 'TEJASHWI stands at the forefront of modern infrastructure development. We specialize in heavy civil construction, delivering robust road networks that power economies and connect communities.\n\nOur commitment to utilizing cutting-edge machinery and premium materials ensures that every project, from vast highways to intricate urban developments, is engineered for generations.');
  const legacyImg = useSiteContent('home.legacy.image', aboutImg);
  const legacyTag = useSiteContent('home.legacy.imageAnnotation', 'TEJASHWI / Field Operations');
  const legacyStats = useSiteContent('home.legacy.stats', [
    { label: 'Years Experience', val: '15+' },
    { label: 'Projects Completed', val: '120+' },
    { label: 'Heavy Machines', val: '40+' },
    { label: 'Regions Served', val: 'Multiple' },
  ]);
  const legacyCtaText = useSiteContent('home.legacy.ctaText', 'Discover Our Story');

  const servicesNum = useSiteContent('home.services.sectionNumber', '02');
  const servicesBadge = useSiteContent('home.services.badge', 'What We Do');
  const servicesHeadline = useSiteContent('home.services.headline', 'Advanced infrastructure solutions built for lasting performance.');
  const servicesSub = useSiteContent('home.services.subheadline', 'Delivering high-capacity construction services across multiple engineering disciplines.');
  const servicesList = useSiteContent('home.services.items', showcaseServices);

  const projectsNum = useSiteContent('home.projects.sectionNumber', '03');
  const projectsBadge = useSiteContent('home.projects.badge', 'Selected Work');
  const projectsHeadline = useSiteContent('home.projects.headline', 'Featured Projects');
  const projectsDesc = useSiteContent('home.projects.description', 'A selection of infrastructure projects engineered for scale, durability and long-term performance.');
  const projectsViewAll = useSiteContent('home.projects.viewAllText', 'View All Projects');
  const projectsList = useSiteContent('home.projects.items', showcaseProjects);

  const whyTitle = useSiteContent('home.whyChooseUs.headline', 'The Apex Advantage');
  const whySub = useSiteContent('home.whyChooseUs.subheadline', 'Uncompromising standards. Precision engineering. Superior results.');
  const whyCards = useSiteContent('home.whyChooseUs.items', [
    { title: 'Experienced Team', desc: 'Leveraging industry best practices to deliver outstanding results that exceed client expectations every time.' },
    { title: 'Modern Equipment', desc: 'State-of-the-art machinery fleet ensuring high precision, speed, and safety compliance.' },
    { title: 'Quality Materials', desc: 'High-grade aggregate and polymer-modified asphalt formulated for extreme durability.' },
    { title: 'Safety First', desc: 'Zero-compromise safety protocols protecting personnel and public on active roadways.' },
    { title: 'On-Time Delivery', desc: 'Systematic timeline management keeping project milestones strictly on schedule.' },
    { title: 'Engineering Expertise', desc: 'Decades of combined engineering skill tackling complex civil infrastructure.' }
  ]);

  const machineryTitle = useSiteContent('home.machinery.headline', 'Our Heavy Machinery');
  const machineryList = useSiteContent('home.machinery.items', [
    { img: eqPaver, name: 'Asphalt Paver' },
    { img: eqRoller, name: 'Road Roller' },
    { img: eqPaver, name: 'Excavator' },
    { img: eqRoller, name: 'Motor Grader' },
    { img: eqPaver, name: 'Tipper Truck' },
  ]);

  const processTitle = useSiteContent('home.process.headline', 'Our Construction Process');
  const processBgImg = useSiteContent('home.process.bgImage', serviceInfra);
  const defaultProcessSteps = [
    { step: '01', title: 'Site Survey', image: projectHighway },
    { step: '02', title: 'Planning', image: aboutImg },
    { step: '03', title: 'Site Preparation', image: carousel3 },
    { step: '04', title: 'Base Construction', image: serviceInfra },
    { step: '05', title: 'Asphalt Paving', image: servicePaving },
    { step: '06', title: 'Compaction', image: eqRoller },
    { step: '07', title: 'Quality Inspection', image: serviceConst },
    { step: '08', title: 'Completion', image: carousel1 }
  ];
  const processSteps = useSiteContent('home.process.steps', defaultProcessSteps);

  const statsList = useSiteContent('home.stats.items', [
    { end: 120, suffix: "+", title: "Completed Projects" },
    { end: 15, suffix: "+", title: "Years Experience" },
    { end: 40, suffix: "+", title: "Heavy Machines" },
    { end: 98, suffix: "%", title: "On-Time Completion" },
  ]);

  const testimonialsTitle = useSiteContent('home.testimonials.headline', 'Client Testimonials');
  const testimonialsList = useSiteContent('home.testimonials.items', [
    {
      text: "Tejashwi Constructions delivered exceptional quality on the Mysore Ring Road resurfacing. Their team's dedication to timelines and material quality is unmatched in the region.",
      photo: client1,
      name: "Ramesh Gowda",
      role: "Chief Engineer, Mysore Infrastructure Dev"
    },
    {
      text: "The asphalt paving work done in Mandya city limits has significantly improved traffic flow. Tejashwi's modern machinery and skilled operators ensured a flawless finish.",
      photo: client2,
      name: "Suresh H.K.",
      role: "Mandya District PWD"
    },
    {
      text: "We contracted them for a major highway expansion connecting Mysore and Srirangapatna. Their professionalism, safety standards, and engineering excellence exceeded our expectations.",
      photo: client3,
      name: "Priya N.",
      role: "Project Director, Highway Authority"
    }
  ]);

  const ctaTitle = useSiteContent('home.cta.headline', 'Ready to Build?');
  const ctaDesc = useSiteContent('home.cta.description', 'Partner with TEJASHWI for your next major infrastructure or paving project. We bring the machinery, the expertise, and the legacy of excellence.');
  const ctaBtnText = useSiteContent('home.cta.buttonText', 'Start Your Project');
  const ctaBtnLink = useSiteContent('home.cta.buttonLink', '/contact');
  const ctaBgImg = useSiteContent('home.cta.bgImage', ctaBg);

  const slides = (heroSlides && heroSlides.length > 0) ? heroSlides : heroImages;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[100vh] flex items-center bg-brand-950 overflow-hidden">
        {/* Cinematic Carousel Background */}
        <div className="absolute inset-0 z-0 bg-brand-950">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.04 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slides[currentImage] || heroImages[0]} 
                alt="Construction background" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </AnimatePresence>
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/50 to-transparent z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent z-10" />
        </div>
        
        <div className="container-custom relative z-20 w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="max-w-4xl">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div className="h-[2px] w-8 lg:w-12 bg-accent-500" />
                <span className="text-accent-500 font-bold tracking-[0.2em] lg:tracking-[0.25em] uppercase text-xs lg:text-sm">
                  {heroBadge}
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-[84px] font-bold text-white mb-6 lg:mb-8 leading-[1.1] lg:leading-[1.05] tracking-tight whitespace-pre-line">
                {heroHeadline}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl lg:text-2xl text-brand-100/90 mb-10 lg:mb-14 max-w-2xl font-light leading-relaxed border-l-[3px] border-accent-500 pl-4 lg:pl-6">
                {heroDesc}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Link to={heroPrimaryLink}>
                  <button className="group relative overflow-hidden rounded-[8px] bg-accent-500 px-10 h-16 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(217,119,6,0.3)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-3 text-[15px] font-bold tracking-wider text-brand-950 uppercase transition-colors duration-500 group-hover:text-white">
                      {heroPrimaryText}
                      <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 z-0 h-full w-full bg-brand-950 translate-y-[101%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
                  </button>
                </Link>
                <Link to={heroSecondaryLink}>
                  <button className="group relative overflow-hidden rounded-[8px] border border-white/20 bg-white/5 backdrop-blur-md px-10 h-16 transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto">
                    <span className="relative z-10 text-[15px] font-bold tracking-wider text-white uppercase transition-colors duration-500 group-hover:text-accent-100">
                      {heroSecondaryText}
                    </span>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hero Background Scrolling Controls & Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3 sm:gap-4 bg-brand-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/15 shadow-2xl">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => setCurrentImage((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Previous background slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImage(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentImage === idx 
                      ? 'w-6 bg-accent-500' 
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to background slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter Text */}
            <span className="text-[11px] font-mono font-bold text-white/80 select-none">
              0{currentImage + 1} / 0{slides.length}
            </span>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setCurrentImage((prev) => (prev + 1) % slides.length)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Next background slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 2 - COMPANY INTRODUCTION */}
      <section className="py-16 lg:py-32 bg-[#FDFBF7] relative z-20 overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center relative">
            
            {/* Left: Immersive Image Canvas (60% width) */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[60%] relative z-0"
            >
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.12)]">
                <img src={legacyImg} alt="Engineering Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-brand-950/10 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 border border-brand-950/10 rounded-[24px]" />
              </div>
              
              {/* Image Annotation */}
              <div className="absolute bottom-8 left-8 bg-[#FDFBF7]/90 backdrop-blur-md px-5 py-3 rounded-[8px] shadow-lg border border-brand-950/5 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-950 uppercase">
                  {legacyTag}
                </span>
              </div>
            </motion.div>
            
            {/* Right: Editorial Text Composition (45% width, overlapping left by 5%) */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer} 
              className="w-full lg:w-[45%] lg:-ml-[5%] relative z-10 mt-8 lg:mt-0"
            >
              <div className="bg-[#FDFBF7] p-8 md:p-14 rounded-[20px] shadow-[0_30px_80px_rgb(0,0,0,0.08)] border border-brand-950/5">
                
                {/* Section Label */}
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex items-center gap-4 mb-8">
                  <span className="text-[12px] font-bold tracking-[0.2em] text-brand-400 uppercase">{legacyNum}</span>
                  <div className="h-[1px] w-12 bg-brand-200" />
                  <span className="text-[12px] font-bold tracking-[0.2em] text-brand-950 uppercase">{legacyBadge}</span>
                </motion.div>
                
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-4xl md:text-5xl lg:text-[52px] font-bold text-brand-950 mb-8 leading-[1.1] tracking-tight whitespace-pre-line">
                  {legacyHeadline}
                </motion.h2>
                
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-6 text-[17px] text-brand-700/80 mb-12 font-light leading-relaxed whitespace-pre-line">
                  {legacyBody}
                </motion.div>
                
                {/* Staggered Statistics */}
                <div className="grid grid-cols-2 gap-8 mb-12 border-t border-brand-950/10 pt-8">
                  {(legacyStats || []).map((m: any, i: number) => (
                    <motion.div 
                      key={i} 
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                      className="relative pl-5"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-100 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-500 rounded-full" />
                      </div>
                      <div className="text-3xl font-bold text-brand-950 mb-1 tracking-tight">{m.val}</div>
                      <div className="text-[11px] text-brand-500 font-bold tracking-widest uppercase">{m.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
                  <Link to="/about" className="group inline-flex items-center gap-4">
                    <span className="text-[13px] font-bold tracking-[0.15em] text-brand-950 uppercase group-hover:text-accent-600 transition-colors">
                      {legacyCtaText}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-brand-200 flex items-center justify-center group-hover:border-accent-500 group-hover:bg-accent-500 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-brand-950 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - SERVICES */}
      <section className="py-32 bg-white">
        <div className="container-custom max-w-7xl">
          {/* Asymmetric Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-400 uppercase">{servicesNum}</span>
              <div className="h-[1px] w-12 bg-brand-200" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-950 uppercase">{servicesBadge}</span>
            </div>
            <div className="max-w-xl md:text-right">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-950 mb-4 leading-[1.1] tracking-tight whitespace-pre-line">
                {servicesHeadline}
              </h2>
              <p className="text-brand-700/80 font-light text-lg">
                {servicesSub}
              </p>
            </div>
          </div>

          {/* Interactive Service Showcase */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
            {/* Left: Navigation List */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center">
              {(servicesList || []).map((service: any, index: number) => {
                const isActive = activeService === index;
                return (
                  <div 
                    key={index}
                    className="relative border-b border-brand-950/10 cursor-pointer group"
                    onMouseEnter={() => setActiveService(index)}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-500 origin-top transition-transform duration-500 ease-[0.16,1,0.3,1]" style={{ transform: isActive ? 'scaleY(1)' : 'scaleY(0)' }} />
                    <div className={cn(
                      "py-6 pl-6 pr-4 transition-all duration-500 ease-[0.16,1,0.3,1]",
                      isActive ? "bg-brand-50/50" : "hover:bg-brand-50/30"
                    )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <span className={cn(
                            "text-[11px] font-bold tracking-widest transition-colors duration-500",
                            isActive ? "text-accent-600" : "text-brand-300"
                          )}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className={cn(
                            "text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500",
                            isActive ? "text-brand-950" : "text-brand-400 group-hover:text-brand-600"
                          )}>
                            {service.title}
                          </h3>
                        </div>
                        {isActive && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block">
                            <ArrowRight className="w-5 h-5 text-accent-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-brand-700/80 font-light mt-4 pl-14 text-sm leading-relaxed pr-8">
                              {service.desc}
                            </p>
                            {service.link && (
                              <Link to={service.link} className="inline-block mt-4 pl-14 text-[11px] font-bold tracking-[0.15em] uppercase text-brand-950 hover:text-accent-600 transition-colors">
                                Explore Service &rarr;
                              </Link>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Image Presentation */}
            <div className="w-full lg:w-[60%] h-[350px] lg:h-[700px] relative rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.08)] bg-brand-100">
              <AnimatePresence mode="wait">
                {servicesList && servicesList[activeService] && (
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img src={servicesList[activeService].img || serviceConst} alt={servicesList[activeService].title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-brand-950/10 to-transparent mix-blend-multiply" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - FEATURED PROJECTS */}
      <section className="py-16 lg:py-32 bg-[#FDFBF7]">
        <div className="container-custom max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-6 border-b border-brand-950/10 pb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[12px] font-bold tracking-[0.2em] text-brand-400 uppercase">{projectsNum}</span>
                <div className="h-[1px] w-12 bg-brand-200" />
                <span className="text-[12px] font-bold tracking-[0.2em] text-brand-950 uppercase">{projectsBadge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-950 mb-4 tracking-tight">{projectsHeadline}</h2>
              <p className="text-brand-700/80 font-light text-[17px] max-w-md">
                {projectsDesc}
              </p>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-4 border-b border-brand-950 pb-2 hover:border-accent-600 transition-colors">
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-950 uppercase group-hover:text-accent-600 transition-colors">
                {projectsViewAll}
              </span>
              <ArrowRight className="w-4 h-4 text-brand-950 group-hover:text-accent-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Project Showcase Layout */}
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
            
            {/* Left: Project Navigation */}
            <div className="w-full lg:w-[35%] flex flex-col gap-2 relative z-10">
              {(projectsList || []).map((proj: any, idx: number) => {
                const isActive = activeProject === idx;
                return (
                  <div 
                    key={idx}
                    className="cursor-pointer group flex items-start gap-6 p-4 rounded-xl transition-all duration-500"
                    onMouseEnter={() => setActiveProject(idx)}
                  >
                    <div className="flex flex-col items-center gap-2 mt-1">
                      <span className={cn("text-[10px] font-bold tracking-[0.1em] transition-colors duration-500", isActive ? "text-accent-600" : "text-brand-300")}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className={cn("w-[1px] transition-all duration-500", isActive ? "h-8 bg-accent-500" : "h-0 bg-transparent")} />
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold tracking-tight transition-colors duration-500",
                        isActive ? "text-brand-950" : "text-brand-400 group-hover:text-brand-600"
                      )}>
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Immersive Project Image */}
            <div className="w-full lg:w-[65%] relative z-0">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgb(0,0,0,0.15)] bg-brand-100">
                <AnimatePresence mode="wait">
                  {projectsList && projectsList[activeProject] && (
                    <motion.div
                      key={activeProject}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img src={projectsList[activeProject].img || projectHighway} alt={projectsList[activeProject].title} className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 border border-brand-950/5 rounded-[32px] pointer-events-none" />
              </div>

              {/* Information Panel */}
              <AnimatePresence mode="wait">
                {projectsList && projectsList[activeProject] && (
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="absolute -bottom-8 -left-2 lg:-bottom-12 lg:-left-12 bg-[#FDFBF7] p-8 md:p-10 rounded-[24px] shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-brand-950/10 max-w-xs md:max-w-sm z-10"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                      <span className="text-[10px] font-bold tracking-[0.2em] text-brand-500 uppercase">
                        {projectsList[activeProject].status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-brand-950 mb-6 leading-tight">
                      {projectsList[activeProject].title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-8">
                      <span className="text-sm font-light text-brand-600 flex items-center gap-2"><MapPin className="w-4 h-4"/> {projectsList[activeProject].loc}</span>
                      <span className="text-sm font-light text-brand-600 flex items-center gap-2"><HardHat className="w-4 h-4"/> {projectsList[activeProject].type}</span>
                    </div>
                    
                    <Link to="/projects" className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase text-brand-950 hover:text-accent-600 transition-colors group">
                      View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 - WHY CHOOSE US */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{whyTitle}</h2>
            <p className="text-xl text-brand-200 font-light">{whySub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(whyCards || []).map((feature: any, i: number) => {
              const defaultIcons = [
                <HardHat className="w-10 h-10" />,
                <Settings className="w-10 h-10" />,
                <Award className="w-10 h-10" />,
                <ShieldCheck className="w-10 h-10" />,
                <Clock className="w-10 h-10" />,
                <TrendingUp className="w-10 h-10" />
              ];
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex gap-6">
                  <div className="text-brand-500 shrink-0">{defaultIcons[i % defaultIcons.length]}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-brand-300 leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 - EQUIPMENT */}
      <section className="py-16 lg:py-24 bg-brand-50 overflow-hidden">
        <div className="container-custom mb-12">
          <h2 className="text-4xl font-bold text-brand-950">{machineryTitle}</h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex">
          <motion.div 
            className="flex gap-6 px-3 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...(machineryList || []), ...(machineryList || [])].map((eq: any, i: number) => (
              <div key={i} className="w-[280px] md:w-[320px] shrink-0 group">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-brand-100 transition-all hover:shadow-xl cursor-pointer">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-slate-800">
                    <img src={eq.img || eqPaver} alt={eq.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-950 text-center">{eq.name}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 - PROCESS */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-950 text-white">
        {/* Background Image with Ambient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={processBgImg} 
            alt="Construction Process Background" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-brand-950/85 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="text-xs font-bold tracking-[0.25em] text-accent-400 uppercase mb-3 block">
              Proven Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {processTitle}
            </h2>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(processSteps || []).map((stepItem: any, i: number) => {
              const isObj = typeof stepItem === 'object' && stepItem !== null;
              const stepNumber = isObj && stepItem.step ? stepItem.step : String(i + 1).padStart(2, '0');
              const stepTitle = isObj ? (stepItem.title || stepItem.name || `Step ${i + 1}`) : stepItem;
              const stepImg = (isObj && stepItem.image) 
                ? stepItem.image 
                : (defaultProcessSteps[i]?.image || projectHighway);

              return (
                <motion.div 
                  key={i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeInUp} 
                  className="group relative overflow-hidden rounded-2xl border border-white/20 p-6 lg:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-accent-400 min-h-[190px] flex flex-col justify-between"
                >
                  {/* Background Image inside this box */}
                  <img 
                    src={stepImg} 
                    alt={stepTitle} 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" 
                  />

                  {/* High-contrast dark gradient overlay for crystal clear text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-brand-950/80 to-brand-950/60 group-hover:from-black/90 group-hover:via-brand-950/70 group-hover:to-brand-950/45 transition-colors duration-500" />
                  
                  {/* Subtle inner border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-accent-400/40 pointer-events-none transition-all duration-300" />

                  {/* Top: Step Number & Checkmark Badge */}
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <span className="text-3xl md:text-4xl font-black text-accent-400 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-accent-300 transition-colors">
                      {stepNumber}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-bold text-accent-300 shadow-lg group-hover:border-accent-400 group-hover:text-accent-400 group-hover:bg-accent-500/20 transition-all duration-300">
                      ✓
                    </div>
                  </div>

                  {/* Bottom: Step Title & Animated Accent Line */}
                  <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] group-hover:text-accent-100 transition-colors">
                      {stepTitle}
                    </h3>
                    <div className="w-10 h-1 bg-accent-500 rounded-full transition-all duration-500 group-hover:w-full group-hover:bg-accent-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8 - PROJECT STATISTICS */}
      <section className="py-20 bg-brand-50 border-y border-brand-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(statsList || []).map((s: any, idx: number) => (
              <AnimatedCounter key={idx} end={Number(s.end) || 0} suffix={s.suffix || ''} title={s.title || ''} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - TESTIMONIALS */}
      <section className="py-16 lg:py-32 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-950 text-center mb-12 lg:mb-16 tracking-tight">
            {testimonialsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {(testimonialsList || []).map((testimonial: any, i: number) => (
              <Card key={i} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-brand-50/50 hover:bg-brand-50 hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-brand-300 mb-6" />
                  <p className="text-brand-800 mb-8 italic leading-relaxed text-[15px]">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.photo || client1} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-brand-100 shadow-sm" />
                    <div>
                      <div className="font-bold text-brand-950">{testimonial.name}</div>
                      <div className="text-sm text-brand-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 - CTA */}
      <section className="py-16 lg:py-24 bg-brand-950 text-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBgImg} alt="Construction Site" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">{ctaTitle}</h2>
          <p className="text-lg md:text-xl text-brand-100/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
            {ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
            <Link 
              to={ctaBtnLink} 
              className="inline-flex items-center justify-center gap-3 bg-accent-500 text-brand-950 px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-accent-400 transition-colors shadow-[0_10px_30px_rgba(217,119,6,0.3)] hover:-translate-y-1 transform duration-300 w-full sm:w-auto"
            >
              {ctaBtnText}
            </Link>
          </div>
        </div>
      </section>
      
      {/* SECTION 11 - Footer is managed in PageLayout */}

    </div>
  );
};
