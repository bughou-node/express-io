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
  /*
  io.use(function(socket, next) {
    if (!socket.request.session.user_id) {
      return next(new Error('not authorized'));
    }
    next();
  });
 */

  app.use(require('body-parser').urlencoded({ extended: false }));
  app.use(require('body-parser').json());
}

