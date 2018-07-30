'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/sequelizer.none.js', () => {

  it('no client or clients config', async () => {
    try {
      mock.app({ baseDir: 'apps/sequelizer-none' });
    } catch (e) {
      assert(e instanceof Error);
      assert(/^\[egg-sequelizer\]/.test(e.message));
    }
  });
});
