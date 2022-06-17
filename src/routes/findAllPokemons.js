const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require('../auth/auth.js');

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      if(name.length < 2) {
        const message = 'You must type at least 2 letters';
        return res.status(400).json({ message })
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            //propriété du modèle pokemon
            [Op.like]: `%${name}%`, //critère de la recherche
          },
        },
        order: ['name'],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `There is ${count} pokemon matching with ${name}.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ['name'] })
        .then((pokemons) => {
          const message = "Here is the list of all Pokemons.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `The list was not recovered.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
