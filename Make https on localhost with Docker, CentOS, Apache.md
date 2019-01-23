# Following these steps

## Install required software

```
yum install mod_ssl openssl
```

## Generate a self-signed certificate (CRT and Private Key)

### Go to tmp folder

```
cd /tmp/
```

### Making and trusting your own certificates

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

### Copy the files to the correct locations

```
cp localhost.crt /etc/pki/tls/certs
cp localhost.key /etc/pki/tls/private/localhost.key
```

### Make correct SELinux policy

```
restorecon -RvF /etc/pki
```

## Configure SSL

```
vi +/SSLCertificateFile /etc/httpd/conf.d/ssl.conf
```

Edit these lines:

```
# General setup for the virtual host, inherited from global configuration
DocumentRoot "/var/www/FUJITECH/winners/pw_zenkokuban"
ServerName zenkokuban.lo:443

#SSLProtocol all -SSLv2
#SSLCipherSuite DEFAULT:!EXP:!SSLv2:!DES:!IDEA:!SEED:+3DES
SSLCertificateFile /etc/pki/tls/certs/localhost.crt
SSLCertificateKeyFile /etc/pki/tls/private/localhost.key
```

Restart Apache

```
/etc/init.d/httpd restart
```

Access website by http and https

http://zenkokuban.lo/

https://zenkokuban.lo/

# Ref
https://www.sitecuatui.com/cai-dat-ssl/

https://wiki.centos.org/HowTos/Https
