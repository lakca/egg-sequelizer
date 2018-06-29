'use strict';

module.exports = (app, sequelize) => {
  const { STRING } = app.Sequelize;
  return sequelize.define('post_type', {
    type: {
      type: STRING,
      allowNull: false,
    },
  });
};
