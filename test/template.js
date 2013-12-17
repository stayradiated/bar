(function () {
  'use strict';

  var template, assert, theme;

  assert = require('assert');
  template = require('../app/js/template');

  theme = [
    '{{ classname }} -- {{ text }}'
  ];

  describe('template', function () {

    it('should load a theme', function () {
      template.useTheme(theme);
    });

    it('should compile templates', function () {
      var html;
      html = template.compile({
        text: 'hello world',
        icon: 3,
        foreground: 7,
        background: 0,
        underline: 2
      });
      assert.equal(html, 'bg bg-0 fg fg-7 ul ul-2 ic ic-3 -- hello world');
    });

    it('should not cache the block obj', function () {
      var html = template.compile({
        text: 'this is a test',
        underline: 4
      });
      assert.equal(html, 'ul ul-4 -- this is a test');
    });

  });

}());
