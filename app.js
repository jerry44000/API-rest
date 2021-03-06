const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 5000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json());

sequelize.initDb();

app.get('/', (req, res) => {
  res.json('Hello, Heroku !!')
})
//Points de terminaison

//Trouve tout les pokemons
require("./src/routes/findAllPokemons.js")(app);
//Trouve un pokemon par ID
require("./src/routes/findPokemonByPk.js")(app);
//Créer un pokemon
require("./src/routes/createPokemons.js")(app);
//Mise à jours du pokemon
require("./src/routes/updatePokemon.js")(app);
//Suppression d'un pokemon
require("./src/routes/deletePokemons")(app);
//Login
require('./src/routes/login.js');

//Gestion des erreurs 404
app.use(({ res }) => {
  const message = "The requested resource was not found.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
