// src/models/Review.ts
export interface Review {
    _id?: string;
    comment?: string;
    rating: number; // từ 1 đến 5
    destination_id: string;
    user_id: string;
    createdAt?: string;
    updatedAt?: string;
  }
  