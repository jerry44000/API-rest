const { Pokemon } = require("../db/sequelize");
const auth = require('../auth/auth.js');

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = "Pokemon doesn't exist. Try another identifier.";
          res.status(404).json({ message });
        }
        const message = "Pokemon found bro !!!";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = "Pokemon was not recovered. Try again in a few moments please.";
        res.status(500).json({ message, data: error });
      });
  });
};
