// Get headers
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let sid = params.sid; // "source id"
let mid = params.mid; // "media id"
let cid = params.cid; // "container id"

displayList = []

// ==============================================
// If no sid in header, display available sources
if (sid == undefined) {
    fetch("/heos-api-server/browse/get_music_sources")
        .then(function(response) {

            return response.json()
        })
        .then((data) => {

            var list = document.getElementById("music-sources");

            data.payload.forEach((item) => {
                console.log(item)
                displayList.push(item.name);
                let li = document.createElement("li");
                li.innerText = item.name
                list.appendChild(li);


                let li_details = document.createElement("ul");
                li.appendChild(li_details)
                // DETAILS
                // Source id
                if (item.sid != undefined) {
                    let li_details_sid = document.createElement("li");
                    li_details.appendChild(li_details_sid)
                    const li_details_sid_href = document.createElement('a');
                    li_details_sid_href.href = "/content-explorer?sid=" + item.sid
                    li_details_sid_href.innerText = "Browse: " + item.sid
                    li_details_sid.appendChild(li_details_sid_href);
                }



            })
            console.log(displayList)
        })
        .catch((err) => {
            console.log(`Error fetching: ${err}`)
        });
}

// ==============================================
// Browse a given source
fetch_url = "/heos-api-server/browse/browse"
if (sid != null) {
    fetch_url = fetch_url + "?sid=" + sid
}
if (mid != null) {
    fetch_url = fetch_url + "&mid=" + mid
}
if (cid != null) {
    fetch_url = fetch_url + "&cid=" + cid
}

console.log(fetch_url)
fetch(fetch_url)
    .then(function(response) {

        return response.json()
    })
    .then((data) => {
        console.log(data)
        console.log(data["payload"][0]["name"])
        var list = document.getElementById("myList");
        count = 0
        data.payload.forEach((item) => {
            console.log(item)
            displayList.push(item.name);
            let li = document.createElement("li");
            li.innerText = item.name
            list.appendChild(li);


            let li_details = document.createElement("ul");
            li.appendChild(li_details)
            // DETAILS
            // media id
            if (item.mid != undefined) {
                let li_details_mid = document.createElement("li");
                li_details.appendChild(li_details_mid)
                li_details_mid.innerText = "Media id: " + item.mid
            }
            // media url
            if (item.image_url) {
                let li_details_media_url = document.createElement("li");
                li_details.appendChild(li_details_media_url)
                const li_details_media_url_href = document.createElement('a');
                li_details_media_url_href.href = item.image_url
                li_details_media_url_href.innerText = "image url: " + item.image_url
                li_details_media_url.appendChild(li_details_media_url_href);
            }
            // cid
            if (item.cid != undefined) {
                let li_details_cid = document.createElement("li");
                li_details.appendChild(li_details_cid)
                const li_details_cid_href = document.createElement('a');
                li_details_cid_href.href = "/content-explorer?sid=" + sid + "&cid=" + item.cid // we keep previous sid, do not do item.sid
                li_details_cid_href.innerText = "Container id: " + item.cid
                li_details_cid.appendChild(li_details_cid_href);
            }
            // sid
            if (item.sid) {
                let li_details_sid = document.createElement("li");
                li_details.appendChild(li_details_sid)
                const li_details_sid_href = document.createElement('a');
                li_details_sid_href.href = "/content-explorer?sid=" + item.sid
                li_details_sid_href.innerText = "Source id: " + item.sid
                li_details_sid.appendChild(li_details_sid_href);
            }

            // ACTIONS
            // play media
            if (item.image_url) { // workaround for media url based on image url
                let li_details_play = document.createElement("li");
                li_details.appendChild(li_details_play)
                const li_details_play_href = document.createElement('a');
                li_details_play_href.href = "/heos-api-server/browse/play_stream?url=" + item.image_url.slice(0, -10)
                // /heos-api-server is back-end url (url rewriting), item.image_url is UPNP server (on top of UI url which is the same for explorer AND remote control)
                // LIMITATION: This will work only when we have image_url as we deduced media url from image url
                // HEOS sadly does not return media URL
                li_details_play_href.innerText = "Play:" + item.image_url.slice(0, -10)
                li_details_play.appendChild(li_details_play_href);
            }

            // LIMITATION: Add to queue (PID is hardcoded, do fix in BE)
            // LIMITATION: Amazon music does not support queue
            if (item.mid != undefined && cid != undefined) { //use use cid from query parameter
                let li_details_add_to_q = document.createElement("li");
                li_details.appendChild(li_details_add_to_q)
                const li_details_add_to_q_href = document.createElement('a');
                li_details_add_to_q_href.href = "/heos-api-server/browse/add_to_queue?pid=735067990&sid=" + sid + "&cid=" + cid + "&mid=" + item.mid + "&aid=3"
                li_details_add_to_q_href.innerText = "Add to queue: " + item.mid
                li_details_add_to_q.appendChild(li_details_add_to_q_href);
            } else if (cid != undefined) {
                let li_details_add_to_q = document.createElement("li");
                li_details.appendChild(li_details_add_to_q)
                const li_details_add_to_q_href = document.createElement('a');
                li_details_add_to_q_href.href = "/heos-api-server/browse/add_to_queue?pid=735067990&sid=" + sid + "&cid=" + cid + "&aid=3"
                // LIMITATION: Add to queue full container only works if there is actual content in subfolder
                li_details_add_to_q_href.innerText = "Add to queue full container: " + item.cid
                li_details_add_to_q.appendChild(li_details_add_to_q_href);


            }
            // play station
            if (item.type == "station") {
                // /content-explorer?sid=1027 (AUX inputs) => /heos-api-server/browse/play_stream?sid=735067990&mid=inputs/dvd&name=DVD
                // /content-explorer?sid=5&cid=Flow (deezer flow) => /heos-api-server/browse/play_stream?sid=5&mid=flow&nameFlow
                // /content-explorer?sid=13&cid=catalog/stations/#prime_stations (Amazon music) => /heos-api-server/browse/play_stream?sid=13&mid=catalog/stations/A1ESXGJW9GSMCX/#chunk&nameMa%20Bande%20Son

                let li_details_play_station = document.createElement("li");
                li_details.appendChild(li_details_play_station)
                const li_details_play_station_href = document.createElement('a');

                let href_url = "/heos-api-server/browse/play_stream?sid=" + sid + "&mid=" + item.mid + "&name" + item.name
                if (item.cid) {
                    href_url = href_url + "&cid=" + item.cid
                }
                li_details_play_station_href.href = href_url
                li_details_play_station_href.innerText = "Play station"
                li_details_play_station.appendChild(li_details_play_station_href);

            }



        })
        console.log(displayList)
    })
    .catch((err) => {
        console.log(`Error fetching: ${err}`)
    });