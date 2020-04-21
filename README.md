# Ping My Sites

NodeJS code that pings my websites and sends me an email if one is down.

To use this code yourself, update the config.json.SAMPLE file with your websites and your email credentials. Then rename the file to config.json.

To run enter: node ping

Before the list of hosts are pinged, Google.com is pinged first. If it doesn't respond, then it likely you are
disconnected from the Internet. The program quits at this point.
