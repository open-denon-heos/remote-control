# HEOS (Denon) Audio/Video Amplifier Remote Control (Web UI)

This Heos Remote Control is a web UI allowing you to remotely
control your Denon AV amplifier on the same LAN through its telnet
interface.

This requires HEOS API server: https://github.com/open-denon-heos/heos-api-server
We will detail integration with HEOS API server in this document.

## Demo and Screenshots

You can try the UI at https://open-denon-heos.github.io/remote-control/public/ (not
connected to any back-end).

Screenshots:

<img src="./screenshots/light_theme.png" alt="Screenshot of the light theme" title="Light Theme" width="300"/>

<img src="./screenshots/dark_theme.png" alt="Screenshot of the dark theme" title="Dark Theme" width="300"/>

## Quick start

See [run production image section](#run-remote-control-ui-and-server-production-image)

## Local Dev (without backend)

You can try this UI with (assuming you have [simple-http-server](https://github.com/TheWaWaR/simple-http-server) installed):

```sh
$ simple-http-server -i
```
Alternatively you can use

```sh
$ python3 -m http.server
```

And then head over to http://0.0.0.0:8000


##  Local DEV with Apache2 for HEOS API server integration

We will use Apache2 as a webserver to avoid;
- CORS issue
- Enable URL rewriting to easily redirect to proper API server


### Prerequisites: deploy API server

See https://github.com/open-denon-heos/heos-api-server#quick-start

```shell
mkdir -p ~/tmp
curl -o ~/tmp/PRD.docker-compose.yaml https://raw.githubusercontent.com/open-denon-heos/heos-api-server/main/PRD.docker-compose.yaml 
docker-compose -f ~/tmp/PRD.docker-compose.yaml pull 
docker-compose -f ~/tmp/PRD.docker-compose.yaml up
```

And then head over to http://localhost:5000, 

or find IP of your machine in LAN by doing

```shell
$ hostname -I
192.168.1.90 172.19.0.1 192.168.49.1 172.18.0.1 172.17.0.1 
```

And then head over for instance to http://192.168.1.90:5000

Here we documented how to deploy server on QNAP NAS: https://github.com/open-denon-heos/heos-api-server#run-on-qnap-nas

<!--
This prerequisite can also be filled by following [section](#run-remote-control-ui-and-server-production-image).
--> 

### Suggestion: define A record pointing to your machine

Example

````shell
$ nslookup local.nas.coulombel.net
Name:   local.nas.coulombel.net
Address: 192.168.1.88
````

### Deploy Apache 2 on bare machine (not recommended)

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

<!-- To ease Apache setup we could do sudo cp -R public /var/www/html/heos. --> 

<!-- About URL rewriting AND CORS issue
URL rewritting avoids CORS issue. However Apache is smarter than Python server as it does not block LAN private IP 192.168.1.x
For example to target the NAS :
const response = await fetch('http://192.168.1.88:5000/browse/play_previous', options); -> No CORS issue
const response = await fetch('http://local.nas.coulombel.net:5000/browse/play_previous', options); -> CORS issue
And machine:
const response = await fetch('http://192.168.1.90:5000/browse/play_previous', options); -> No CORS issue

So we could sed in JS file /heos-api-server by server URL.

Note rewriting and local IP will allow the request to leave browser but to decode response browser needs server to send CORS header
https://dev.to/matheusguimaraes/fast-way-to-enable-cors-in-flask-servers-42p0
https://stackoverflow.com/questions/25860304/how-do-i-set-response-headers-in-flask

Alternative to Apache is to use python server (sed in JS file /heos-api-server by server URL) and use Chrome extension for CORS issue:
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf


--> 

### Deploy Apache 2 via Docker (recommended)


Edit in [Apache config file](./apache-docker-config/heos.conf) following line to target API server.

For instance:

```shell
Redirect "/heos-api-server" "http://192.168.1.90:5000/"
Redirect "/heos-api-server" "http://local.nas.coulombel.net:5000/"
```

#### Option 1: deploy using volume

```shell
sudo systemctl stop apache2 
docker kill apache2-ui-heos; docker rm apache2-ui-heos
docker run -v /home/scoulomb/heos/open-denon-heos/remote-control/public:/var/www/html \
           -v /home/scoulomb/heos/open-denon-heos/remote-control/apache-docker-config/heos.conf:/etc/apache2/sites-available/000-default.conf \
           -p 8000:80 --name apache2-ui-heos ubuntu/apache2 
docker exec -it ecstatic_lovelace /bin/bash
```

#### Option 2: deploy via specific docker image

````shell
docker build . -t ubuntu-apache
sudo systemctl stop apache2 
docker kill apache2-ui-heos; docker rm apache2-ui-heos
docker run -p 8000:80 --name apache2-ui-heos ubuntu-apache 
````


## Deliver docker image 

````shell
docker build . -t scoulomb/heos-remote-control:1.0.0
docker login
docker push scoulomb/heos-remote-control:1.0.0
````

## Run remote control UI and server production image

See [docker compose](./PRD.docker-compose.yaml).

````shell
docker-compose -f PRD.docker-compose.yaml up
````

When using delivered image, you may have to modify URL rewriting to target your server IP in
`/etc/apache2/sites-available/000-default.conf`.

For this you can edit [conf file](./apache-docker-config/heos.conf) and copy it to the remote-control docker image.

```shell
docker-compose -f PRD.docker-compose.yaml pull
docker-compose -f PRD.docker-compose.yaml images
docker cp apache-docker-config/heos.conf remote-control_remote-control_1:/etc/apache2/sites-available/000-default.conf 
```

On QNAP NAS go to `Container station > create > create application`.
Copy [docker compose YAML file](PRD.docker-compose.yaml).

Note:
- UI entrypoint is `node:8000`.
- Back-end entrypoint is `node:5000`

<!-- all above tested and worked properly -->