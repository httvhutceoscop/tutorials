# Sơ đồ các phương thức chính của React Component Lifecycle
![React Component Lifecycle](https://completejavascript.com/wp-content/uploads/2018/10/react-lifecycle-diagram.png "React Component Lifecycle")

# Sơ đồ đầy đủ các phương thức của React Component Lifecycle
![React Component Lifecycle](https://completejavascript.com/wp-content/uploads/2018/10/react-lifecycle-diagram-full.png "React Component Lifecycle")

# 3 pha chính và các medthod quan trọng
## Mounting
- `constructor()`
    - Gọi đến đầu tiên
    - Mục đích:
        - Khởi tạo sate cho React Component
        - Binding method với **this**
- `render()`
    - Bắt buộc
    - Pure function
    - Lấy data từ **this.props**, **this.state**
- `componentDidMount()` - gọi **1 lần duy nhất** sau khi Component được render xong. Xử lý bên trong:
    - Lấy dữ liệu từ server để cập lại state cho Component.
    - Định nghĩa interval thông qua setInterval để thực hiện một số nhiệm vụ lặp lại.
    - Lấy thông tin liên quan đến DOM node như kích thước thực tế (width, height) – vì lúc này chúng đã được hiển thị lên màn hình.
    - Đăng ký sự kiện: resize, scroll,…

## Updating
- `shouldComponentUpdate()`
- `render()`
    - Có thể gọi hoặc không phụ thuộc `shouldComponentUpdate()`
- `componentDidUpdate()`
    - Được gọi khi update kết thúc
    - Có thể xử lý lấy dữ liệu từ server
    - Xử lý DOM node: ẩn hiện, thay đổi width, height
    - Thay đổi state của Component (cẩn thận lặp vô hạn vì khi gọi `this.setState` thì `componentDidUpdate()` cũng lại được gọi)

## Unmounting
- `componentWillUnmount()`
    - Gọi 1 lần duy nhất
    - Xóa, hủy những gì đã đăng ký ở `componentDidMount()`

# Refs
- https://completejavascript.com/tim-hieu-react-component-lifecycle/