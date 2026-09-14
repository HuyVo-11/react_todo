# Tài liệu Kiến trúc & Hướng dẫn Clone MasterLayout
Tài liệu này miêu tả chi tiết cấu trúc, luồng hoạt động, các phụ thuộc (dependencies) và hướng dẫn từng bước để bạn có thể dễ dàng sao chép (clone) hoặc tái sử dụng layout này sang một module/dự án mới.
---
## 1. Tổng quan kiến trúc (Architecture Overview)
`MasterLayout` là khung giao diện chính (Admin Shell) dành cho các trang sau khi người dùng đã đăng nhập. Layout được xây dựng trên nền tảng **Ant Design v5** và **React Router v6**, bao gồm 3 khu vực chính:
```
+-----------------------------------------------------------------------------------+
|  [Logo / Compact Logo]  |  [Toggle]                          [Avatar + User Menu] |  <-- AppHeader (Fixed Top)
+-------------------------+---------------------------------------------------------+
|                         |                                                         |
|  [NavSider (Sidebar)]   |  [Main Content (Scrollable)]                            |
|                         |  - Fullscreen Loading (Spin)                            |
|  - Menu cấp 1           |  - Phân quyền (RBAC check 403 Forbidden)                |
|  - Submenu cấp 2, 3     |  - Router Outlet / Children page components             |
|  - Lọc theo Role        |                                                         |
|  - Tự động active menu  |                                                         |
|  - Collapse 240px/80px  |                                                         |
|                         |                                                         |
+-----------------------------------------------------------------------------------+
```
### Sơ đồ luồng Component (Component Tree)
```
MasterLayout (index.js)
├── Spin (Hiển thị loading toàn trang qua Redux)
└── Layout (Container cha, class: styles.masterLayout)
    ├── NavSider (Thanh menu bên trái - Fixed)
    │   ├── Link / Logo (Logo đầy đủ hoặc Compact khi thu gọn)
    │   └── Menu (Ant Design dark theme, tự động active & expand theo URL)
    └── Layout (Vùng bên phải, dynamic margin-left: 240px hoặc 80px)
        ├── AppHeader (Thanh header trên cùng - Fixed)
        │   ├── Icon Toggle (MenuFold / MenuUnfold)
        │   └── Menu (User dropdown: Thông tin tài khoản, Đăng xuất)
        └── Content (Vùng nội dung cuộn độc lập)
            └── contentWrapper
                ├── canAccess() === true  => {children}
                └── canAccess() === false => <Result status="403" />
```
---
## 2. Cấu trúc thư mục (File Structure)
```
src/components/Layout/MasterLayout/
├── index.js                  # Component điều phối chính (Auth check, RBAC, Layout skeleton)
├── index.module.scss         # Style layout cha, kích thước cuộn, thanh scrollbar
├── AppHeader.js              # Header cố định phía trên, nút thu phóng Sider, menu User
├── AppHeader.module.scss     # Style header, avatar, responsive menu top-right
├── NavSider.js               # Thanh sidebar điều hướng cố định bên trái, logic menu động
├── NavSider.module.scss      # Style sider, kích thước logo
└── README.md                 # Tài liệu này
```
---
## 3. Chi tiết từng Component
### 3.1. `MasterLayout/index.js` (Component điều phối)
* **Nhiệm vụ chính:**
  1. **Quản lý trạng thái thu phóng Sider:** `const [navSiderCollapsed, setNavSiderCollapsed] = useState(false);`
  2. **Bảo vệ quyền truy cập (RBAC):** Dùng hook `useAuth()` và `useCurrentPath()` để kiểm tra route hiện tại yêu cầu role nào. Nếu user không có quyền, render `<Result status="403" />`.
  3. **Đồng bộ thông tin Profile:** Khi `isAuthenticated === true`, gọi `accountActions.getProfile()` để lưu thông tin tài khoản và role vào Redux/Cookie.
  ```
### 4.3. Constants & Routes
* **`@/constants/paths.js`**: Chứa danh sách URL (vd: `paths.login`, `paths.profile`, `paths.dashboard`).
* **`@/constants/menuConfig.js`**: Danh sách cấu hình menu dạng mảng đối tượng:
  ```javascript
  const navMenuConfig = [
      {
          label: 'Tổng quan',
          icon: <BarChartOutlined />,
          path: '/dashboard',
      },
      {
          label: 'Quản lý',
          icon: <SettingOutlined />,
          children: [
              { label: 'Người dùng', path: '/users' },
              { label: 'Phân quyền', path: '/roles' },
          ]
      }
  ];
  ```
* **`@/routes/routes.js`**: Định nghĩa danh sách routes kèm quyền (`roles`):
  ```javascript
  const routes = [
      { path: '/dashboard', component: DashboardPage, roles: ['ADMIN', 'TEACHER'] },
      { path: '/users', component: UserListPage, roles: ['ADMIN'] },
  ];
  ```
### 4.4. Custom Hooks
* **`useAuth()`**: Cung cấp:
  * `isAuthenticated`: boolean.
  * `user`: Object thông tin user (vd: `{ fullName, role: { code, name } }`).
  * `hasRoles(requiredRoles)`: Hàm kiểm tra user có role trong danh sách không.
  * `logout()`: Hàm xử lý logout token & cookie.
* **`useCurrentPath()`**:
  ```javascript
  import { useLocation, matchRoutes } from 'react-router-dom';
  import routes from '@/routes/routes';
  const useCurrentPath = () => {
      const location = useLocation();
      const matched = matchRoutes(routes, location);
      const route = matched?.[0]?.route || {};
      return { path: route.path, roles: route.roles };
  };
  export default useCurrentPath;
  ```

                width={240}
                style={{ position: 'fixed', left: 0, height: '100vh', zIndex: 2 }}
            >
                <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                    {collapsed ? 'CMS' : 'MY CMS APP'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            {/* 2. Vùng Content & Header (bù margin-left) */}
            <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
                {/* Header cố định */}
                <Header style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: `calc(100% - ${collapsed ? 80 : 240}px)`,
                    height: 60,
                    zIndex: 1,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                    <span onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', fontSize: 18 }}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar icon={<UserOutlined />} />
                        <span>Admin</span>
                    </div>
                </Header>
                {/* Content cuộn độc lập */}
                <Content style={{ margin: '84px 24px 24px', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default StandaloneMasterLayout;
```
---
## 7. Các điểm lưu ý quan trọng (Gotchas & Best Practices)
1. **Fixed Position & Margin bù đắp:**
   - Cả `NavSider` và `AppHeader` đều dùng `position: fixed`.
   - Vì vậy, container nội dung (`<Layout style={{ marginLeft: ... }}>`) **bắt buộc** phải có `marginLeft` tương ứng (`240px` khi mở, `80px` khi đóng) để không bị Sider che mất.
   - Nội dung `<Content>` cần có `margin-top: $heighAppHeader` để không bị Header đè lên.
2. **Scroll độc lập:**
   - Sider có `overflow: auto` để khi menu quá dài thì cuộn riêng trên Sider mà không ảnh hưởng nội dung trang.
   - Vùng `app-content` có thanh cuộn riêng với class tùy biến `::-webkit-scrollbar`.
3. **Responsive Mobile / Tablet:**
   - Nếu thu nhỏ trình duyệt trên màn hình nhỏ (< 768px), bạn nên tự động kích hoạt `collapsed = true` hoặc dùng Drawer thay cho Sider cố định.
