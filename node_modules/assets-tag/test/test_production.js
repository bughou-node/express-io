var assert = require('assert');

process.env.NODE_ENV = 'production';
var assets = require('assets-tag')(
  require('path').join(__dirname, 'assets.json')
);

describe('production', function () {
  describe('js_tag', function () {
    it('should work', function () {
      var html = assets.js_tag('chat.js');
      var key = 'src="/js/chat.min.js?657a26073d5c756f494b94e058c8c9db"';
      assert(html.indexOf(key) > 0);
    });
  });

  describe('css_tag', function () {
    it('should work', function () {
      var html = assets.css_tag('chat.css');
      key = 'href="/css/chat.min.css?fd8442c22393193da7c437d6c80f3ce5"';
      assert(html.indexOf(key) > 0);
    });
  });
});
