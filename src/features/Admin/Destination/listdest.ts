import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import DestinationService, { ApiResponse } from '../../../service/DestinationService';
import { Key } from 'readline';
import { axiosNoToken } from '../../AxiosInterceptor/Content/axiosNotoken';

// -------------------------------------------------------------
// Các interface và class được cung cấp
// -------------------------------------------------------------

export interface DestinationImg {
  id: Key | null | undefined;
  _id?: string;
  image_url: string;
  destination_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  id: Key | null | undefined;
  _id?: string;
  activity_name: string;
  start_time: string;
  end_time: string;
  itinerary_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Itinerary {
  id: Key | null | undefined;
  _id?: string;
  start_date: string;
  end_date: string;
  destination_id: string;
  activities?: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

export class Role {
  id: string;
  name: string;

  constructor(data: Partial<Role> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
  }

  isAdmin(): boolean {
    return this.name.toLowerCase() === 'admin';
  }

  isCSKH(): boolean {
    return this.name.toLowerCase() === 'cskh';
  }

  isUser(): boolean {
    return this.name.toLowerCase() === 'user';
  }
}

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  fullname: string;
  active: boolean;
  activationCode: string;
  resetToken: string;
  token: string;

  constructor(userData: Partial<User> = {}) {
    this.id = (userData.id || (userData as any)._id || '') as string;
    this.username = userData.username || '';
    this.email = userData.email || '';
    this.password = userData.password || '';
    this.fullname = userData.fullname || '';

    if (Array.isArray(userData.roles)) {
      this.roles = userData.roles.map(roleData => {
        if (typeof roleData === 'string') {
          return new Role({ name: roleData });
        } else {
          return roleData as Role;
        }
      });
    } else if (typeof userData.roles === 'number') {
      const num = userData.roles;
      let roleName = 'User';
      if (num === 1) roleName = 'Admin';
      else if (num === 3) roleName = 'CSKH';
      this.roles = [new Role({ name: roleName })];
    } else if (typeof userData.roles === 'string' && userData.roles) {
      this.roles = [new Role({ name: userData.roles })];
    } else {
      this.roles = [new Role({ name: 'User' })];
    }

    this.active = userData.active !== undefined ? userData.active : true;
    this.activationCode = userData.activationCode || '';
    this.resetToken = userData.resetToken || '';
    this.token = userData.token || '';
  }

  isAdmin(): boolean {
    return this.roles.some(role => role.isAdmin());
  }

  isCSKH(): boolean {
    return this.roles.some(role => role.isCSKH());
  }

  isUser(): boolean {
    return this.roles.some(role => role.isUser());
  }

  getRoles(): Role[] {
    return this.roles;
  }

  setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  static storeUserData(user: User, token: string, rememberMe: boolean): void {
    const userData = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem('user', userData);
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('user', userData);
      sessionStorage.setItem('token', token);
    }
  }

  static storeTokenInCookie(token: string, expireDays: number = 1): void {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`;
  }

  static getUserData(): User | null {
    const data = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.roles && Array.isArray(parsed.roles)) {
        parsed.roles = parsed.roles.map((r: any) => new Role({ id: r.id, name: r.name }));
      }
      return Object.assign(new User(), parsed);
    }
    return null;
  }

  static getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  static getTokenFromCookie(): string | null {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      let c = cookieArr[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  static clearUserData(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  static clearTokenFromCookie(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData);
      this.storeUserData(updatedUser, this.getToken() || '', localStorage.getItem('user') !== null);
    }
  }

  static decodeAndStoreUserData(token: string): void {
    try {
      const decodedToken: any = (jwtDecode as any)(token);
      let roles: Role[] = [];
      if (Array.isArray(decodedToken.roles)) {
        roles = decodedToken.roles.map((roleStr: string) => new Role({ name: roleStr }));
      } else if (typeof decodedToken.role === 'string') {
        roles = [new Role({ name: decodedToken.role })];
      } else {
        roles = [new Role({ name: 'User' })];
      }

      const user = new User({
        id: decodedToken.id || decodedToken._id || '',
        username: decodedToken.username || '',
        email: decodedToken.email || '',
        roles: roles,
        fullname: decodedToken.fullname || '',
        token: token,
      });

      this.storeUserData(user, token, true);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}

export interface Review {
  _id?: string;
  comment?: string;
  rating: number;
  destination_id: string;
  user_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface City {
  id: string;
  name: string;
  description: string;
  provinceId: string;
  province?: {
    id: string;
    name: string;
    country: string;
  };
}

export interface Province {
  id: string;
  name: string;
  country: string;
  cities: City[];
}

export interface Destination {
  [x: string]: any; // Nếu API trả về thêm thuộc tính nào khác
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  image?: string;
  adult_price?: number; // Có thể là optional
  child_price?: number; // Có thể là optional
  days: number;
  province_id?: string;
  city_id?: string;
  destination_images?: DestinationImg[];
  itineraries?: Itinerary[];
  reviews?: Review[];
  bookings?: string[];
  createdAt?: string;
  updatedAt?: string;
  encodedPath?: string;
  // Nếu API trả về trực tiếp các thuộc tính sau (dùng cho menu phân loại)
  province?: string;
  city?: string;
}

// -------------------------------------------------------------
// Các hàm hỗ trợ cho destination
// -------------------------------------------------------------

// Khởi tạo danh sách điểm đến (nếu cần dùng cho bộ nhớ tạm)
export const destinationList: Destination[] = [];

// Hàm chuyển đổi tên thành đường dẫn chuẩn (slug)
export const formatPath = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/(^-|-$)/g, '');
};

export async function fetchDestinations(): Promise<{ success: boolean, data: Destination[] }> {
  try {
    const response = await axiosNoToken.get('/destinations');
    return response.data;  // Assuming `response.data` is structured like { success: true, data: Destination[] }
  } catch (error) {
    throw new Error('Failed to fetch destinations');
  }
}


// Phân loại điểm đến theo province và city
export async function classifyDestinations(): Promise<Record<string, Record<string, Destination[]>>> {
  try {
    const { data: destinationList } = await fetchDestinations();  // Sử dụng fetchDestinations mới
    // Khai báo đối tượng với cấu trúc: { [provinceName]: { [cityName]: Destination[] } }
    const classified: Record<string, Record<string, Destination[]>> = {};

    destinationList.forEach((dest: Destination) => {
      // Nếu API không trả về các trường này, bạn có thể dùng province_id, city_id hoặc bất kỳ thuộc tính nào khác phù hợp.
      const provinceName: string = dest.province || 'Unknown Province';
      const cityName: string = dest.city || 'Unknown City';

      if (!classified[provinceName]) {
        classified[provinceName] = {};
      }
      if (!classified[provinceName][cityName]) {
        classified[provinceName][cityName] = [];
      }
      classified[provinceName][cityName].push(dest);
    });
    return classified;
  } catch (error) {
    console.error('classifyDestinations error:', error);
    throw error;
  }
}


// Xóa điểm đến dựa theo destinationId
export const deleteDestination = async (destinationId: string) => {
  try {
    const response: ApiResponse = await DestinationService.deleteDestination(destinationId);
    if (response.success) {
      message.success('Xóa điểm đến thành công');
      // Sau khi xóa, lấy lại danh sách điểm đến nếu cần thiết.
      await fetchDestinations();
    } else {
      message.error('Lỗi khi xóa điểm đến');
    }
  } catch (error) {
    message.error('Lỗi khi xóa điểm đến');
  }
};
