# Deploy Apache 2 on bare machine (not recommended)

##### Edit config file

Edit in [Apache config file](./apache-setup/heos.conf) a `Redirect` line to target API server.
Ensure `Rewrite` lines remains commented for now.

For instance:

```shell
Redirect "/heos-api-server" "http://192.168.1.90:5000/"
# xor
Redirect "/heos-api-server" "http://local.nas.coulombel.net:5000/"
```

###### **Warning on IP/FQDN**: This is the IP/FQDN which is targeted by client browser doing:

```shell
Redirect "/heos-api-server" "http://localhost:5000/"
```

Would only work if the client browser is located on same machine where API server is running.

##### Then trigger installation script:

```shell
cd apache-setup
sudo ./purge.sh # Reset Apache2 configuration
sudo ./setup.sh # Setup Apache2
sudo systemctl status apache2
```

<!-- sudo docker kill <container> if port 8000 busy -->

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

##### Redirection 

Opening a browser developer tool we can see we have 2 round-trip  (`http code`: 302 and 200).
The client browser is doing the call directly to API server where we want Apache to make direct call to API server.
This would also simplify setup process: cf. previous [**Warning on IP/FQDN**](#warning-on-ipfqdn-this-is-the-ipfqdn-which-is-targeted-by-client-browser-doing).

##### We should use **RewriteRule** in [heos.conf](heos.conf).

Comment `Redirect` lines and add a `RewriteRule` line, for instance 

````shell
RewriteRule "^/heos-api-server/(.*)$" "http://local.nas.coulombel.net:5000/$1" [P,NC]
# xor
RewriteRule "^/heos-api-server/(.*)$" "http://localhost:5000/$1" [P,NC]
````

and [trigger installation](#then-trigger-installation-script).

Note this feature requires to enable module: rewrite, proxy, proxy_http in [setup.sh](setup.sh).

<!-- 
we can also access logs at tail -f /var/log/apache2/error.log,
If module rewrite is not enabled, Apache will not start (visible in systemctl status),
If module proxy/proxy_http is not enabled, Apache will start but Rewrite will not happen (see browser dev console), in logs we will have  error
"[Mon Jun 27 18:31:46.519377 2022] [rewrite:error] [pid 32749:tid 139801764283968] [client ::1:39036] AH00669: attempt to make remote request from mod_rewrite without proxy enabled: proxy:http://localhost:5000/player/volume_down, referer: http://localhost:8000/"

See also https://www.digitalocean.com/community/tutorials/how-to-rewrite-urls-with-mod_rewrite-for-apache-on-ubuntu-16-04.
Tips: can test via `RewriteRule   "^"  "-"  [F]` activation of rewrite rule in heos.conf

In browser dev console, we now have one call!
-->      

