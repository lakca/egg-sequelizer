'use strict';

const path = require('path');

exports.keys = '123456';

exports.sequelizer = {
  defaultClient: 'account',
  clients: {
    account: {
      directory: [ 'account', '../model2/account', path.join(__dirname, '../app/model3') ],
      database: 'sequelizer_test_one',
      host: '127.0.0.1',
      username: 'root',
    },
    post: {
      directory: 'post',
      database: 'sequelizer_test_two',
      host: '127.0.0.1',
      username: 'root',
    },
  },
};
