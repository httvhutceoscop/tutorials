# Set Time, Date Timezone in Linux from Command Line or Gnome | Use ntp

To have the correct time and date in Linux is very important, a lot of things depends on it. It does not matter if you are using Linux to power your personal computer or you have a Linux server. The server and system clock needs to be on time.

**Set date from the command line**

```
date +%Y%m%d -s "20120418"
```

**Set time from the command line**

```
date +%T -s "11:14:00"
```

**Set time and date from the command line**

```
date -s "19 APR 2012 11:14:00"
```

**Linux check date from command line**

```
date
```

Will show you something like this:

```
Thu Apr 19 15:17:34 BOT 2012
```

**Set hardware clock**

The hardware clock is the clock that runs in you PC hardware even if you disconnect it from the main power supply. This is because it has a lithium battery in the modern computers and another type of battery in the old ones.

We'll see differences between hardware clock and system clock

```
hwclock --show
```

Will output something like this:

```
Thu 19 Apr 2012 03:23:05 PM BOT  -0.785086 seconds
```

Now check the system clock

```
date
```

Will output something like this:

```
Thu Apr 19 15:26:41 BOT 2012
```

Let's set the hardware clock to local time:

```
hwclock --set --date="2012-04-19 16:45:05" --localtime
```

If you want to set it to UTC time use:

```
hwclock --set --date="2011-04-19 20:45:05"  --utc
```

**Set the timezone**

To set the timezone of your system clock do the following:

```
cp /usr/share/zoneinfo/America/La_Paz /etc/localtime
```

Choose the right timezone for you.

**Automatically adjust your computer clock**

To have your system to automatically adjust time we need to install ntp. Get it from your repository. Once installed you can configure it this way:

Edit the file `/etc/ntpd.conf`. It will look like this:

```
# With the default settings below, ntpd will only synchronize your clock.
#
# For details, see:
# - the ntp.conf man page
# - http://support.ntp.org/bin/view/Support/GettingStarted
# - https://wiki.archlinux.org/index.php/Network_Time_Protocol_daemon

# Associate to public NTP pool servers; see http://www.pool.ntp.org/
server 0.pool.ntp.org
server 1.pool.ntp.org
server 2.pool.ntp.org

# Only allow read-only access from localhost
restrict default noquery nopeer
restrict 127.0.0.1
restrict ::1

# Location of drift and log files
driftfile /var/lib/ntp/ntp.drift
logfile /var/log/ntp.log

# NOTE: If you run dhcpcd and have lines like 'restrict' and 'fudge' appearing
# here, be sure to add '-Y -N' to the dhcpcd_ethX variables in /etc/conf.d/net
```

Be sure to start the daemon, and to make it start automatically when the system boots.

On Arch Linux is: /etc/rc.d/ntpd start on Debian and derivatives /etc/init.d/ntpd start

**Update from the command line against a time server**

You can update the clock manually, without the need of the daemon with ntpdate

```
ntpdate 129.6.15.28
```

You will get something like this:

```
19 Apr 15:45:23 ntpdate[10948]: step time server 129.6.15.28 offset -45.697084 sec
```

**Bonus: Set the time and Date on Gnome**

If you are using Gnome right click on the clock and select adjust, or go to: __System > Administration > Time and Date__ (You may be asked for root password)

You will see a window similar to this one:

Ubuntu gnome time and date

Source: https://www.garron.me/en/linux/set-time-date-timezone-ntp-linux-shell-gnome-command-line.html
