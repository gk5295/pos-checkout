module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('offer', {
    customer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['deal', 'discount']
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  return Offer;
};
