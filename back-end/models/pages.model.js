module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "pages",
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "Id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Page.associate = (models) => {
    Page.hasMany(models.fields, { onDelete: "cascade" });
    Page.belongsTo(models.user, {
      foreignKey: "Id",
      onDelete: "cascade",
    });
  };

  return Page;
};
