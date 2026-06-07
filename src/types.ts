export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: "General" | "Cosmetic" | "Surgical" | "Pediatric";
  iconName: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM"
  bookingMethod: "form" | "calendar";
  createdAt: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
  serviceUsed: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
