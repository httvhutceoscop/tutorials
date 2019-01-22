# Preparation
## Master server
IP: 192.168.0.1

## Slave server
IP: 192.168.0.9

# Configuration


# Ref
https://www.lexiconn.com/blog/2014/04/how-to-set-up-selective-master-slave-replication-in-mysql/

============================= 
MASTER: add lines to my.cnf 
============================= 
binlog-do-db=database_name_1 
binlog-do-db=database_name_2 
binlog-do-db=database_name_3 
============================= 
MASTER: SQL SYNTAX 
============================= 
GRANT REPLICATION SLAVE ON *.* TO 'user'@'%' IDENTIFIED BY 'password'; 
FLUSH PRIVILEGES; 
FLUSH TABLES WITH READ LOCK; 
UNLOCK TABLES; 
SHOW MASTER STATUS; 
output> file | Position | Binlog_Do_DB 
mysql-bin.000963 1570 database_name_1,database_name_2,database_name_3 
============================= 
SLAVE: add lines to my.cnf 
============================= 
replicate-do-db=database_name_1 
replicate-do-db=database_name_2 
replicate-do-db=database_name_3 
============================= 
SLAVE: SQL SYNTAX 
============================= 
SLAVE STOP; 
CHANGE MASTER TO MASTER_HOST='192.168.0.2', MASTER_USER='user', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000963', MASTER_LOG_POS=98; 
START SLAVE; 
SHOW SLAVE STATUS; 

NOTE: 

MASTER_LOG_FILE='mysql-bin.000963', MASTER_LOG_POS=98; is displayed when you run the SQL command from the master: cmd mysql#> SHOW MASTER STATUS; 

ALSO: 

When you run #> SHOW SLAVE STATUS; 
make sure you see: Slave_IO_Running | Slave_SQL_Running 
Yes Yes

Brian Miller DBA for Cryosector Technologies

