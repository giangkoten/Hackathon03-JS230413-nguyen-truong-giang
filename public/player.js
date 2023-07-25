let form = document.getElementById("form");
let players = document.querySelectorAll(".player");
let body = document.getElementById("body");
let btnSubmit = document.getElementById("btn-submit");

// form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let playerData = [];
  for (let i = 0; i < players.length; i++) {
    playerData.push({ player: players[i].value });
  }
  try {
    let res = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    let data = await res.json();
    console.log(data);
    fs.writeFileSync("./data/users.json", JSON.stringify(data.data));
  } catch (error) {
    console.log(error);
  }
});
