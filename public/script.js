// Player section

document.getElementById("previous").addEventListener("click", async () => {
  console.log("hello previous");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_previous', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("play").addEventListener("click", async () => {
  console.log("hello play");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/player/set_play_state?state=play', options);
  const data = await response.json();
  console.log("data received", data);

});

document.getElementById("pause").addEventListener("click", async () => {
  console.log("hello pause");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/player/set_play_state?state=pause', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("next").addEventListener("click",async () => {
  console.log("hello next");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_next', options);
  const data = await response.json();
  console.log("data received", data);
});

// Volume section

document.getElementById("mute").addEventListener("click", async () => {
  console.log("hello mute");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/player/toggle_mute', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("volume-down").addEventListener("click", async () => {
  console.log("hello volume down");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/player/volume_down', options);
  const data = await response.json();
  console.log("data received", data);

});

document.getElementById("volume-up").addEventListener("click", async () => {
  console.log("hello volume up");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/player/volume_up', options);
  const data = await response.json();
  console.log("data received", data);

});

// Presets section

document.getElementById("preset-1").addEventListener("click",async () => {
  console.log("hello preset 1");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_preset?preset=1', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("preset-2").addEventListener("click",async () => {
  console.log("hello preset 2");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_preset?preset=2', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("preset-3").addEventListener("click",async () => {
  console.log("hello preset 3");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_preset?preset=3', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("preset-4").addEventListener("click",async () => {
  console.log("hello preset 4");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/browse/play_preset?preset=10', options);
  const data = await response.json();
  console.log("data received", data);
});

// Source section

document.getElementById("source").addEventListener("change", async (event) => {
  const selected_source = event.target.value;
  console.log("hello source", selected_source);
    const options = {
    method: "GET",
    mode: "cors"
  };
  if (selected_source == "browse/play_queue") {
    const response = await fetch('/heos-api-server/browse/play_queue', options);
    const data = await response.json();
    console.log("data received", data);
  }
  else {
    const response = await fetch('/heos-api-server/browse/play_input?input=inputs/' +  selected_source, options);
    const data = await response.json();
    console.log("data received", data);
  }

});

// Power section

document.getElementById("power-on").addEventListener("click",async () => {
  console.log("hello power on");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/on', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("power-off").addEventListener("click",async () => {
  console.log("hello power off");
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/off', options);
  const data = await response.json();
  console.log("data received", data);
});

// Manual Http Request section
document.getElementById("send-query").addEventListener("click", async () => {
  console.log("hello send query");
  const text = document.getElementById("manual-http-request").value;
  console.log("should send text to the network", text);

  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('/heos-api-server/' + text, options);

  // Select right span in the page
  // And show it for a few seconds
  let element;
  if (response.status != 200) {
    element = document.getElementById("manual-http-request-ko");
  } else {
    element = document.getElementById("manual-http-request-ok");
  }
  element.style["display"] = "block";
  setTimeout(() => {
    element.style["display"] = "none";
  }, 3000);
});