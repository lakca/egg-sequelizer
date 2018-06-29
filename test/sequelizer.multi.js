'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/sequelizer.multi.js', () => {
  let app;
  before(async () => {
    app = mock.app({
      baseDir: 'apps/sequelizer-multi',
    });
    await app.ready();
    app.beforeStart(async function() {
      await Promise.all(Object.keys(app.models).map(name => app.models[name].sync()));
    });
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sequelizer')
      .expect(200);
  });

  it('*.models', async () => {
    const ctx = app.mockContext();
    assert(app.model === app.models.account);
    assert(ctx.model === ctx.models.account);
    assert(app.model === ctx.model);
  });

  it('do query', async () => {
    const { post, account } = app.models;
    const count1 = await account.User.count();
    const count2 = await account.Profile.count();
    const count3 = await post.Type.count();
    const count4 = await post.Finance.Article.count();
    assert(count1 === 0);
    assert(count2 === 0);
    assert(count3 === 0);
    assert(count4 === 0);
  });
});
