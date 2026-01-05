
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold mb-4 gradient-logo">Get in Touch</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto font-medium">
              Have questions about race supplies or need custom logistics advice? 
              Our team of experts is ready to help you plan your next major event.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Email Us</h3>
                    <p className="text-sm text-neutral-500">For quotes & support</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-neutral-800">jivandinesh@gmail.com</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">WhatsApp</h3>
                    <p className="text-sm text-neutral-500">Instant notifications</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-neutral-800">+27 78 078 3112</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Location</h3>
                    <p className="text-sm text-neutral-500">Service Area</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-neutral-800">South Africa - Nationwide Delivery</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-neutral-700 block mb-2">Your Name</label>
                    <input required className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-neutral-700 block mb-2">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-700 block mb-2">Subject</label>
                  <input required className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="Race Budget Inquiry" />
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-700 block mb-2">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="Tell us about your event..."></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={sent}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition ${sent ? 'bg-green-600 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
                >
                  {sent ? (
                    <>
                      <span>Message Sent! We will contact you soon.</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
