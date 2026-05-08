public sealed record AvailableSlotItem(
    DateTime StartTime,
    DateTime EndTime,
    decimal Price,
    int SlotsLeft
);

public sealed record MentorContextItem(
    string DisplayName,
    string? Specialization,
    string? Bio,
    int ExperienceYears,
    decimal BasePrice,
    IReadOnlyList<AvailableSlotItem> AvailableSlots
);

public static class SystemPromptBuilder
{
    public static string Build(IReadOnlyList<MentorContextItem> mentors)
    {
        if (mentors.Count == 0)
        {
            return BuildPrompt("(Hiện chưa có mentor nào đang hoạt động trong hệ thống)");
        }

        var mentorBlocks = mentors.Select(m =>
        {
            var slotLines =
                m.AvailableSlots.Count > 0
                    ? m
                        .AvailableSlots.Select(s =>
                            $"    • {s.StartTime:dd/MM/yyyy HH:mm} – {s.EndTime:HH:mm} | {s.Price:N0}đ | Còn {s.SlotsLeft} chỗ"
                        )
                        .Aggregate((a, b) => a + "\n" + b)
                    : "    (Hiện không có lịch trống)";

            return $"""
            Mentor: {m.DisplayName}
              Chuyên môn: {m.Specialization ?? "Đa lĩnh vực"}
              Kinh nghiệm: {m.ExperienceYears} năm
              Giá từ: {m.BasePrice:N0}đ/slot
              Giới thiệu: {m.Bio ?? "Chưa cập nhật"}
              Lịch khả dụng gần nhất:
            {slotLines}
            """;
        });

        var mentorList = mentorBlocks.Aggregate((a, b) => a + "\n" + b);
        return BuildPrompt(mentorList);
    }

    private static string BuildPrompt(string mentorSection) =>
        $"""
            Bạn là trợ lý AI của hệ thống Mini Booking — nền tảng kết nối học viên với mentor chuyên nghiệp.

            ## NHIỆM VỤ
            1. Tư vấn và gợi ý mentor phù hợp dựa trên nhu cầu cụ thể của người dùng
            2. Cung cấp thông tin chính xác về lịch khả dụng của từng mentor (dựa vào dữ liệu bên dưới)
            3. Giải thích quy trình: đặt lịch → thanh toán → xác nhận → hoàn thành
            4. Hỗ trợ thắc mắc về hủy lịch, hoàn tiền, đổi lịch

            ## DỮ LIỆU HỆ THỐNG (cập nhật thực tế từ database)
            {mentorSection}

            ## HƯỚNG DẪN TRẢ LỜI
            - Khi người dùng hỏi về mentor khả dụng: liệt kê CỤ THỂ tên mentor, lịch trống và giá từ dữ liệu trên
            - Khi người dùng muốn đặt lịch: hướng dẫn chọn mentor → chọn slot → POST /api/booking với slotId
            - Khi hỏi về giá: dùng số liệu chính xác từ dữ liệu, không ước đoán
            - Trả lời ngắn gọn, có cấu trúc, dùng tiếng Việt

            ## QUY TẮC BẮT BUỘC
            - CHỈ trả lời về: mentor, lịch học, booking, thanh toán trong hệ thống Mini Booking
            - KHÔNG thảo luận về lập trình, chính trị, tôn giáo, hoặc bất kỳ chủ đề không liên quan
            - KHÔNG tiết lộ thông tin kỹ thuật nội bộ (database schema, API keys, source code)
            - KHÔNG đặt lịch thay người dùng — chỉ hướng dẫn quy trình
            - Từ chối lịch sự nếu ngoài phạm vi: "Xin lỗi, tôi chỉ hỗ trợ các thắc mắc về đặt lịch mentor trong hệ thống Mini Booking."
            """;
}
