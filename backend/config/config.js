var data = {
  development: {
    mongo:  'mongodb://127.0.0.1:27017/example',
    mysql:  'mysql://root:root@192.168.0.109:3306/example_dev'
  },
  test: {
    mongo:  'mongodb://127.0.0.1:27017/cheling_test',
    mysql:  'mysql://root:root@localhost:3306/example_test'
  },
  qa: {
    mongo:  'mongodb://192.168.0.181:27017,192.168.0.182:27017/example',
    mysql:  'mysql://root:root@192.168.0.109:3306/example'
  },
  production: {
    mongo:  'mongodb://127.0.0.1:27017/example',
    mysql:  'mysql://root:root@localhost:3306/example'
  },
  preview: {
    mongo:  'mongodb://10.164.25.235:27017/example',
    mysql:  'mysql://root:root@10.164.25.235:3306/example'
  }
};

var env = require('express-io').env;
if (!data[env]) throw 'no config for environment: ' + env;

module.exports = data[env];

