import { Outlet } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-auto bg-neutral-950 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-neutral-900 bg-neutral-950 sticky top-0 z-30">
          <span className="text-white font-semibold flex items-center gap-2">
            Famous Store <span className="text-primary-blue">72</span> Admin
          </span>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-neutral-400 hover:text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex-1 overflow-y-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

