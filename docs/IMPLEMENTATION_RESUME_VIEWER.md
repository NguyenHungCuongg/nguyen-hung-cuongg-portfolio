# Báo cáo Triển khai: Chức năng Xem PDF (Resume Viewer)

## 1. Tổng quan
Tài liệu này ghi lại chi tiết quá trình thiết kế, triển khai và các quyết định kỹ thuật (Architecture Decisions) trong quá trình xây dựng tính năng xem trực tiếp file Resume PDF trên trình duyệt (thay vì tải xuống trực tiếp) cho dự án N4C Portfolio.

## 2. Mục tiêu
- **User Experience (UX):** Người dùng có thể xem Resume ngay trên web thông qua route `/resume` riêng biệt mà không bị ép tải file về máy.
- **Giao diện (UI):** Kế thừa toàn bộ ngôn ngữ thiết kế **Neubrutalism** của dự án (border dày, shadow cứng, màu sắc tương phản). 
- **Độc lập:** Trang `/resume` phải đứng độc lập, không bị bao bọc bởi Navbar và Footer của trang chủ.
- **Tính năng phụ trợ:** Hỗ trợ phóng to/thu nhỏ (Zoom), chuyển trang (Pagination), fallback error và nút Download gốc.

---

## 3. Quá trình Triển khai & Cấu trúc File

### 3.1. Phân tách Route (Route Groups)
Để trang `/resume` không bị dính Navbar và Footer của trang chủ, cấu trúc Next.js App Router đã được refactor bằng tính năng **Route Groups**:
- Di chuyển `app/page.tsx` và `app/layout.tsx` (chứa Navbar/Footer) vào trong `app/(main)/`.
- Việc này giúp `app/layout.tsx` gốc ở thư mục root chỉ còn chịu trách nhiệm load font chữ và các tag HTML/Body cơ bản.
- Tạo `app/resume/page.tsx` và `app/resume/layout.tsx` như một route độc lập, hoàn toàn trống trải để dành trọn không gian cho PDF Viewer.

### 3.2. Cài đặt thư viện
Sử dụng thư viện `react-pdf` (dựa trên Mozilla's `pdf.js`) để render PDF.
- Packages: `react-pdf` và `pdfjs-dist`.

### 3.3. Xây dựng UI Component (`PdfViewer.tsx`)
Component được thiết kế với 3 phần chính:
1. **Header (Sticky top):** Nút quay lại trang chủ, Tiêu đề, và Nút Download.
2. **Canvas (Main):** Hiển thị skeleton loading (tỷ lệ giấy A4) trong lúc chờ PDF. Sau đó thay thế bằng thẻ `<Document>` và `<Page>` của react-pdf.
3. **Controls (Sticky bottom):** Cụm nút điều hướng trang (ẩn nếu PDF chỉ có 1 trang) và cụm nút Zoom (với giới hạn min 50%, max 200%).
4. **Hiệu ứng:** Áp dụng các class utility của Tailwind (hover:translate, hover:shadow) theo đúng chuẩn `DESIGN.md`.

---

## 4. Các vấn đề phát sinh và Cách khắc phục (Debugging & Error Recovery)

Trong quá trình implement, tính năng đã trải qua nhiều lần fix lỗi để đạt được độ ổn định (Production-ready). Dưới đây là các lỗi và quyết định kỹ thuật đã được đưa ra:

### Sự cố 1: Lỗi Server-Side Rendering (SSR) với `DOMMatrix`
- **Triệu chứng:** Khi truy cập `/resume`, Next.js quăng lỗi 500: `ReferenceError: DOMMatrix is not defined`.
- **Nguyên nhân:** Thư viện `pdf.js` sử dụng các API dành riêng cho trình duyệt (Browser APIs) như `DOMMatrix` và `canvas` ngay tại thời điểm khởi tạo module. Quá trình SSR của Next.js chạy trên Node.js nên không tồn tại các object này.
- **Khắc phục:** 
  - Tạo một component bọc ngoài là `PdfViewerWrapper.tsx`.
  - Sử dụng `next/dynamic` với option `ssr: false` để import `PdfViewer`.
  - Bổ sung UI Skeleton loading chuẩn Neubrutalism vào hàm loading của `dynamic` để tránh layout shift.

### Sự cố 2: Lỗi 204 No Content do xung đột Turbopack
- **Triệu chứng:** Fetch file tĩnh từ thư mục `public/resume/Fullstack.pdf` đôi khi trả về HTTP 204.
- **Nguyên nhân:** Có thể do xung đột cơ chế routing của Next.js dev server khi tên file/folder tĩnh trùng với tên route (`/resume`).
- **Khắc phục ban đầu:** Khởi tạo một Next.js API Route tại `app/api/resume/route.ts` để chủ động đọc file thông qua `fs.promises.readFile` và trả về với header `Content-Type: application/pdf`.
- **Phát sinh phụ:** Node.js `Buffer` khi truyền thẳng vào `NextResponse` bị Next.js drop ngầm (ra 204). Phải chuyển sang dùng `new Response()` của Web API và parse qua `ArrayBuffer`.

### Sự cố 3: Lỗi 0-byte PDF (Internet Download Manager - IDM)
- **Triệu chứng:** Log báo lỗi `InvalidPDFException: The PDF file is empty, i.e. its size is zero bytes.`. Màn hình xám lỗi.
- **Nguyên nhân (Root cause):** Các browser extension quản lý tải xuống (tiêu biểu là IDM) tự động bắt các request có `Content-Type: application/pdf` hoặc `Content-Disposition: attachment/inline`. Khi phát hiện, IDM "cướp" request này để xử lý tải xuống, và trả về cho hàm `fetch()` của trình duyệt một response rỗng (0 bytes).
- **Khắc phục (Stealth Mode):**
  1. Xóa bỏ header `Content-Disposition` khỏi API Route.
  2. Đổi `Content-Type` của API Route thành `application/octet-stream`. Điều này khiến IDM bỏ qua request vì nó trông giống như luồng dữ liệu thô thông thường.
  3. Tại phía Client, thay vì tạo URL và để `react-pdf` tự fetch, ta dùng `fetch()` để lấy raw `ArrayBuffer`, sau đó chuyển thành `Uint8Array` và truyền trực tiếp dữ liệu nhị phân này vào prop `file={pdfData}` của `<Document>`. Quá trình này cắt đứt hoàn toàn việc liên lạc qua URL nhạy cảm.

### Sự cố 4: Cảnh báo Re-render trong React 18 Strict Mode
- **Triệu chứng:** Console báo warning *"File prop passed to `<Document />` changed, but it's equal to previous one..."*
- **Nguyên nhân:** React 18 Strict Mode tự động mount component 2 lần trong môi trường Dev. Hàm `useEffect` chạy 2 lần, gọi 2 lần fetch API, và tạo ra 2 object `Uint8Array` khác nhau về reference (dù giống hệt nhau về nội dung). Thư viện `react-pdf` phát hiện reference thay đổi nhưng nội dung không đổi nên tung cảnh báo.
- **Khắc phục:** 
  - Triển khai `AbortController` bên trong `useEffect`.
  - Khi React ép unmount ở lần chạy đầu, `controller.abort()` được gọi, hủy bỏ kết quả fetch đầu tiên. Nhờ đó, State chỉ được set đúng 1 lần với 1 reference duy nhất.

---

## 5. Kết luận
Chức năng PDF Viewer hiện tại không chỉ đáp ứng tốt về mặt UI/UX theo sát design guideline, mà còn được xử lý triệt để các edge-case kỹ thuật nguy hiểm (SSR crash, IDM hijacking, Strict Mode rerenders). Việc fetch file dưới dạng ArrayBuffer và render trực tiếp từ bộ nhớ là cách triển khai an toàn và hiệu quả nhất cho các ứng dụng Next.js hiện đại.
