HƯỚNG DẪN TÍCH HỢP GÓI SCORM 1.2 VÀO HỆ THỐNG MOODLE LMS
================================================================

Bài 23: Một số lệnh làm việc với dữ liệu danh sách (Tin học 10 - Kết nối tri thức)
Giáo viên biên soạn: GV Trần Quốc Dung, Tổ Tin học & Công nghệ

1. CÁCH NÉN THÀNH FILE .ZIP CHUẨN SCORM:
   - Trong thư mục "dist" (hoặc thư mục chứa imsmanifest.xml và index.html):
   - Chọn tất cả các tệp: "imsmanifest.xml", "index.html", "README_MOODLE.txt" (và thư mục assets nếu có).
   - Nhấp chuột phải -> Gửi tới / Send to -> Thư mục nén / Compressed (zipped) folder (hoặc dùng 7-Zip, WinRAR chọn định dạng .zip).
   - Đặt tên file là: "SCORM_1.2_Python_List_Lab_10_Bai23.zip".
   *LƯU Ý QUAN TRỌNG: File "imsmanifest.xml" PHẢI nằm ngay tại thư mục gốc của file .zip, không được nằm lồng trong thư mục con!

2. CÁCH ĐƯA LÊN MOODLE LMS:
   Bước 1: Đăng nhập vào Moodle với quyền Giáo viên (Teacher) hoặc Quản trị viên (Admin).
   Bước 2: Vào khóa học Tin học 10, bật chế độ "Bật chế độ chỉnh sửa" (Turn editing on / Edit mode).
   Bước 3: Tại chủ đề bài học mong muốn, nhấp "Thêm một hoạt động hoặc tài nguyên" (Add an activity or resource).
   Bước 4: Chọn "Gói SCORM" (SCORM package).
   Bước 5: Điền các thông tin:
      - Tên (Name): Bài 23: Một số lệnh làm việc với dữ liệu danh sách - Phòng thực hành tương tác
      - Tệp gói (Package file): Kéo thả file "SCORM_1.2_Python_List_Lab_10_Bai23.zip" vào khung nộp tệp.
   Bước 6: Thiết lập Điểm số (Grade):
      - Phương pháp chấm điểm (Grading method): Điểm cao nhất (Highest grade) hoặc Lần học cuối (Last attempt).
      - Điểm tối đa (Maximum grade): 100
   Bước 7: Thiết lập Giao diện (Appearance):
      - Hiển thị gói (Display package): Cửa sổ hiện tại (Current window) hoặc Cửa sổ mới (New window).
   Bước 8: Nhấp "Lưu và cho xem" (Save and display).

3. ĐỒNG BỘ DỮ LIỆU CMI CHUẨN SCORM 1.2:
   - cmi.core.student_name: Tự động chào đón học sinh theo tên tài khoản Moodle.
   - cmi.core.student_id: Lưu mã số học sinh.
   - cmi.core.lesson_status: Tự động cập nhật 'incomplete', 'passed' (khi đạt >= 70 điểm kiểm tra) hoặc 'completed'.
   - cmi.core.score.raw: Đồng bộ điểm bài kiểm tra trắc nghiệm & vận dụng trực tiếp vào sổ điểm (Gradebook) của Moodle.
   - cmi.suspend_data: Tự động lưu tiến độ học tập (module đã hoàn thành, câu trả lời) để học sinh tiếp tục khi đăng nhập lại.

4. CHẠY OFFLINE TRÊN MÁY TÍNH CÁ NHÂN (KHÔNG CẦN INTERNET, KHÔNG CẦN CÀI PYTHON):
   - Bạn chỉ cần nhấp đúp trực tiếp vào file "index.html" trên bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Cốc Cốc, Firefox).
   - Ứng dụng đã được đóng gói toàn bộ (Single-file HTML), hoạt động 100% trơn tru offline mà không cần cài đặt thêm phần mềm gì!
