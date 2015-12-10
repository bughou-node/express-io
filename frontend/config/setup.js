module.exports = setup;

function setup (app) {
  var dir = require('path').join(__dirname, '../');
  app.set('views', dir + 'views');
  app.set('view engine', 'jade');

  setup_locals(app);

  if (require('node_env').is_development) setup_static(app, dir);
}

function setup_locals (app) {
  app.locals.pretty      = true;
  // app.locals.paginate    = require('paginate');
  // app.locals.js_tag      = require('assets_compile').js_tag;
  // app.locals.css_tag     = require('assets_compile').css_tag;
  app.locals.time_format = require('time_format');
}

function setup_static (app, dir) {
  // app.use(require('serve-favicon')(dir  + 'public/favicon.ico'));
  var static = require('express').static;
  app.use(static(dir + 'public'));
  // for assets source maps
  app.use('/css', static(dir + 'css'));
  app.use('/js', static(dir + 'js'));
}

