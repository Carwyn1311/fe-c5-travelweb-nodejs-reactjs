// models/Activity.ts
export interface Activity {
    _id?: string;
    activity_name: string;
    start_time: string; // định dạng ISO string hoặc Date string
    end_time: string;
    itinerary_id: string; // id của lịch trình, có thể mở rộng thành Itinerary nếu cần
    createdAt?: string;
    updatedAt?: string;
  }
  