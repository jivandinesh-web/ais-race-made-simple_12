import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Database, Smartphone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                <span className="font-bold">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight">RUN SPEND</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Professional tools for marathon and road running race organizers. 
              Precision budgeting, simplified.
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
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                <Twitter size={18} />
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

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs text-center font-medium">
            © {new Date().getFullYear()} Race Budgeting Made Simple. All rights reserved. 
            Built for the running community.
          </p>
          <div className="flex items-center space-x-4">
             <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 grayscale opacity-50" />
             <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;