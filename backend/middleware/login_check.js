var config = require('../../common/config/config.js');

module.exports = function(req, res, next) {
  if (req.session.company) return next();

  res.redirect(
    config.account_site_url + '/login?backurl=' 
    + encodeURIComponent(config.site_url + req.url)
  );
}
