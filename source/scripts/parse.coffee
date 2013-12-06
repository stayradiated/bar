# Parse the data stream of the socket

class Block

  constructor: (obj = {}) ->
    @text = ''
    @icon       = if obj.icon?       then obj.icon else -1
    @position   = if obj.position?   then obj.position else 'left'
    @underline  = if obj.underline?  then obj.underline else -1
    @foreground = if obj.foreground? then obj.foreground else -1
    @background = if obj.background? then obj.background else -1

parse = (data) ->

  info = []
  text = data.toString()

  isCommand = no

  block = null

  createNewBlock = (obj = block) ->
    if block?.text.length is 0 then return block
    block = new Block(obj)
    info.push block
    return block

  createNewBlock()

  for char in text

    # Command handler
    if isCommand
      isCommand = no

      # Double backslash is a literal backslash
      if char is '\\'
        block.text += '\\'
      else
        createNewBlock()

      # Possible commands
      switch char
        when 'l'
          block.position = 'left'
        when 'c'
          block.position = 'center'
        when 'r'
          block.position = 'right'
        when 'f'
          isForeground = yes
        when 'b'
          isBackground = yes
        when 'u'
          isUnderline = yes
        when 'i'
          isIcon = yes

    # Set foreground color
    else if isForeground
      isForeground = no
      if char is 'r'
        block.foreground = -1
      else
        block.foreground = parseInt char, 10

    # Set background color
    else if isBackground
      isBackground = no
      if char is 'r'
        block.background = -1
      else
        block.background = parseInt char, 10

    # Set underline color
    else if isUnderline
      isUnderline = no
      if char is 'r'
        block.underline = -1
      else
        block.underline = parseInt char, 10

    # Set icon
    else if isIcon
      isIcon = no
      if char is 'r'
        block.icon = -1
      else
        block.icon = parseInt char, 10

    # Backslash is the command char
    else if char is '\\'
      isCommand = yes

    # Standard text
    else
      block.text += char

  # If last block is empty, remove it
  if info[info.length - 1].text is ''
    info.splice -1

  return info

module.exports = parse
