# Requirements

- CentOS 7 or over was installed - required
- MariaDB was installed - required
- Forget root password or not - optional

# Steps
## 1. Stop mysql:

```
systemctl stop mysqld
```

## 2. Set the mySQL environment option

```
systemctl set-environment MYSQLD_OPTS="--skip-grant-tables"
```

## 3. Start mysql usig the options you just set

```
systemctl start mysqld
```

## 4. Login as root

```
mysql -u root
```

## 5. Update the root user password with these mysql commands

```
mysql> UPDATE mysql.user SET Password = PASSWORD('gEl1_bQ4Elk') WHERE User = 'root';
mysql> FLUSH PRIVILEGES;
mysql> quit
```

## 6. Stop mysql

```
systemctl stop mysqld
```

## 7. Unset the mySQL envitroment option so it starts normally next time

```
systemctl unset-environment MYSQLD_OPTS
```

## 8. Start mysql normally:

```
systemctl start mysqld
```

## 9. Login with new password again

```
mysql -u root -p
```

```
mysql> CREATE DATABASE calendarapp CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
mysql> CREATE DATABASE calendarapp_test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
mysql> CREATE USER 'calendarapp'@'%' IDENTIFIED BY 'OWiNkVUg'; 
mysql> GRANT ALL ON calendarapp.* TO 'calendarapp'@'%';
mysql> GRANT ALL ON calendarapp_test.* TO 'calendarapp'@'%';
```

Done!