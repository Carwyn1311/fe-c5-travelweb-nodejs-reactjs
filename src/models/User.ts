import { jwtDecode } from "jwt-decode";
import { Role } from "./Role";

export class User {
  [x: string]: any;
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Role[]; // Mảng Role cho các quyền của người dùng
  fullname: string;
  active: boolean;
  activationCode: string;
  resetToken: string;
  token: string;
  private _id: any;

  constructor(userData: Partial<User> = {}) {
    // Ưu tiên lấy id từ userData.id, nếu không có thì kiểm tra _id
    this.id = (userData.id || (userData as any)._id || '') as string;
    this.username = userData.username || '';
    this.email = userData.email || '';
    this.password = userData.password || '';
    this.fullname = userData.fullname || '';

    // Xử lý gán roles: hỗ trợ mảng string, số hoặc đối tượng Role
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
      let roleName = "User";
      if (num === 1) roleName = "Admin";
      else if (num === 3) roleName = "CSKH";
      this.roles = [new Role({ name: roleName })];
    } else if (typeof userData.roles === 'string' && userData.roles) {
      this.roles = [new Role({ name: userData.roles })];
    } else {
      this.roles = [new Role({ name: "User" })];
    }
    
    this.active = userData.active !== undefined ? userData.active : true;
    this.activationCode = userData.activationCode || '';
    this.resetToken = userData.resetToken || '';
    this.token = userData.token || '';
  }

  // Kiểm tra nếu người dùng có role Admin
  isAdmin(): boolean {
    return this.roles.some(role => role.isAdmin());
  }

  // Kiểm tra nếu người dùng có role CSKH
  isCSKH(): boolean {
    return this.roles.some(role => role.isCSKH());
  }

  // Kiểm tra nếu người dùng có role User
  isUser(): boolean {
    return this.roles.some(role => role.isUser());
  }

  // Lấy danh sách role
  getRoles(): Role[] {
    return this.roles;
  }

  // Đặt roles mới
  setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  // --- Các hàm lưu trữ và lấy dữ liệu người dùng ---
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
    const expires = "expires=" + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`;
  }

  // Lấy dữ liệu user và rehydrate mảng roles thành instance của Role
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
    const name = "token=";
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
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  static updateUserData(newUserData: Partial<User>): void {
    const currentUser = this.getUserData();
    if (currentUser) {
      const updatedUser = Object.assign(currentUser, newUserData);
      this.storeUserData(updatedUser, this.getToken() || '', localStorage.getItem('user') !== null);
    }
  }

  // Giải mã token JWT và lưu thông tin user từ payload.
  // Ưu tiên lấy id từ decodedToken.id; nếu không có, dùng decodedToken._id.
  static decodeAndStoreUserData(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);

      // Xử lý roles từ token: hỗ trợ trường roles dạng mảng hoặc chuỗi
      let roles: Role[] = [];
      if (Array.isArray(decodedToken.roles)) {
        roles = decodedToken.roles.map((roleStr: string) => new Role({ name: roleStr }));
      } else if (typeof decodedToken.role === "string") {
        roles = [new Role({ name: decodedToken.role })];
      } else {
        roles = [new Role({ name: "User" })];
      }

      const user = new User({
        id: decodedToken.id || decodedToken._id || "",
        username: decodedToken.username || "",
        email: decodedToken.email || "",
        roles: roles,
        fullname: decodedToken.fullname || "",
        token: token,
      });

      this.storeUserData(user, token, true);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
}
