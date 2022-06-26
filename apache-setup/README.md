# Deploy Apache 2 on bare machine (not recommended)

Edit in [Apache config file](./apache-setup/heos.conf) following line to target API server.

For instance:

```shell
Redirect "/heos-api-server" "http://192.168.1.90:5000/"
Redirect "/heos-api-server" "http://local.nas.coulombel.net:5000/"
```

**Warning**: This is the IP which is targeted by client browser doing:

```shell
Redirect "/heos-api-server" "http://localhost:5000/"
```

Would only work if the client browser is located on same machine where API server is running.

Then trigger installation script:

```shell
cd apache-setup
sudo ./purge.sh # Reset Apache2 configuration
sudo ./setup.sh # Setup Apache2
```

<!-- To ease Apache setup we could do sudo cp -R public /var/www/html/heos --> 

<!-- About URL redirect AND CORS issue
URL rewritting avoids CORS issue. However Apache is smarter than Python server as it does not block LAN private IP 192.168.1.x
For example to target the NAS :
const response = await fetch('http://192.168.1.88:5000/browse/play_previous', options); -> No CORS issue
const response = await fetch('http://local.nas.coulombel.net:5000/browse/play_previous', options); -> CORS issue
And machine:
const response = await fetch('http://192.168.1.90:5000/browse/play_previous', options); -> No CORS issue

So we could sed in JS file /heos-api-server by server URL instead of redirect

Note rewriting and local IP will allow the request to leave browser but to decode response browser needs server to send CORS header
https://dev.to/matheusguimaraes/fast-way-to-enable-cors-in-flask-servers-42p0
https://stackoverflow.com/questions/25860304/how-do-i-set-response-headers-in-flask

Alternative to Apache is to use python server (sed in JS file /heos-api-server by server URL) and use Chrome extension for CORS issue:
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf


--> 
