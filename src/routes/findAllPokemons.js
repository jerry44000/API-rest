const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const message = "Here is the list of all Pokemons.";
        res.json({ message, data: pokemons });
      })
      .catch((error) => {
        const message = `The list was not recovered.`;
        res.status(500).json({ message, data: error });
      });
  });
};
