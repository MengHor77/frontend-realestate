import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/search', label: 'Search' },
  { to: '/account/dashboard', label: 'Account' },
  { to: '/agent/dashboard', label: 'Agent' },
];

function Navbar() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4" aria-label="Main navigation">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-emerald-300">HomeHaven</NavLink>
        <div className="hidden gap-4 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `rounded px-3 py-2 text-sm font-medium ${isActive ? 'bg-emerald-500 text-slate-900' : 'text-slate-200 hover:bg-slate-700'}`}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/auth/login" className="rounded bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400">Login</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
