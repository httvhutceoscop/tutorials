# Guide to install and use dblink in postgreSQL

Here we will use 2 postgreSQL databases which are installed on Centos 6.8.

Server 1: postgreSQL version 8.4.20

Server 2: postgreSQL version 9.3.20


# Install Centos 6.8
Firstly, you have to have 2 Centos 6.8 servers.

You can use the docker to do these. It's very easy.

Using internet for more information. Hehehe.

dblink extension will be created on the database on the Server 2 and then it will connects to the database on Server 1 by using these [dblink methods](https://www.postgresql.org/docs/9.3/static/dblink.html).

# Installing postgreSQL

## Installing and configuring postgreSQL 8.4.20
### Installing

```
yum install -y postgresql postgresql-server

service postgresql initdb

service postgresql start
```

### Configuring
- Allow remote connection: [Remote connection](http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool)

- Set password for `postgres` user: [Change password](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html)

- Create role: [Create role](https://www.postgresql.org/docs/8.4/static/sql-createrole.html)

## Installing and configuring postgreSQL 9.3.20
### Installing
Following tutorial [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-6).
### Cấu hình
- Allow remote connection: [Remote connection](http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool)

- Set password for `postgres` user: [Change password](http://suite.opengeo.org/docs/latest/dataadmin/pgGettingStarted/firstconnect.html)

- Create role: [Create role](https://www.postgresql.org/docs/9.3/static/sql-createrole.html)

# Installing dblink extension on Server 2 (postgreSQL 9.3)

Installing `contrib` packages on server:

```
yum install postgres*contrib
```

After installing `contrib` packages successfully, you can find `dblink.sql` with following command:

```
find / -name dblink.sql
```

Installing dblink extension within database you want to use:

Connect to database:

```
su - postgres
```

```
psql DB_NAME
```

```
CREATE EXTENSION dblink;
```

# Checking connection between 2 server by using dblink_connect

First, you have to access database what created extension dblink above.

End then checking connection by command:

```
SELECT dblink_connect('CONNECT_NAME', 'dbname=DB_NAME_1 port=5432 host=x.x.x.x user=DB_USER_1 password=PASSWORD_1');
```

Therein:
- CONNECT_NAME : any text
- DB_NAME_1 : database name on Server 1
- x.x.x.x : IP of Server 1
- DB_USER_1 : database user on Server 1
- PASSWORD_1 : DB_USER_1'password on Server 1

If the result is `OK`, the connection is succesful.

After connecting successfully, you can use SQL statement normally.

Example:

```
select * from dblink('CONNECT_NAME', 'select * from tab') as t1 (a int, b varchar(3));

select dblink_exec('CONNECT_NAME', 'create table aa (a int, b int)');
```

Have fun!
