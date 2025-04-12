export interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

export interface Activity {
  id: number;
  activity_name: string;
  start_time: string;
  end_time: string;
}

export interface Itinerary {
  id: number;
  start_date: string;
  end_date: string;
  activities: Activity[];
  destination_id: number;
}

export interface TicketPrice {
  id: number;
  adult_price: number;
  child_price: number;
}

export interface Province {
  id: number;
  name: string;
  country: string;
}

export interface City {
  id: number;
  name: string;
  province: Province;
}

export interface User {
  id: number;
  fullname: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: User;
  destination_id: number;
}

export interface Destination {
  id: number;
  name: string;
  description: string | null;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: City;
  created_at: string | null;
  destinationImages: DestinationImage[];
  itineraries: Itinerary[];
  ticketPrice: TicketPrice;
  descriptionFile?: {
    id: number;
    fileName: string;
    filePath: string;
  };
  reviewsList: Review[];
}
