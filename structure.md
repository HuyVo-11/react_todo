# Cấu trúc dự án React Todo

Dưới đây là cây thư mục và giải thích chi tiết về cấu trúc của dự án `react_todo`:

```text
react_todo/
├── node_modules/           # Chứa các thư viện phụ thuộc (dependencies) được cài đặt qua npm
├── public/                 # Chứa các file public không qua Webpack (như index.html, favicon, icon)
├── src/                    # Thư mục mã nguồn chính của ứng dụng, nơi bạn sẽ làm việc nhiều nhất
│   ├── components/         # Chứa các component dùng chung, có thể tái sử dụng ở nhiều nơi
│   │   └── layout/         # Các thành phần cấu trúc giao diện chung (header, sidebar, footer...)
│   │       └── MasterLayout.jsx
│   ├── constants/          # Chứa các hằng số, biến cấu hình tĩnh của hệ thống
│   │   ├── menuConfig.jsx  # Cấu hình danh sách menu hiển thị
│   │   └── paths.jsx       # Định nghĩa các đường dẫn (route paths)
│   ├── containers/         # Chứa các component đại diện cho một trang (Pages/Views), thường có trạng thái phức tạp
│   │   └── todo/           # Tính năng quản lý Todo
│   │       ├── AllTodo.jsx         # Trang hiển thị toàn bộ task
│   │       ├── TodoCompleted.jsx   # Trang hiển thị các task đã hoàn thành
│   │       └── TodoPending.jsx     # Trang hiển thị các task chưa hoàn thành
│   ├── routes/             # Chứa logic và cấu hình định tuyến (React Router)
│   │   ├── AppRoutes.jsx   # Khởi tạo cây routing cho toàn bộ ứng dụng
│   │   └── routes.jsx      # Định nghĩa map các component với URL tương ứng
│   ├── services/           # Thư mục chứa các logic giao tiếp với Backend/API (axios, fetch) (hiện đang trống)
│   ├── App.css             # Style của App component
│   ├── App.jsx             # Component gốc bao bọc toàn bộ ứng dụng (Root Component)
│   ├── App.test.jsx        # File test của App
│   ├── index.css           # File style toàn cục (Global CSS)
│   ├── index.js            # Điểm vào chính của ứng dụng (Entry point), mount React app vào DOM
│   ├── logo.svg            # Hình ảnh logo 
│   ├── reportWebVitals.js  # Chứa code đo lường hiệu suất
│   └── setupTests.js       # Cấu hình để chạy unit test
├── .gitignore              # Chỉ định các file/thư mục không đưa lên Git
├── craco.config.js         # File cấu hình CRACO, dùng để ghi đè cấu hình Webpack mặc định của Create React App
├── Layout-itest-cms.md     # Tài liệu tham khảo layout CMS
├── package-lock.json       # Khoá chính xác phiên bản các thư viện đang dùng để đảm bảo đồng nhất
├── package.json            # Chứa metadata dự án, cấu hình scripts (start, build) và danh sách dependencies
└── README.md               # File hướng dẫn/mô tả dự án chung
```

## Các thành phần cốt lõi:

1. **`src/components/`**: Chứa các UI component có khả năng tái sử dụng ở nhiều nơi, ví dụ TodoItem, TodoForm, Modal, Button, Input và các component layout.
2. **`src/containers/`**: Chứa các component cấp cao đại diện cho từng page/feature.
   Các component này chịu trách nhiệm quản lý state, xử lý logic của page,
   kết hợp các component con và có thể giao tiếp với service/API.

3. **`src/routes/`**:   Chứa cấu hình và logic định tuyến của React Router.
   
   - `routes.jsx`: định nghĩa danh sách route và component tương ứng.
   - `AppRoutes.jsx`: chuyển cấu hình route thành cây `<Routes>` và `<Route>`
     của React Router.

4. **`src/constants/`**: Chứa các giá trị cấu hình cố định được dùng nhiều nơi,
   chẳng hạn như URL paths và menu configuration.
   Việc tập trung các giá trị này giúp tránh hard-code lặp lại
   và dễ dàng thay đổi khi cần.

5. `src/services/`
   Chứa logic giao tiếp với backend/API.
   Ví dụ các hàm gọi GET, POST, PUT, DELETE cho Todo.