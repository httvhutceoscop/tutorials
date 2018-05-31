Make sure you have already installed following packages on your server.

```
yum install gcc
yum install make
yum install openssl-devel
yum install apr-devel
yum install apr-util-devel
yum install wget
```

Then, we will choose the latest version from Apache website. and download it.

An update: If you are using this article on CentOS 7, the APR version on yum won’t work for you, and you should compile the apr, and apr-util from source, so please remove it from your server if you installed it via yum, and try following:

```
cd /usr/src
wget http://mirror.lax.hugeserver.com/apache/apr/apr-1.5.2.tar.gz
wget http://mirror.lax.hugeserver.com/apache/apr/apr-util-1.5.4.tar.gz
tar xvfz apr-1.5.2.tar.gz
tar xvfz apr-util-1.5.4.tar.gz

cd apr-1.5.2
./configure --bindir=/usr/bin/
make && make install

cd ../apr-util-1.5.4
./configure --bindir=/usr/bin/ --with-apr=/usr/bin/apr-1-config
make && make install
```

Now you are able to continue with the rest of guide.

```
http://httpd.apache.org/download.cgi#apache24

cd /usr/src
wget http://www-eu.apache.org/dist//httpd/httpd-2.4.23.tar.gz
tar xvfz httpd-2.4.23.tar.gz
```

Now we will start building Apache from source and install it on our server.

```
cd httpd-2.4.23
./configure --help
```

We have to know which module of apache we want to install and include them on the ./configure command. It is really easy, as you only need to know the module name and type it with “–enable-(module-name)”. For example, we want to install apache with SSL module, so we will type “–enable-ssl”

By default, Apache will install all its architecture-independent files in  “/usr/local/apache2”. If you want to change this directory we have to set the –prefix option in ./configure . I will use /etc/httpd/ for this option in this tutorial. But, make sure that you are not overwriting your old configuration if you already have installed apache before. I am also using “–sbindir” option to specify the directory where system administrator executables will be installed. Those are server programs like httpd, apachectl, suexec, etc. which are necessary to run the Apache HTTP Server.

```
mkdir /etc/httpd/

./configure --prefix=/etc/httpd/ --sbindir=/sbin/ --enable-ssl --enable-so
make
make install
```

Now we are ready to go, we can start Apache server and go ahead with configurations.

```
apachectl start
```

That’s it!