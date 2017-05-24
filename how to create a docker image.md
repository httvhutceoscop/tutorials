# Ref
https://rominirani.com/docker-tutorial-series-part-5-building-your-own-docker-images-b4a448b44afc

```
docker commit [ContainerID] [Repository[:Tag]
```
The Repository name is important. Eventually (and which is what we will do) we will want to push this to the Docker Hub. So the format of the Repository name that is recommended is the following:
```
<dockerhubusername>/<repositoryname>
```

For example:
```
docker commit marc2 httvhutceoscop/marc2
```
This will give you back the image ID.

```
docker@default:~$ docker commit marc2 httvhutceoscop/marc2
sha256:8ece75a761d6faecd1e8e51210abd954277c61cc78dfad471bcf4fa3972bf769
```

Check the list of docker images
```
docker images
```

You should see at the top of the list an image that is like the following entry that I have:

```
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
httvhutceoscop/marc2   latest              8ece75a761d6        15 hours ago        25.8GB
centos                 6.8                 0cd976dc0a98        8 months ago        195MB
```

This shows that our Repository httvhutceoscop/marc2 has got created.

# Pushing the Image to the Docker Hub

To push the image to the Docker Hub via the following steps:

Get an account at [Docker Hub](https://hub.docker.com/account/signup/)

From **boot2docker** prompt, execute the command **docker login** and follow the instructions for your username and password.

On successful login, you should get a **Login Succeeded** message.

To a docker push as shown below:
```
docker push <yourusername>/marc2
```

After you pushed successfully. You will get an ID.

```
docker@default:~$ docker push httvhutceoscop/marc2
The push refers to a repository [docker.io/httvhutceoscop/marc2]
cb4fce4a2c43: Pushed
b1b065555b8a: Pushed
latest: digest: sha256:d2a244678a387bbb676abec3273f1d873c07da1ca4764fdf9783bf0359f1a52d size: 743
```
