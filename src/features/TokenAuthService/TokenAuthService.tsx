export const TokenAuthService = {
  // Lấy token từ localStorage hoặc sessionStorage
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  // Lưu token vào localStorage hoặc sessionStorage tùy thuộc vào lựa chọn 'Remember Me'
  setToken(token: string, rememberMe = false): void {
    if (rememberMe) {
      localStorage.setItem('token', token);  // Lưu vào localStorage nếu Remember Me được chọn
    } else {
      sessionStorage.setItem('token', token); // Ngược lại, lưu vào sessionStorage
    }
  },

  // Xóa token khỏi cả localStorage và sessionStorage
  removeToken(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  },

  // Xóa tất cả dữ liệu trong localStorage
  clearStorage(): void {
    localStorage.clear();
  },

  // Thiết lập dữ liệu vào sessionStorage
  setSessionData(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  },

  // Lấy dữ liệu từ sessionStorage
  getSessionData(key: string): string | null {
    return sessionStorage.getItem(key);
  },

  // Xóa dữ liệu từ sessionStorage theo key
  removeSessionData(key: string): void {
    sessionStorage.removeItem(key);
  },

  // Xóa tất cả dữ liệu trong sessionStorage
  clearSessionStorage(): void {
    sessionStorage.clear();
  },

  // Các phương thức quản lý cookies
  setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },

  removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  clearCookies(): void {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
};
