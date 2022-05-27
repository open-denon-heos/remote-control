// Player section

document.getElementById("previous").addEventListener("click", async () => {
  console.log("hello previous");
  // actually send a request
  // GET example and then deserialize and print to console
  // See https://developer.mozilla.org/en-US/docs/Web/API/fetch
  const options = {
    method: "GET",
    mode: "cors"
  };
  const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Paris', options);
  const data = await response.json();
  console.log("data received", data);
});

document.getElementById("play").addEventListener("click", () => {
  console.log("hello play");
});

document.getElementById("pause").addEventListener("click", () => {
  console.log("hello pause");
});

document.getElementById("next").addEventListener("click", () => {
  console.log("hello next");
});

// Volume section

document.getElementById("mute").addEventListener("click", () => {
  console.log("hello mute");
});

document.getElementById("volume-down").addEventListener("click", () => {
  console.log("hello volume down");
});

document.getElementById("volume-up").addEventListener("click", () => {
  console.log("hello volume up");
});

// Presets section

document.getElementById("preset-1").addEventListener("click", () => {
  console.log("hello preset 1");
});

document.getElementById("preset-2").addEventListener("click", () => {
  console.log("hello preset 2");
});

document.getElementById("preset-3").addEventListener("click", () => {
  console.log("hello preset 3");
});

document.getElementById("preset-4").addEventListener("click", () => {
  console.log("hello preset 4");
});

// Source section

document.getElementById("source").addEventListener("change", (event) => {
  const selected_source = event.target.value;
  console.log("hello source", selected_source);
});

// Power section

document.getElementById("power-on").addEventListener("click", () => {
  console.log("hello power on");
});

document.getElementById("power-off").addEventListener("click", () => {
  console.log("hello power off");
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
  const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Paris', options);


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