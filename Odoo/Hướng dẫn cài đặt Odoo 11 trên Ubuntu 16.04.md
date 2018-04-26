Hướng dẫn này áp dụng cho Ubuntu 14 đến 16.04.

Thực hiện theo các dòng lệnh trong từng bước dưới đây:

Bước 1:

Cập nhật apt source lists

```
sudo apt-get update
```

Bước 2:

Tạo Odoo user để sở hữu và chạy ứng dụng

```
sudo adduser --system --home=/opt/odoo --group odoo
```

Bước 3:

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

Bước 4:

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