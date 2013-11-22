#!/usr/bin/env coffee

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

workspaces = ['', '  1  ', '  2  ', '  3  ']

read = (line) ->

  id = line[0]
  line = line[1..].replace '\n', ''

  switch id

    # clock
    when 'S'
      line = line.split '-'
      output.write "\\r\\b9 #{line[0]} \\f1 #{line[1]} \\f1 #{line[2]}"

    # workspace
    when 'W'
      text = ''
      for workspace in line.split ':'
        status = workspace[0]
        number = workspace[1]
        name = workspaces[number]

        if status is 'd' # inactive
          text += "\\b9#{ name }"

        else if status is 'a' # active
          text += "\\b2\\f3#{name}\\fr\\br"

      output.write text

    # Volume
    when 'V'
      output.write "\\c\\b9#{ line }%"

    when 'T'
      output.write "\\c#{ line }"