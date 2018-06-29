'use strict';

module.exports = {
  get Sequelize() {
    return this.app.Sequelize;
  },
  get model() {
    return this.app.model;
  },
  get models() {
    return this.app.models;
  },
};
