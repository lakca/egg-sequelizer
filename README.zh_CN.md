# egg-sequelizer

[![Build Status](https://www.travis-ci.org/lakca/egg-sequelizer.svg?branch=master)](https://www.travis-ci.org/lakca/egg-sequelizer)
[![codecov](https://codecov.io/gh/lakca/egg-sequelizer/branch/master/graph/badge.svg)](https://codecov.io/gh/lakca/egg-sequelizer)

> [eggjs](https://eggjs.org)的[Sequelize](http://docs.sequelizejs.com)插件
> 与[egg-sequelize](https://github.com/eggjs/egg-sequelize)的不同在于，支持*多个数据库的连接*以及*为了便于区分的数据表文件夹归档*。

## 安装插件

```bash
$ npm i egg-sequelizer --save
```
## 用法

```javascript
  ctx.models.DatabaseOne.FolderOne.ModelOne === app.models.DatabaseOne.FolderOne.ModelOne
  ctx.models.DatabaseOne.FolderTwo.ModelOne === app.models.DatabaseOne.FolderTwo.ModelOne
  ctx.models.DatabaseTwo.FolderOne.ModelOne === app.models.DatabaseTwo.FolderOne.ModelOne
  ctx.model.DefaultDatabaseFolderOne.ModelOne === app.model.DefaultDatabaseFolderOne.ModelOne
```

## 开启插件

```js
// config/plugin.js
exports.sequelizer = {
  enable: true,
  package: 'egg-sequelizer',
};
```

## 详细配置
单客户端
```javascript
exports.sequelizer = {
  client: {
    // directory: '', // 指向 'app/model', 默认的模型文件的目录
    database: 'dbOneName',
    host: '***'
    username: '***',
    password: '***'
  }
};
```
多客户端：
```javascript
exports.sequelizer = {
  defaultClient: 'dbOneAlias', /* 默认的连接 */
  clients: {
    dbOneAlias: {
      directory: 'dbOne', // 指向 'app/model/dbOne'
      database: 'dbOneName',
      host: '***'
      username: '***',
      password: '***'
    },
    dbTwoAlias: {
      directory: 'dbTwo', // 指向 'app/model/dbTwo
      database: 'dbTwoName',
      host: '***'
      username: '***',
      password: '***'
    }
  }
};
```

`directory` 可以是绝对或相对（于应用下面的`app/model`目录）路径，支持多目录（数组）。

## License

[MIT](LICENSE)
