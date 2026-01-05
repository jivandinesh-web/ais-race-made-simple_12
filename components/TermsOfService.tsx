import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-neutral-900 dark:text-white italic tracking-tighter uppercase">Terms of Service</h1>
        <p className="font-black text-orange-600 uppercase tracking-[0.3em] text-xs">LAST UPDATED: JULY 2025</p>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12 text-gray-700 dark:text-slate-400">
        <div className="text-xl font-bold leading-relaxed bg-neutral-900 text-white dark:bg-orange-600/10 dark:text-orange-400 p-8 rounded-[2.5rem] border dark:border-orange-500/20 shadow-2xl shadow-black/10">
          <p className="italic">
            "By using the RUN SPEND calculator, you agree that all quotes are confidential and intended for the named Race Director only. Distribution of these prices to third-party suppliers is a breach of our NDA."
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-sm mr-3 not-italic">1</span>
            Acceptance of Terms
          </h2>
          <p className="pl-11">By accessing the RUN SPEND calculator, you agree to be bound by these terms. This tool is strictly for use by authorized Race Directors and Club Secretaries.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-sm mr-3 not-italic">2</span>
            Confidentiality & NDA
          </h2>
          <div className="pl-11 space-y-4">
            <p>All pricing provided by the RUN SPEND calculator is <span className="text-neutral-900 dark:text-white font-black underline decoration-orange-500 decoration-2 underline-offset-4">Proprietary and Confidential</span>.</p>
            <ul className="list-none space-y-4">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 mr-3 flex-shrink-0" />
                <span>Users are strictly prohibited from sharing these quotes with third-party suppliers or competitors.</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 mr-3 flex-shrink-0" />
                <span>A digital signature on our Non-Disclosure Agreement (NDA) is required before a final quote is issued.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-sm mr-3 not-italic">3</span>
            Use of the Calculator
          </h2>
          <p className="pl-11">The calculator is an estimation tool for race logistics. While we strive for 100% accuracy based on the user's input (e.g., number of runners, distance), the final quote is subject to review by the RUN SPEND administration.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-sm mr-3 not-italic">4</span>
            Intellectual Property
          </h2>
          <p className="pl-11 text-balance">The "Marathon Running Man" logo, the "RUN SPEND" brand, and the custom calculation formulas are the exclusive property of RUN SPEND.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-sm mr-3 not-italic">5</span>
            Limitation of Liability
          </h2>
          <p className="pl-11">RUN SPEND is not liable for race day issues arising from incorrect data input by the user (e.g., underestimating water sachets or safety pins).</p>
        </section>

        <div className="mt-20 p-10 bg-neutral-50 dark:bg-white/5 rounded-[3rem] border border-dashed dark:border-slate-800">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">NDA Acknowledgement</h4>
          <p className="text-xs font-bold leading-relaxed text-neutral-500 uppercase italic">
            Registration on RUN SPEND constitutes a formal agreement to the Non-Disclosure Agreement. Any breach of these terms may result in immediate account termination and potential legal action to protect proprietary pricing data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;