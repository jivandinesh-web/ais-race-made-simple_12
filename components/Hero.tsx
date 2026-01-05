import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, BarChart3 } from 'lucide-react';
import { RunningManAnimation } from './Header';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative bg-white dark:bg-slate-900 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center">
        
        {/* Logo Container: Circular with Peach Gradient */}
        <div className="mb-10 p-1 bg-gradient-to-br from-[#FFDAB9] to-[#FFCC99] rounded-full shadow-2xl transition-all hover:scale-105 duration-500">
          <div className="w-32 h-32 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <RunningManAnimation className="fill-orange-600 dark:fill-orange-400" size="80px" />
          </div>
        </div>

        <main className="max-w-4xl">
          <h1 className="text-5xl tracking-tight font-black text-gray-900 dark:text-white sm:text-6xl md:text-8xl mb-6">
            <span className="block mb-2">Race Budgeting</span>
            <span className="block text-orange-600 dark:text-orange-500 italic uppercase font-black">RUNSPEND</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-slate-400 sm:text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            The ultimate planning suite for Race Directors. Calculate event costs, source quality supplies, and manage logistics for thousands of runners with precision.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/calculator"
              onClick={onStart}
              className="px-12 py-5 border border-transparent text-lg font-black rounded-2xl text-white bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200 dark:shadow-none transition transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
            >
              The Calculator
            </Link>
            <Link
              to="/about"
              className="px-12 py-5 border border-transparent text-lg font-black rounded-2xl text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-slate-800 hover:bg-orange-200 dark:hover:bg-slate-700 transition transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
            >
              View Products
            </Link>
          </div>
        </main>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800/50 py-16 px-4 sm:px-6 lg:px-8 border-t dark:border-slate-800 transition-colors">
        <div className="max-w-7xl auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-neutral-100 dark:border-slate-700">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl mb-6 text-orange-600 dark:text-orange-400">
                <Target size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 dark:text-white uppercase italic">Precision Planning</h3>
              <p className="text-gray-500 dark:text-slate-400 text-center text-base font-medium">Automated formulas for water, shirts, and logistics up to 100k runners.</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-neutral-100 dark:border-slate-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl mb-6 text-blue-600 dark:text-blue-400">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 dark:text-white uppercase italic">Director Approved</h3>
              <p className="text-gray-500 dark:text-slate-400 text-center text-base font-medium">Verified by veteran race managers for running safety.</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-neutral-100 dark:border-slate-700">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl mb-6 text-green-600 dark:text-green-400">
                <BarChart3 size={40} />
              </div>
              <h3 className="text-2xl font-black mb-3 dark:text-white uppercase italic">Live Quotes</h3>
              <p className="text-gray-500 dark:text-slate-400 text-center text-base font-medium">Instantly add items to your quote cart and export professional PDFs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;