const express = require("express");
let pokemons = require("./mock-pokemons.js");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require('body-parser');
const { success, getSoloId } = require("./helper.js");
const app = express();
const port = 5000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())

app.get("/", (req, res) => res.send("Hello, Express3"));

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Pokemon found";
  res.json(success(message, pokemon));
});

//Retourne la liste entière au format JSON
app.get("/api/pokemons", (req, res) => {
  const message = `Here is the list of all Pokemons. There is ${pokemons.length} pokemons around`;
  res.json(success(message, pokemons));
});

//POST un nouveau pokémon
app.post("/api/pokemons", (req, res) => {
  const id = getSoloId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Pokemon ${pokemonCreated.name} has been created bro !!`;
  res.json(success(message, pokemonCreated));
});

app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
