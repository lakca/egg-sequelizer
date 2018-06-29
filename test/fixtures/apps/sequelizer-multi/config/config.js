'use strict';

exports.keys = '123456';

exports.sequelizer = {
  defaultClient: 'account',
  clients: {
    account: {
      directory: 'account',
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
