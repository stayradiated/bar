(function () {
  'use strict';

  /*
   * Template generator
   * Creates elements and adds classnames
   * Handles the backgrounds, foregrounds, underlines and icons
   */

  var template, config, createTemplate, themes, tmpl;

  config = require('./config');
  themes = require('./themes');

  // Create a template from the theme
  createTemplate = function (theme) {
    theme = theme.join('');
    return function (obj) {
      var html, name, regex;
      html = theme;
      for (name in obj) {
        regex = new RegExp("\\{\\{\\s*" + name + "\\s*\\}\\}", 'gi');
        html = html.replace(regex, obj[name]);
      }
      return html;
    };
  };

  template = {

    useTheme: function (theme) {
      template.tmpl = createTemplate(theme);
    },

    compile: function(block) {
      var classname = [];

      if (block.background > -1) {
        classname.push('bg');
        classname.push('bg-' + block.background);
      }

      if (block.foreground > -1) {
        classname.push('fg');
        classname.push('fg-' + block.foreground);
      }

      if (block.underline > -1) {
        classname.push('ul');
        classname.push('ul-' + block.underline);
      }

      if (block.icon > -1) {
        classname.push('ic');
        classname.push('ic-' + block.icon);
      }

      return template.tmpl({
        text: block.text,
        classname: classname.join(' ')
      });

    }

  };

  // Load default theme
  template.useTheme(themes[themes.defaultTheme]);

  module.exports = template;

}());
