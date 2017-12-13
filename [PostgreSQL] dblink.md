# Đổi port của postgreSQL

Sửa port trong file này:
```
vi /var/lib/pgsql/data/postgresql.conf
```

Tìm file này `/etc/init.d/postgresql-9.3` 
Tìm `PGPORT = 5432` và đổi sang port muốn.


curl -O https://download.postgresql.org/pub/repos/yum/9.3/redhat/rhel-6-x86_64/pgdg-centos93-9.3-3.noarch.rpm

rpm -Uvh https://yum.postgresql.org/8.4/redhat/rhel-6-x86_64/pgdg-centos-8.4-3.noarch.rpm
# yum install postgresql postgresql-server postgresql-contrib

yum install -y postgresql postgresql-server

service postgresql initdb
vi /var/lib/pgsql/data/postgresql.conf
vi /var/lib/pgsql/data/pg_hba.conf
service postgresql start
su postgres
createdb test
psql test
CREATE ROLE testuser WITH SUPERUSER LOGIN PASSWORD 'test';
psql -h dbserver -U testuser test

psql -h 192.168.0.16 -U testuser test

psql -p 5433 -h 192.168.0.16 -U postgres
find / -name dblink.sql

```
pg_dump --host localhost --port 5432 --username postgres --format plain --ignore-version --verbose --file "C:\temp\filename.backup" --table public.tablename dbname

pg_dump -d system -t company_email > company_email.sql


CREATE TABLE account(
 user_id serial PRIMARY KEY,
 username VARCHAR (50) UNIQUE NOT NULL,
 password VARCHAR (50) NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 created_on TIMESTAMP NOT NULL,
 last_login TIMESTAMP
);

CREATE TABLE role(
 role_id serial PRIMARY KEY,
 role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account_role
(
  user_id integer NOT NULL,
  role_id integer NOT NULL,
  grant_date timestamp without time zone,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT account_role_role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role (role_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT account_role_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES account (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
```

https://www.heatware.net/linux-unix/how-install-postgresql-8-4-centos-5/

https://stackoverflow.com/questions/7359827/creating-a-database-dump-for-specific-tables-and-entries-postgres

cai dat dblink:
https://stackoverflow.com/questions/5075193/installing-dblink-for-postgres-9
https://www.dbrnd.com/2015/05/postgresql-cross-database-queries-using/

huong dan su dung dblink:
http://www.postgresonline.com/journal/archives/44-Using-DbLink-to-access-other-PostgreSQL-Databases-and-Servers.html
http://paquier.xyz/postgresql-2/first-steps-with-dblink-on-postgres/


psql -c COPY (SELECT company_id, email FROM company_email) TO '/var/www/company_email.sql';

COPY company_email TO PROGRAM 'gzip > /var/www/company_email.sql.gz';

pg_dump -d system -t company_email --exclude-schema=email | gzip > /var/www/company_email.sql.gz

pg_dump -d system -t company_email -s -O | gzip > /var/www/company_email.sql.gz
pg_dump -d system -t company_email -O --column-inserts | gzip > /var/www/company_email.sql.gz


# xu ly loi : #Starting postgresql service: /etc/init.d/postgresql: line 114: echo: write error: Permission denied
http://mydebugs.blogspot.com/2010/07/error-starting-postgres.html

`netstat -lntp`
`ps -ef | grep postgres`

# Connect between 2 servers using dblink_connect
SELECT dblink_connect('ax_conn', 'dbname=system port=5433 host=192.168.0.21 user=postgres');
SELECT * FROM dblink('ax_conn','SELECT * FROM foo') AS t(a int, b text, c text[]);


```
select * from dblink('dbname=test_dblink port=5433 host=192.168.0.16 user=postgres', 'select * from tab') as t1 (a int, b varchar(3));

select dblink_exec('dbname=test_dblink port=5433 host=192.168.0.16 user=postgres', 'create table aa (a int, b int)');
```

```
GRANT USAGE ON SCHEMA public TO testuser;
GRANT SELECT ON ALL TABLES TO testuser;


select * from dblink('dbname=test_readonly port=5433 host=192.168.0.16 user=testuser', 'select * from tab') as t1 (a int, b varchar(3));

select dblink_exec('dbname=test_readonly port=5433 host=192.168.0.16 user=testuser', 'create table aa (a int, b int)');
```
