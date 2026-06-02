import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
