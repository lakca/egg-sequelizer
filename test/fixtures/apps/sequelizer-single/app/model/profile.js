'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const model = app.model.define('profile', {
    name: {
      type: STRING,
      unique: true,
    },
  });
  model.associate = function() {
    this.belongsTo(app.model.User);
  };
  return model;
};
