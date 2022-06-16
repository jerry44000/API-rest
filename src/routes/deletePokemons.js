const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      if (pokemon === null) {
        const message = "Pokemon doesn't exist. Try another identifier.";
        res.status(404).json({ message });
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id },
      })
      .then((_) => {
        const message = `Pokemon n°${pokemonDeleted.id} has been deleted man !!`;
        res.json({ message, data: pokemonDeleted });
      });
    })
    .catch((error) => {
        const message = "Pokemon was not deleted. Try again in a few moments please.";
        res.status(500).json({ message, data: error });
      });
  });
};
