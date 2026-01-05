import React, { useState, useMemo } from 'react';
import { Download, Send, Award, MapPin, Users, X, Trash2, Eye, ChevronRight, CheckCircle2, Mail, LogOut, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CALCULATORS } from '../constants';
import { UserRegistration, QuoteItem } from '../types';
import CalculatorCard from './CalculatorCard';

interface CalculatorPageProps {
  user: UserRegistration;
  addToQuote: (item: QuoteItem) => void;
  removeFromQuote: (calculatorId: string) => void;
  clearCart: () => void;
  logQuoteInDatabase: () => void;
  quoteItems: QuoteItem[];
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ user, addToQuote, removeFromQuote, clearCart, logQuoteInDatabase, quoteItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const navigate = useNavigate();
  
  const categories = ['All', ...Array.from(new Set(CALCULATORS.map(c => c.category)))];

  const filteredCalculators = useMemo(() => {
    if (activeCategory === 'All') return CALCULATORS;
    return CALCULATORS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const generateDetailedMessage = (type: 'WHATSAPP' | 'EMAIL') => {
    let msg = `OFFICIAL QUOTE REQUEST - ${user.eventName.toUpperCase()}\n`;
    msg += `------------------------------------------\n`;
    msg += `DIRECTOR INFORMATION\n`;
    msg += `Name: ${user.title} ${user.fullName}\n`;
    msg += `Designation: ${user.designation}\n`;
    msg += `Organization: ${user.clubName}\n`;
    msg += `Email: ${user.email}\n`;
    msg += `Cell: ${user.cellNumber}\n`;
    if (user.altContact) msg += `Alt Contact: ${user.altContact}\n`;
    msg += `\nEVENT DETAILS\n`;
    msg += `Event: ${user.eventName}\n`;
    msg += `Location: ${user.eventLocation}\n`;
    msg += `Date: ${user.eventDate} @ ${user.eventTime}\n`;
    msg += `Estimated Athletes: ${user.estParticipants}\n`;
    msg += `\nINVENTORY REQUESTED (${quoteItems.length} Items)\n`;
    msg += `------------------------------------------\n`;
    
    quoteItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name}\n`;
      msg += `   Quantity: ${item.quantity} Units\n`;
      msg += `   Specs: ${item.details}\n\n`;
    });

    msg += `------------------------------------------\n`;
    msg += `This request has been logged in the RUNSPEND Admin Hub.`;
    return msg;
  };

  const finalizeProcess = () => {
    logQuoteInDatabase();
    setIsFinalized(true);
    // Note: We don't clearCart() here yet, so they can see the confirmation in the modal.
    // We clear it when they click the logout or new quote buttons.
  };

  const handleSendQuoteWhatsApp = () => {
    const msg = generateDetailedMessage('WHATSAPP');
    const whatsappUrl = `https://wa.me/27780783112?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    finalizeProcess();
  };

  const handleSendQuoteEmail = () => {
    const subject = `OFFICIAL QUOTE REQUEST: ${user.eventName} - ${user.fullName}`;
    const body = generateDetailedMessage('EMAIL');

    const mailtoUrl = `mailto:jivandinesh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    finalizeProcess();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF() as any;
    const pageWidth = doc.internal.pageSize.getWidth();
    const today = new Date().toLocaleString();

    // Header Background
    doc.setFillColor(23, 23, 23);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL RACE BUDGET QUOTE', 15, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`LOGGED AT: ${today}`, 15, 30);
    doc.text('RUNSPEND - PRODUCTION-GRADE QA', pageWidth - 15, 30, { align: 'right' });

    // Director Details
    doc.setTextColor(23, 23, 23);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DIRECTOR & EVENT PORTFOLIO', 15, 60);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${user.title} ${user.fullName} - ${user.designation}`, 15, 68);
    doc.text(`Organization: ${user.clubName}`, 15, 74);
    doc.text(`Event: ${user.eventName} (${user.eventDate} @ ${user.eventTime})`, 15, 80);
    doc.text(`Location: ${user.eventLocation}`, 15, 86);
    doc.text(`Est. Participants: ${user.estParticipants}`, 15, 92);

    // Inventory Table
    const tableData = quoteItems.map(item => [
      item.name.toUpperCase(),
      item.details.split(' | ')[0], // Base description
      item.quantity.toLocaleString()
    ]);

    doc.autoTable({
      startY: 105,
      head: [['ITEM', 'SPECIFICATIONS & FORMULAS', 'QTY']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [64, 224, 208], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, cellPadding: 4 },
      columnStyles: { 
        0: { fontStyle: 'bold', width: 45 }, 
        2: { halign: 'right', fontStyle: 'bold', width: 25 } 
      }
    });

    let currentY = (doc as any).lastAutoTable.finalY + 15;

    // BRANDING & ARTWORK SECTION
    const brandingItems = quoteItems.filter(item => 
      item.details.includes('Artwork:') || item.details.includes('Type Colour:')
    );

    if (brandingItems.length > 0) {
      if (currentY > 250) { doc.addPage(); currentY = 20; }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(249, 115, 22); // Orange theme
      doc.text('ARTWORK & CUSTOMIZATION SPECIFICATIONS', 15, currentY);
      
      currentY += 10;
      doc.setFontSize(9);
      doc.setTextColor(23, 23, 23);

      brandingItems.forEach((item) => {
        const parts = item.details.split(' | ');
        const artworkPart = parts.find(p => p.includes('Artwork:')) || 'No Info';
        const colorPart = parts.find(p => p.includes('Type Colour:')) || '';

        doc.setFont('helvetica', 'bold');
        doc.text(item.name, 15, currentY);
        
        doc.setFont('helvetica', 'normal');
        doc.text(`Status: ${artworkPart}`, 60, currentY);
        
        if (colorPart) {
          currentY += 5;
          doc.setFont('helvetica', 'bold');
          doc.text(`Print Scheme: ${colorPart.replace('Type Colour: ', '')}`, 60, currentY);
        }

        if (item.artwork) {
          currentY += 5;
          doc.setTextColor(64, 224, 208);
          doc.setFont('helvetica', 'bolditalic');
          doc.text('[Digital Master Artwork Attached to Profile]', 60, currentY);
          doc.setTextColor(23, 23, 23);
        }

        currentY += 10;
        if (currentY > 275) { doc.addPage(); currentY = 20; }
      });
    }

    // Footer
    const finalY = currentY + 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('This quote is proprietary and confidential under signed NDA. Logged in Admin Hub.', 15, Math.min(finalY, 285));

    doc.save(`Quote_${user.eventName.replace(/\s+/g, '_')}.pdf`);
    finalizeProcess();
    setShowReviewModal(true); 
  };

  const handleLogoutAndHome = () => {
    localStorage.removeItem('race_director_user');
    localStorage.removeItem('race_quote_cart');
    window.location.href = '/'; 
  };

  const handleStartNewQuote = () => {
    clearCart();
    setIsFinalized(false);
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-40">
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 py-6 sticky z-40" style={{ top: '20mm' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#40e0d0] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Award size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight uppercase leading-tight italic">RUNSPEND DASHBOARD</h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-neutral-400 uppercase font-bold tracking-widest italic mt-0.5">
                <span>{user.eventName}</span>
                <span className="text-neutral-300">•</span>
                <span>{user.clubName}</span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center text-[#40e0d0]"><MapPin size={10} className="mr-0.5" />{user.eventLocation}</span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center"><Users size={10} className="mr-0.5" />{user.estParticipants} Athletes</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#40e0d0] border-[#40e0d0] text-white shadow-md shadow-[#40e0d0]/20' 
                    : 'bg-white dark:bg-slate-800 text-neutral-500 dark:text-slate-400 border-neutral-100 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCalculators.map((calc) => (
            <CalculatorCard 
              key={calc.id} 
              config={calc} 
              onAdd={addToQuote} 
              isAdded={quoteItems.some(q => q.calculatorId === calc.id)}
            />
          ))}
        </div>
      </div>

      {quoteItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t dark:border-slate-800 shadow-2xl z-50 p-4 animate-in slide-in-from-bottom-full duration-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-3">
                {quoteItems.slice(0, 8).map((q, i) => (
                  <div key={q.calculatorId} className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 bg-[#40e0d0] flex items-center justify-center text-[8px] font-black text-white shadow-xl rotate-3 hover:rotate-0 transition-transform">
                    {q.name.charAt(0)}
                  </div>
                ))}
              </div>
              <div>
                <span className="block text-lg font-black text-neutral-900 dark:text-white leading-none uppercase tracking-tighter">{quoteItems.length} Products Verified</span>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Ready for Official Quote Request</span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => { setShowReviewModal(true); setIsFinalized(false); }}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 bg-neutral-100 dark:bg-slate-800 text-neutral-900 dark:text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-neutral-200 dark:hover:bg-slate-700 transition"
              >
                <Eye size={16} />
                <span>Review Cart</span>
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 bg-[#40e0d0] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#40e0d0]/20 transition transform active:scale-95"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review & Send Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl" onClick={() => setShowReviewModal(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-10 border-b dark:border-slate-800 bg-neutral-50 dark:bg-slate-800/50 flex justify-between items-center relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#40e0d0]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-black italic dark:text-white uppercase tracking-tighter">
                   {isFinalized ? 'Action Complete' : 'Quote Review'}
                 </h3>
                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
                   {isFinalized ? 'Your request has been processed successfully' : 'Verified Inventory Summary'}
                 </p>
               </div>
               <button onClick={() => setShowReviewModal(false)} className="relative z-10 p-3 bg-white dark:bg-slate-800 shadow-sm rounded-2xl hover:bg-neutral-100 dark:hover:bg-slate-700 transition">
                 <X size={20} className="dark:text-white" />
               </button>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar flex-grow">
               {isFinalized ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-in fade-in zoom-in">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/20">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black dark:text-white italic uppercase">Success!</h4>
                      <p className="text-neutral-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                        Quote details sent to Admin. You can now securely logout or return to the calculator.
                      </p>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-4">
                    {quoteItems.map((item) => (
                      <div key={item.calculatorId} className="p-6 bg-neutral-50 dark:bg-white/5 rounded-[2rem] border dark:border-slate-800 flex justify-between items-center group hover:border-orange-500/50 transition-colors">
                        <div className="max-w-[70%]">
                           <div className="flex items-center space-x-2">
                             <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-950/40 text-orange-600 rounded text-[8px] font-black uppercase">Verified</span>
                             <p className="font-black text-xs uppercase dark:text-white">{item.name}</p>
                           </div>
                           <p className="text-[10px] text-neutral-500 font-bold leading-tight mt-2 italic line-clamp-2">{item.details}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-xl font-black text-neutral-900 dark:text-white leading-none">{item.quantity.toLocaleString()}</p>
                          {!isFinalized && (
                            <button 
                              onClick={() => removeFromQuote(item.calculatorId)}
                              className="mt-2 text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 flex items-center"
                            >
                              <Trash2 size={10} className="mr-1" /> Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="p-10 border-t dark:border-slate-800 bg-white dark:bg-slate-900">
               {isFinalized ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleLogoutAndHome}
                      className="flex items-center justify-center space-x-3 py-5 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-600/20"
                    >
                      <LogOut size={18} />
                      <span>Logout & Exit</span>
                    </button>
                    <button 
                      onClick={handleStartNewQuote}
                      className="flex items-center justify-center space-x-3 py-5 bg-neutral-900 dark:bg-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition shadow-lg"
                    >
                      <RefreshCcw size={18} />
                      <span>Start New Quote</span>
                    </button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleSendQuoteWhatsApp}
                      className="flex items-center justify-center space-x-3 py-5 bg-[#25D366] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:brightness-110 transition shadow-lg shadow-[#25D366]/20"
                    >
                      <Send size={18} />
                      <span>WhatsApp Quote</span>
                    </button>
                    <button 
                      onClick={handleSendQuoteEmail}
                      className="flex items-center justify-center space-x-3 py-5 bg-neutral-900 dark:bg-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition shadow-lg"
                    >
                      <Mail size={18} />
                      <span>Email Quote</span>
                    </button>
                 </div>
               )}
               <p className="text-[9px] text-neutral-400 font-bold text-center mt-6 uppercase tracking-widest">
                 {isFinalized ? 'Session data is protected by secure passkey encryption' : 'All logs are verified and stored in the Admin Hub'}
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;