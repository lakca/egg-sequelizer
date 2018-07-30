'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/sequelizer.multi.js', () => {
  let app;
  before(() => {
    app = mock.app({ baseDir: 'apps/sequelizer-multi' });
    return app.ready();
  });

  before(() => Promise.all(Object.keys(app.models).map(name => app.models[name].sync({ force: true }))));

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
    assert(app.models.account.Test);
    assert(app.models.account.Test2);
  });

  it('do query', async () => {
    const { post, account } = app.models;
    const count1 = await account.User.count();
    const count2 = await account.Profile.count();
    const count3 = await post.Type.count();
    const count4 = await post.Finance.Article.count();
    const count5 = await account.Test.count();
    const count6 = await account.Test2.count();
    assert(count1 === 0);
    assert(count2 === 0);
    assert(count3 === 0);
    assert(count4 === 0);
    assert(count5 === 0);
    assert(count6 === 0);
  });
});
