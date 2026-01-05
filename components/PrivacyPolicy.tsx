import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4">
      <h1 className="text-5xl font-black mb-8 text-neutral-900 dark:text-white italic tracking-tight uppercase">Privacy Policy</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-slate-400">
        <p className="font-black text-orange-600 uppercase tracking-widest text-sm">Effective Date: January 4, 2026</p>
        
        <p className="text-xl font-medium leading-relaxed bg-neutral-100 dark:bg-white/5 p-8 rounded-[2rem] border dark:border-slate-800">
          RUN SPEND respects your privacy. We collect your name, email, and club details solely to generate accurate race quotes. We do not sell data. Your IP address is recorded to prevent unauthorized access to our proprietary pricing engine.
        </p>

        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase italic">Introduction</h2>
          <p>RUN SPEND ("we," "our," or "us") is committed to protecting the privacy of race organizers and directors. This policy outlines how we handle the information provided during the quote generation process.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase italic">Data Collection</h2>
          <p>We collect information necessary to provide professional race budgeting services, including:</p>
          <ul className="list-disc pl-6 space-y-3 font-medium">
            <li><span className="font-black text-neutral-900 dark:text-white">Identity Data:</span> Full name, designation, and running club affiliation.</li>
            <li><span className="font-black text-neutral-900 dark:text-white">Contact Data:</span> Email address and mobile numbers.</li>
            <li><span className="font-black text-neutral-900 dark:text-white">Event Data:</span> Event name, date, time, and specific equipment requirements.</li>
            <li><span className="font-black text-neutral-900 dark:text-white">Technical Data:</span> IP addresses and session data to prevent unauthorized access to our pricing engine.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase italic">How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-3 font-medium">
            <li>To generate and deliver professional PDF quotations.</li>
            <li>To verify the identity of the Race Director as per our security protocol.</li>
            <li>To notify our administrative team via WhatsApp and Email for quote fulfillment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase italic">Data Security</h2>
          <p>All data is stored on secure cloud infrastructure. We implement IP tracking and passkey methods to ensure that confidential pricing is only accessible to verified users.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4 uppercase italic">Third-Party Disclosure</h2>
          <p>We do not sell or trade your personal information. Data is shared only with our internal administration (jivandinesh@gmail.com) and the Twilio/Nodemailer APIs for the sole purpose of sending your requested quote.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;