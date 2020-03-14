# nodejs-share-link-server
A simple nodejs server for sharing site paths

It's simple, download this project create a database like below.

<pre>
mysql> CREATE DATABASE mydb;
mysql> USE mydb;
mysql> CREATE TABLE linkphim (id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, link TEXT NOT NULL);
</pre>

Create a crontab to make this service automatic startup

<pre>
@reboot cd /home/pi/"nodejs share-link-server"/ && /usr/bin/node /home/pi/"nodejs share-link-server"/server.js
</pre>

See my blog for any problem: https://baotden.wordpress.com/?p=87

![Web UI](/web UI result/nodejs-share-link-seerver_Web UI.png)
Web UI
