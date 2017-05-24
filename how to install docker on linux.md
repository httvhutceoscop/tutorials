# Install docker
```
sudo yum update

sudo yum makecache first

sudo yum -y docker
```

After docker is installed, we add current user into docker group

```
sudo usermod -aG docker <username>
```

Check docker:
```
docker images

docker ps
```

And restart.
