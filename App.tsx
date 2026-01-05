import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Fingerprint, Lock, CheckCircle2, Database, ShieldAlert, Download, Search, Trash2, FileUp, X, MapPin, Users, Award, Target, ShieldCheck, BarChart3, ChevronRight, Clock } from 'lucide-react';
import { UserRegistration, QuoteItem, QuoteRecord } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CalculatorPage from './components/CalculatorPage';
import RegistrationModal from './components/RegistrationModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';

interface Toast {
  id: string;
  message: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserRegistration | null>(() => {
    const saved = localStorage.getItem('race_director_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem('race_quote_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('race_theme') === 'dark';
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // CRM / Database States
  const [directors, setDirectors] = useState<UserRegistration[]>(() => {
    const saved = localStorage.getItem('crm_directors');
    return saved ? JSON.parse(saved) : [];
  });
  const [quoteHistory, setQuoteHistory] = useState<QuoteRecord[]>(() => {
    const saved = localStorage.getItem('crm_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('race_director_user', JSON.stringify(user));
      setDirectors(prev => {
        if (!prev.find(d => d.email === user.email)) {
          const updated = [...prev, { ...user, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() }];
          localStorage.setItem('crm_directors', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('race_quote_cart', JSON.stringify(quoteItems));
  }, [quoteItems]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('race_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('race_theme', 'light');
    }
  }, [darkMode]);

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAuthComplete = (data: UserRegistration) => {
    setUser(data);
    setShowAuthModal(false);
    addToast("Identity Verified & Profile Synced");
  };

  const addToQuote = useCallback((item: QuoteItem) => {
    setQuoteItems(prev => {
      const existingIdx = prev.findIndex(q => q.calculatorId === item.calculatorId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = item;
        addToast(`Updated ${item.name}`);
        return updated;
      }
      addToast(`Added ${item.name}`);
      return [...prev, item];
    });
  }, []);

  const removeFromQuote = useCallback((calculatorId: string) => {
    setQuoteItems(prev => prev.filter(item => item.calculatorId !== calculatorId));
    addToast("Item removed from cart");
  }, []);

  const logQuoteInDatabase = useCallback(() => {
    if (!user || quoteItems.length === 0) return;
    
    const newRecord: QuoteRecord = {
      id: `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user.email,
      userName: user.fullName,
      eventName: user.eventName,
      items: [...quoteItems],
      timestamp: Date.now(),
      userDetails: { ...user }
    };

    setQuoteHistory(prev => {
      const updated = [newRecord, ...prev];
      localStorage.setItem('crm_quotes', JSON.stringify(updated));
      return updated;
    });
    
    addToast("Quote stored in Admin Hub");
  }, [user, quoteItems]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors relative">
        <Header 
          user={user} 
          quoteCount={quoteItems.length} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onOpenAuth={() => setShowAuthModal(true)}
        />
        
        <div className="fixed top-[22mm] right-4 z-[200] flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-right-full duration-300 pointer-events-auto border border-white/10"
            >
              <CheckCircle2 className="text-[#40e0d0]" size={20} />
              <span className="font-bold text-sm tracking-tight">{toast.message}</span>
            </div>
          ))}
        </div>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero onStart={() => !user ? setShowAuthModal(true) : null} />} />
            <Route 
              path="/calculator" 
              element={
                user ? (
                  <CalculatorPage 
                    addToQuote={addToQuote} 
                    removeFromQuote={removeFromQuote}
                    logQuoteInDatabase={logQuoteInDatabase}
                    quoteItems={quoteItems} 
                    user={user}
                  />
                ) : (
                  <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
                      <div className="relative w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl flex items-center justify-center border dark:border-slate-700">
                        <Lock className="w-10 h-10 text-orange-600" />
                      </div>
                    </div>
                    
                    <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight italic uppercase">Security Check Required</h2>
                    <p className="text-gray-500 dark:text-slate-400 mb-10 max-w-sm font-medium leading-relaxed uppercase tracking-widest text-[10px]">
                      Verification required for South African Race Directors to access the proprietary budgeting suite.
                    </p>
                    
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="flex items-center space-x-3 px-10 py-5 bg-orange-600 text-white font-black text-xl rounded-2xl hover:bg-orange-700 transition transform active:scale-95 shadow-xl shadow-orange-600/20"
                    >
                      <Fingerprint size={28} />
                      <span>Verify Identity</span>
                    </button>
                  </div>
                )
              } 
            />
            <Route 
              path="/database-studio" 
              element={
                isAdminAuthenticated ? (
                  <DatabaseStudio 
                    directors={directors} 
                    quotes={quoteHistory} 
                    onLogout={() => setIsAdminAuthenticated(false)} 
                    onUpdateData={(newDirectors, newQuotes) => {
                      setDirectors(newDirectors);
                      setQuoteHistory(newQuotes);
                      localStorage.setItem('crm_directors', JSON.stringify(newDirectors));
                      localStorage.setItem('crm_quotes', JSON.stringify(newQuotes));
                    }}
                  />
                ) : (
                  <AdminGatekeeper onAuthenticated={() => {
                    setIsAdminAuthenticated(true);
                    addToast("Admin Privileges Granted");
                  }} />
                )
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>

        <Footer />

        {showAuthModal && (
          <RegistrationModal 
            onClose={() => setShowAuthModal(false)} 
            onSubmit={handleAuthComplete} 
          />
        )}
      </div>
    </Router>
  );
};

const AdminGatekeeper: React.FC<{onAuthenticated: () => void}> = ({onAuthenticated}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const MASTER_PIN = '2025';

  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
      setError(false);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      setLoading(true);
      setTimeout(() => {
        if (pin === MASTER_PIN) onAuthenticated();
        else { setError(true); setPin(''); setLoading(false); }
      }, 600);
    }
  }, [pin, onAuthenticated]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className={`relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl ${error ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mb-6"><ShieldAlert className="text-white" size={40} /></div>
          <h2 className="text-3xl font-black text-white italic uppercase">Private Access</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Administrative PIN Required</p>
        </div>
        <div className="flex justify-center gap-4 mb-10">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${pin.length > i ? 'bg-orange-500 border-orange-500 scale-125' : 'border-slate-700'}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(key => (
            <button key={key} disabled={loading} onClick={() => key === 'C' ? setPin('') : key === '⌫' ? setPin(p => p.slice(0, -1)) : handleDigitClick(key)} className="h-16 rounded-2xl flex items-center justify-center text-xl font-black bg-slate-800 text-white active:scale-90">{key}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DatabaseStudio: React.FC<{
  directors: UserRegistration[], 
  quotes: QuoteRecord[], 
  onLogout: () => void,
  onUpdateData: (directors: UserRegistration[], quotes: QuoteRecord[]) => void
}> = ({directors, quotes, onLogout, onUpdateData}) => {
  const [activeTab, setActiveTab] = useState<'directors' | 'quotes' | 'assets'>('quotes');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [adminAssets, setAdminAssets] = useState<{id: string, name: string, data: string}[]>(() => {
    const saved = localStorage.getItem('admin_artwork_assets');
    return saved ? JSON.parse(saved) : [];
  });

  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('admin_artwork_assets', JSON.stringify(adminAssets));
  }, [adminAssets]);

  const handleExportDatabase = () => {
    const payload = {
      directors,
      quotes,
      assets: adminAssets,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RUNSPEND_DATABASE_BACKUP_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.directors && data.quotes) {
          onUpdateData(data.directors, data.quotes);
          if (data.assets) setAdminAssets(data.assets);
          alert("Database Synced Successfully!");
        } else {
          alert("Invalid Database File Format.");
        }
      } catch (err) {
        alert("Failed to parse database file.");
      }
    };
    reader.readAsText(file);
  };

  const filteredQuotes = quotes.filter(q => q.userName.toLowerCase().includes(searchQuery.toLowerCase()) || q.eventName.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredDirectors = directors.filter(d => d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || d.clubName.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString('en-ZA', { 
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm("Permanently delete this quote record?")) {
      const updated = quotes.filter(q => q.id !== id);
      onUpdateData(directors, updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neutral-900 rounded-2xl"><Database className="text-[#40e0d0]" size={32} /></div>
            <div>
              <h1 className="text-4xl font-black dark:text-white italic tracking-tight uppercase">Admin Hub</h1>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Central Logistics & Quote CRM</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExportDatabase} className="flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition shadow-lg"><Download size={16} /><span>Export DB</span></button>
            <button onClick={() => importInputRef.current?.click()} className="flex items-center space-x-2 px-6 py-3 bg-[#40e0d0] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition shadow-lg"><FileUp size={16} /><span>Import DB</span></button>
            <input type="file" ref={importInputRef} className="hidden" accept=".json" onChange={handleImportDatabase} />
            <button onClick={onLogout} className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-2xl hover:text-red-500 transition-colors"><Lock size={20} /></button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex space-x-2 p-1 bg-neutral-200/50 dark:bg-slate-800 rounded-2xl">
            {(['quotes', 'directors', 'assets'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-900 text-neutral-900 dark:text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-700'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input type="text" placeholder="Search database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl text-xs font-bold outline-none dark:text-white" />
          </div>
        </div>

        {activeTab === 'quotes' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 dark:bg-slate-800/50 border-b dark:border-slate-700">
                <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  <th className="px-6 py-5">Ref ID</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Director</th>
                  <th className="px-6 py-5">Items</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800">
                {filteredQuotes.map(q => (
                  <tr key={q.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 font-mono text-xs font-black text-neutral-900 dark:text-white">{q.id}</td>
                    <td className="px-6 py-5 text-[11px] font-black text-neutral-600 dark:text-slate-400">{formatDate(q.timestamp)}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-black text-xs uppercase dark:text-white">{q.userName}</span>
                        <span className="text-[9px] text-orange-600 font-bold uppercase">{q.eventName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg text-[10px] font-black">{q.items.length}</span></td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button onClick={() => setSelectedQuote(q)} className="p-2.5 bg-neutral-100 dark:bg-slate-800 rounded-xl hover:bg-[#40e0d0] hover:text-white transition shadow-sm"><Search size={16} /></button>
                      <button onClick={() => handleDeleteQuote(q.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'directors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDirectors.map(d => (
              <div key={d.email} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border dark:border-slate-800 shadow-xl group hover:border-[#40e0d0] transition-colors">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-neutral-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-[#40e0d0] group-hover:text-white transition-colors">{d.fullName.charAt(0)}</div>
                  <div>
                    <h4 className="font-black text-sm uppercase dark:text-white">{d.fullName}</h4>
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{d.designation}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t dark:border-slate-800">
                  <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-neutral-400">Organization</span><span className="dark:text-white">{d.clubName}</span></div>
                  <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-neutral-400">Email</span><span className="dark:text-white">{d.email}</span></div>
                  <div className="flex justify-between text-[10px] font-black uppercase"><span className="text-neutral-400">Cell</span><span className="dark:text-white">{d.cellNumber}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
             <label className="aspect-square bg-dashed border-2 border-dashed border-neutral-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-[#40e0d0] transition-colors">
               <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                 const file = e.target.files?.[0];
                 if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAdminAssets(prev => [{id: Math.random().toString(), name: file.name, data: reader.result as string}, ...prev]);
                    };
                    reader.readAsDataURL(file);
                 }
               }} />
               <FileUp className="text-neutral-400 mb-2" />
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">New Asset</span>
             </label>
             {adminAssets.map(asset => (
               <div key={asset.id} className="relative aspect-square rounded-3xl overflow-hidden group shadow-lg">
                 <img src={asset.data} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <p className="text-white text-[8px] font-black uppercase mb-4 text-center line-clamp-2">{asset.name}</p>
                    <button onClick={() => setAdminAssets(prev => prev.filter(a => a.id !== asset.id))} className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600"><Trash2 size={12} /></button>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl" onClick={() => setSelectedQuote(null)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border dark:border-slate-800">
             <div className="p-10 bg-neutral-950 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Quote Review</h3>
                  <p className="text-[10px] font-black text-[#40e0d0] uppercase tracking-widest mt-1">{selectedQuote.id} — {formatDate(selectedQuote.timestamp)}</p>
                </div>
                <button onClick={() => setSelectedQuote(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition"><X size={20} /></button>
             </div>
             <div className="p-10 overflow-y-auto">
                <div className="mb-10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] mb-4">Director Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border dark:border-slate-800"><p className="text-[8px] text-neutral-400 font-bold uppercase mb-1">Director</p><p className="text-xs font-black dark:text-white uppercase">{selectedQuote.userName}</p></div>
                    <div className="p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border dark:border-slate-800"><p className="text-[8px] text-neutral-400 font-bold uppercase mb-1">Organization</p><p className="text-xs font-black dark:text-white uppercase">{selectedQuote.userDetails.clubName}</p></div>
                  </div>
                </div>
                <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] mb-4">Inventory Breakdown</h4>
                <div className="space-y-4">
                  {selectedQuote.items.map((item, idx) => (
                    <div key={idx} className="p-6 bg-neutral-50 dark:bg-white/5 rounded-2xl border dark:border-slate-800 flex justify-between items-center">
                       <div><p className="font-black text-xs uppercase dark:text-white">{item.name}</p><p className="text-[10px] text-neutral-500 mt-1 italic">{item.details}</p></div>
                       <p className="text-lg font-black dark:text-white">{item.quantity.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-24 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-orange-100 dark:bg-orange-900/30 rounded-3xl mb-6">
            <Target className="text-orange-600 dark:text-orange-400" size={48} />
          </div>
          <h1 className="text-5xl font-black text-neutral-900 dark:text-white italic tracking-tighter uppercase mb-6">The RUNSPEND Mission</h1>
          <p className="text-xl text-neutral-500 dark:text-slate-400 font-medium leading-relaxed">
            Revolutionizing race logistics in South Africa through precision formulas and transparent budgeting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           <div className="p-10 bg-neutral-50 dark:bg-slate-800 rounded-[2.5rem] border dark:border-slate-700 hover:border-[#40e0d0]/50 transition-colors">
             <ShieldCheck className="text-[#40e0d0] mb-6" size={32} />
             <h3 className="text-2xl font-black mb-4 dark:text-white italic uppercase">Director Approved</h3>
             <p className="text-neutral-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
               Built specifically for Running. Our formulas account for local conditions, heat, and high-altitude hydration needs.
             </p>
           </div>
           <div className="p-10 bg-neutral-50 dark:bg-slate-800 rounded-[2.5rem] border dark:border-slate-700 hover:border-orange-500/50 transition-colors">
             <BarChart3 className="text-orange-600 mb-6" size={32} />
             <h3 className="text-2xl font-black mb-4 dark:text-white italic uppercase">Precision Planning</h3>
             <p className="text-neutral-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
               Stop guessing how much water or how many pins you need. Our algorithmic approach ensures you're never under-prepared on race morning.
             </p>
           </div>
           <div className="p-10 bg-neutral-50 dark:bg-slate-800 rounded-[2.5rem] border dark:border-slate-700 hover:border-purple-500/50 transition-colors">
             <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                <Clock className="text-purple-600 dark:text-purple-400" size={24} />
             </div>
             <h3 className="text-2xl font-black mb-4 dark:text-white italic uppercase">SAVE</h3>
             <p className="text-neutral-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
               Saving Directors time, money, supplier verification and communication. Centralized hub for high-performance race production.
             </p>
           </div>
        </div>

        <div className="bg-neutral-900 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <h2 className="text-3xl font-black text-white italic uppercase mb-6 relative z-10">Ready to plan your next race?</h2>
          <Link to="/calculator" className="inline-flex items-center space-x-3 px-12 py-5 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-orange-600/20 relative z-10 uppercase tracking-widest">
            <span>Start Calculator</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;