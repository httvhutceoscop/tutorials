# Required PHP and MariaDB were installed

# Create user piwik
CREATE USER 'piwik'@'localhost' IDENTIFIED BY 'password';

# Grant user
GRANT ALL PRIVILEGES ON piwik.* TO 'piwik'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON piwik.* TO 'piwik'@'172.17.0.1' IDENTIFIED BY '123456';
FLUSH PRIVILEGES;
EXIT;

# Install piwik

```
[root@www ~]# yum -y install php-mysql php-pdo php-gd php-xml
```

```
[root@www ~]# vi /etc/php.ini
```

Change this line to: `memory_limit = 512M`

Go to root folder: `cd ~`

```
[root@www ~]# wget http://piwik.org/latest.zip -P /var/www/html 
[root@www ~]# unzip /var/www/html/latest.zip -d /var/www/html 
[root@www ~]# chown -R apache. /var/www/html/matomo/tmp 
[root@www ~]# chown -R apache. /var/www/html/matomo/config 
```

# Install policy when SELinux turned on

```
[root@www ~]# setsebool -P httpd_can_network_connect_db on 
[root@www ~]# chcon -R -t httpd_sys_rw_content_t /var/www/html/matomo/tmp 
[root@www ~]# chcon -R -t httpd_sys_rw_content_t /var/www/html/matomo/config 
[root@www ~]# semanage fcontext -a -t httpd_sys_rw_content_t /var/www/html/matomo/tmp 
[root@www ~]# semanage fcontext -a -t httpd_sys_rw_content_t /var/www/html/matomo/config
```
