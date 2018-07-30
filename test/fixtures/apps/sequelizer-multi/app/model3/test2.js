'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  return sequelize.define('test2', {
    name: {
      type: STRING,
      unique: true,
    },
  });
};
