// Player section

document.getElementById("previous").addEventListener("click", () => {
  console.log("hello previous");
  // actually send a request
  // GET example and then deserialize and print to console
  // See https://developer.mozilla.org/en-US/docs/Web/API/fetch
  let options = {
    method: "GET",
    mode: "cors"
  };
  fetch('http://worldtimeapi.org/api/timezone/Europe/Paris', options)
    .then(response => response.json())
    .then(data => {
      console.log("data received", data);
    });
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
