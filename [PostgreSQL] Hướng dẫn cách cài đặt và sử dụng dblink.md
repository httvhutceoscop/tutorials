# Hướng dẫn cách cài đặt và sử dụng dblink trong postgreSQL

Ở đây sẽ sử dụng 2 server postgreSQL và Centos 6.8
Server 1: Sẽ sử dụng postgreSQL version 8.4.20
Server 2: Sẽ sử dụng postgreSQL version 9.3.20

Thông tin cài đặt Centos 6.8 các bạn có thể tìm trên internet

Mình sẽ cài đặt dblink trên server 2 và connect với server 1 từ server 2 thông qua các phương thức của [dblink](https://www.postgresql.org/docs/9.3/static/dblink.html).

# Cài đặt postgreSQL

## Cài đặt và cấu hình postgreSQL 8.4.20
### Cài đặt

```
yum install -y postgresql postgresql-server

service postgresql initdb

service postgresql start
```

### Cấu hình
- Cho phép kết nối từ xa: [Remote connection](http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool)

- Thiết lập mật khẩu cho user `postgres`: [Change password](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html)

- Tạo mới role hoặc user: [Create role](https://www.postgresql.org/docs/8.4/static/sql-createrole.html)

## Cài đặt và cấu hình postgreSQL 9.3.20
### Cài đặt
Các bạn cài đặt theo hướng dẫn ở [đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-6).
### Cấu hình
- Cho phép kết nối từ xa: [Remote connection](http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool)

- Thiết lập mật khẩu cho user `postgres`: [Change password](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html)

- Tạo mới role hoặc user: [Create role](https://www.postgresql.org/docs/9.3/static/sql-createrole.html)

# Cài đặt dblink extension trên server 2 (postgreSQL 9.3)

Cài đặt các gói `contrib` trên server:

```
yum install postgres*contrib
```

Sau khi cài đặt các gói `contrib` xong thì các bạn có thể tìm `dblink.sql` với câu lệnh sau:

```
find / -name dblink.sql
```

Cài đặt dblink extension bên trong database muốn sử dụng:

Kết nối vào database:

```
su - postgres
```

```
psql DB_NAME
```

```
CREATE EXTENSION dblink;
```

# Kiểm tra kết nối giữa 2 server sử dụng dblink_connect

Trước tiên access vào database đã create extension dblink ở trên.

Sau đó kiểm tra kết nối bằng lệnh sau:

```
SELECT dblink_connect('CONNECT_NAME', 'dbname=DB_NAME_1 port=5432 host=x.x.x.x user=DB_USER_1 password=PASSWORD_1');
```

Trong đó:
- CONNECT_NAME : là tên tuỳ ý đặt cho dblink_connect
- DB_NAME_1 : là tên database được tạo ở Server 1
- x.x.x.x : là địa chỉ host của Server 1
- DB_USER_1 : là tên user database trên Server 1
- PASSWORD_1 : là password của user DB_USER_1 trên Server 1

Nếu kết quả trả về là `OK` thì là kết nối thành công

Sau khi kết nối thành công các bạn có thể sử dụng các câu lệnh SQL bình thường.

Ví dụ:

```
select * from dblink('CONNECT_NAME', 'select * from tab') as t1 (a int, b varchar(3));

select dblink_exec('CONNECT_NAME', 'create table aa (a int, b int)');
```

Have fun!
