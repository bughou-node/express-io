var trace = require('error-trace');

/* eslint-disable */
module.exports = function (app, io) {
  app.get('/', function(req, res, next) {
    res.render('chat');
  });

  io.on('connection', function (socket) {
    var ip = socket.conn.remoteAddress;
    socket.join(ip);
    var from = socket.broadcast.to(ip);

    socket.on('message', function (data, cb) {
      from.emit('message', data);
      cb();
    });
  });
};
/* eslint-enable */
