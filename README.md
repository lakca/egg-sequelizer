# egg-sequelizer

[![Build Status](https://www.travis-ci.org/lakca/egg-sequelizer.svg?branch=master)](https://www.travis-ci.org/lakca/egg-sequelizer)
[![codecov](https://codecov.io/gh/lakca/egg-sequelizer/branch/master/graph/badge.svg)](https://codecov.io/gh/lakca/egg-sequelizer)

> [Sequelize](http://docs.sequelizejs.com) use in [eggjs](https://eggjs.org)
> support multi clients(databases) connection, and table folder archive.

## Install

```bash
$ npm i egg-sequelizer --save
```

## Usage

```javascript
  ctx.models.DatabaseOne.FolderOne.ModelOne === app.models.DatabaseOne.FolderOne.ModelOne
  ctx.models.DatabaseOne.FolderTwo.ModelOne === app.models.DatabaseOne.FolderTwo.ModelOne
  ctx.models.DatabaseTwo.FolderOne.ModelOne === app.models.DatabaseTwo.FolderOne.ModelOne
  ctx.model.DefaultDatabaseFolderOne.ModelOne === app.model.DefaultDatabaseFolderOne.ModelOne
```

```js
// {app_root}/config/plugin.js
exports.sequelizer = {
  enable: true,
  package: 'egg-sequelizer',
};
```

## Configuration

singleton client:
```javascript
exports.sequelizer = {
  client: {
    // directory: '', // resolved to be 'app/model', which is default.
    database: 'dbOneName',
    host: '***'
    username: '***',
    password: '***'
  }
};
```
multi clients:
```javascript
exports.sequelizer = {
  defaultClient: 'dbOneAlias', /* default connection, cab be invoked by 'app.model' */
  clients: {
    dbOneAlias: {
      directory: 'dbOne', // resolved to be 'app/model/dbOne'
      database: 'dbOneName',
      host: '***'
      username: '***',
      password: '***'
    },
    dbTwoAlias: {
      directory: 'dbTwo', // resolved to be 'app/model/dbTwo
      database: 'dbTwoName',
      host: '***'
      username: '***',
      password: '***'
    }
  }
};
```

`directory` can be an absolute or relative (to application `app/model`) path(s).

## License

[MIT](LICENSE)
