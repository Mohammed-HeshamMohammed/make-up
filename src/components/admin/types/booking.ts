
export interface Booking {
  id: string;
  client: string;
  service: string;
  location: string;
  beautician: string;
  van: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "unassigned";
  payment: string;
  paymentStatus: "paid" | "pending" | "not paid" | "refunded";
  price: string;
  phone?: string;
  address?: string;
}

export interface Van {
  id: string;
  name: string;
  status: "available" | "busy" | "maintenance";
}

export interface Beautician {
  id: string;
  name: string;
  specialization: string;
  status: "available" | "busy" | "off";
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  client: string;
  location: string;
  beautician: string;
  status: string;
}

export interface BookingData {
  services: string[];
  category: string;
  date?: Date;
  time?: string;
  beautician?: string;
  location?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  paymentMethod?: string;
  cardInfo?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  receiptImage?: File;
}


