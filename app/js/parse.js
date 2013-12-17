(function () {

  'use strict';

  var Block, parse;

  Block = function (obj) {
    obj = obj || {};

    this.text = '';
    this.position = obj.position || 'left';

    this.icon       = obj.icon       !== undefined ? obj.icon       : -1;
    this.underline  = obj.underline  !== undefined ? obj.underline  : -1;
    this.foreground = obj.foreground !== undefined ? obj.foreground : -1;
    this.background = obj.background !== undefined ? obj.background : -1;
  };

  parse = function (data) {

    var info, text, isCommand, block, len, i, char, createNewBlock,
        isForeground, isBackground, isUnderline, isIcon;

    info = [];
    text = data.toString();

    // debugging
    console.log(text);

    isCommand = false;
    block = null;

    createNewBlock = function (obj) {
      obj = obj || block;
      if (block && block.text.length === 0) {
        return block;
      }
      block = new Block(obj);
      info.push(block);
      return block;
    };

    createNewBlock();

    len = text.length;

    for (i = 0; i < len; i ++) {
      char = text[i];

      // Command handler
      if (isCommand) {
        isCommand = false;

        // Double blackslash is a literal backslash
        if (char === '\\') block.text += '\\';
        else createNewBlock();

        // Possible commands
        switch (char) {
          case 'l':
            block.position = 'left';
            break;
          case 'c':
            block.position = 'center';
            break;
          case 'r':
            block.position = 'right';
            break;
          case 'f':
            isForeground = true;
            break;
          case 'b':
            isBackground = true;
            break;
          case 'u':
            isUnderline = true;
            break;
          case 'i':
            isIcon = true;
        }
      }

      // Set foreground color
      else if (isForeground) {
        isForeground = false;
        if (char === 'r') block.foreground = -1;
        else block.foreground = parseInt(char, 10);
      }

      // Set background color
      else if (isBackground) {
        isBackground = false;
        if (char === 'r') block.background = -1;
        else block.background = parseInt(char, 10);
      }

      // Set underline color
      else if (isUnderline) {
        isUnderline = false;
        if (char === 'r') block.underline = -1;
        else block.underline = parseInt(char, 10);
      }

      // Set icon
      else if (isIcon) {
        isIcon = false;
        if (char === 'r') block.icon = -1;
        else block.icon = parseInt(char, 10);
      }

      // Backslash signifies command
      else if (char === '\\') {
        isCommand = true;
      }

      // Plain text
      else {
        block.text += char;
      }

    }

    // If last block is empty, remove it
    if (info[info.length - 1].text === '') {
      info.pop();
    }

    return info;
  };

  module.exports = parse;

}());
