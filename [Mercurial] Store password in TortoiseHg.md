When you are using the `SSH` for mercurial repository. 

In order to store your password. You have to change myUser and myPass for your credentials and the path to: TortoisePlink.exe. Edit the mercurial.ini

```
[reviewboard]
password = myPass
[ui]
username = myUser
ssh = "C:\Program Files\TortoiseHg\lib\TortoisePlink.exe" -l myUser -pw  myPass
```
