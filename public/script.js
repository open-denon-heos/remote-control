// Player section

document.getElementById("previous").addEventListener("click", () => {
  console.log("hello previous");
  // actually send a request
  // (beware: you can only perform request to the same server)
  // GET http://example.com/movies.json and then deserialize and print to console
  fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data));
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

document.getElementById("source").addEventListener("change", () => {
  let selected_source = document.getElementById("source").value;
  console.log("hello source", selected_source);
});

// Power section

document.getElementById("power-on").addEventListener("click", () => {
  console.log("hello power on");
});

document.getElementById("power-off").addEventListener("click", () => {
  console.log("hello power off");
});
