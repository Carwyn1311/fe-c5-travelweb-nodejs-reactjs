// src/models/Destination.ts
import { Itinerary } from "./Itinerary";
import { DestinationImg } from "./DestinationImg";
import { Review } from "./Review";


export interface Destination {
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  image?: string;
  adult_price: number;
  child_price: number;
  days: number;
  province_id?: string;
  city_id?: string;
  destination_images?: DestinationImg[]; // nếu backend populate
  itineraries?: Itinerary[];             // nếu backend populate
  reviews?: Review[];                    // mới: danh sách đánh giá (nếu có)
  bookings?: string[];                   // ví dụ: id các Booking liên quan (nếu cần)
  createdAt?: string;
  updatedAt?: string;
}
