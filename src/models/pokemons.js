const validTypes = ['Plante', "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Name already exist.'
        },
        validate: {
          notEmpty: { msg: "Name can not be empty." },
          notNull: { msg: "Name is required." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "You need to use an integer." },
          notNull: { msg: "Health points are required." },
          max: {
            args: [999],
            msg: "Hp can't go beyond 999.",
          },
          min: {
            args: [0],
            msg: "Hp can't be less than 0.",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "You need to use an integer." },
          notNull: { msg: "Cp is required." },
          max: {
            args: [99],
            msg: "Hp can't go beyond 99.",
          },
          min: {
            args: [0],
            msg: "Hp can't be less than 0.",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "You need to use an URL." },
          notNull: { msg: "Picture is required." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValide(value) {
            if (!value) {
              throw new Error("A Pokemon must have at least one type.");
            }
            if (value.split(",").length > 3) {
              throw new Error("A pokemon can not have more than 3 types.");
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Types must be from this list : ${validTypes}.`)
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
