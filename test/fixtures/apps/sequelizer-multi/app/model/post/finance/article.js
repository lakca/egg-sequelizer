'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  return sequelize.define('finance_article', {
    title: {
      type: STRING,
      allowNull: false,
    },
  });
};
