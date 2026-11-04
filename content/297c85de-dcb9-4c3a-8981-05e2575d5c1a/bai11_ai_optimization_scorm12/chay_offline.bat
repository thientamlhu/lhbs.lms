@echo off
chcp 65001 >nul
title AI OPTIMIZATION LAB - PHÒNG THÍ NGHIỆM BÀI 11
cls
echo ====================================================================
echo   AI OPTIMIZATION LAB - BÀI 11: TỐI ƯU HOÁ MÔ HÌNH (TIN HỌC 12)
echo   Chương trình GDPT 2018 - SGK Trang 80-87
echo ====================================================================
echo.
echo Đang chuẩn bị khởi chạy ứng dụng...

REM 1. Kiểm tra Python
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Đã tìm thấy Python. Khởi động máy chủ cục bộ port 8080...
    start "" http://localhost:8080/index.html
    python -m http.server 8080
    goto end
)

REM 2. Kiểm tra Python Launcher
where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Đã tìm thấy Python (py). Khởi động máy chủ cục bộ port 8080...
    start "" http://localhost:8080/index.html
    py -m http.server 8080
    goto end
)

REM 3. Kiểm tra Node.js / npx
where npx >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Đã tìm thấy Node.js. Khởi động máy chủ cục bộ port 8080...
    start "" http://localhost:8080/index.html
    npx --yes serve -p 8080 "%~dp0"
    goto end
)

REM 4. Tự động mở bản chạy trực tiếp độc lập (không cần bất kỳ phần mềm nào)
echo [THÔNG BÁO] Đang mở bản chạy trực tiếp trên trình duyệt mặc định...
start "" "%~dp0chay_truc_tiep_khong_can_server.html"

:end
