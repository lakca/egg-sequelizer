'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  return sequelize.define('profile', {
    name: {
      type: STRING,
      unique: true,
    },
  });
};
