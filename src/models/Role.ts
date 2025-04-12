export class Role {
  id: string;
  name: string;
  
  constructor(data: Partial<Role> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
  }
  
  // Kiểm tra nếu role là Admin (không phân biệt hoa thường)
  isAdmin(): boolean {
    return this.name.toLowerCase() === 'admin';
  }
  
  // Kiểm tra nếu role là CSKH (không phân biệt hoa thường)
  isCSKH(): boolean {
    return this.name.toLowerCase() === 'cskh';
  }
  
  // Kiểm tra nếu role là User (không phân biệt hoa thường)
  isUser(): boolean {
    return this.name.toLowerCase() === 'user';
  }
}
