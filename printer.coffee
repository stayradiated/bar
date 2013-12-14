config = require './source/scripts/config'
net = require 'net'

# Connect to the socket used by Bar
output = net.connect  path: config.socket

# Display errors
output.on 'error', (err) ->
  console.log err

# Start piping data from stdin to the socket
output.on 'connect', ->

  # Get input from stdin
  input = process.stdin
  input.resume()
  input.setEncoding 'utf8'

  input.on 'data', (line) ->
    text = read line
    if text then output.write text

  input.on 'end', ->
    console.log 'end'


# -----------------------------------------------------------------------------
# EDIT BELOW THIS LINE
# -----------------------------------------------------------------------------

# This is the icon syntax
# You can remove or edit it depending on your setup
workspaces = ['', ' \\i0 ', ' \\i1 ', ' \\i2 ']

# This function will be passed a line of text
# and is expected to return a formatted string for the Bar
# See: https://github.com/LemonBoy/bar#text-formatting
read = (line) ->

  # This code will change a lot for each setup
  # Personally I prefix contents with a single letter
  # to identify what it is

  # I then remove that first letter and use a switch statement
  # for each case

  # For example, the time is prefixed with an S
  #   S12:54 am - 10th Dec
  # Is converted into
  #   \\r\\b0 12:54 am \\b2\\b3 10th Dec \\fr\\br

  id = line[0]
  line = line[1..].replace '\n', ''

  switch id

    # clock
    when 'S'
      line = line.split '-'
      return "\\r\\b0 #{line[0]} \\b2\\f3 #{line[1]} \\fr\\br"

    # workspace
    when 'W'
      text = '\\c'
      for workspace in line.split(':')
        status = workspace[0]
        number = workspace[1]
        name = workspaces[number]

        if status is 'd' # inactive
          text += "\\b0#{ name }\\ir"

        else if status is 'a' # active
          text += "\\b2\\u4\\f3#{ name }\\ur\\fr\\br\\ir"

      return text

    # Volume
    when 'V'
      return "\\l #{ line }%"

    when 'T'
      return "\\l #{ line }"
