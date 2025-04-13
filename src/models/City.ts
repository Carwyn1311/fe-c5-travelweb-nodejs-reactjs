export class City {
  id: string;
  name: string;
  description: string;
  provinceId: string;
  // Lưu thêm thông tin tỉnh nếu có (từ populate)
  province?: {
    id: string;
    name: string;
    country: string;
  };

  constructor(cityData: any = {}) {
    this.id = cityData._id || cityData.id || '';
    this.name = cityData.name || '';
    this.description = cityData.description || '';
    if (cityData.province_id && typeof cityData.province_id === 'object') {
      this.provinceId = cityData.province_id._id || cityData.province_id.id || '';
      this.province = {
        id: cityData.province_id._id || cityData.province_id.id || '',
        name: cityData.province_id.name || '',
        country: cityData.province_id.country || ''
      };
    } else {
      this.provinceId = cityData.province_id || cityData.provinceId || '';
      this.province = undefined;
    }
  }
}
