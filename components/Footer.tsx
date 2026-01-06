import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Database, Smartphone } from 'lucide-react';
import { RunningMan } from './Header';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <RunningMan className="fill-orange-500 transition-transform group-hover:scale-110" size="40px" />
              <span className="text-2xl font-black italic tracking-tighter uppercase text-white">RUNSPEND</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed font-medium italic">
              Professional tools for marathon and road running race organizers. 
              Precision budgeting, simplified for high-performance production.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-orange-500">Quick Links</h4>
            <ul className="space-y-4 text-neutral-400 text-sm font-medium">
              <li><Link to="/calculator" className="hover:text-white transition">The Calculator</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/database-studio" className="hover:text-white transition flex items-center"><Database size={14} className="mr-1.5" /> Database Studio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-orange-500">Legal</h4>
            <ul className="space-y-4 text-neutral-400 text-sm font-medium">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-orange-500">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                <Facebook size={18} />
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <Mail size={16} />
                <span>jivandinesh@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <Smartphone size={16} className="text-orange-500" />
                <span>+27 78 078 3112</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-3 w-full items-center text-center">
            <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
              REQUEST FOR QUOTES SHOULD BE AT LEAST 2 MONTHS IN ADVANCE DUE TO TIMELINES OF MANUFACTURE
            </p>
            <p className="text-neutral-500 text-[10px] md:text-xs font-medium">
              © {new Date().getFullYear()} Race Budgeting Made Simple. All rights reserved.
            </p>
            <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
              PROPRIETOR OF SITE, CALCULATORS & FORMULAS: DINESH JIVAN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;