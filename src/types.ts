export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface RsvpFormData {
  fullName: string;
  phone: string;
  attending: 'yes' | 'no' | null;
  guestsCount: number;
}

export interface RsvpRecord {
  id: string;
  fullName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  timestamp: string;
  formattedDate: string;
}

export interface NavItem {
  label: string;
  href: string;
}
