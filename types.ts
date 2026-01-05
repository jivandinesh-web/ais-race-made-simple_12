export enum Distance {
  KM5 = '5K',
  KM10 = '10K',
  KM21 = '21K',
  KM42 = '42K',
  CUSTOM = 'Custom'
}

export interface CalculatorItem {
  id: string;
  name: string;
  description: string;
  visual: string;
  type: 'slider' | 'checkbox' | 'dropdown' | 'complex';
  defaultVal: number;
  maxVal: number;
  unit: string;
  category: string;
}

export interface QuoteItem {
  calculatorId: string;
  name: string;
  details: string;
  quantity: number | string;
  artwork?: string; // Base64 of user uploaded artwork
}

export interface UserRegistration {
  id?: string;
  clubName: string;
  eventName: string;
  eventLocation: string;
  estParticipants: string;
  eventDate: string;
  eventTime: string;
  title: string;
  designation: string;
  fullName: string;
  email: string;
  cellNumber: string;
  altContact: string;
  signedNDA: boolean;
  timestamp?: number;
}

export interface QuoteRecord {
  id: string;
  userId: string;
  userName: string;
  eventName: string;
  items: QuoteItem[];
  timestamp: number;
  userDetails: UserRegistration;
}

export interface AnalyticsData {
  pageViews: number;
  quotesGenerated: number;
  mostAddedItem: string;
  categoryEngagement: Record<string, number>;
}