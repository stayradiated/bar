(function () {
  'use strict';

  var assert, parse;

  assert = require('assert');
  parse = require('../app/js/parse');

  describe('Parse', function () {

    it('simple text', function () {
      var info, input;

      input = 'this is a simple sentence';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, input);
      assert.equal(info[0].position, 'left');
      assert.equal(info[0].underline, -1);
      assert.equal(info[0].foreground, -1);
      assert.equal(info[0].background, -1);
    });

    it('text with a backslash', function () {
      var info, input;

      input = 'some text \\\\ with a backslash';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, 'some text \\ with a backslash');
    });

    it('set the position', function () {
      var info, input;

      input = '\\rhello world';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, 'hello world');
      assert.equal(info[0].position, 'right');
    });

    it('set the foreground color', function () {
      var info, input;

      input = '\\f1some color';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, 'some color');
      assert.equal(info[0].foreground, 1);
    });

    it('set the background color', function () {
      var info, input;

      input = '\\b9some color';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, 'some color');
      assert.equal(info[0].background, 9);
    });

    it('set the underline color', function () {
      var info, input;

      input = '\\u5some color';
      info = parse(input);

      assert.equal(info.length, 1);
      assert.equal(info[0].text, 'some color');
      assert.equal(info[0].underline, 5);
    });

    it('no blank blocks', function () {
      var info, input;

      input = '\\u5\\b2\\f5  1  \\ur\\br\\fr\\f3  2  \\fr\\f3  3  \\fr';
      info = parse(input);

      assert.equal(info.length, 3);
    });

    it('combine position and background', function () {
      var info, input;

      input = '\\ccentered \\b3text';
      info = parse(input);

      assert.equal(info.length, 2);
      assert.equal(info[0].text, 'centered ');
      assert.equal(info[0].position, 'center');
      assert.equal(info[0].background, -1);

      assert.equal(info[1].text, 'text');
      assert.equal(info[1].position, 'center');
      assert.equal(info[1].background, 3);
    });

    it('multiple positions', function () {
      var info, input;

      input = '\\lleft\\ccenter\\rright';
      info = parse(input);

      assert.equal(info.length, 3);

      assert.equal(info[0].text, 'left');
      assert.equal(info[0].position, 'left');

      assert.equal(info[1].text, 'center');
      assert.equal(info[1].position, 'center');

      assert.equal(info[2].text, 'right');
      assert.equal(info[2].position, 'right');
    });

    it('joining formatting together', function () {
      var info, input;

      input = '\\c\\f2\\b3\\u5 random text \\r\\f9\\b2\\u4 more text';
      info = parse(input);

      assert.equal(info.length, 2);

      assert.equal(info[0].text,        ' random text ');
      assert.equal(info[0].position,    'center');
      assert.equal(info[0].foreground,  2);
      assert.equal(info[0].background,  3);
      assert.equal(info[0].underline,   5);

      assert.equal(info[1].text,        ' more text');
      assert.equal(info[1].position,    'right');
      assert.equal(info[1].foreground,  9);
      assert.equal(info[1].background,  2);
      assert.equal(info[1].underline,   4);
    });

    it('adding icons', function () {
      var info, input;

      input = '\\i3 Hello World \\ir No icon \\i0 An icon';
      info = parse(input);

      assert.equal(info[0].icon, 3);
      assert.equal(info[1].icon, -1);
      assert.equal(info[2].icon, 0);
    });

    it('reset formatting', function () {
      var info, input;

      input = '\\b3 with background \\br without background';
      info = parse(input);

      assert.equal(info.length, 2);

      assert.equal(info[0].text, ' with background ');
      assert.equal(info[0].background, 3);

      assert.equal(info[1].text, ' without background');
      assert.equal(info[1].background, -1);
    });

    it('complex stuff', function () {
      var info, input;

      input = '\\r\\f1wifi \\f5| \\f120% - Charging \\f5| \\f1Sun 3 Nov';
      info = parse(input);

      assert.equal(info.length, 5);

      assert.equal(info[0].text, 'wifi ');
      assert.equal(info[0].position, 'right');
      assert.equal(info[0].foreground, 1);

      assert.equal(info[1].text, '| ');
      assert.equal(info[1].position, 'right');
      assert.equal(info[1].foreground, 5);

      assert.equal(info[2].text, '20% - Charging ');
      assert.equal(info[2].position, 'right');
      assert.equal(info[2].foreground, 1);

      assert.equal(info[3].text, '| ');
      assert.equal(info[3].position, 'right');
      assert.equal(info[3].foreground, 5);

      assert.equal(info[4].text, 'Sun 3 Nov');
      assert.equal(info[4].position, 'right');
      assert.equal(info[4].foreground, 1);
    });

  });

}());
