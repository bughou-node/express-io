var assert = require('assert');

var p = require('path');
var assets = require('assets-tag')();

describe('development', function () {
  describe('js_tag', function () {
    it('should work', function () {
      var html = assets.js_tag('chat.js');
      assert(html.indexOf('src="/js/chat.js"') > 0);
    });
  });

  describe('css_tag', function () {
    it('should work', function () {
      var html = assets.css_tag('chat.css');
      assert(html.indexOf('href="/css/chat.css"') > 0);
    });
  });
});
