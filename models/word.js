const uuid = require('uuid/v4');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define(
    'Word',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      word: DataTypes.STRING
    },
    {}
  );
  Word.associate = function(models) {
    // associations can be defined here
  };

  Word.beforeCreate(word => (word.id = uuid()));

  return Word;
};
