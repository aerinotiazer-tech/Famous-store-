import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-50 selection:bg-primary-blue/30 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
