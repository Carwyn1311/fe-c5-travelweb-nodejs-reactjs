// DestinationTypes.ts
export interface DestinationImg {
  id?: string;
  _id?: string;
  image_url: string;
  destination_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DestinationImage extends DestinationImg {}

export interface Activity {
  id: string;
  activity_name: string;
  start_time: string;
  end_time: string;
}

export interface Itinerary {
  id: string;
  start_date: string;
  end_date: string;
  activities: Activity[];
  destination_id: string;
}

export interface Province {
  _id: string;
  name: string;
  country: string;
  // Nếu cần cities thì có thể thêm
  cities?: string[];
}

export interface City {
  _id: string;
  name: string;
  description?: string;
  province_id: string;
  province?: Province;
}

export interface User {
  _id: string;
  fullname: string;
  // Các trường khác nếu cần...
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
  destination_id: string;
}

export interface Destination {
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  image?: string;
  adult_price?: number;
  child_price?: number;
  days: number;
  ticketPrice?: {
    adult_price: number;
    child_price: number;
  };
  province_id?: Province; // API trả về đối tượng
  city_id?: City;         // API trả về đối tượng
  destination_images?: DestinationImg[];
  itineraries?: Itinerary[];
  reviewsList?: Review[];
  bookings?: string[];
  createdAt?: string;
  updatedAt?: string;
  encodedPath?: string;
  type?: string;
}
