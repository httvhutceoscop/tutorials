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

Check the list of docker images
```
docker images
```

You should see at the top of the list an image that is like the following entry that I have:


This shows that our Repository httvhutceoscop/marc2 has got created.
