export class City {
    id: string;
    name: string;
    description: string;
    provinceId: string;
  
    constructor(cityData: Partial<City> = {}) {
      // Ưu tiên lấy id từ cityData.id, nếu không có thì chuyển _id
      this.id = cityData.id || (cityData as any)._id || '';
      this.name = cityData.name || '';
      this.description = cityData.description || '';
  
      // Xử lý province_id: nếu nhận được một đối tượng, lấy _id của nó; nếu nhận được chuỗi, gán luôn
      if (typeof (cityData as any).province_id === 'object' && (cityData as any).province_id !== null) {
        this.provinceId = (cityData as any).province_id._id || (cityData as any).province_id.id || '';
      } else {
        this.provinceId = (cityData as any).province_id || cityData.provinceId || '';
      }
    }
  }
  