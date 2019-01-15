# Step 1: PUll image mariadb from https://hub.docker.com/_/mariadb/

```
docker pull mariadb:10.3
```

# Step 2: Create container by command:

```
docker run --name mariadb-local -e MYSQL_ROOT_PASSWORD=your_pass_here -d -v your/path/home:/home mariadb:10.3
```

# Step 3: Pull centos 6.10

```
docker pull httvhutceoscop/centos610
```

# Step 4: Create container for developing

```
docker run --name dev -p 80:80 -p 8080:8080 -p 8000-8010:8000-8010 -p 7000-7010:7000-7010 --link mariadb-local:mysql -itd -v /path/to/your_project:/var/www httvhutceoscop/centos610
```

# Step 5: Start container

```
docker start dev
```

# Step 6: SSH to container

```
docker exec -it dev bash
```

```
service httpd start
```

# Step 7: start mysql

```
docker exec -it mariadb-local bash
```
