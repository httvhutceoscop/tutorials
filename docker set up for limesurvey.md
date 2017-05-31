* Nginx latest version
* Postgresql latest version

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
`testA` is name of machine

With ```--virtualbox-memory``` set to ```8096```
```
docker-machine create --driver virtualbox --virtualbox-memory machine_memory_size machine_name
```
For example: `machine_memory_size` : 8096 MB, `machine_name` : testB

With `--virtualbox-disk-size` set to `60000`. 60000 = 60GB.
```
docker-machine create --driver virtualbox --virtualbox-disk-size machine_disk_size machine_name
```
`machine_disk_size` : 60000 MB

# Share folder between project folder and VirtualBox
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

# Install containers
1. Pull image nginx
You can visit https://hub.docker.com/ to see more image docker.
Open Docker Quickstart Terminal and enter command:
```
docker-machine ssh default

docker pull nginx
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

Open Docker toolbox and type:
```
docker-machine start default
```
If there is a message "Started machines may have new IP address. You may need to re-run the `docker-machine env` command.
```
docker-machine env
```
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
docker run –it –d -–name=limesurvey_nginx –p 80:80 –v /c/projects/limesurvey:/var/www/limesurvey.lo/public_html nginx
```
"-–name=limesurvey_nginx" is the name of container "limesurvey_nginx"
"c/projects/limesurvey" is the path of foler project (on our computer), "limesurvey.lo/public_html" is the mount path.

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
docker start limesurvey_nginx

docker exec -it limesurvey_nginx bash
```
`limesurvey_nginx` is container's name is created above.

# Install nginx
```
apt-get update

apt-get install sudo

apt-get install nano

apt-get install wget

sudo nano /etc/nginx/nginx.conf
```
thêm `Include /etc/nginx/sites-enabled/*;` vào dưới dòng : `include /etc/nginx/conf.d/*.conf;`

Ctrl + X to save.

```
sudo mkdir /etc/nginx/sites-available

sudo mkdir /etc/nginx/sites-enabled

sudo mkdir /var/www/limesurvey.lo/logs

touch /etc/nginx/sites-available/limesurvey.lo

sudo nano /etc/nginx/sites-available/limesurvey.lo
```
Enter below text:
```
server {
		server_name limesurvey.lo;
		access_log /var/www/limesurvey.lo/logs/access.log;
		error_log /var/www/limesurvey.lo/logs/error.log;
		root /var/www/limesurvey.lo/public_html/limesurvey;
		index index.php index.html index.htm;

		location / {
			try_files $uri $uri/ /index.php;
		}

		location ~ \.php$ {
			try_files $uri =404;
			include /etc/nginx/fastcgi_params;
			fastcgi_pass unix:/var/run/php5-fpm.sock;
			fastcgi_index index.php;
			fastcgi_param SCRIPT_FILENAME /var/www/limesurvey.lo/public_html/limesurvey/$fastcgi_script_name;
		}
	}
```
Ctrl + X to save

```
sudo ln –s /etc/nginx/sites-available/limesurvey.lo /etc/nginx/sites-eneabled/limesurvey.lo

apt-get install php5-fpm

sudo nano /etc/php5/cli/php.ini
```
Edi `;cgi.fix_pathinfo=1` to `cgi.fix_pathinfo=0`
```
sudo nano /etc/php5/fpm/php.ini
```
Edit `;cgi.fix_pathinfo=1` to `cgi.fix_pathinfo=0`
```
sudo nano /etc/php5/fpm/pool.d/www.conf

Sửa

Listen.owner = nginx
Listen.group = nginx

Service php5-fpm restart

sudo nano /etc/nginx/nginx.conf
```
Edit `sendfile on` to `off`
```
service nginx restart
```

(Sau khi restart lại nginx sẽ thoát khỏi container vậy cần start lại container và php5-fpm)
```
docker start limesurvey_nginx
docker exec –it limesurvey_nginx bash
service php5-fpm start
```

# Install PostgreSQL
```
docker pull postgres
```

```
docker run –d –p 5432:5432 –-name limesurvey_data –v /e/projects/limesurvey_data:/var/lib/postgresql/ -e POSTGRES_PASSWORD=”123456” postgres
```

```
docker start limesurvey_data
```
# Install limesurvey
- Download source code from: https://www.limesurvey.org/downloads/category/25-latest-stable-release
- Uncompress and copy to your project folder (c/project/limesurvey)
