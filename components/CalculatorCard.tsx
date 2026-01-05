import React, { useState, useRef, useMemo } from 'react';
import { Plus, Check, Camera, Palette, Maximize, Smartphone, Facebook, Twitter, Instagram, Search, Truck, Droplets, Award, X, Trash2, UploadCloud, Ruler, RefreshCcw, Image as ImageIcon } from 'lucide-react';
import { CalculatorItem, QuoteItem } from '../types';

interface CalculatorCardProps {
  config: CalculatorItem;
  onAdd: (item: QuoteItem) => void;
  isAdded: boolean;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ config, onAdd, isAdded }) => {
  const [val, setVal] = useState(config.defaultVal);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const productImgKey = `custom_img_${config.id}`;
  const [customImage, setCustomImage] = useState<string | null>(() => {
    return localStorage.getItem(productImgKey);
  });

  const [artworkOption, setArtworkOption] = useState<'attached' | 'design' | null>(null);
  const [userArtworkFile, setUserArtworkFile] = useState<string | null>(null);
  const [defaultTypeColour, setDefaultTypeColour] = useState(true);

  // Custom Race Number dimensions
  const [customWidth, setCustomWidth] = useState('210');
  const [customHeight, setCustomHeight] = useState('148');

  const [marketingChannels, setMarketingChannels] = useState<{ id: string; name: string; icon: any; checked: boolean }[]>([
    { id: 'fb', name: 'Facebook', icon: Facebook, checked: false },
    { id: 'x', name: 'X (Twitter)', icon: Twitter, checked: false },
    { id: 'insta', name: 'Instagram', icon: Instagram, checked: false },
    { id: 'google', name: 'Google Search', icon: Search, checked: false },
  ]);

  const [logisticsScope, setLogisticsScope] = useState<'EVENT ONLY' | 'EVENT AND WATER POINTS'>('EVENT ONLY');
  const [waterPointsCount, setWaterPointsCount] = useState(5);

  // Local state for complex calculations (Medals)
  const [medalSize, setMedalSize] = useState<'50mm' | '60mm' | '70mm'>('50mm');
  const [goldCount, setGoldCount] = useState(0);
  const [silverCount, setSilverCount] = useState(0);
  const [bronzeCount, setBronzeCount] = useState(config.defaultVal);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);

  // Hydration Engine State - Manual runner input enabled
  const [runners, setRunners] = useState(1000);
  const [perRunner, setPerRunner] = useState(2); 
  
  const getDefaultStations = () => {
    if (config.id.includes('5k')) return 1;
    if (config.id.includes('10k')) return 3;
    if (config.id.includes('21k')) return 7;
    if (config.id.includes('42k')) return 14;
    return 5;
  };
  const [stations, setStations] = useState(getDefaultStations());
  
  const needsArtwork = [
    'crew-tshirts',
    'runner-tshirts',
    'running-gloves-logo',
    'running-caps-microfibre',
    'runners-tyvek-wristbands',
    'vip-tyvek-wristbands',
    'red-flags-marshal',
    'safety-bibs',
    'posters-eyelets',
    'race-numbers-5k',
    'race-numbers-10k',
    'race-numbers-21k',
    'race-numbers-42k',
    'race-numbers-custom'
  ].includes(config.id);

  const isRaceNumber = config.id.startsWith('race-numbers-');
  const isCustomRaceNumber = config.id === 'race-numbers-custom';
  const isDigitalMarketing = config.id === 'digital-marketing';
  const isLogisticsTrips = config.id === 'logistics-event-trips';
  const isHydration = config.id.startsWith('water-sachets');
  const isMedals = config.id === 'finisher-medals';

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomImage(base64);
        localStorage.setItem(productImgKey, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserArtworkFile(reader.result as string);
        setArtworkOption('attached');
      };
      reader.readAsDataURL(file);
    }
  };

  const hydrationTotal = useMemo(() => runners * perRunner * stations, [runners, perRunner, stations]);
  const medalsTotal = useMemo(() => Number(goldCount) + Number(silverCount) + Number(bronzeCount), [goldCount, silverCount, bronzeCount]);

  const handleAdd = () => {
    setIsAnimating(true);
    let details = config.description;
    let finalQty: number | string = val;

    if (isHydration) {
      finalQty = hydrationTotal;
      details = `Formula: ${runners} Runners x ${perRunner} sachets/point x ${stations} stations. 150ml sachets.`;
    } else if (isMedals) {
      finalQty = medalsTotal;
      details = `Size: ${medalSize} | Breakdown: Gold (${goldCount}), Silver (${silverCount}), Bronze (${bronzeCount})`;
    } else if (isDigitalMarketing) {
      const activeChannels = marketingChannels.filter(c => c.checked).map(c => c.name).join(', ');
      finalQty = marketingChannels.filter(c => c.checked).length;
      details = `Channels: ${activeChannels || 'None selected'}`;
    } else if (isLogisticsTrips) {
      finalQty = val;
      details = `Scope: ${logisticsScope} ${logisticsScope === 'EVENT AND WATER POINTS' ? `(${waterPointsCount} Points)` : ''}`;
    } else if (isCustomRaceNumber) {
      details = `Dimensions: ${customWidth}mm x ${customHeight}mm | ${config.description}`;
    }

    if (needsArtwork) {
      details += ` | Artwork: ${artworkOption === 'attached' ? 'Master Provided' : artworkOption === 'design' ? 'Design Requested' : 'None'}`;
      details += ` | Type Colour: ${defaultTypeColour ? 'Standard (Black/White)' : 'Custom Colour'}`;
    }

    onAdd({
      calculatorId: config.id,
      name: config.name,
      details,
      quantity: finalQty,
      artwork: userArtworkFile || undefined
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:border-orange-500/30 group h-full ${isAdded ? 'ring-2 ring-[#40e0d0]' : ''}`}>
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-slate-800">
        <img 
          src={customImage || config.visual} 
          alt={config.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
           <button 
             onClick={() => fileInputRef.current?.click()}
             className="w-full py-3 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition"
           >
             <Camera size={14} />
             <span>Custom Photo</span>
           </button>
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleProductImageUpload} />
        </div>
        {isAdded && (
          <div className="absolute top-4 right-4 bg-[#40e0d0] text-white p-2 rounded-full shadow-lg animate-in zoom-in">
            <Check size={20} />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-sm uppercase dark:text-white tracking-tight italic">{config.name}</h3>
          <span className="text-[10px] font-black text-[#40e0d0] uppercase tracking-widest">{config.category}</span>
        </div>
        <p className="text-[10px] text-neutral-500 font-bold mb-6 leading-relaxed line-clamp-2 uppercase italic">{config.description}</p>

        <div className="space-y-6 flex-grow">
          {/* Hydration Engine Block */}
          {isHydration && (
            <div className="space-y-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <Droplets size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Hydration Engine</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-neutral-400 uppercase">Runners (Typed)</label>
                  <input 
                    type="number" 
                    value={runners} 
                    onChange={(e) => setRunners(Math.max(0, parseInt(e.target.value) || 0))} 
                    className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black outline-none focus:ring-1 focus:ring-blue-400 dark:text-white" 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-neutral-400 uppercase">Sachets / Point</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    value={perRunner} 
                    onChange={(e) => setPerRunner(Math.max(0, parseFloat(e.target.value) || 0))} 
                    className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black outline-none focus:ring-1 focus:ring-blue-400 dark:text-white" 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-neutral-400 uppercase">Water Stations</label>
                  <input 
                    type="number" 
                    value={stations} 
                    onChange={(e) => setStations(Math.max(0, parseInt(e.target.value) || 0))} 
                    className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black outline-none focus:ring-1 focus:ring-blue-400 dark:text-white" 
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                <span className="text-[9px] font-black text-blue-800 dark:text-blue-400 uppercase">Total Count</span>
                <span className="text-sm font-black text-blue-600">{hydrationTotal.toLocaleString()} sachets</span>
              </div>
            </div>
          )}

          {/* Medals Tiering Block */}
          {isMedals && (
            <div className="space-y-4 p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center space-x-2 text-orange-600">
                    <Award size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Medal Tiers</span>
                 </div>
                 <select value={medalSize} onChange={(e) => setMedalSize(e.target.value as any)} className="bg-transparent text-[9px] font-black uppercase outline-none text-orange-600 cursor-pointer">
                   <option value="50mm">50mm</option>
                   <option value="60mm">60mm</option>
                   <option value="70mm">70mm</option>
                 </select>
               </div>
               <div className="grid grid-cols-3 gap-2">
                 <div>
                   <label className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Gold</label>
                   <input type="number" value={goldCount} onChange={(e) => setGoldCount(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black text-yellow-600 outline-none" />
                 </div>
                 <div>
                   <label className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Silver</label>
                   <input type="number" value={silverCount} onChange={(e) => setSilverCount(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black text-slate-400 outline-none" />
                 </div>
                 <div>
                   <label className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Bronze</label>
                   <input type="number" value={bronzeCount} onChange={(e) => setBronzeCount(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg text-xs font-black text-orange-700 outline-none" />
                 </div>
               </div>
               <div className="pt-2 border-t border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                 <span className="text-[9px] font-black text-orange-800 dark:text-orange-400 uppercase">Grand Total</span>
                 <span className="text-sm font-black text-orange-600">{medalsTotal.toLocaleString()}</span>
               </div>
            </div>
          )}

          {/* Digital Marketing Block */}
          {isDigitalMarketing && (
            <div className="grid grid-cols-2 gap-2">
              {marketingChannels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <button 
                    key={channel.id} 
                    onClick={() => setMarketingChannels(prev => prev.map((c, i) => i === idx ? { ...c, checked: !c.checked } : c))}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition ${channel.checked ? 'bg-[#40e0d0] border-[#40e0d0] text-white' : 'bg-neutral-50 dark:bg-slate-800 text-neutral-400 border-neutral-100 dark:border-slate-700'}`}
                  >
                    <Icon size={16} className="mb-1" />
                    <span className="text-[8px] font-black uppercase">{channel.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Logistics Trips Block */}
          {isLogisticsTrips && (
            <div className="space-y-4">
              <div className="flex p-1 bg-neutral-100 dark:bg-slate-800 rounded-xl">
                {(['EVENT ONLY', 'EVENT AND WATER POINTS'] as const).map(scope => (
                  <button 
                    key={scope} 
                    onClick={() => setLogisticsScope(scope)}
                    className={`flex-1 py-2 text-[8px] font-black uppercase tracking-tight rounded-lg transition ${logisticsScope === scope ? 'bg-white dark:bg-slate-700 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-400'}`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
              {logisticsScope === 'EVENT AND WATER POINTS' && (
                <div className="p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-neutral-400 uppercase">Number of Points</span>
                  <input type="number" value={waterPointsCount} onChange={(e) => setWaterPointsCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-xs font-black text-center" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span className="text-neutral-400">Total Trips</span>
                  <span className="dark:text-white">{val}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max={config.maxVal} 
                  value={val} 
                  onChange={(e) => setVal(parseInt(e.target.value))} 
                  className="w-full h-1.5 bg-neutral-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600" 
                />
              </div>
            </div>
          )}

          {/* Custom Race Number Block */}
          {isCustomRaceNumber && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30">
               <div>
                 <label className="text-[9px] font-black text-purple-600 uppercase block mb-1">Width (mm)</label>
                 <input type="text" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-900/40 rounded-lg text-xs font-black" />
               </div>
               <div>
                 <label className="text-[9px] font-black text-purple-600 uppercase block mb-1">Height (mm)</label>
                 <input type="text" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-900/40 rounded-lg text-xs font-black" />
               </div>
            </div>
          )}

          {/* Standard Slider for other items */}
          {!isHydration && !isMedals && !isDigitalMarketing && (
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-neutral-400">Set Quantity</span>
                <span className="dark:text-white">{val.toLocaleString()} {config.unit}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max={config.maxVal} 
                step="10"
                value={val} 
                onChange={(e) => setVal(parseInt(e.target.value))} 
                className="w-full h-1.5 bg-neutral-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#40e0d0]" 
              />
            </div>
          )}

          {/* Branding & Artwork Suite */}
          {needsArtwork && (
            <div className="space-y-4 pt-4 border-t dark:border-slate-800">
               <div className="flex items-center space-x-2 text-neutral-400">
                 <Palette size={14} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Artwork & Branding</span>
               </div>
               
               <div className="grid grid-cols-1 gap-2">
                 <button 
                   onClick={() => artworkInputRef.current?.click()}
                   className={`w-full py-3 px-4 rounded-xl border flex items-center space-x-3 transition ${artworkOption === 'attached' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-neutral-50 dark:bg-slate-800 border-neutral-100 dark:border-slate-700 text-neutral-500'}`}
                 >
                   <UploadCloud size={16} />
                   <div className="text-left">
                     <p className="text-[9px] font-black uppercase">Upload Artwork</p>
                     <p className="text-[8px] font-medium opacity-70 truncate max-w-[120px]">{userArtworkFile ? 'Master File Selected' : 'PDF, AI, or High-Res JPG'}</p>
                   </div>
                 </button>
                 <input type="file" ref={artworkInputRef} className="hidden" accept=".pdf,.ai,.eps,.jpg,.png" onChange={handleArtworkUpload} />

                 <button 
                   onClick={() => setArtworkOption(artworkOption === 'design' ? null : 'design')}
                   className={`w-full py-3 px-4 rounded-xl border flex items-center space-x-3 transition ${artworkOption === 'design' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-neutral-50 dark:bg-slate-800 border-neutral-100 dark:border-slate-700 text-neutral-500'}`}
                 >
                   <Palette size={16} />
                   <div className="text-left">
                     <p className="text-[9px] font-black uppercase">Request Design</p>
                     <p className="text-[8px] font-medium opacity-70">Our team creates the layout</p>
                   </div>
                 </button>
               </div>

               <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-white/5 rounded-xl border dark:border-slate-800">
                 <span className="text-[9px] font-black text-neutral-400 uppercase">Standard Type Colors</span>
                 <button 
                   onClick={() => setDefaultTypeColour(!defaultTypeColour)}
                   className={`w-10 h-5 rounded-full relative transition-colors ${defaultTypeColour ? 'bg-orange-600' : 'bg-neutral-300 dark:bg-slate-700'}`}
                 >
                   <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${defaultTypeColour ? 'left-6' : 'left-1'}`} />
                 </button>
               </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAdd}
          disabled={isAnimating}
          className={`mt-8 w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${
            isAnimating 
              ? 'bg-neutral-900 scale-95' 
              : isAdded 
                ? 'bg-[#40e0d0] text-white' 
                : 'bg-neutral-900 text-white hover:bg-black hover:-translate-y-1 shadow-xl'
          }`}
        >
          {isAnimating ? (
            <RefreshCcw className="animate-spin" size={18} />
          ) : isAdded ? (
            <>
              <Check size={18} />
              <span>Update Quote</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Add to Quote</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;