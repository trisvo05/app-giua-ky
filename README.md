# PlannerApp

Ứng dụng quản lý kế hoạch cá nhân bằng React Native CLI và TypeScript. Dữ liệu được lưu cục bộ bằng AsyncStorage.

## Chạy trên Android

Yêu cầu Node.js 22.11+, JDK 17, Android SDK và emulator hoặc thiết bị Android.

```bash
npm install
npx react-native start
```

Mở terminal khác:

```bash
npx react-native run-android
```

## Kiểm tra

```bash
npx tsc --noEmit
npx eslint App.tsx src
npm test -- --runInBand
```

## Cấu trúc

- `src/screens`: danh sách, form thêm/sửa và chi tiết công việc.
- `src/components`: card, badge, tiến độ, bộ lọc và nút dùng chung.
- `src/context`: state chung và đồng bộ AsyncStorage.
- `src/services`: đọc và ghi dữ liệu.
- `src/utils`: xử lý ngày, quá hạn, lọc, tìm kiếm và sắp xếp.
- `src/data`: sáu công việc mẫu, chỉ tạo khi storage chưa có dữ liệu.
- `src/theme`, `src/types`, `src/navigation`: giao diện, kiểu dữ liệu và điều hướng.

Ứng dụng giữ tên component native `GiuaKy` của project ban đầu để không phải thay đổi cấu hình Android/iOS; tên hiển thị là `PlannerApp`.
