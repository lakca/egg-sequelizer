'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  const model = sequelize.define('user', {
    name: {
      type: STRING,
      unique: true,
    },
  });
  model.associate = function() {
    this.hasMany(sequelize.Profile);
  };
  return model;
};
