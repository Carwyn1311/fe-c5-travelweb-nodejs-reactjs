export interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  descriptionFile: any | null;
  location: string;
  created_at: string | null;
  destinationImages: Array<{ id: number, image_url: string, destination_id: number }>;
  type: string;
  city: number;
}

