# Ping My Sites

NodeJS code that pings a list of websites and sends an email alert if at least one is down.

To use this code yourself, update the **config.json.SAMPLE** file with your websites and your email credentials. Then rename the file to config.json.

To run enter:

```
node ping
```

Before the list of hosts are pinged, Google.com is pinged first. If it doesn't respond, then it likely you are
disconnected from the Internet. The program quits at this point.

## Settings

Besides the list of sites to ping, you can adjust these 3 settings.

```javascript
const slow_seconds = 2;
const attempts = 2;
const seconds_between_attempts = 20;
```

**slow_seconds** - If you want to be alerted to a site that responds, but is responding slowly, adjust this setting.

**attempts** - Before sending the alert email, do you want the code to make another attempt to see if sites are up? If so, use this setting.

**seconds_between_attempts** - If the code makes multiple ping attempts, how many seconds should it wait before trying again?
