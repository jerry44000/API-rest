const express = require("express");
let pokemons = require("./mock-pokemons.js");
const app = express();
const port = 5000;

app.get("/", (req, res) => res.send("Hello, Express3"));

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.json(pokemon);
});

app.get("/api/pokemons", (req, res) => {
    res.send(`There is ${pokemons.length} pokemons around`)
})

app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
