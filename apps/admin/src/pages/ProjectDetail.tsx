import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { 
  ArrowRight, MapPin, Calendar, Building2, Ruler, 
  Target, Wrench, CheckCircle2, TrendingUp 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockProjects } from '../data/mockData';
import ctaBg from '../assets/images/hero/cta_bg.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const ProjectDetail = () => {
  const { project: projectId } = useParams();
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Get related projects
  const relatedProjects = mockProjects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* HERO / COVER IMAGE */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end pb-12 lg:pb-20 pt-24 lg:pt-32 bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeInUp} className="mb-6 flex gap-3">
              <Link to="/projects" className="text-brand-400 font-bold tracking-widest uppercase text-sm hover:text-white transition-colors">
                ← Back to Portfolio
              </Link>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </motion.h1>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 text-brand-200 text-lg font-medium">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-400" /> {project.location || 'Multiple Locations'}</span>
              <span className="flex items-center gap-2"><Building2 className="w-5 h-5 text-brand-400" /> {project.client}</span>
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-400" /> {project.completionDate.substring(0,4)}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 & 3 - OVERVIEW & METADATA GRID */}
      <section className="section-padding bg-white relative z-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-8">
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-brand-950 mb-6">Project Overview</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-brand-700/80 leading-relaxed mb-12">
                {project.description}
              </motion.p>
              
              <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-brand-950 mb-4 flex items-center gap-3">
                <Target className="w-8 h-8 text-brand-500" /> The Challenge
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-lg text-brand-700/80 leading-relaxed mb-12">
                {project.challenges || 'Executing complex engineering in a highly demanding environment required meticulous planning and coordination.'}
              </motion.p>

              <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-brand-950 mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-brand-500" /> Our Solution
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-lg text-brand-700/80 leading-relaxed mb-12">
                {project.solution || 'Apex Infra deployed specialized teams and cutting-edge machinery to deliver the project safely and ahead of schedule.'}
              </motion.p>
            </motion.div>

            {/* Sticky Metadata Sidebar */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-4">
              <div className="bg-brand-50 p-8 rounded-3xl sticky top-24 border border-brand-100">
                <h3 className="text-xl font-bold text-brand-950 mb-6">Project Details</h3>
                <ul className="space-y-6">
                  <li className="flex flex-col gap-1 border-b border-brand-200 pb-4">
                    <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">Client</span>
                    <span className="text-lg font-medium text-brand-900">{project.client}</span>
                  </li>
                  <li className="flex flex-col gap-1 border-b border-brand-200 pb-4">
                    <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">Scope</span>
                    <span className="text-lg font-medium text-brand-900">{project.scope || project.category}</span>
                  </li>
                  <li className="flex flex-col gap-1 border-b border-brand-200 pb-4">
                    <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">Duration</span>
                    <span className="text-lg font-medium text-brand-900">{project.duration || 'N/A'}</span>
                  </li>
                  <li className="flex flex-col gap-1 border-b border-brand-200 pb-4">
                    <span className="text-sm font-bold text-brand-500 uppercase tracking-wider">Project Value</span>
                    <span className="text-lg font-medium text-brand-900">{project.value}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 - CONSTRUCTION PROCESS & EQUIPMENT */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Ruler className="w-10 h-10 text-brand-400" /> Construction Process
              </h2>
              <div className="space-y-6">
                {(project.process || ['Site Preparation', 'Base Construction', 'Paving', 'Finishing']).map((step, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-800 text-brand-300 font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-lg font-medium">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Wrench className="w-10 h-10 text-brand-400" /> Equipment Deployed
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {(project.equipmentUsed || ['Heavy Pavers', 'Vibratory Rollers']).map((eq, i) => (
                  <motion.div key={i} variants={fadeInUp} className="bg-brand-900/50 p-6 rounded-2xl border border-brand-800">
                    <span className="text-xl font-bold">{eq}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="mt-12 bg-brand-500 p-8 rounded-3xl text-center">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Final Results</h3>
                <p className="text-brand-100 font-medium">
                  {project.results || 'Project completed on schedule, exceeding all quality benchmarks.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9 - PHOTO GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-8 bg-brand-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10 - RELATED PROJECTS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-brand-950 mb-12">More Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedProjects.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`} className="group block overflow-hidden rounded-3xl relative h-[400px]">
                <img src={proj.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={proj.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{proj.title}</h3>
                  <div className="text-brand-200 text-sm font-medium">{proj.category}</div>
                </div>
              </Link>
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Start Your Project</h2>
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
