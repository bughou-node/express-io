var p = require('path');

module.exports = setup;

function setup (app) {
  var dir = require('path').join(__dirname, '../');
  app.set('views', dir + 'views');
  app.set('view engine', 'jade');

  setup_locals(app);

  if (require('node_env').is_development) setup_static(app, dir);
}

function setup_locals (app) {
  app.locals.pretty = true;
  var assets = require('assets-tag')(p.join(__dirname, '../assets.json'));
  app.locals.js_tag = assets.js_tag;
  app.locals.css_tag = assets.css_tag;
  // app.locals.paginate    = require('paginate');
  app.locals.time_format = require('time_format');
}

function setup_static (app, dir) {
  var static = require('express').static;
  app.use(static(dir + 'public'));
  app.use('/source-maps/css', static(dir + 'css'));
}

