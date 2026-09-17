import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';

import { ProjectDetail } from './pages/ProjectDetail';

import { Equipment } from './pages/Equipment';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Admin CMS Studio
import { AdminLayout } from './components/admin/AdminLayout';
import { WebsiteContentPage } from './pages/admin/WebsiteContentPage';
import { NavigationPage } from './pages/admin/NavigationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin CMS Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/website" replace />} />
          <Route path="website" element={<WebsiteContentPage />} />
          <Route path="website/navigation" element={<NavigationPage />} />
        </Route>

        {/* Public Website Routes */}
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:project" element={<ProjectDetail />} />
          
          <Route path="equipment" element={<Equipment />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
