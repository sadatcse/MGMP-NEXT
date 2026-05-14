import '../src/index.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Advertisement1 from '../src/components/Advertisement/Advertisement1';
import AuthProvider from '../src/providers/AuthProvider';

export const metadata = {
  title: 'Multigym Premium',
  description: 'Multigym Premium website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="mx-auto">
            <Navbar />
          </div>
          <div>
            {children}
          </div>
          <div>
            <Footer />
          </div>
          <Advertisement1 />
        </AuthProvider>
      </body>
    </html>
  );
}
