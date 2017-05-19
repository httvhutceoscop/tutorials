* OS：CentOS 6.8
* Webserver：Apache 2.4.6
* DB：MariaDB 10.3
* PHP：5.6.27
* Postgresql: 9.3

# What is docker?
To understand docker, you can visit its homepage.
- https://www.docker.com/what-docker
- https://blog.duyetdev.com/2015/12/docker-la-gi-co-ban-ve-docker.html#.WBhOoS2LSUk

# Setup docker
1. Download docker:
- https://docs.docker.com/engine/installation/windows/
- For windows 10: use "Docker for Window"
- For windows 7: use "Docker Toolbox"
2. Install docker nomarlly by press next button.
# Setup docker machine
List existed docker machine
```
docker-machine ls
```
Create new docker machine. Docker machine default is created when installing docker toolbox.

Default:
```
docker-machine create --driver virtualbox testA
```
With ```--virtualbox-memory``` set to ```8096```
```
docker-machine create --driver virtualbox --virtualbox-memory 8096 testB
```
# Install containers
1. Pull image
You can visit https://hub.docker.com/ to see more image docker.
Open Docker Quickstart Terminal and enter command:

```
docker-machine ssh default

docker pull centos:6.8
```
And to list existed images:
```
docker images
```
2. Create container
If you used "docker for window" please follow: https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c#.9mxpy9njd
else if you used "Docker Toolbox":
- Open cmd with administrator permission
- I assume that my project folder is "c/projects", yours can be "d/projects" or "e/projects" etc... and type these command below:
```
docker-machine stop default
```
```
cd "c:\Program Files\Oracle\Virtualbox"
```
```
VBoxManage.exe sharedfolder add default --name "c/projects" --hostpath "\\?\c:\projects" --automount
```
```
VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root 1
```
```
VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/projects 1
```
After these command, project folder was shared to Virtualbox. However docker machine has not been mount. Note that, every docker machine starts this mount will be destroyed. So we will do mount again.

Open Docker toolbox and type:
```
docker-machine ssh default
```
```
sudo mkdir --parents /c/projects
```
```
sudo mount -t vboxsf c/projects /c/projects/
```
```
ls /c/projects #check if it is mount
```

After these steps above, folder project has been mount with Virtualbox. Now we will create conatiner for our project.
In docker toolbox type command:

```
docker run –it –d -–name=marc2 –p 80:80 –p 7001:7001 –p 8081:8081 –p 3306:3306 –p 5432:5432 –v /c/projects/marc2:/var/www/marc2.lo/public_html centos:6.8
```
Here i added 3 http port and 2 sql port. 3306 is for MySQL and 5432 is for Postgresql.
"-–name=marc2" is the name of container "mar2"
"c/projects/marc2" is the path of foler project (on our computer), "marc2.lo/public_html" is the mount path.

Check running container:
```
docker ps
```
Check all container:
```
docker ps -a
```
3. Access conatiner
```
docker exect -it marc2 bash
```
marc2 is container's name is created above.

### Install MariaDB
You only need do step by step below:
```
yum update && yum install epel-release

yum --enablerepo=extras install  centos-release-scl

yum install httpd24

rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
```
```
vi /etc/yum.repos.d/remi.repo
```
Change ```enabled=0``` to ```enabled=1``` in both section ```[remi]``` and ```[remi-php56]```
```
touch /etc/yum.repos.d/MariaDB.repo

vi /etc/yum.repos.d/MariaDB.repo
```
Add below text:
```
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.3/centos6-x86
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```
After all, type below command to install MariaDB.
```
yum install MariaDB-server MariaDB-client –y
```
```
service mysql start
```
```
mysql_secure_installation
```
```
mysql –u root –p
```
```
CREATE USER 'root'@'%' IDENTIFIED BY 'password_here';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
```
```
service mysql restart
```

### Install postgresql
Ref to install: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-6
And ref to allow remote connection to postgresql database using psql: http://www.thegeekstuff.com/2014/02/enable-remote-postgresql-connection/?utm_source=tuicool

Maybe you must create role for postgres, see: https://www.postgresql.org/docs/9.3/static/sql-createrole.html

### Install apache
```
yum --enablerepo=remi install php php-common
yum --enablerepo=remi install php-mysqlnd php-pgsql php-pecl-mongo php-pdo php-pecl-memcache php-pecl-memcached php-gd php-xml php-mbstring php-mcrypt php-pecl-apcu php-cli php-pear php-curl
```
We will config httpd:
```
vi /etc/httpd/conf/httpd.conf
```
Add 2 ports below line ```Listen 80```

```
Listen 80
Listen 7001
Listen 8081
```

And add text at end of file:
```
<VirtualHost *:80>
    <Directory "/var/www/marc2.lo/public_html">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>

    ServerAdmin webmaster@localhost    
    ServerName marc2.lo
    DocumentRoot "/var/www/marc2.lo/public_html"
    ErrorLog /etc/httpd/logs/error.log
    CustomLog /etc/httpd/logs/access.log combined
</VirtualHost>
<VirtualHost *:7001>
    <Directory "/var/www/marc2.lo/public_html">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>

    ServerAdmin webmaster@localhost    
    ServerName marc2.lo
    DocumentRoot "/var/www/marc2.lo/public_html"
    ErrorLog /etc/httpd/logs/error.log
    CustomLog /etc/httpd/logs/access.log combined
</VirtualHost>
<VirtualHost *:8081>
    <Directory "/var/www/marc2.lo/public_html">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>

    ServerAdmin webmaster@localhost    
    ServerName marc2.lo
    DocumentRoot "/var/www/marc2.lo/public_html"
    ErrorLog /etc/httpd/logs/error.log
    CustomLog /etc/httpd/logs/access.log combined
</VirtualHost>
```

```
service httpd restart
```
We need add servername into host file on our computer (/system32/dirvers/etc/host):
Add it to end of file: ```192.168.99.100 marc2.lo```
