Hướng dẫn này áp dụng cho Ubuntu 14 đến 16.04.

Thực hiện theo các dòng lệnh trong từng bước dưới đây:

# Bước 1:

Cập nhật apt source lists

```
sudo apt-get update
```

# Bước 2:

Tạo Odoo user để sở hữu và chạy ứng dụng

```
sudo adduser --system --home=/opt/odoo --group odoo
```

# Bước 3:

Cài đặt và cấu hình database server, PostgreSQL

```
sudo apt-get install postgresql
```

Khi PostgreSQL đã cài đặt xong. Tiếp theo chúng ta sẽ tạo một user role mới trên PostgreSQL. User này sẽ được sử dụng cho tất cả kết nối cơ sở dữ liệu từ Odoo.

```
sudo su - postgres

createuser --createdb --username postgres --no-createrole --no-superuser --pwprompt odoo
Enter password for new role: *****
Enter it again:*****
```

Hoàn tất việc tạo user. Thoát khỏi postgres user account.

```
exit
```

# Bước 4:

Cài đặt các thư viện Python cần thiết và các thư viện cần thiết khác cho ứng dụng:

Odoo 11 sẽ sử dụng python 3.5. Trước đây nó sử dụng python 2.7. Do đó, để cài đặt tất cả các thư viện phụ thuộc một cách dễ dàng. Chúng ta sẽ cài đặt pip3 trong máy chủ như sau:

```
sudo apt-get install python3-pip
```

Khi pip3 được cài đặt trên máy chủ của bạn. Chúng ta có thể tiến hành cài đặt các thư viện phụ thuộc khác bằng cách sử dụng pip3 như sau:

```
sudo pip3 install Babel decorator docutils ebaysdk feedparser gevent greenlet html2text Jinja2 lxml Mako MarkupSafe mock num2words ofxparse passlib Pillow psutil psycogreen psycopg2 pydot pyparsing PyPDF2 pyserial python-dateutil python-openid pytz pyusb PyYAML qrcode reportlab requests six suds-jurko vatnumber vobject Werkzeug XlsxWriter xlwt xlrd
```

Tiếp theo cài đặt Odoo Web Dependencies:

```
sudo apt-get install -y npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g less less-plugin-clean-css
sudo apt-get install node-less
```

Khi tất cả các thư viện phụ thuộc được cài đặt. Chúng ta tiến hành cài đặt Odoo Server.


# Bước 5:
Cài đặt phiên bản Odoo 11 Community Edition được lưu trữ trên GITHUB theo link bên trên bài viết.
Hãy đảm bảo rằng bạn đã cài đặt GIT trên hệ thống của mình. Và nếu không thì hãy cài đặt bằng lệnh đơn giản:

```
sudo apt-get install git
```

Chuyển sang Odoo user

```
sudo su - odoo -s /bin/bash
```

Clone branch mới từ Odoo. Trong trường hợp này chúng ta chọn branch 11.0 từ GITHUB.

```
git clone https://www.github.com/odoo/odoo --depth 1 --branch 11.0 --single-branch .
```

(Quá trình này có thể mất một thời gian tùy thuộc vào tốc độ kết nối Internet của bạn.)

# Bước 6:

Tiếp theo là tạo file cấu hình cho Odoo. Nhưng trước tiên chúng ta sẽ tạo thư mục để lưu trữ các file log của Odoo khi chạy service và gán quyền sở hữu thích hợp cho nó:

```
sudo mkdir /var/log/odoo

sudo chown odoo:root /var/log/odoo
```

Sau đó tạo file cấu hình cho Odoo. Ứng dụng Odoo sẽ chạy dựa trên file cấu hình này.

```
sudo nano /etc/odoo-server.conf
```

Một file cấu hình đơn giản sẽ có mẫu như sau:

```
[options]
 ; This is the password that allows database operations:
 ; admin_passwd = admin
 db_host = False
 db_port = False
 db_user = odoo
 db_password = False
 logfile = /var/log/odoo/odoo-server.log
 addons_path = /opt/odoo/addons,/opt/odoo/odoo/addons
 ```

Khi file cấu hình đã được tạo. Chúng ta set quyền sở hữu cho nó:

```
sudo chown odoo: /etc/odoo-server.conf
sudo chmod 640 /etc/odoo-server.conf
```

# Bước 7:

Cài đặt boot script cho Odoo. Chúng tao cần tạo 1 instance cho phép khởi động, shutdow hoặc restart service Odoo. Các bạn có thể sử dụng script mẫu (https://raw.githubusercontent.com/mohitg1213/odoo_scripts/master/odoo-server) này và để trong đường dẫn /etc/init.d đặt tên file là odoo-server. Sau đó cho phép thực thi file script và gán quyền cho nó:

```
sudo chmod 755 /etc/init.d/odoo-server

sudo chown root: /etc/init.d/odoo-server
```

# Bước 8 (Tuỳ chọn):

Như mình nói ở trên. Thì có thể sẽ có 1 vài vấn đề trong quá trình cài đặt và sử dụng Odoo. Có 2 vấn đề tổng quát mà mình có thể chỉ các bạn cách fix như sau:

## TH 1: Bạn cần phải nâng cấp ”wkhtmltopdf” lên bản 0.12.1.

```
sudo wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.1/wkhtmltox-0.12.1_linux-trusty-amd64.deb

sudo dpkg -i wkhtmltox-0.12.1_linux-trusty-amd64.deb

sudo cp /usr/local/bin/wkhtmltopdf /usr/bin
sudo cp /usr/local/bin/wkhtmltoimage /usr/bin
```

## TH 2: Kiểm tra xem PostgreSQL có được encoding (UTF-8) hay không. Nếu không bạn có thể làm như sau:

```
su postgres

psql

update pg_database set encoding = pg_char_to_encoding('UTF8');

exit
```

# Bước 9:

Kiểm tra Odoo hoạt động. Để bắt đầu chạy ứng dụng Odoo các bạn gõ dòng lệnh dưới đây:

```
sudo /etc/init.d/odoo-server start
```

Sau khi khởi chạy xong. Bạn cũng có thể kiểm tra file log bằng cách:

```
tail -f /var/log/odoo/odoo-server.log
```

Nếu ứng dụng hoạt động tốt sau khi xem file log. Các bạn có thể kiểm tra bằng cách mở trình duyệt lên vào tuy cập bằng đường dẫn:

```
http://localhost:8069
```

BOOT SCRIPT USAGE:

```
/etc/init.d/odoo-server {start|stop|restart/reload|status|force-restart|force-stop}
```

# Bước 10 (Tuỳ chọn):

Để tự động khởi chạy service Odoo khi Ubuntu Server khởi động lại. Bạn có thể làm như sau:

```
sudo update-rc.d odoo-server defaults
```

Bạn có thể thử khởi động lại Ubuntu Server và kiểm tra xem nó có hoạt động không nhé.

# Ref
https://homnaycodegi.com/odoo11/hot-huong-dan-cai-dat-odoo-11-tren-ubuntu-16-04.html