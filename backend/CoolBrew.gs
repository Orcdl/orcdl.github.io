/**
 * COOL BREW — Backend ghi đơn hàng vào Google Sheet
 * ------------------------------------------------------------
 * Cách dùng:
 *  1. Mở Google Sheet của bạn → menu Tiện ích mở rộng (Extensions)
 *     → Apps Script.
 *  2. Xoá hết code mẫu, dán TOÀN BỘ file này vào.
 *  3. Bấm Lưu (biểu tượng đĩa mềm).
 *  4. Deploy (Triển khai) → New deployment (Bản triển khai mới)
 *     → chọn loại "Web app".
 *        - Execute as (Thực thi với tư cách): Me (tôi)
 *        - Who has access (Ai có quyền truy cập): **Anyone** (Bất kỳ ai)
 *          >>> QUAN TRỌNG NHẤT: phải là "Anyone", KHÔNG phải
 *              "Only myself" hay "Anyone with Google account".
 *  5. Copy URL dạng .../exec và gửi lại cho mình (hoặc dán vào
 *     biến SHEET_ENDPOINT trong coldbrew.html).
 *
 * Kiểm tra nhanh: mở URL .../exec đó bằng trình duyệt.
 *  - Thấy dòng "COOL BREW backend đang chạy ✅"  => ĐÚNG.
 *  - Thấy trang đăng nhập Google / báo lỗi quyền => sai bước 4
 *    (deploy lại, đặt Who has access = Anyone).
 *
 * Lưu ý: MỖI LẦN sửa code phải deploy lại (Manage deployments →
 * bút chì Edit → Version: New version → Deploy), nếu không thay
 * đổi sẽ không có hiệu lực.
 */

var SHEET_NAME = 'DonHang'; // tên tab trong Google Sheet (tự tạo nếu chưa có)

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // tránh 2 đơn ghi đè nhau

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Tạo hàng tiêu đề nếu sheet còn trống
    if (sh.getLastRow() === 0) {
      sh.appendRow([
        'Thời gian đặt', 'Loại chai', 'Số lượng', 'Đơn giá',
        'Tổng tiền', 'Ngày nhận', 'Khung giờ', 'SĐT', 'Địa chỉ', 'Ghi chú'
      ]);
    }

    sh.appendRow([
      new Date(),
      data.loai_chai || '',
      data.so_luong  || '',
      data.don_gia   || '',
      data.tong_tien || '',
      data.ngay_nhan || '',
      data.khung_gio || '',
      data.sdt       || '',
      data.dia_chi   || '',
      data.ghi_chu   || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Cho phép mở URL bằng trình duyệt để kiểm tra backend còn sống hay không.
function doGet(e) {
  return ContentService.createTextOutput(
    'COOL BREW backend đang chạy ✅ — dùng phương thức POST để gửi đơn.'
  );
}
