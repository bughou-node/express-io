var trace = require('error-trace');

/* eslint-disable */
module.exports = function (app, io) {
  app.get('/', function(req, res, next) {
    res.render('chat');
  });

  io.on('connection', function (socket) {
    var ip = socket.conn.remoteAddress;
    socket.join(ip);
    var room = socket.broadcast.to(ip);

    socket.on('message', function (data) {
      room.emit('message', data);
    });
  });
};
/* eslint-enable */
