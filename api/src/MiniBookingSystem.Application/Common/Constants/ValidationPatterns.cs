namespace MiniBookingSystem.Application.Common.Constants;

public static class ValidationPatterns
{
    // Tên người Việt: cho phép chữ Unicode, dấu tiếng Việt, khoảng trắng.
    // Không cho số, ký tự đặc biệt.
    public const string VietnameseFullName = @"^[\p{L}]+(?:\s[\p{L}]+)*$";

    // SĐT Việt Nam:
    // Hỗ trợ: 09xxxxxxxx, 03xxxxxxxx, 07xxxxxxxx, 08xxxxxxxx, 05xxxxxxxx
    // Hỗ trợ dạng quốc tế: +849xxxxxxxx hoặc 849xxxxxxxx
    public const string VietnamesePhoneNumber = @"^(0|\+84|84)(3|5|7|8|9)\d{8}$";

    // Password:
    // Tối thiểu 8 ký tự
    // Ít nhất 1 chữ thường
    // Ít nhất 1 chữ hoa
    // Ít nhất 1 ký tự đặc biệt
    // Ít nhất 1 số
    public const string StrongPassword = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$";
}
