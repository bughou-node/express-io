
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var handler = require('express_error_handler');

var domain = handler.domain(server);
app.use(domain);
io.use(function (socket, next) {
  domain(socket.request, socket.request.res, next);
});

require('./frontend/config/setup.js')(app);
require('./backend/config/setup.js')(app, io);

require('./frontend/routes/routes.js')(app, io);

app.use(handler.not_found);
app.use(handler.server_error);

var port = require('./config/config.js').app_port;
server.listen(port);
console.log('listening at port %s.', port);

