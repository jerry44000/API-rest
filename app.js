const express = require("express");
let pokemons = require("./mock-pokemons.js");
const morgan = require('morgan');
const { success } = require("./helper.js");
const app = express();
const port = 5000;

app.use(morgan('dev'));

app.get("/", (req, res) => res.send("Hello, Express3"));

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Pokemon found";
  res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
  const message = `Here is the list of all Pokemons. There is ${pokemons.length} pokemons around`;
  res.json(success(message, pokemons));
});

app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
