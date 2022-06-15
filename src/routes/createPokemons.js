const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body).then((pokemon) => {
      const message = `Pokémon ${req.body.name} has been created bro !!`;
      res.json({ message, data: pokemon });
    });
  });
};
