// Maps to BE's AuthResult — tokens are stripped by the controller before sending
export interface LoginResponse {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  expiresIn: string; // ISO datetime — access token expiry
  refreshTokenExpiresAt: string;
  createdAt: string;
}
