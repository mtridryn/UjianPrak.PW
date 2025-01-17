export default interface User {
  user_id: string;
  name: string;
  email: string;
  picture: string;
  phone: string;
  location: string;
  role: boolean;
  updated_at: Date;
  created_at: Date;
  isGmail: boolean;
}
