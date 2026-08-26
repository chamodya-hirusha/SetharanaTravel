export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface TravelPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  features: string[];
  isPopular?: boolean;
  category?: "Local" | "Foreign" | "Both";
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: "all" | "pilgrimage" | "nature" | "heritage" | "adventure";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}
