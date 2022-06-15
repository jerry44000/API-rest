const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id },
      }).then((_) => {
        const message = `Pokemon n°${pokemonDeleted.id} has been deleted man !!`;
        res.json({ message, data: pokemonDeleted });
      });
    });
  });
};
