export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'beautician';
}