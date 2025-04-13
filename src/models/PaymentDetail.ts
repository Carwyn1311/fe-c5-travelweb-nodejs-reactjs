// src/models/PaymentDetail.ts
export interface PaymentDetail {
    _id?: string;
    amount: number;
    payment_date: string;  // ISO string
    status: 'pending' | 'completed' | 'failed';
    booking_id: string;
    payment_method: 'credit_card' | 'bank_transfer' | 'cash' | 'momo' | 'zalopay';
    user_id: string;
    invoice_code?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  