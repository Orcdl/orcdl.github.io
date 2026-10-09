# Hướng dẫn cài đặt website đặt hàng · Tạp hóa thiên nhiên

Website gồm đúng 2 thứ: file `index.html` và thư mục `img/` (ảnh). Không có máy chủ riêng, đơn hàng gửi về email qua dịch vụ Web3Forms.

Làm lần lượt 5 bước dưới đây. Bước 1 đến 4 làm một lần, bước 5 dùng mỗi khi đổi giá hay thêm món.

---

## Bước 1 · Lấy access key Web3Forms và dán vào trang

1. Mở **https://web3forms.com**.
2. Ở ô "Create your Access Key", nhập **email bạn muốn nhận đơn** rồi bấm nút tạo key.
3. Mở hộp thư đó, tìm email của Web3Forms, copy dãy mã dạng `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
4. Mở file `index.html` bằng Notepad (Windows) hoặc TextEdit (Mac), bấm Ctrl+F / Cmd+F tìm chữ `WEB3FORMS_KEY`. Bạn sẽ thấy dòng:

   ```js
   WEB3FORMS_KEY: 'DAN-ACCESS-KEY-WEB3FORMS-VAO-DAY',
   ```

5. Thay phần trong dấu nháy bằng key vừa copy, giữ nguyên hai dấu nháy `'` và dấu phẩy cuối dòng:

   ```js
   WEB3FORMS_KEY: 'a1b2c3d4-1234-5678-9abc-def012345678',
   ```

6. Lưu file.

Lưu ý:
- Key này chỉ dùng để gửi email về hộp thư của bạn, để lộ trên web là bình thường.
- Gói miễn phí của Web3Forms giới hạn số email mỗi tháng (xem con số hiện tại trên trang của họ). **Mỗi ngày giao trong một đơn tính là 1 email.** Khi hết hạn mức, khách sẽ thấy màn hình "Đơn chưa gửi được" và nút **Gửi qua Zalo**, nên đơn không bị mất.

---

## Bước 2 · Đưa lên GitHub Pages

Bạn đã có sẵn kho `Orcdl/orcdl.github.io`, địa chỉ web là **https://orcdl.github.io**.

1. Đăng nhập GitHub, mở kho **orcdl.github.io**.
2. Bấm **Add file → Upload files**.
3. Kéo thả file `index.html` và **cả thư mục** `img` vào khung tải lên.
4. Kéo xuống dưới, bấm **Commit changes**.
5. Chờ 1 đến 2 phút rồi mở https://orcdl.github.io trên điện thoại để xem.

Lưu ý:
- File `index.html` mới sẽ **thay trang chủ COOL BREW hiện tại**. Trang cũ vẫn còn nguyên ở https://orcdl.github.io/coldbrew.html.
- Nếu sau này dùng tên miền khác, mở `index.html`, tìm `og:url` và `og:image` ở đầu file rồi đổi `https://orcdl.github.io` thành địa chỉ mới, để link chia sẻ lên Facebook/Zalo vẫn hiện ảnh.
- Facebook hay nhớ ảnh cũ của link. Muốn làm mới: mở https://developers.facebook.com/tools/debug, dán link web, bấm **Scrape Again**.

---

## Bước 3 · Tạo bộ lọc Gmail theo ngày giao

Mỗi email đơn có tiêu đề bắt đầu bằng thứ giao hàng, ví dụ:

```
[T6 09/10] THN-0910-AB12 · 7 chai · FREESHIP · Nguyễn Văn A
```

Tạo 7 nhãn, mỗi nhãn một thứ, để sáng ra mở nhãn hôm đó là thấy hết đơn cần làm.

Làm trên máy tính, lặp lại cho từng thứ **T2, T3, T4, T5, T6, T7, CN**:

1. Mở Gmail, bấm biểu tượng **thanh trượt** ở cuối ô tìm kiếm (Hiển thị tùy chọn tìm kiếm).
2. Ô **Chủ đề** (Subject): gõ `"[T2"` (có cả dấu ngoặc kép).
3. Ô **Từ** (From) có thể để trống. Bấm **Tạo bộ lọc**.
4. Tích **Áp dụng nhãn** → **Nhãn mới** → đặt tên `Giao T2` → Tạo.
5. Nên tích thêm **Không bao giờ gửi vào Spam**. Bấm **Tạo bộ lọc**.

Làm xong sẽ có 7 nhãn: Giao T2, Giao T3, Giao T4, Giao T5, Giao T6, Giao T7, Giao CN.

Mỗi sáng: mở nhãn của hôm đó, mỗi email là một chuyến giao, tiêu đề đã ghi sẵn số chai và có FREESHIP hay không. Cộng số chai các email lại là ra số cần nấu.

---

## Bước 4 · Gửi thử một đơn để kiểm tra

Mở web trên điện thoại và đặt một đơn gồm **2 ngày giao, trong đó 1 ngày đủ 7 chai**. Ví dụ:

1. Tab **Cold brew & cốt dâu**: thêm **Combo Nhà**, chọn hạt Đậm, ngày giao **ngày mai**, số lượng 1.
2. Tab **Sữa nấu tươi**: thêm **Sữa yến mạch lắc dâu tây**, chọn ngày **ngày kia**, số lượng **7**.
3. Bấm **Xem giỏ**. Kiểm tra:
   - Có 2 phiếu đơn, mỗi phiếu một ngày.
   - Phiếu ngày mai: 2 chai (combo tính 2 chai), dòng "Thêm 5 chai nữa để được freeship".
   - Phiếu ngày kia: 7 chai, nhãn **FREESHIP**, giá 7 × 25.000đ = 175.000đ, có dòng "Đã giảm 35.000đ".
4. Nhập họ tên, số điện thoại, địa chỉ, chọn khu vực giao **Đến 3 km**, chọn hình thức thanh toán, ghi chú "ĐƠN THỬ". Kiểm tra phần tổng: Tiền hàng 354.000đ, Phí ship 15.000đ (chỉ tính cho ngày mai), Tổng tiền 369.000đ. Rồi bấm **Gửi đơn**.
5. Màn hình cảm ơn hiện mã đơn dạng `THN-0910-AB12`.
6. Mở Gmail, phải thấy **2 email cùng mã đơn**:
   - Email ngày mai: tiêu đề **không** có chữ FREESHIP, trong thư có dòng `Phí ship: 15.000đ` và `Tổng thu ngày này: 194.000đ`.
   - Email ngày kia: tiêu đề có `7 chai · FREESHIP`, trong thư có dòng `Phí ship: Freeship`.
   - Cả hai thư có dòng "Đơn này có 2 ngày giao".
   - Mỗi thư tự vào đúng nhãn thứ của nó.

Không thấy email: xem mục Spam, rồi kiểm tra lại key ở bước 1 (thiếu ký tự, thừa dấu cách). Nếu web báo "Đơn chưa gửi được" ngay cả khi mạng tốt thì gần như chắc chắn là key sai.

---

## Bước 5 · Sửa giá, thêm món, đổi mức freeship

Mọi thứ nằm trong khối `CONFIG` ở gần cuối file `index.html` (tìm chữ `const CONFIG`). Sửa xong lưu file, tải lại `index.html` lên GitHub như bước 2.

Quy tắc khi sửa: giá viết liền, không dấu chấm (`65000`, không viết `65.000`). Giữ nguyên dấu nháy `'...'` và dấu phẩy cuối dòng.

### Đổi giá

Tìm tên món, sửa số sau `price:`.

```js
{ id: 'bi-do', ... name: 'Bí đỏ – hạt kê – hạt điều', ... price: 65000, bottles: 1, ... },
```

Giá theo bậc nằm ở `tier`:

```js
// Sữa yến mạch lắc dâu: từ 4 chai thì mọi chai 25.000đ
price: 30000, tier: { type: 'all', min: 4, price: 25000 },

// Chai lắc dâu: cứ 4 chai 145.000đ, phần lẻ 39.000đ/chai
price: 39000, tier: { type: 'pack', size: 4, price: 145000 },
```

Phụ phí Moka: `MOKA_FEE: { '500ml': 20000, '1L': 35000 }`.
Gói tuần: `price: 185000, listPrice: 195000, tag: 'Tiết kiệm 10k'`.

### Hết hạt Moka

```js
MOKA_AVAILABLE: false,   // hiện "Tạm hết", khách không chọn được
```

Có lại thì đổi thành `true`.

### Đổi số chai để được freeship

```js
FREESHIP_MIN_BOTTLES: 7,   // từ 7 chai cùng ngày giao thì freeship
```

Đổi thành `6` nếu muốn từ 6 chai. Dòng thông báo đầu trang, câu hỏi đáp và thước đo trong giỏ tự đổi theo.
Số chai mỗi món đóng góp nằm ở `bottles:` của món đó (combo đang là `2`).

### Đổi phí ship theo khu vực

Trong giỏ hàng khách bắt buộc chọn khu vực giao. Web cộng phí ship vào tổng tiền, **mỗi ngày giao chưa đủ chai freeship tính 1 lần**.

```js
SHIP_FROM: 'trung tâm Đà Lạt',
SHIP_ZONES: [
  { id: 'z1', name: 'Đến 3 km',   fee: 15000, areas: 'Phường 1, 2, 6, ...' },
  { id: 'z2', name: '3–5 km',     fee: 25000, areas: 'Hồ Xuân Hương, phường 3, ...' },
  ...
  { id: 'z5', name: 'Trên 10 km', fee: null,  areas: 'Thái Phiên, Trại Mát, Xuân Thọ, Tà Nung' },
],
```

- Đổi phí: sửa số sau `fee:`. `fee: null` nghĩa là shop báo phí riêng, web không cộng vào tổng và ghi rõ "chưa gồm phí ship".
- Đổi tên khu vực khách nhìn thấy: sửa `name:` và `areas:`.
- Thêm hoặc bớt khu vực: copy hoặc xóa nguyên một dòng, `id` phải khác nhau.
- `SHIP_FROM` là điểm xuất phát hiện cho khách xem dưới danh sách khu vực và trong mục Hỏi đáp. Đang ghi chung là trung tâm Đà Lạt; số km thật được tính từ nhà của shop.

Mức phí hiện tại bám theo giá GrabExpress xe máy tại Lâm Đồng (ước tính từ bảng giá tháng 07/2026). Email đơn có thêm dòng `Khu vực: ...` để bạn đối chiếu với địa chỉ khách ghi.

### Hình thức thanh toán và tài khoản nhận chuyển khoản

Trong giỏ hàng khách bắt buộc chọn 1 trong 2: **Chuyển khoản trước** hoặc **Tiền mặt khi nhận hàng**. Email đơn có dòng `Thanh toán: ...`.

Khách chọn chuyển khoản thì sau khi gửi đơn, màn hình cảm ơn hiện mã QR, số tài khoản, số tiền và nội dung chuyển khoản (chính là mã đơn). Khi thấy tiền về, bạn dò nội dung chuyển khoản với mã đơn trong email.

Đổi tài khoản: sửa khối `BANK`, và thay ảnh QR trong thư mục `img/` (giữ tên `qr-vietinbank.jpg`, hoặc đổi tên ở dòng `qr:`).

```js
BANK: {
  name: 'VietinBank',
  branch: 'CN Nam Đà Nẵng - Hội sở',
  account: '100887872745',
  holder: 'LE THI MINH TAM',
  qr: 'qr-vietinbank.jpg',
},
```

Muốn bỏ một hình thức thì xóa dòng tương ứng trong `PAYMENT_METHODS`.

Lưu ý: mã QR là ảnh tĩnh nên chưa có sẵn số tiền, khách tự nhập. Số tiền hiện ra đã gồm phí ship theo khu vực khách chọn; riêng khu vực "báo riêng" thì chỉ là tiền hàng và web ghi rõ chưa gồm phí ship.

### Đổi giờ chốt đơn, ngày nấu

```js
CUTOFF_HOUR: 10, CUTOFF_MINUTE: 0,   // chốt đơn 10:00
```

Ngày nấu của từng vị sữa hạt là `cookDay:` (1 = thứ hai, 3 = thứ tư, 5 = thứ sáu, 0 = chủ nhật).

### Thêm món mới

Copy nguyên một dòng món cùng nhóm, dán xuống ngay dưới, rồi sửa. `id` phải khác mọi món khác, viết không dấu, không khoảng trắng. Ví dụ thêm một chai cốt dâu 250ml:

```js
{ id: 'cot-dau-250', type: 'syrup', rule: 'nextday', name: 'Cốt dâu 250ml', size: '250ml', yield: 'Pha khoảng 12 ly',
  price: 55000, bottles: 1, img: 'cot-dau-hu.png' },
```

- `type` quyết định món hiện ở đâu: `nut` (sữa hạt), `daily` (món mỗi ngày), `coldbrew` (menu cold brew), `syrup` (cốt dâu).
- `rule` quyết định ngày giao: `cookday` (chỉ ngày nấu), `sameday` (đặt trước 10h, giao trong ngày), `nextday` (đặt trước 1 ngày).
- Món có cold brew thêm `needsBean: true`. Combo cho chọn Moka thêm `moka: '500ml'` hoặc `moka: '1L'`.
- Ảnh: bỏ file ảnh vào thư mục `img/`, ghi đúng tên file ở `img:`. Nhớ tải cả ảnh lên GitHub.

### Thay ảnh sản phẩm

Ảnh hiện tại cắt từ poster nên độ phân giải thấp. Khi có ảnh gốc, lưu **đúng tên file cũ** trong thư mục `img/` rồi tải lên là xong, không cần sửa code.

### Thử trước giờ chốt đơn (không bắt buộc)

Muốn xem web hiển thị thế nào vào một thời điểm khác, đặt tạm:

```js
TEST_NOW: '2026-10-09T10:30',   // giả lập 10:30 ngày 09/10 theo giờ Việt Nam
```

Thử xong **phải trả về** `TEST_NOW: '',` trước khi đưa lên web thật.

---

## Hỏi nhanh

- **Khách ở nước ngoài hay để sai giờ điện thoại thì sao?** Web luôn tính ngày và giờ chốt đơn theo giờ Việt Nam.
- **Khách tải lại trang thì giỏ có mất không?** Có. Web không lưu gì trên máy khách.
- **Phí ship có cộng vào tổng không?** Có. Khách chọn khu vực giao trong giỏ, web cộng phí ship vào tổng tiền. Chỉ khu vực trên 10 km là shop báo riêng khi xác nhận đơn.
- **Khách chọn sai khu vực thì sao?** Email đơn ghi cả địa chỉ và khu vực khách chọn. Thấy lệch thì bạn báo lại phí đúng khi gọi xác nhận đơn.
