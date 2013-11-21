
assert = require 'assert'
Template = require '../source/scripts/template'

describe 'template', ->

  template = null

  it 'should create a new template', ->
    template = new Template()

  it 'should compile templates', ->
    html = template.compile
      text: 'hello world'
      background: 0
    console.log html

  it 'should not cache the block obj', ->
    html = template.compile
      text: 'this is a test'
      underline: 4
    console.log html
