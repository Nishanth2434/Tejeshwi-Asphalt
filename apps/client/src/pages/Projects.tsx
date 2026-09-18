import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Filter } from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import ctaBg from '../assets/images/hero/cta_bg.jpg';
import { useSiteContent } from '../lib/getContent';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const defaultCategories = ['All', 'Road Construction', 'Asphalt Paving', 'Infrastructure', 'Maintenance'];

export const Projects = () => {
  const heroHeadline = useSiteContent('projects.hero.headline', 'Projects That Move People Forward.');
  const heroDesc = useSiteContent('projects.hero.description', 'Explore our portfolio of complex engineering feats, from high-speed interstates to heavy-load airport runways.');
  const categories = useSiteContent<string[]>('projects.categories', defaultCategories);


  const [filter, setFilter] = useState('All');

  const filteredProjects = mockProjects.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-20 bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={ctaBg} alt="Projects Background" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-brand-950/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight whitespace-pre-line">
              {heroHeadline}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-brand-200 font-light">
              {heroDesc}
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* Filter Section */}
      <section className="py-8 bg-brand-50 border-b border-brand-100 sticky top-[72px] z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-brand-700 font-bold">
              <Filter className="w-5 h-5" /> Filter by Category:
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    filter === cat 
                      ? 'bg-brand-950 text-white shadow-md' 
                      : 'bg-white text-brand-700 hover:bg-brand-100 border border-brand-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, i) => {
                // Create an asymmetric masonry-like feel
                // Alternating large and medium cards based on index
                const isLarge = i % 3 === 0;
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`group ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
                  >
                    <Link to={`/projects/${project.id}`} className="block relative overflow-hidden rounded-3xl h-[300px] md:h-[500px]">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy" 
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute top-6 left-6 flex gap-2">
                        <Badge variant="accent" className="bg-brand-500 text-white border-none">{project.category}</Badge>
                        <Badge variant="outline" className="bg-brand-950/50 backdrop-blur-md text-white border-white/20">
                          {project.completionDate.substring(0, 4)}
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-brand-200 text-sm font-medium mb-3">
                              <MapPin className="w-4 h-4" /> {project.location || 'Various Locations'}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                          </div>
                          
                          <div className="w-14 h-14 rounded-full bg-white text-brand-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shrink-0">
                            <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-brand-700 mb-2">No projects found</h3>
              <p className="text-brand-500">Try adjusting your category filter.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
