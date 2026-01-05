import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Phone, Calendar, User, Briefcase, Info, Fingerprint, ArrowRight, CheckCircle2, MapPin, Users } from 'lucide-react';
import { UserRegistration } from '../types';

interface RegistrationModalProps {
  onClose: () => void;
  onSubmit: (data: UserRegistration) => void;
}

type AuthMode = 'initial' | 'register' | 'signing' | 'success';

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onClose, onSubmit }) => {
  const [mode, setMode] = useState<AuthMode>('initial');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<UserRegistration>({
    clubName: '',
    eventName: '',
    eventLocation: '',
    estParticipants: '',
    eventDate: '',
    eventTime: '',
    title: 'Mr.',
    designation: 'Race Director',
    fullName: '',
    email: '',
    cellNumber: '',
    altContact: '',
    signedNDA: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const simulatePasskey = async (action: 'create' | 'get') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    return true;
  };

  const handleInitialPasskey = async () => {
    const hasAccount = localStorage.getItem('race_director_user');
    if (!hasAccount) {
      setMode('register');
      return;
    }

    const success = await simulatePasskey('get');
    if (success) {
      const userData = JSON.parse(hasAccount);
      onSubmit(userData);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signedNDA) {
      alert("Please sign the NDA to continue.");
      return;
    }

    setMode('signing');
    const success = await simulatePasskey('create');
    if (success) {
      setMode('success');
      setTimeout(() => {
        onSubmit(formData);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border dark:border-slate-800">
        
        {/* Header Branding - Updated to light background for black text */}
        <div className="bg-gray-50 dark:bg-slate-800 p-10 relative overflow-hidden border-b dark:border-slate-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                <Fingerprint className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-tight italic text-black underline underline-offset-4 decoration-orange-600/30">DIRECTOR ACCESS</h2>
            </div>
            <p className="text-gray-500 dark:text-slate-400 font-medium max-w-md">
              Secure, passwordless authentication for verified South African Race Directors.
            </p>
          </div>
        </div>

        <div className="p-10">
          {mode === 'initial' && (
            <div className="text-center space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">Welcome Back</h3>
                <p className="text-neutral-500 dark:text-slate-400 font-medium">Use your device passkey to instantly access your race budget.</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleInitialPasskey}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 py-5 bg-orange-600 text-white font-black text-lg rounded-2xl hover:bg-orange-700 transition transform active:scale-[0.98] shadow-xl shadow-orange-600/20 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Fingerprint size={24} />
                      <span>Sign In with Passkey</span>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => setMode('register')}
                  className="w-full py-4 text-neutral-500 dark:text-slate-400 font-bold hover:text-neutral-900 dark:hover:text-white transition"
                >
                  I'm a New Director — Register
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Organization & Event Specifics */}
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Event Details</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Club / Organization</label>
                        <input required name="clubName" value={formData.clubName} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="e.g. Phoenix Running Club" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Event Name</label>
                        <input required name="eventName" value={formData.eventName} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="e.g. City Marathon 2025" />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Event Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input required name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="Sandton, Johannesburg" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Est. Participants</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input required type="number" name="estParticipants" value={formData.estParticipants} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="5000" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Race Date</label>
                          <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-3 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-xs font-bold dark:text-white outline-none" />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Start Time</label>
                          <input required type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} className="w-full px-3 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-xs font-bold dark:text-white outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal */}
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Director Credentials</h4>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-24">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Title</label>
                          <select name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white">
                            <option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Full Name</label>
                          <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="John Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Designation</label>
                        <input required name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="Race Director" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Business Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="director@club.co.za" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">Cell Phone</label>
                        <input required name="cellNumber" value={formData.cellNumber} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" placeholder="+27 72..." />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-950/20 rounded-3xl border border-orange-100 dark:border-orange-900/30">
                  <h5 className="text-xs font-black text-orange-900 dark:text-orange-400 flex items-center mb-3">
                    <ShieldCheck className="mr-2" size={16} />
                    CONFIDENTIALITY & NDA
                  </h5>
                  <p className="text-[10px] text-orange-800/70 dark:text-orange-300/60 leading-relaxed mb-4 font-medium italic">
                    All pricing and formulas are proprietary. By proceeding, you agree to keep all quoted data confidential and not share it outside your event committee.
                  </p>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input 
                        type="checkbox" 
                        name="signedNDA"
                        checked={formData.signedNDA}
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
                      <div className="w-5 h-5 border-2 border-orange-200 dark:border-orange-900/50 rounded-md peer-checked:bg-orange-600 peer-checked:border-orange-600 transition-all flex items-center justify-center">
                        <CheckCircle2 className="text-white scale-0 peer-checked:scale-100 transition-transform" size={14} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-800 dark:text-slate-200 group-hover:text-orange-600 transition-colors">
                      I accept the NDA and verify my Director status.
                    </span>
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center space-x-3 py-5 bg-neutral-900 dark:bg-orange-600 text-white font-black text-lg rounded-2xl hover:bg-black dark:hover:bg-orange-700 transition transform active:scale-[0.98] shadow-2xl"
              >
                <span>Continue to Passkey Setup</span>
                <ArrowRight size={20} />
              </button>
            </form>
          )}

          {mode === 'signing' && (
            <div className="text-center py-12 space-y-8 animate-in zoom-in duration-500">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-orange-600 rounded-3xl animate-ping opacity-20"></div>
                <div className="relative bg-orange-600 text-white rounded-3xl w-24 h-24 flex items-center justify-center shadow-2xl shadow-orange-600/40">
                  <Fingerprint size={48} className="animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white italic">SECURING IDENTITY</h3>
                <p className="text-neutral-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Follow your device's prompts to create passkey</p>
              </div>
            </div>
          )}

          {mode === 'success' && (
            <div className="text-center py-12 space-y-6 animate-in zoom-in duration-500">
              <div className="mx-auto bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl shadow-green-500/30">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white italic tracking-tight">IDENTITY VERIFIED</h3>
                <p className="text-neutral-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Unlocking Calculator Suite...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;