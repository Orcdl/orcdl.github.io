/**
 * Cold Brew Đà Lạt — nhận đơn từ web và ghi vào Google Sheet.
 *
 * CÁCH DÙNG (làm 1 lần):
 * 1. Tạo 1 Google Sheet mới (sheets.new). Đây là nơi lưu đơn.
 * 2. Trong Sheet: menu Extensions → Apps Script (Tiện ích mở rộng → Apps Script).
 * 3. Xoá hết code mẫu, dán TOÀN BỘ file này vào.
 * 4. Bấm Deploy → New deployment (Triển khai → Triển khai mới).
 *      - Select type (bánh răng) → Web app
 *      - Execute as: Me (chính bạn)
 *      - Who has access: Anyone (Bất kỳ ai)  ← quan trọng, để web gửi đơn được
 *      - Bấm Deploy, cấp quyền khi được hỏi.
 * 5. Copy "Web app URL" (dạng https://script.google.com/macros/s/..../exec)
 * 6. Gửi URL đó cho mình (hoặc tự dán vào biến SHEET_ENDPOINT trong coldbrew.html).
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Đơn hàng');
    if (!sheet) {
      sheet = ss.insertSheet('Đơn hàng');
    }
    // Nếu sheet trống, thêm dòng tiêu đề
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian nhận', 'Loại chai', 'Số lượng', 'Đơn giá',
        'Tổng tiền', 'Ngày nhận', 'Khung giờ', 'SĐT', 'Địa chỉ', 'Ghi chú'
      ]);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      d.loai_chai || '',
      d.so_luong || '',
      d.don_gia || '',
      d.tong_tien || '',
      d.ngay_nhan || '',
      d.khung_gio || '',
      "'" + (d.sdt || ''),   // dấu ' để giữ số 0 đầu SĐT
      d.dia_chi || '',
      d.ghi_chu || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Cho phép mở URL bằng trình duyệt để kiểm tra là đã deploy đúng.
function doGet() {
  return ContentService
    .createTextOutput('Cold Brew order endpoint OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
