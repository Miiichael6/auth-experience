const { DataTypes } = require("sequelize");

// ! no olvidar mostrar las Relaciones y la tabla intermediaa

const User = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://www.gravatar.com/avatar/d38f7357893c765569e740e6af73bb88?s=300&d=mm&r=g",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true, // tabla en singular
    }
  );
};

module.exports = User;
