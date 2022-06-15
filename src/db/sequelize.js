const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemons");
const pokemons = require("./mock-pokemons.js");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    console.log("Database 'Pokedex' has been initialized");
  });
};

module.exports = {
  initDb,
  Pokemon,
};
