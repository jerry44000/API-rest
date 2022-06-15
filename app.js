const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 5000;
 
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

//Points de terminaison

//Trouve tout les pokemons
require('./src/routes/findAllPokemons.js')(app);
//Trouve un pokemon par ID
require('./src/routes/findPokemonByPk.js')(app);
//Créer un pokemon
require('./src/routes/createPokemons.js')(app);
//Mise à jours du pokemon
require('./src/routes/updatePokemon.js')(app);
//Suppression d'un pokemon
require('./src/routes/deletePokemons')(app);

app.listen(port, () =>
  console.log(`Listened on port http://localhost:${port}`)
);
