var data = {
  development: {
    root_domain: '.dev',
  },
  test: {
    root_domain: '.test',
  },
  qa: {
    root_domain: '.qa',
  },
  preview: {
    root_domain: '.preview',
  },
  production: {
    root_domain: '.com',
  }
};

var env = require('node_env').key;
var config = data[env];
if (!config) throw 'no config for environment: ' + env;

config.top_domain = '.example' + config.root_domain;
config.site_domain = 'www' + config.top_domain;
config.site_url = 'http://' + config.site_domain;
config.app_port = 3700;

module.exports = config;

