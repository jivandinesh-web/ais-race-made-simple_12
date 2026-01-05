import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Sun, Moon, ShoppingCart, Fingerprint, Database } from 'lucide-react';
import { UserRegistration } from '../types';

interface HeaderProps {
  user: UserRegistration | null;
  quoteCount: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuth: () => void;
}

export const RunningManAnimation = ({ className = "fill-white", size = "48px" }: { className?: string, size?: string }) => (
  <div className="flex items-center justify-center" style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" className={`running-man ${className}`} style={{ width: '100%', height: '100%' }}>
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7.3 1.4z" />
    </svg>
  </div>
);

const Header: React.FC<HeaderProps> = ({ user, quoteCount, darkMode, toggleDarkMode, onOpenAuth }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  return (
    <header className="sticky top-0 z-50 shadow-md gradient-charcoal-orange transition-colors" style={{ height: '20mm' }}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center h-full group">
          {/* Running Man Animation BEFORE the text */}
          <div className="flex items-center justify-center">
            <RunningManAnimation className="fill-white" size="18mm" />
          </div>
          
          <div className="flex items-center h-full mx-2">
            <span 
              className="font-black italic text-white tracking-tighter uppercase select-none"
              style={{ 
                fontSize: '18mm', 
                lineHeight: '1',
                height: '18mm',
                width: 'auto', 
                minWidth: '50mm', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 950,
                letterSpacing: '-0.05em'
              }}
            >
              RUNSPEND
            </span>
          </div>

          {/* Running Man Animation AFTER the text */}
          <div className="flex items-center justify-center">
            <RunningManAnimation className="fill-white" size="18mm" />
          </div>
        </Link>

        <nav className="hidden xl:flex items-center space-x-6 font-bold text-white">
          <Link to="/" className={`px-3 py-1.5 rounded-lg transition text-[10px] uppercase tracking-widest ${location.pathname === '/' ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>Home</Link>
          <Link to="/calculator" className={`px-3 py-1.5 rounded-lg transition text-[10px] uppercase tracking-widest ${location.pathname === '/calculator' ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>Calculator</Link>
          <Link to="/about" className={`px-3 py-1.5 rounded-lg transition text-[10px] uppercase tracking-widest ${location.pathname === '/about' ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>About</Link>
          <Link to="/database-studio" className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl transition border border-[#40e0d0]/50 ${location.pathname === '/database-studio' ? 'bg-[#40e0d0] text-black border-white' : 'hover:bg-white/10 text-[#40e0d0]'}`}>
            <Database size={14} />
            <span className="font-black text-[10px] uppercase tracking-widest">Admin Hub</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {/* Conditionally hide the dark mode toggle on the landing page */}
          {!isLandingPage && (
            <button 
              onClick={toggleDarkMode}
              className="p-1.5 text-white hover:bg-black/10 rounded-full transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <Link to="/calculator" className="relative p-1.5 text-white hover:text-black transition" title="Cart">
            <ShoppingCart className="w-5 h-5" />
            {quoteCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#40e0d0] text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#171717] shadow-sm">
                {quoteCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center space-x-2 bg-black/10 px-2 py-1 rounded-full border border-white/20 h-8">
              <div className="w-5 h-5 bg-[#40e0d0] text-black rounded-full flex items-center justify-center">
                <User size={12} />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate max-w-[100px]">{user.fullName}</span>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center space-x-2 px-4 py-1.5 bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-200 dark:hover:bg-slate-700 transition transform hover:-translate-y-0.5 active:scale-95 shadow-sm h-9"
            >
              <Fingerprint size={16} className="text-orange-700 dark:text-orange-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;