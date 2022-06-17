const { ValidationError, UniqueConstraintError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const auth = require('../auth/auth.js');

module.exports = (app) => {
  app.post("/api/pokemons", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Pokémon ${req.body.name} has been created bro !!`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = "Pokemon was not added. Try again in a few moments please.";
        res.status(500).json({ message, data: error });
      });
  });
};
