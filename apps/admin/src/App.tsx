import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// Admin CMS Studio
import { AdminLayout } from './components/admin/AdminLayout';
import { WebsiteContentPage } from './pages/admin/WebsiteContentPage';
import { NavigationPage } from './pages/admin/NavigationPage';
import { Inbox } from './pages/Inbox';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin CMS Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/website" replace />} />
          <Route path="website" element={<WebsiteContentPage />} />
          <Route path="website/navigation" element={<NavigationPage />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="*" element={<Navigate to="/website" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
