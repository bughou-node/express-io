var domain = require('domain');
var log_error= require('error-trace').log;
var is_development = require('node_env').is_development;

exports.domain = domain_handler;
exports.not_found = not_found;
exports.server_error = server_error;

function domain_handler(server) {
  return function(req, res, next) {
    var d = domain.create();

    d.add(req);
    d.add(res);

    d.on('error', function(err) {
      console.error('\n!!!!!!!!!!!!!!!!!!!\n');

      if (!res.headersSent) res.setHeader('Connection', 'close');
      err.app_stack = null;
      next(err);

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

  if (!err.app_stack) err.app_stack = ' ';
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

