const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/player.html`);
});

app.post("/api/v1/users", async (req, res) => {
  let { name } = req.body;
  let player = {
    name: name,
    id: Math.floor(Math.random() * 100),
  };
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    users.push(player);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json(player);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
