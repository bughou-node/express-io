module.exports = function (app, io) {
  app.get('/', function(req, res, next) {
    res.render('chat');
  });

  io.on('connection', function (socket) {
    var ip = socket.conn.remoteAddress;
    socket.join(ip);

    socket.on('message', function (data, cb) {
      socket.broadcast.to(ip).emit('message', data);
      cb();
    });
  });
};
