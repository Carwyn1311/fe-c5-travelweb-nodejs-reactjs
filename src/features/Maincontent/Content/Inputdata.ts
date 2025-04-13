import { destinationList } from "../../Admin/Destination/listdest";

// Hàm chuyển đổi tên thành dạng URL-friendly (không dấu, chữ thường, nối nhau bằng dấu gạch ngang)
const formatPath = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu tiếng Việt
    .replace(/\s+/g, "-")           // thay dấu cách bằng dấu gạch ngang
    .replace(/[^a-z0-9-]+/g, "")     // loại bỏ các ký tự không phải chữ, số, gạch ngang
    .replace(/(^-|-$)/g, "");        // loại bỏ gạch ngang đầu/cuối
};

export interface Inputdata {
  name: string;
  url: string;
}

export const itemsWithUrls: Inputdata[] = destinationList.map((dest) => ({
  name: dest.name,
  url: `/destinations/${dest._id}`,
}));