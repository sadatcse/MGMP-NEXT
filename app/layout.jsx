"use client";
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

// React 19 polyfill for react-quill and other legacy React 18 libraries
if (typeof window !== 'undefined' && !ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = (el) => {
    return el || null;
  };
}

import '../src/index.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Advertisement1 from '../src/components/Advertisement/Advertisement1';
import Chatbox from '../src/components/Chatbox';
import AuthProvider from '../src/providers/AuthProvider';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Define routes where navbar and footer should be hidden
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/webadmin');

  useEffect(() => {
    // Only track if not a dashboard/webadmin path
    if (isDashboard) return;

    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('visitor_logged')) return;

      const logVisitor = async () => {
        try {
          let ip = 'Unknown';
          let country = 'Unknown';

          try {
            const geoRes = await fetch('https://ipwho.is/');
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData && geoData.success) {
                ip = geoData.ip || 'Unknown';
                country = geoData.country || 'Unknown';
              }
            }
          } catch (e) {
            console.warn("Client-side GeoIP resolution failed, falling back to server header parsing.", e);
          }

          await fetch('/api/visitor/log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ip,
              country,
              referrer: document.referrer || '',
              path: window.location.pathname || '/',
              userAgent: navigator.userAgent || 'Unknown',
            }),
          });

          sessionStorage.setItem('visitor_logged', 'true');
        } catch (error) {
          console.error("Visitor logging error:", error);
        }
      };

      logVisitor();
    }
  }, [isDashboard]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {!isDashboard && (
            <div className="mx-auto">
              <Navbar />
            </div>
          )}
          <div className={isDashboard ? "" : ""}>
            {children}
          </div>
          {!isDashboard && (
            <div>
              <Footer />
            </div>
          )}
          {!isDashboard && <Advertisement1 />}
          {!isDashboard && <Chatbox />}
        </AuthProvider>
      </body>
    </html>
  );
}

