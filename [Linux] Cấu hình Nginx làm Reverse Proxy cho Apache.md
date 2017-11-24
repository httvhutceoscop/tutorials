# Cấu hình Nginx làm Reverse Proxy cho Apache

## 1.Cài đặt Apache

Nếu VPS chưa được cài đặt Apache thì bạn dùng lệnh sau để cài đặt:

```
yum install httpd httpd-devel
```

## 2. Cấu hình Reverse Proxy trên Apache

Chỉnh cổng mặc định 80 của Apache thành 8080

```
nano /etc/httpd/conf/httpd.conf
```

Tìm dòng `Listen 80` và thay bằng `Listen 8080`

Sau đó, di chuyển đến cuối file và dán những dòng sau vào để tạo mới một virtual host:

```
NameVirtualHost *:8080

<VirtualHost *:8080>
   ServerName example.com
   ServerAlias www.example.com
   DocumentRoot /var/www/html
       <Directory "/var/www/html">
               Options FollowSymLinks -Includes
               AllowOverride All
               Order allow,deny
               Allow from all
       </Directory>
       RewriteEngine on
</VirtualHost>
```

Lưu lại file cấu hình và khởi động lại Apache

```
service httpd restart
```

## 3. Cài đặt Nginx

Thêm repo EPEL

```
yum install epel-release
```

Cài đặt Nginx

```
yum install nginx
```

## 4. Cấu hình Reverse Proxy trên Nginx

Tạo Nginx virtual host

```
nano /etc/nginx/conf.d/example.com.conf
```

với nội dung như bên dưới:

```
server {
   listen 80;
   server_name example.com;
   access_log off;
   error_log off;

   location / {
      client_max_body_size 10m;
      client_body_buffer_size 128k;

      proxy_send_timeout 90;
      proxy_read_timeout 90;
      proxy_buffer_size 128k;
      proxy_buffers 4 256k;
      proxy_busy_buffers_size 256k;
      proxy_temp_file_write_size 256k;
      proxy_connect_timeout 30s;

      proxy_redirect http://www.example.com:8080 http://www.example.com;
      proxy_redirect http://example.com:8080 http://example.com;

      proxy_pass http://127.0.0.1:8080/;

      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }

   # Select files to be deserved by nginx
   location ~* ^.+\.(jpg|jpeg|gif|css|png|js|ico|txt|srt|swf|zip|rar|html|htm|pdf)$ {
      root /var/www/html;
      expires 30d; # caching, expire after 30 days
   }
}
```

Kiểm tra và khởi động lại Nginx

```
nginx -t
service nginx restart
```

## 5. Cài đặt module Reverse Proxy And Forward cho Apache

Để Apache có thể hiểu được traffic đang đến từ đâu, chúng ta cần cài thêm module rpaf (Reverse Proxy And Forward). rpaf sẽ nhận X-Forwarded-For header từ proxy server và điều chỉnh lại remote address của client.

Cài đặt httpd-devel và gcc để compile source:

```
yum install httpd-devel gcc
```

Tải về mod_rpaf.

```
wget http://mirror.trouble-free.net/sources/mod_rpaf-0.6.tar.gz
tar zxvf mod_rpaf-0.6.tar.gz
cd mod_rpaf-0.6
apxs -i -c -n mod_rpaf-2.0.so mod_rpaf-2.0.c
```

Tiếp theo bạn hãy tạo file cấu hình cho mod_rpaf

```
nano /etc/httpd/conf.d/mod_rpaf.conf
```

Với nội dung như sau (chú ý thay 1.2.3.4 bằng IP server của bạn):

```
LoadModule rpaf_module modules/mod_rpaf-2.0.so

# mod_rpaf Configuration

RPAFenable On
RPAFsethostname On
RPAFproxy_ips 1.2.3.4
RPAFheader X-Forwarded-For
```

Cuối cùng khởi động lại Apache là xong

```
service httpd restart
```

## 6. Kiểm tra kết quả

Nếu cài đặt thành công, khi truy cập vào domain example.com chúng ta sẽ thấy trang mặc định của Apache

# Comment

Bài viết khá tốt, tuy nhiên mình nghĩ bạn nên sửa lại 2 điểm trong bài viết.
2. Cấu hình Reverse Proxy trên Apache -> đổi thành cấu hình Virtual Host trên Apache.
Phần về cài đặt thêm module rpaf. rpaf sẽ thay cái giá trị "Remote_Addr", lúc này đang là IP của Proxy thành cái giá trị của header "X-Forwarded-For". Tuy nhiên, việc cài này có cần thiết không cũng nên cân nhắc tuỳ từng context.
Đối với các app PHP, người ta thường check header "HTTP_X_FORWARDED_FOR" trước khi check "REMOTE_ADDR", do đó nếu script có rồi thì cũng k cần thiết cài. Việc cài thêm module sẽ tốn khá nhiều RAM, hơn nữa ít khi trên production bật access_log của Apache. Thường họ sẽ bật access_log của Nginx vì con này làm việc nhẹ, chỉ forward đi, forward lại (access_log thường dùng phân tích dải IP truy cập, chống DDOS, ...). Còn Apache do phải xử lý script nên chỉ bật error_log mà thôi.
Ngoài ra, hiện bạn đang để RPAFheader X-Forwarded-For, nếu có 1 con load-balancer đứng ngoài nữa thì Remote_Adrr = X-Forwarded-For = $proxy_add_x_forwarded_for = a.a.a.a, b.b.b.b, ... với b.b.b.b là IP của con load-balancer. Do đó, để lấy IP thực là a.a.a.a thì nên đổi RPAFheader X-Real-IP (hoặc X-Forwarded-For $remote_addr).
Và rpaf = Reverse Proxy Add Forward (không phải Reverse Proxy And Forward), tiếng Anh có nghĩa là sử dụng header thêm X-Forwarded-For của Proxy, lấy giá trị của nó thế vào header "Remote_Addr". Cái này là do lịch sử, các header như X-Forwarded-For, X-Forwarded-Proto[, X-Csrf-Token ... là các header non-standard, không phải webserver nào cũng implement nó.

Mô hình sử dụng Proxy thì có nhiều mục đích: ví dụ như làm LoadBalancer (phải config cả Proxy + Reverse Proxy), làm gateway khi serve dynamic content và static file, ...
Ví dụ ở trường hợp thứ 2: NginX serve static file nhanh hơn rất nhiều Apache (hỗ trợ cache file, ...) trong khi lại khá kém khi serve dynamic do nó phải "giao thông" với 1 app khác (ví dụ như PHP-CGI, PHP-FPM, ...) trong khi Apache lại làm việc này xuất sắc hơn (nó là một module bên trong nên đỡ phải tốn các bước giao thông, marshaling/unmarshaling này nọ, ...). Khi đó, bạn thiết lập Nginx serve static ở 1 folder static, còn serve dynamic thì lấy từ Apache (vừa là webserver, vừa là proxy)