const uuid = require('uuid/v4');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const WordIndex = sequelize.define(
    'WordIndex',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      wordId: {
        type: DataTypes.UUID
      },
      paragraphId: {
        type: DataTypes.UUID
      }
    },
    {}
  );
  WordIndex.associate = function(models) {
    // associations can be defined here
  };

  WordIndex.beforeCreate(wi => (wi.id = uuid()));

  return WordIndex;
};
