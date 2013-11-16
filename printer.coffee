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
      output.write "\\r\\u3\\b2 #{line} "

    # workspace
    when 'W'
      text = ''
      for workspace in line.split ':'
        status = workspace[0]
        number = workspace[1]
        name = workspaces[number]

        if status is 'd'
          text += "\\f3#{name}\\fr"
        else if status is 'a'
          text += "\\u3\\b2#{name}\\ur\\br"
      output.write text

    when 'T'
      output.write "\\c#{ line }"