import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// Auth context and protected route
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './lib/ProtectedRoute';
import { Login } from './pages/admin/Login';

// Admin CMS Studio
import { AdminLayout } from './components/admin/AdminLayout';
import { WebsiteContentPage } from './pages/admin/WebsiteContentPage';
import { NavigationPage } from './pages/admin/NavigationPage';
import { Inbox } from './pages/Inbox';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin CMS Routes (Protected) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="/website" replace />} />
              <Route path="website" element={<WebsiteContentPage />} />
              <Route path="website/navigation" element={<NavigationPage />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="*" element={<Navigate to="/website" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
