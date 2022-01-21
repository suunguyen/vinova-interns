/*
    Event-drivent dựa trên nguyên lý trigger các event. Khi đó các event sẽ được monitor(watched, listened...) bởi 1 hoặc nhiều observers khác nhau.
    Khác biệt cơ bản là mỗi khi event được phát ra, các observer sẽ xử lý chúng và chương trình sẽ không bị blocked để chờ đợi kết quả trả về
    => Nhờ đó mà event-loop tiếp tục xử lý request mới

    - Khả năng chịu tải cao (high concurrency)
    - Giảm sự phụ thuộc lẫn nhau (loose coupling)
    - Có khả năng mở rộng (scalable)

    => App sử dụng mô hình event-driven, toàn bộ việc xử lý của server sẽ chịu sự điều phối của một vòng lặp trung tâm.
*/