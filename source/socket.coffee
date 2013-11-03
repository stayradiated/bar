fs = require 'fs'
net = require 'net'
config = require './config'

path = config.socket

if not path
  console.error 'config.socket is not defined!'
else
  console.log path

fs.exists path, (exists) ->
  if exists then fs.unlink path

module.exports = (fn) ->

  server = net.createServer (socket) ->
    socket.on 'data', fn

  server.listen path

  return server
