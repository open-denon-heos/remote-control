!/bin/sh
# Some doc: https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-fr

## Setup Apache
sudo apt install apache2
sudo systemctl start apache2

### Allow access
sudo ufw allow 'Apache'

## Get directory
curr_dir=$(pwd)
parentdir="$(dirname "$curr_dir")" # https://stackoverflow.com/questions/8426058/getting-the-parent-of-a-directory-in-bash

## Change public folder owner and permission
#### sudo chown -R $USER:$USER $parentdir/public # uncoment if needed
#### if caused issue: https://stackoverflow.com/questions/25396984/getting-clear-read-only-status-on-webstorm-8, run sudo chown -R $(whoami) remote-control/
sudo chmod -R 755 $parentdir/public

## Rewrite rule activation
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http

## Listen on port 8000

if cat /etc/apache2/ports.conf | grep "Listen 8000";
 then echo "Already listening 8000";
 else sudo bash -c "echo 'Listen 8000'  >>  /etc/apache2/ports.conf"
 # # https://superuser.com/questions/136646/how-to-append-to-a-file-as-sudo
fi

## Allow access to folder
mkdir -p out
sed -e "s|/path_to_repo|$parentdir|g" apache2-conf-directory.xml > out/apache2-conf-directory_out.xml
# https://askubuntu.com/questions/76808/how-do-i-use-variables-in-a-sed-command

if cat /etc/apache2/apache2.conf | grep "heos";
 then echo "Heos UI public folder already allowed";
 else sudo bash -c "cat out/apache2-conf-directory_out.xml  >>  /etc/apache2/apache2.conf"
 # # https://superuser.com/questions/136646/how-to-append-to-a-file-as-sudo
fi

## VirtualHost config

sed -e "s|/path_to_repo|$parentdir|g" heos.conf > out/heos_out.conf
sudo cp out/heos_out.conf /etc/apache2/sites-available/heos.conf

## Disable default configuration and enable heos configuration
sudo a2dissite 000-default.conf
cd /etc/apache2/sites-available # Do CD : https://stackoverflow.com/questions/20591889/site-does-not-exist-error-for-a2ensite
sudo a2ensite heos.conf

## Restart
sudo systemctl restart apache2

##  If you have access denied an in logs
##### cat /var/log/apache2/error.log
##### [Sun Jun 05 00:26:16.358490 2022] [core:error] [pid 118693:tid 139916651603520] (13)Permission denied: [client 127.0.0.1:55908] AH00035: access to / denied (filesystem path '/home/scoulomb/heos') because search permissions are missing on a component of the path

chmod 755 ~

echo "Done !"