// src/models/Booking.ts
export interface Booking {
    _id?: string;
    adult_tickets: number;
    child_tickets: number;
    booking_date: string;  // ISO string
    days: number;
    status: 'pending' | 'confirmed' | 'paid';
    destination_id: string;
    user_id: string;
    payment_details?: string; // id của PaymentDetail (nếu có)
    createdAt?: string;
    updatedAt?: string;
  }
  