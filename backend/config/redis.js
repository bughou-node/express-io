var redis = require('redis');
var config = require('./config.js');

module.exports = redis.createClient(config['redis']);

var session_redis;
Object.defineProperty(module.exports, 'session_redis', {
  get: function() {
    if (!session_redis) {
      session_redis = redis.createClient(config['session_redis']);
    }
    return session_redis;
  }
});


