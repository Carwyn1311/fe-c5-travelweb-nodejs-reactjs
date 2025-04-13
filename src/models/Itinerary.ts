// models/Itinerary.ts
import { Activity } from './Activity';

export interface Itinerary {
  _id?: string;
  start_date: string; // định dạng ISO string hoặc Date string
  end_date: string;
  destination_id: string; // id điểm đến, có thể dùng kiểu Destination nếu đã populate
  activities?: Activity[]; // mảng các hoạt động thuộc lịch trình
  createdAt?: string;
  updatedAt?: string;
}
