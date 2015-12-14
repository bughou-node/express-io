
var socket = io();

var $input = $('#message-input textarea');
var $list = $('#messages-list');

socket.on('message', function (data) {
  $list.append('<li>' + data + '</li>');
});


$input.keyup(function (e) {
  if (!(e.keyCode === 13 && (e.ctrlKey || e.metaKey || e.altKey))) return;

  var val = $input.val();
  var $message = $(
    '<li>' + val + '<img src="/img/loading.gif"></li>'
  ).appendTo($list);
  $input.val('');

  socket.emit('message', val, function () {
    $message.children('img').remove();
  });
});
