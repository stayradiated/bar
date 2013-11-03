# Parse the data stream of the socket

class Block

  constructor: (obj = {}) ->
    @text = ''
    @position = if obj.position? then obj.position else 'left'
    @underline = if obj.underline? then obj.underline else no
    @foreground = if obj.foreground? then obj.foreground else no
    @background = if obj.background? then obj.background else no

parse = (data) ->

  info = []
  text = data.toString()

  isCommand = no

  _block = null

  block = ->
    if _block then return _block
    return newBlock()

  newBlock = (obj = _block) ->
    if _block?.text.length is 0 then return _block
    _block = new Block(obj)
    info.push _block
    return _block

  for char in text

    # Command handler
    if isCommand
      isCommand = no

      # Double backslash is a literal backslash
      if char is '\\'
        block().text += '\\'
      else
        newBlock()

      # Possible commands
      switch char
        when 'l'
          block().position = 'left'
        when 'c'
          block().position = 'center'
        when 'r'
          block().position = 'right'
        when 'f'
          isForeground = yes
        when 'b'
          isBackground = yes
        when 'u'
          isUnderline = yes

    # Set foreground color
    else if isForeground
      isForeground = no
      if char is 'r'
        block.foreground = no
      else
        block().foreground = parseInt char

    # Set background color
    else if isBackground
      isBackground = no
      if char is 'r'
        block().background = no
      else
        block().background = parseInt char

    # Set underline color
    else if isUnderline
      isUnderline = no
      if char is 'r'
        block.underline = no
      else
        block().underline = parseInt char

    # Backslash is the command char
    else if char is '\\'
      isCommand = yes

    # Standard text
    else
      block().text += char

  return info

module.exports = parse