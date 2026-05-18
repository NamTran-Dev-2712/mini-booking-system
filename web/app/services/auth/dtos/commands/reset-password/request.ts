export interface ResetPasswordRequest {
  email: string;
  token: string;
  otpCode: string;
  newPassword: string;
}
