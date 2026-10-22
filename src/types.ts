export type Language = 'fa' | 'en' | 'ar';

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  category: 'cosmetic' | 'restorative' | 'ortho' | 'surgery' | 'preventive';
  icon: string;
  benefits: string[];
  durationMinutes?: number;
  popular?: boolean;
}

export interface DigitalTechItem {
  id: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  icon: string;
  highlightKey: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}

export interface SearchItem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: string;
  targetSectionId: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

