'use strict';

const Sequelize = require('sequelize');
const assert = require('assert');
const path = require('path');
const debug = require('debug')('egg-sequelizer');

function splitObj(obj, keys) {
  const newObj = {};
  keys.forEach(key => {
    newObj[key] = obj[key];
    delete obj[key];
  });
  return newObj;
}

module.exports = app => {

  const defaultDir = path.join(app.baseDir, 'app', 'model');
  const defaultConfig = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    logging: app.logger.info.bind(app.logger),
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      charset: 'utf8',
    },
    sync: {
      force: false,
    },
  };

  // directory is relative to defaultDir;
  function modelDir(directory) {
    if (!directory) {
      return defaultDir;
    } else if (Array.isArray(directory)) {
      return directory.map(d => modelDir(d));
    } else if (path.isAbsolute(directory)) {
      return directory;
    }
    return path.join(defaultDir, directory);
  }

  function createClient(options) {
    // create sequelize instance.
    const client = new Sequelize(options.database,
      options.username,
      options.password,
      Object.assign(defaultConfig, options));
    // ensure connected.
    app.beforeStart(function* () {
      yield client.authenticate();
    });
    return client;
  }

  function loadClient(connectOptions, { name, directory, isSingleton, isDefault }) {
    debug('connection config: %o', connectOptions);
    const sequelize = createClient(connectOptions);
    // define app.models
    if (!isSingleton) {
      if (!app.models) {
        const models = {};
        Object.defineProperty(app, 'models', {
          writable: false,
          configurable: false,
          value: models,
        });
      }
      assert(!app.models[name], `[egg-sequelizer] client named "${name}" already exists, initialization failed.`);
      app.models[name] = sequelize;
    }
    // define app.model
    if (isDefault || isSingleton) {
      assert(!app.model, '[egg-sequelizer] incorrect initialization of singleton client.');
      Object.defineProperty(app, 'model', {
        writable: false,
        configurable: false,
        value: sequelize,
      });
    }
    // load model files.
    const loadedModels = [];
    new app.loader.FileLoader({
      call: true,
      target: sequelize,
      ignore: 'index.js',
      caseStyle: 'upper',
      directory: modelDir(directory),
      initializer(fn) {
        const model = fn(app, sequelize);
        if (model && Object.getPrototypeOf(model) === Sequelize.Model) {
          loadedModels.push(model);
          return model;
        }
      },
    }).load();
    for (const model of loadedModels) {
      if (typeof model.associate === 'function') {
        model.associate();
      }
    }
  }

  function splitOptions(opts) {
    const _opts = JSON.parse(JSON.stringify(opts));
    const internal = splitObj(_opts, [ 'directory' ]);
    return [ internal, _opts ];
  }

  const { client, clients, defaultClient } = app.config.sequelizer;

  app.Sequelize = Sequelize;

  if (clients) {
    Object.keys(clients).forEach(name => {
      const [{ directory }, connectOptions ] = splitOptions(clients[name]);
      loadClient(connectOptions, {
        name,
        directory,
        isSingleton: false,
        isDefault: name === defaultClient,
      });
    });
  } else if (client) {
    const [{ directory }, connectOptions ] = splitOptions(client);
    loadClient(connectOptions, {
      directory,
      isSingleton: true,
    });
  } else {
    throw new Error('[egg-sequelizer] no client or clients configuration available.');
  }
};
