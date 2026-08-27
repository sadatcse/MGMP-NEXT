"use client";
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Advertisement1 from './Advertisement/Advertisement1';
import Chatbox from './Chatbox';
import AuthProvider from '../providers/AuthProvider';

// Polyfill for react-quill and other legacy libraries expecting findDOMNode.
if (typeof window !== 'undefined' && !ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = (el) => {
    return el || null;
  };
}

export default function AppShell({ children, initialVisitorStats }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/webadmin');

  useEffect(() => {
    if (isDashboard) return;
    if (typeof window === 'undefined') return;

    // sessionStorage can throw in Safari private mode / locked-down in-app
    // browsers — never let that skip the rest of this effect.
    let alreadyLogged = false;
    try {
      alreadyLogged = Boolean(sessionStorage.getItem('visitor_logged'));
    } catch {
      alreadyLogged = false;
    }
    if (alreadyLogged) return;

    const logVisitor = async () => {
      try {
        await fetch('/api/visitor/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            referrer: document.referrer || '',
            path: window.location.pathname || '/',
            userAgent: navigator.userAgent || 'Unknown',
          }),
        });

        try {
          sessionStorage.setItem('visitor_logged', 'true');
        } catch {
          // Storage blocked — safe to ignore.
        }
      } catch (error) {
        console.error('Visitor logging error:', error);
      }
    };

    logVisitor();
  }, [isDashboard]);

  if (!isDashboard) {
    return (
      <>
        <div className="mx-auto">
          <Navbar />
        </div>
        {children}
        <div>
          <Footer initialStats={initialVisitorStats} />
        </div>
        <Advertisement1 />
        <Chatbox />
      </>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
}
