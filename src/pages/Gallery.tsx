import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { mockGallery } from '../data/mockData';
import { useSiteContent } from '../lib/getContent';

const defaultCategories = ['All', 'Road Construction', 'Asphalt Work', 'Machinery', 'Team', 'Completed Projects', 'Before & After'];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const Gallery = () => {
  const heroHeadline = useSiteContent('gallery.hero.headline', 'Visual Gallery');
  const heroDesc = useSiteContent('gallery.hero.description', 'A showcase of our engineering precision, heavy machinery, and dedicated teams in action.');
  const categories = useSiteContent<string[]>('gallery.categories', defaultCategories);
  const galleryImages = useSiteContent<any[]>('gallery.images', mockGallery);

  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(img => 
    filter === 'All' ? true : img.category === filter
  );

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <div className="bg-white min-h-screen pt-20 lg:pt-24 pb-12 lg:pb-20">
      
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-950 mb-6 whitespace-pre-line">{heroHeadline}</h1>
            <p className="text-xl text-brand-600">{heroDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-12 bg-white sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-brand-900 font-bold mr-4">
              <Filter className="w-5 h-5" /> Filter:
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-brand-500 text-white shadow-md' 
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Masonry Grid */}
      <section className="px-4 md:px-8">
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid"
              >
                <div 
                  className="relative group rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img src={item.image} alt={item.category} loading="lazy" decoding="async" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-brand-950 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-brand-500">No images found for this category.</div>
        )}
      </section>

      {/* Custom Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-950/95 backdrop-blur-lg flex items-center justify-center p-4"
          >
            {/* Close */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-2 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full hidden md:block"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image Container */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].image} 
                alt="Gallery Fullscreen" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
              />
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/70 font-medium">
                {lightboxIndex + 1} / {filteredImages.length} &mdash; {filteredImages[lightboxIndex].category}
              </div>
            </div>

            {/* Next */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % filteredImages.length); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full hidden md:block"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
