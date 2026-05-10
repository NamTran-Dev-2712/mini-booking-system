// Maps to BE's UserDTO
export interface RegisterResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  createdAt: string;
}
