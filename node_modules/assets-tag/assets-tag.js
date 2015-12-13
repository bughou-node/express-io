var p = require('path');

var production = require('node_env').is_production;

module.exports = function assets_tag(assets_path) {
  var assets = production && require(assets_path);

  function js_tag(path) {
    path = p.join('js', path);
    if (production) path = production_path(path, assets);
    return '\n  <script type="text/javascript" src="/' + path + '"></script>';
  }

  function css_tag(path) {
    path = p.join('css', path);
    if (production) path = production_path(path, assets);
    return '\n  <link rel="stylesheet" type="text/css" href="/' + path + '">';
  }
  return { js_tag: js_tag, css_tag: css_tag };
}

function production_path(path, assets) {
  var md5 = assets[path] && assets[path].md5;
  md5 || console.error('can not get asset md5 for: ' + path);

  var dir  = p.dirname(path);
  var ext  = p.extname(path);
  var name = p.basename(path, ext);

  return p.join(dir, name + '.min' + ext) + '?' + md5;
}
