const { DataTypes } = require("sequelize");

const Post = (sequelize) => {
  sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: true,
      freezeTableName: true, // tabla en singular
    }
  );
};

module.exports = Post;
