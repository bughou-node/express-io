var data = {
  development: {
    secret: 'this should be a random string',
    mongo:  'mongodb://127.0.0.1:27017/cheling_seller',
    mysql:  'mysql://root:root@192.168.0.109:3306/cheling_seller_dev'
  },
  test: {
    secret: 'this should be a random string',
    mongo:  'mongodb://127.0.0.1:27017/cheling_test',
    mysql:  'mysql://root:root@localhost:3306/cheling_seller_test'
  },
  qa: {
    secret: 'this should be a random string',
    mongo:  'mongodb://192.168.0.181:27017,192.168.0.182:27017/cheling_seller',
    mysql:  'mysql://root:root@192.168.0.109:3306/cheling_seller'
  },
  production: {
    secret: 'this should be a random string',
    mongo:  'mongodb://127.0.0.1:27017/cheling_seller',
    mysql:  'mysql://root:root@localhost:3306/cheling_seller'
  },
  preview: {
    secret: 'this should be a random string',
    mongo:  'mongodb://10.164.25.235:27017/cheling_seller',
    mysql:  'mysql://root:root@10.164.25.235:3306/cheling_seller'
  }
};

var env = require('express-io').env;
if (!data[env]) throw 'no config for environment: ' + env;

module.exports = data[env];

