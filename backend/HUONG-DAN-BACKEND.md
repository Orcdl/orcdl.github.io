# Hướng dẫn kết nối form COOL BREW với Google Sheet

Form trên web đã gửi dữ liệu **đúng chuẩn**. Nếu đơn không xuất hiện trong
Google Sheet thì gần như chắc chắn do **Apps Script chưa được deploy đúng**.
Làm lại theo các bước dưới đây (mất ~3 phút).

## Bước 1 — Mở Apps Script
1. Mở Google Sheet muốn lưu đơn.
2. Menu **Tiện ích mở rộng (Extensions)** → **Apps Script**.

## Bước 2 — Dán code
1. Xoá hết code mẫu trong cửa sổ Apps Script.
2. Mở file `backend/CoolBrew.gs` (trong repo này), copy toàn bộ, dán vào.
3. Bấm **Lưu** (biểu tượng đĩa mềm).

## Bước 3 — Triển khai (Deploy) — QUAN TRỌNG NHẤT
1. Góc phải trên: **Deploy (Triển khai)** → **New deployment (Bản triển khai mới)**.
2. Bấm bánh răng ⚙️ → chọn **Web app**.
3. Cấu hình:
   - **Execute as (Thực thi với tư cách):** `Me` (tài khoản của bạn)
   - **Who has access (Ai có quyền truy cập):** **`Anyone`** (Bất kỳ ai)
     > ⚠️ Đây là lỗi hay gặp nhất. PHẢI chọn **Anyone**.
     > KHÔNG chọn "Only myself" cũng KHÔNG chọn "Anyone with Google account",
     > vì khách đặt hàng là người lạ, không đăng nhập Google của bạn.
4. Bấm **Deploy**. Lần đầu Google sẽ hỏi cấp quyền → **Authorize access**
   → chọn tài khoản → "Advanced" → "Go to (project) → Allow".
5. Copy **Web app URL** dạng `https://script.google.com/macros/s/..../exec`.

## Bước 4 — Kiểm tra backend còn sống
Mở URL `.../exec` vừa copy bằng trình duyệt:
- ✅ Thấy dòng **"COOL BREW backend đang chạy ✅"** → ĐÚNG, sang bước 5.
- ❌ Thấy trang đăng nhập Google hoặc báo lỗi quyền → sai ở Bước 3,
  deploy lại và đặt **Who has access = Anyone**.

## Bước 5 — Gắn URL vào web
Gửi URL `.../exec` cho mình (Claude) để mình dán vào web, hoặc tự sửa:
trong file `coldbrew.html` tìm dòng:
```js
const SHEET_ENDPOINT = "....";
```
thay bằng URL mới.

## Bước 6 — Đặt thử 1 đơn
Vào web đặt thử một đơn → mở Google Sheet xem có dòng mới (tab **DonHang**)
với đủ: thời gian, loại chai, số lượng, giá, ngày nhận, SĐT, địa chỉ...

---

## Mỗi khi sửa code Apps Script
Phải deploy lại thì thay đổi mới có hiệu lực:
**Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.**
(URL `.../exec` giữ nguyên, không đổi.)

## Vẫn không được?
Nhắn mình. Ngoài Apps Script, mình có thể chuyển sang cách **Google Form**
(khách điền gián tiếp, đơn tự đổ về Sheet) — cách này không cần cấu hình
quyền truy cập nên khó sai hơn, phù hợp nếu bạn không rành kỹ thuật.
