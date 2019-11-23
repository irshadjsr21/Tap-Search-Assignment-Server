const uuid = require('uuid/v4');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const Paragraph = sequelize.define(
    'Paragraph',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      body: DataTypes.TEXT
    },
    {}
  );
  Paragraph.associate = function(models) {
    // associations can be defined here
  };

  Paragraph.beforeCreate(para => (para.id = uuid()));

  return Paragraph;
};
