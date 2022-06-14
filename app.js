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

//GET : Retourne la liste entière au format JSON
app.get("/api/pokemons", (req, res) => {
  const message = `Here is the list of all Pokemons. There is ${pokemons.length} pokemons around`;
  res.json(success(message, pokemons));
});

//POST : ajoute un nouveau pokémon
app.post("/api/pokemons", (req, res) => {
  const id = getSoloId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Pokemon ${pokemonCreated.name} has been created bro !!`;
  res.json(success(message, pokemonCreated));
});

//PUT : mise à jours d'un pokémon
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonUpdated = { ...req.body, id: id }
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Pokemon ${pokemonUpdated.name} has been updated bro !!`;
  res.json(success(message, pokemonUpdated));
})

//DELETE : supprime un pokémon
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonToDelete = pokemons.find(pokemon => pokemon.id === id);
  pokemons.filter(pokemon => pokemon.id != id)
      const message = `Pokemon ${pokemonToDelete.name} has been deleted man !!`
    res.json(success(message, pokemonToDelete))
    
    
  })


app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
