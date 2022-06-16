const { Pokemon } = require("../db/sequelize");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id)
          .then((pokemon) => {
            if (pokemon === null) {
              const message = "Pokemon doesn't exist. Try another identifier.";
              res.status(404).json({ message });
            }
            const message = `Pokemon ${pokemon.name} has been updated bro !!`;
            res.json({ message, data: pokemon });
          })
         
      })
      .catch((error) => {
        if(error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = "Pokemon was not recovered. Try again in a few moments please.";
        res.status(500).json({ message, data: error });
      });
  });
};
