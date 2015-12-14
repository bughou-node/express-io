(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}]},{},[1])
//# sourceMappingURL=chat.js.map
