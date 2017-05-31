1. Access to server
2. Run the following commands :
```
docker pull prima/cron

docker run -it -d --name ach_survey_cron --link ach_survey prima/cron ( change --link ach_survey to --link survey //survey: is name container )

docker exec -it ach_survey_cron bash

apt-get update

apt-get install nano

touch /app/http-request.sh

nano /app/http-request.sh
```
Type like this:
``` 
#!/bin/bash
curl https://treco-dev.achievement.co.jp/index.php?r=admin/businesslogic/sa/changestatusquestionheader -k
curl https://treco-dev.achievement.co.jp/index.php?r=admin/businesslogic/sa/reminder_staff -k
```

```
chmod 755 /app/http-request.sh
crontab -e
```
```
*/5 * * * * /app/http-request.sh >> /dev/null 2>&1
```
```
service cron restart
```
