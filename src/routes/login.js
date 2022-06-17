const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "User doesn't exist.";
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Wrong password..`;
              return res.status(401).json({ message });
            }
            const message = `User connected.`;
            return res.json({ message, data: user });
          });
      })
      .catch((error) => {
        const message = "Failed to connect the user.";
        return res.json({ message, data: error });
      });
  });
};
