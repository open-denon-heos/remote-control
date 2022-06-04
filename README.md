# HEOS (Denon) Audio/Video Amplifier Remote Control (Web UI)

This Heos Remote Control is a web UI allowing you to remotely
control your Denon AV amplifier on the same LAN through its telnet
interface.

This requires a back-end (currently in development) to be functional.

## Demo and Screenshots

You can try the UI at https://open-denon-heos.github.io/remote-control/public/ (not
connected to any back-end).

Screenshots:

<img src="./screenshots/light_theme.png" alt="Screenshot of the light theme" title="Light Theme" width="300"/>

<img src="./screenshots/dark_theme.png" alt="Screenshot of the dark theme" title="Dark Theme" width="300"/>

## Local Dev

You can try this UI with (assuming you have [simple-http-server](https://github.com/TheWaWaR/simple-http-server) installed):

```sh
$ simple-http-server -i
```
Alternatively you can use

```sh
$ python3 -m http.server
```

And then head over to http://0.0.0.0:8000
