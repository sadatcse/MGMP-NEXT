// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { router } from './routes/routes.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTop from './components/Utility/ScrollToTop';

// Initialize AOS library for some work 
AOS.init();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
