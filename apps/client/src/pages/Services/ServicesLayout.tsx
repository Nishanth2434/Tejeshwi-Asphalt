import React from 'react';
import { Outlet } from 'react-router-dom';

export const ServicesLayout = () => {
  return (
    <div>
      <div className="bg-brand-50 py-12 border-b border-brand-100">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-950">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Premium infrastructure solutions delivered with precision and expertise.</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
