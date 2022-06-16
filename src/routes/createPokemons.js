const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body).then((pokemon) => {
      const message = `Pokémon ${req.body.name} has been created bro !!`;
      res.json({ message, data: pokemon });
    })
    .catch((error) => {
        const message = "Pokemon was not added. Try again in a few moments please.";
        res.status(500).json({ message, data: error });
      });
  });
};
