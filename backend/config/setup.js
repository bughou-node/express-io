var express = require('express');

module.exports = setup;

function setup (app, io) {
  [
    require('morgan')(
      ':method :url :status :res[content-length] :response-time ms'
    ),
    require('cookie-parser')(),
  ].forEach(function (middleware) {
    app.use(middleware);
    io.use(function(socket, next) {
      middleware(socket.request, socket.request.res, next);
    });
  });

  var uri = require('url').parse(require('./config.js')['redis']);
  io.adapter(require('socket.io-redis')({
    host: uri['hostname'], port: uri['port'] 
  }));

  app.use(require('body-parser').urlencoded({ extended: false }));
  app.use(require('body-parser').json());
}

