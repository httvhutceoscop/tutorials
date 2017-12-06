# Hướng dẫn cách cài đặt và sử dụng dblink trong postgreSQL

Ở đây sẽ sử dụng 2 server postgreSQL
Server 1: Sẽ sử dụng postgreSQL version 8.4.20
Server 2: Sẽ sử dụng postgreSQL version 9.3.20

Mình sẽ cài đặt dblink trên server 2 và connect với server 1 từ server 2 thông qua các phương thức của [dblink](https://www.postgresql.org/docs/9.3/static/dblink.html).

# Cài đặt postgreSQL

## Cài đặt và cấu hình postgreSQL 8.4.20
### Cài đặt
Các bạn cài đặt theo hướng dẫn ở đây.
### Cấu hình


## Cài đặt và cấu hình postgreSQL 9.3.20
### Cài đặt
Các bạn cài đặt theo hướng dẫn ở [đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-6).
### Cấu hình
- Cho phép kết nối từ xa: [Remote connection](http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool)

- Thiết lập mật khẩu cho user `postgres`: [Change password](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html)

- Tạo mới role hoặc user: [Create role](https://www.postgresql.org/docs/9.3/static/sql-createrole.html)

