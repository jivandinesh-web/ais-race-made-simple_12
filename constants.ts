import { CalculatorItem, Distance } from './types';

// The permanent high-fidelity image for the 150ml water sachets
const WATER_SACHET_IMAGE = "https://i.ibb.co/v4zXN6Y7/aqua-sachet.png"; 

export const CALCULATORS: CalculatorItem[] = [
  // Hydration Category
  {
    id: 'water-sachets-5k',
    name: 'Water Sachets 5K',
    description: '150ml high-quality polyethylene water sachets for standard 5km distance.',
    visual: WATER_SACHET_IMAGE,
    type: 'complex',
    defaultVal: 1,
    maxVal: 50000,
    unit: 'Sachets',
    category: 'Hydration'
  },
  {
    id: 'water-sachets-10k',
    name: 'Water Sachets 10K',
    description: '150ml high-quality polyethylene water sachets for standard 10km distance.',
    visual: WATER_SACHET_IMAGE,
    type: 'complex',
    defaultVal: 1,
    maxVal: 50000,
    unit: 'Sachets',
    category: 'Hydration'
  },
  {
    id: 'water-sachets-21k',
    name: 'Water Sachets 21K',
    description: '150ml high-quality polyethylene water sachets for standard 21.1km distance.',
    visual: WATER_SACHET_IMAGE,
    type: 'complex',
    defaultVal: 1,
    maxVal: 100000,
    unit: 'Sachets',
    category: 'Hydration'
  },
  {
    id: 'water-sachets-42k',
    name: 'Water Sachets 42K',
    description: '150ml high-quality polyethylene water sachets for standard 42.2km distance.',
    visual: WATER_SACHET_IMAGE,
    type: 'complex',
    defaultVal: 1,
    maxVal: 200000,
    unit: 'Sachets',
    category: 'Hydration'
  },
  {
    id: 'water-sachets-custom',
    name: 'Water Sachets Custom',
    description: '150ml high-quality polyethylene water sachets for custom race distances.',
    visual: WATER_SACHET_IMAGE,
    type: 'complex',
    defaultVal: 1,
    maxVal: 200000,
    unit: 'Sachets',
    category: 'Hydration'
  },
  
  // Apparel & Headwear
  {
    id: 'crew-tshirts',
    name: 'Crew T-Shirts',
    description: 'Moisture-wicking technical fabric with custom event branding.',
    visual: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 50,
    maxVal: 1000,
    unit: 'Units',
    category: 'Apparel'
  },
  {
    id: 'runner-tshirts',
    name: 'Runner T-Shirts',
    description: 'Premium sublimation print technical shirts for participants.',
    visual: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 50000,
    unit: 'Units',
    category: 'Apparel'
  },
  {
    id: 'running-caps-microfibre',
    name: 'Microfibre Caps',
    description: 'Lightweight performance caps with embroidered or printed event logo.',
    visual: 'https://images.unsplash.com/photo-1588850561447-417f337676ee?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 100,
    maxVal: 5000,
    unit: 'Units',
    category: 'Apparel'
  },
  {
    id: 'running-gloves-logo',
    name: 'Running Gloves',
    description: 'Thermal grip gloves with custom branding for winter races.',
    visual: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 100,
    maxVal: 2000,
    unit: 'Pairs',
    category: 'Apparel'
  },

  // Race Administration
  {
    id: 'race-numbers-5k',
    name: 'Race Numbers 5K',
    description: 'Waterproof Tyvek bibs for 5km entrants, includes safety pins.',
    visual: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 10000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'race-numbers-10k',
    name: 'Race Numbers 10K',
    description: 'Waterproof Tyvek bibs for 10km entrants, includes safety pins.',
    visual: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 10000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'race-numbers-21k',
    name: 'Race Numbers 21K',
    description: 'Waterproof Tyvek bibs for Half Marathon entrants, includes safety pins.',
    visual: 'https://images.unsplash.com/photo-1461896756913-c3b47167533a?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 10000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'race-numbers-42k',
    name: 'Race Numbers 42K',
    description: 'Waterproof Tyvek bibs for Full Marathon entrants, includes safety pins.',
    visual: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 5000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'race-numbers-custom',
    name: 'Race Numbers Custom',
    description: 'Bespoke Tyvek bibs with custom dimensions or specific event branding.',
    visual: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 500,
    maxVal: 20000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'finisher-medals',
    name: 'Finisher Medals',
    description: 'Premium race medals with size options and tiered finish counts.',
    visual: 'https://images.unsplash.com/photo-1578262825743-a4e999cb3c8b?q=80&w=800&auto=format&fit=crop',
    type: 'complex',
    defaultVal: 1000,
    maxVal: 200000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'runners-tyvek-wristbands',
    name: 'Tyvek Wristbands (Runners)',
    description: 'Security wristbands for athlete identification and finish line access.',
    visual: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 1000,
    maxVal: 50000,
    unit: 'Units',
    category: 'Admin'
  },
  {
    id: 'vip-tyvek-wristbands',
    name: 'Tyvek Wristbands (VIP)',
    description: 'Premium coloured wristbands for hospitality and VIP areas.',
    visual: 'https://images.unsplash.com/photo-1576444399940-03da9e2380d8?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 100,
    maxVal: 2000,
    unit: 'Units',
    category: 'Admin'
  },

  // Safety & Visibility
  {
    id: 'safety-bibs',
    name: 'Marshal Safety Bibs',
    description: 'High-visibility reflective bibs for course marshals and staff.',
    visual: 'https://images.unsplash.com/photo-1590233146193-4a6c42171175?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 100,
    maxVal: 5000,
    unit: 'Units',
    category: 'Safety'
  },
  {
    id: 'red-flags-marshal',
    name: 'Marshal Red Flags',
    description: 'Standard event marshaling flags for hazard marking and direction.',
    visual: 'https://images.unsplash.com/photo-1510519133411-00271509930c?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 20,
    maxVal: 200,
    unit: 'Units',
    category: 'Safety'
  },
  {
    id: 'safety-file-audit',
    name: 'Event Safety File',
    description: 'Comprehensive compliance documentation and safety plan audit.',
    visual: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 1,
    maxVal: 1,
    unit: 'File',
    category: 'Safety'
  },

  // Marketing & Logistics
  {
    id: 'posters-eyelets',
    name: 'Eyeleted Posters',
    description: 'Correx event posters with eyelets for cable-tie attachment to poles.',
    visual: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?q=80&w=800&auto=format&fit=crop',
    type: 'slider',
    defaultVal: 50,
    maxVal: 500,
    unit: 'Units',
    category: 'Marketing'
  },
  {
    id: 'logistics-event-trips',
    name: 'Logistics Transport',
    description: 'Transport trips for equipment delivery and water station setup.',
    visual: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    type: 'complex',
    defaultVal: 5,
    maxVal: 100,
    unit: 'Trips',
    category: 'Logistics'
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Promotional campaign management across multiple social platforms.',
    visual: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    type: 'complex',
    defaultVal: 1,
    maxVal: 10,
    unit: 'Channels',
    category: 'Marketing'
  }
];