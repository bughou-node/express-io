var domain = require('domain');
var is_development = require('node_env').is_development;

exports.domain = domain_handler;
exports.not_found = not_found;
exports.server_error = server_error;

function domain_handler(server) {
  return function(req, res, next) {
    if (res.constructor === Function && next === undefined) {
      var socket = req;
      var next = res;
    }
    var d = domain.create();

    if (socket) {
      d.add(socket);
      socket.on('error', function (err) {
        console.error(err.stack);
      });
    } else {
      d.add(req);
      d.add(res);
    }

    d.on('error', function(err) {
      console.error('\n!!!!!!!!!!!!!!!!!!!');

      if (err.app_stack === undefined) err.app_stack = null;
      if (socket) {
        console.error(err.stack);
      } else {
        if (!res.headersSent) res.setHeader('Connection', 'close');
        next(err);
      }

      var timer = setTimeout(function () {
        process.exit(1);
      }, 30000);
      timer.unref();

      try {
        server.close(function (){ process.exit(1); });
      } catch (err2) {
      }
    });

    d.run(next);
  };
}

function not_found (req, res, next) {
  var err = new Error(req.method + ' ' + req.path + ' Not Found');
  err.status = 404;
  next(err);
}

function server_error (err, req, res, next) {
  if (!res.headersSent) {
    error_response(err, req, res);
  }

  if (err.app_stack === undefined) err.app_stack = null;
  log_error(err, req, res);
}


function error_response (err, req, res){
  res.status(err.status || 500);

  if (is_development) {
    var info = {
      status:  res.statusCode,
      message: err.message,
      stack:   err.stack
    };
    req.xhr ? res.json(info) : res.render('error/error', info);
  } else {
    if (req.xhr){
      res.json({ status:  res.statusCode })
    } else if (res.statusCode === 404) {
      res.render('error/404', info);
    } else {
      res.render('error/500', info);
    }
  }
}

function log_error (err, req, res) {
  if (err === null || err === undefined) return;

  var info = req.method + ' ' + req.url + ' ' + res.statusCode + '\n';
  var app_stack = err && err.app_stack;
  if (app_stack) info += app_stack + '\n';

  info += (err && err.stack || err);
  console.error(info);
};
