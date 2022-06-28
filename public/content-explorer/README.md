# README

In dev mode I recommend to deploy Apache with Docker [Compose](../../README.md#option-3-build-and-deploy-both-server-and-ui-via-compose).

You can deploy a media server for test purpose as described here: https://github.com/open-denon-heos/upnp-media-server

We have:
- IP:PORT of GUI <!-- merged remote control and browser GUI -->
- IP:PORT of server
- IP:PORT of UPNP media server

Go to http://192.168.1.90:8000/content-explorer/

**Limitation**:
 
- Play url: This will work only when we have image_url as we deduced media url from image url 
HEOS sadly does not return media URL
- Amazon music does not support queue
- Add to queue full container only works if there is actual content in subfolder.
When adding to queue content from 2 different UPNP server, note the 2 different UPNP server IPs at http://local.nas.coulombel.net:5000/player/get_queue.

**TODO**:

- Add to queue (PID is hardcoded, do fix in BE)
- Redeliver and deploy
- Document commands
- REWRITE URL FIX REDIRECT ISSUE OSEF ON TOP

```shell
http://127.0.0.1:5000/browse/get_music_sources
http://127.0.0.1:5000/browse/browse?sid=1024
http://127.0.0.1:5000/browse/browse?sid=1798153082

http://127.0.0.1:5000/browse/browse?sid=1798153082&cid=1637

http://127.0.0.1:5000/browse/play_stream?url=http://192.168.1.90:30020/bed21ece-2e3a-4558-a459-8f900d4ea1ea/1641.flac

http://127.0.0.1:5000/browse/add_to_queue?pid=735067990&sid=1798153082&cid=1637&mid=1639.flac&aid=3
http://127.0.0.1:5000/browse/add_to_queue?pid=735067990&sid=1798153082&cid=1637&aid=3

http://127.0.0.1:5000/browse/get_search_criteria?sid=1798153082

http://127.0.0.1:5000/browse/search?sid=1798153082&search=muse&scid=3&range=1,99 => error


UI
http://localhost:8000/?sid=1798153082&cid=1588

# play station
 (deezer)
http://localhost:5000/browse/play_stream??sid=5&cid=Flow&mid=flow&name=Flow
 (dvd) = alternative to play input
http://localhost:5000/browse/play_stream?sid=735067990&mid=inputs/dvd&name=DVD

```
