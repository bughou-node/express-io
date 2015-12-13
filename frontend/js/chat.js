
var socket = io();
socket.emit('message', 'hello');
socket.on('message', function (data) {
  console.log(data);
});
