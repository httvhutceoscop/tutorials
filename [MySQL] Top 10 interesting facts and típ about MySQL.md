# Interesting facts and tips about MySQL

## 1.
MySQL hỗ trợ lên tới 64 indexes trên 1 table. Mỗi index có thể bao gồm 1 tới 16 columns. Kích thước index tối đa là 1000 bytes (767 đối với InnoDB).

## 2.
Kích thước tối đa của 1 row trong 1 table là 65,535 bytes. Và giá trị tối đa của Signed Integer là 2,147,483,647 và Unsigned Integer là 4,294,967,295. Khi table kết hợp cả CHAR và VARCHAR, thì MySQL sẽ đổi CHAR’s sang VARCHAR’s.

## 3.
 Nếu index kiểu PRIMARY KEY hoặc UNIQUE bao gồm chỉ 1 cột có kiểu integer, thì bạn cũng có thể tham khảo column “_rowid” trong câu lệnh `SELECT`.

## 4.
Để thay đổi giá trị của `AUTO_INCREMENT`, thì sử dụng `ALTER TABLE <Tablename> AUTO_INCREMENT = value;` hoặc `SET INSERT_ID = value;`

## 5.
Để giới hạn MySQL truy cập công khai thì sử dụng option `skip-networking` trong config file. Khi option được enabled, MySQL chỉ lắng nghe các kết nối socket ở local và bỏ qua tất cả các TCP ports. Và tham số `bind-address` thiết lập giá trị “127.0.0.1” sẽ giới hạn MySQL chỉ có thể truy cập từ localhost.

## 6.
Nếu MySQL có nhiều connect được thiết lập (VD: một website không có các kết nối liên tục), thì bạn có thể cải thiện performance bằng cách thiết lập `thread_cache_size` khác giá trị non-zero. 16 là 1 giá trị thích hợp. Tăng giá trị `threads_created` cũng không tăng nhanh performance được.

## 7.
NO_AUTO_VALUE_ON_ZERO không áp dụng AI cho 0. Chỉ NULL tạo ra số kế tiếp. Mode nay có thể hữu ích nếu 0 được lưu trong cột AUTO_INCREMENT của table. (Nhân tiện, việc lưu số 0 không được khuyến khích.)

## 8.
Thiết lập các options `innodb_analyze_is_persistent`, `innodb_stats_persistent_sample_pages` và `innodb_stats_transient_sample_pages` cung cấp cải thiện các thống kê chỉ mục và tính nhất quán khi MySQL restart. InnoDB tính toán trước số liệu thống kê nhằm giúp tối ưu hóa indexs trong câu truy vấn, bằng cách lấy mẫu 1 phần của index. Bạn có thể điều chỉnh lượng lấy mẫu mà InnoDB thực hiện cho từng index. Các kết quả thống kê được lưu lại trên máy chủ thay vì được tính toán lại do việc restart hay 1 vài events thực thi runtime. Các thống kê càng chính xác thì truy vấn càng nhanh. Khi tính năng thống kê được bật, thì các thống kê chỉ tính toán lại khi chạy ANALYZE TABLE đối với table.

## 9.
InnoDB giải phóng bộ nhớ liên kết với các bảng đang open và xóa bộ nhớ được tải trên hệ thống với số lượng lớn các table. Thuật toán LRU lựa chọn các table đã đi lâu nhất mà không được truy cập. Để dự trữ bộ nhớ cho các table đang mở, hãy tăng giá trị thiết lập của option `–table_definition_cache=#`.

## 10. 
 Thiết lập tham số `table_cache` để khớp số lượng tables đang mở và các kết nối đồng thời. Theo dõi giá trị `open_tables` và nếu nó tăng nhanh thì bạn cần tăng kích thước của `table_cache`. Và với tham số `open_file_limit` thiết lập giới hạn như sau `20+max_connections+table_cache*2`. Nếu bạn có các câu query phức tạp “sort_buffer_size” và “tmp_table_size” có thể là rất quan trọng. Các giá trị phụ thuộc vào các tài nguyên có sẵn và độ phức tạp của query, 4Mb và 32Mb được khuyến khích sử dụng.

Note: These are “per connection” values. So, consider your load and available resource when setting these parameters. For example sort_buffer_size is allocated only if MySQL needs to do a sort, be careful not to run out of memory.