export class City {
    id: string;
    name: string;
  
    constructor(cityData: Partial<City> = {}) {
      // Ưu tiên lấy id từ cityData.id, nếu không có thì kiểm tra _id
      this.id = cityData.id || (cityData as any)._id || '';
      this.name = cityData.name || '';
    }
  }
  
  export class Province {
    id: string;
    name: string;
    country: string;
    cities: City[];
  
    constructor(provinceData: Partial<Province> = {}) {
      // Ưu tiên lấy id từ provinceData.id, nếu không có thì chuyển _id thành id
      this.id = provinceData.id || (provinceData as any)._id || '';
      this.name = provinceData.name || '';
      this.country = provinceData.country || 'Vietnam';
      // Xử lý mảng cities: nếu tồn tại thì map qua các đối tượng City, ngược lại khởi tạo mảng rỗng
      if (Array.isArray(provinceData.cities)) {
        this.cities = provinceData.cities.map(city => new City(city));
      } else {
        this.cities = [];
      }
    }
  }
  