var trace = require('error-trace');

/* eslint-disable */
module.exports = function (app, io) {
  app.get('/', function(req, res, next) {
    res.end('hello, world.');
    // next(trace(new Error('ssss')));
  });
};
/* eslint-enable */
