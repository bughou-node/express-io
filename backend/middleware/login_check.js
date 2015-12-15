var config = require('../../config/config.js');

module.exports = function(req, res, next) {
  if (req.session && req.session.user_id) return next();

  if (res.redirect) {
    var url = encodeURIComponent(config.site_url + req.url);
    res.redirect( config.login_url + '?backurl=' + url);
  } else {
    next(new Error('login first.'));
  }
}
