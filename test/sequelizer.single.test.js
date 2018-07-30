'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/sequelizer.single.js', () => {
  let app;
  before(async () => {
    app = mock.app({ baseDir: 'apps/sequelizer-single' });
    return app.ready();
  });

  before(() => app.model.sync({ force: true }));

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sequelizer')
      .expect(200);
  });

  it('*.models should be undefined', async () => {
    const ctx = app.mockContext();
    assert(app.models === undefined);
    assert(ctx.models === undefined);
  });

  it('ctx.*', async () => {
    const ctx = app.mockContext();
    assert(ctx.model === app.model);
    assert(ctx.models === app.models);
    assert(ctx.Sequelize === app.Sequelize);
  });

  it('should count 0 by app', async () => {
    const count = await app.model.Profile.count();
    assert(count === 0);
  });

  it('should count 0 by ctx', async () => {
    const ctx = app.mockContext();
    const count = await ctx.model.User.count();
    assert(count === 0);
  });

  it('ensure association', async () => {
    assert(app.model.User.associations.profiles.source === app.model.User);
    assert(app.model.User.associations.profiles.target === app.model.Profile);
    assert(app.model.Profile.associations.user.source === app.model.Profile);
    assert(app.model.Profile.associations.user.target === app.model.User);
  });
});
