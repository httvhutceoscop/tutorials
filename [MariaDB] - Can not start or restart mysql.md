Error infomation:

```
[root@a29c5168ddba /]# service mysql start
Starting MySQL.171002 11:42:39 mysqld_safe Logging to '/var/lib/mysql/a29c5168ddba.err'.
171002 11:42:39 mysqld_safe Starting mysqld daemon with databases from /var/lib/mysql 
ERROR!
```

Log file:

```
2017-10-02 11:42:39 0 [Note] /usr/sbin/mysqld (mysqld 10.3.1-MariaDB) starting as process 1699 ...
2017-10-02 11:42:39 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2017-10-02 11:42:39 0 [Note] InnoDB: Uses event mutexes
2017-10-02 11:42:39 0 [Note] InnoDB: Compressed tables use zlib 1.2.3
2017-10-02 11:42:39 0 [Note] InnoDB: Using Linux native AIO
2017-10-02 11:42:39 0 [Note] InnoDB: Number of pools: 1
2017-10-02 11:42:39 0 [Note] InnoDB: Using generic crc32 instructions
2017-10-02 11:42:39 0 [Note] InnoDB: Initializing buffer pool, total size = 128M, instances = 1, chunk size = 128M
2017-10-02 11:42:39 0 [Note] InnoDB: Completed initialization of buffer pool
2017-10-02 11:42:39 0 [Note] InnoDB: If the mysqld execution user is authorized, page cleaner thread priority can be changed. See the man page of setpriority().
2017-10-02 11:42:39 0 [ERROR] InnoDB: Upgrade after a crash is not supported. The redo log was created with MariaDB 10.3.0.
2017-10-02 11:42:39 0 [ERROR] InnoDB: Plugin initialization aborted with error Generic error
2017-10-02 11:42:40 0 [Note] InnoDB: Starting shutdown...
2017-10-02 11:42:40 0 [ERROR] Plugin 'InnoDB' init function returned error.
2017-10-02 11:42:40 0 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2017-10-02 11:42:40 0 [Note] Plugin 'FEEDBACK' is disabled.
2017-10-02 11:42:40 0 [ERROR] Unknown/unsupported storage engine: InnoDB
2017-10-02 11:42:40 0 [ERROR] Aborting
```

# Solution

```
ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock
service mysql restart
```
