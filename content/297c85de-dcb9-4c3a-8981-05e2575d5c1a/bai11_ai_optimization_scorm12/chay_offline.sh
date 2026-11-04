#!/bin/bash
echo "===================================================================="
echo "  AI OPTIMIZATION LAB - BÀI 11: TỐI ƯU HOÁ MÔ HÌNH (TIN HỌC 12)"
echo "===================================================================="
if command -v python3 &>/dev/null; then
    echo "Khởi động máy chủ HTTP cục bộ cổng 8080..."
    (sleep 1 && open http://localhost:8080/index.html || xdg-open http://localhost:8080/index.html) &
    python3 -m http.server 8080
else
    echo "Mở trực tiếp bản Standalone..."
    open ./chay_truc_tiep_khong_can_server.html || xdg-open ./chay_truc_tiep_khong_can_server.html
fi
