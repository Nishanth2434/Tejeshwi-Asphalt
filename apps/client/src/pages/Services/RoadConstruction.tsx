import React from 'react';
import { motion } from 'framer-motion';

export const RoadConstruction = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container-custom section-padding min-h-[60vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">RoadConstruction</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        This is the RoadConstruction page. Content is currently being built for this premium section.
      </p>
    </motion.div>
  );
};
