var data = {
  development: {
    redis: 'redis://127.0.0.1:6379/7',
    mongo: 'mongodb://127.0.0.1:27017/example',
    mysql: 'mysql://root:root@192.168.0.109:3306/example_dev'
  },
  test: {
    redis: 'redis://127.0.0.1:6379/8',
    mongo: 'mongodb://127.0.0.1:27017/cheling_test',
    mysql: 'mysql://root:root@localhost:3306/example_test'
  },
  qa: {
    redis: 'redis://127.0.0.1:6379/7',
    mongo: 'mongodb://192.168.0.181:27017,192.168.0.182:27017/example',
    mysql: 'mysql://root:root@192.168.0.109:3306/example'
  },
  production: {
    redis: 'redis://127.0.0.1:6379/7',
    mongo: 'mongodb://127.0.0.1:27017/example',
    mysql: 'mysql://root:root@localhost:3306/example'
  },
  preview: {
    redis: 'redis://127.0.0.1:6379/7',
    mongo: 'mongodb://10.164.25.235:27017/example',
    mysql: 'mysql://root:root@10.164.25.235:3306/example'
  }
};

var env = require('node_env').key;
var config = data[env];
if (!config) throw 'no config for environment: ' + env;

module.exports = config;
