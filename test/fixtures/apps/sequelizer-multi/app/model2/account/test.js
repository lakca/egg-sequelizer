'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  return sequelize.define('test', {
    name: {
      type: STRING,
      unique: true,
    },
  });
};
