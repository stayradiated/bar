path = '/tmp/bar.sock'

net = require 'net'

output = net.connect  path: path

output.on 'error', (err) ->
  console.log err

output.on 'connect', ->

  # Get input from stdin
  input = process.stdin
  input.resume()
  input.setEncoding 'utf8'

  input.on 'data', (line) ->
    read line

  input.on 'end', ->
    console.log 'end'

workspaces = ['', ' \\i0 ', ' \\i1 ', ' \\i2 ']

right =

read = (line) ->

  id = line[0]
  line = line[1..].replace '\n', ''

  switch id

    # clock
    when 'S'
      line = line.split '-'
      output.write "\\r\\b0 #{line[0]} \\b2\\f3 #{line[1]} \\fr\\br"

    # workspace
    when 'W'
      text = '\\c'
      for workspace in line.split ':'
        status = workspace[0]
        number = workspace[1]
        name = workspaces[number]

        if status is 'd' # inactive
          text += "\\b0#{ name }\\ir"

        else if status is 'a' # active
          text += "\\b2\\u4\\f3#{ name }\\ur\\fr\\br\\ir"

      output.write text

    # Volume
    when 'V'
      output.write "\\l#{ line }%"

    when 'T'
      output.write "\\c#{ line }"
