module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define(
    "fields",
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pages",
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
  Field.associate = (models) => {
    Field.belongsTo(models.pages, {
      foreignKey: "Id",
      onDelete: "cascade",
    });
  };

  return Field;
};
