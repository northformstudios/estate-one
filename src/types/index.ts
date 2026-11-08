export type PropertyType = 
  | 'All'
  | 'Villa' 
  | 'Penthouse' 
  | 'Architectural Residence' 
  | 'Mansion' 
  | 'Contemporary Duplex';

export type ListingStatus = 'All' | 'For Sale' | 'For Rent';

export type CityLocation = 
  | 'All'
  | 'Banana Island, Lagos'
  | 'Ikoyi, Lagos'
  | 'Victoria Island, Lagos'
  | 'Lekki Phase 1, Lagos'
  | 'Eko Atlantic, Lagos'
  | 'Maitama, Abuja'
  | 'Asokoro, Abuja'
  | 'Guzape, Abuja';

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  experience: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: string;
  neighborhood: string;
  city: 'Lagos' | 'Abuja';
  price: number; // in NGN
  priceDisplay: string;
  status: 'For Sale' | 'For Rent';
  type: Exclude<PropertyType, 'All'>;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  landSizeSqM?: number;
  parkingSpaces: number;
  yearBuilt: number;
  featured: boolean;
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
  }[];
  description: string[];
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  agent: Agent;
}

export interface ViewingFormData {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  newsletterOptIn?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FilterState {
  searchQuery: string;
  cityLocation: string;
  propertyType: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'Any' | '3+' | '4+' | '5+' | '6+'
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'beds-desc' | 'newest';
}
