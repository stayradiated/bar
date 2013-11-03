assert = require 'assert'
parse = require '../source/parse'

describe 'Parse', ->

  it 'simple text', ->

    input = 'this is a simple sentence'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, input
    assert.equal info[0].position, 'left'
    assert.equal info[0].underline, no
    assert.equal info[0].foreground, no
    assert.equal info[0].background, no

  it 'text with a backslash', ->

    input = 'some text \\\\ with a backslash'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, 'some text \\ with a backslash'


  it 'set the position', ->

    input = '\\rhello world'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, 'hello world'
    assert.equal info[0].position, 'right'


  it 'set the foreground color', ->

    input = '\\f1some color'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, 'some color'
    assert.equal info[0].foreground, 1


  it 'set the background color', ->

    input = '\\b9some color'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, 'some color'
    assert.equal info[0].background, 9


  it 'set the underline color', ->

    input = '\\u5some color'
    info = parse(input)

    assert.equal info.length, 1
    assert.equal info[0].text, 'some color'
    assert.equal info[0].underline, 5


  it 'combine position and background', ->

    input = '\\ccentered \\b3text'
    info = parse(input)

    assert.equal info.length, 2

    assert.equal info[0].text, 'centered '
    assert.equal info[0].position, 'center'
    assert.equal info[0].background, no

    assert.equal info[1].text, 'text'
    assert.equal info[1].position, 'center'
    assert.equal info[1].background, 3


  it 'multiple positions', ->

    input = '\\lleft\\ccenter\\rright'
    info = parse(input)

    assert.equal info.length, 3

    assert.equal info[0].text, 'left'
    assert.equal info[0].position, 'left'

    assert.equal info[1].text, 'center'
    assert.equal info[1].position, 'center'

    assert.equal info[2].text, 'right'
    assert.equal info[2].position, 'right'


  it 'joining formatting together', ->

    input = '\\c\\f2\\b3\\u5 random text \\r\\f9\\b2\\u4 more text'
    info = parse(input)

    assert.equal info.length, 2

    assert.equal info[0].text, ' random text '
    assert.equal info[0].position, 'center'
    assert.equal info[0].foreground, 2
    assert.equal info[0].background, 3
    assert.equal info[0].underline, 5

    assert.equal info[1].text, ' more text'
    assert.equal info[1].position, 'right'
    assert.equal info[1].foreground, 9
    assert.equal info[1].background, 2
    assert.equal info[1].underline, 4


  it 'reset formatting', ->

    input = '\\b3 with background \\br without background'
    info = parse(input)

    assert.equal info.length, 2

    assert.equal info[0].text, ' with background '
    assert.equal info[0].background, 3

    assert.equal info[1].text, ' without background'
    assert.equal info[1].background, no


  it 'complex stuff', ->

    input = '\\r\\f1wifi \\f5| \\f120% - Charging \\f5| \\f1Sun 3 Nov'
    info = parse(input)

    assert.equal info.length, 5

    assert.equal info[0].text, 'wifi '
    assert.equal info[0].position, 'right'
    assert.equal info[0].foreground, 1

    assert.equal info[1].text, '| '
    assert.equal info[1].position, 'right'
    assert.equal info[1].foreground, 5

    assert.equal info[2].text, '20% - Charging '
    assert.equal info[2].position, 'right'
    assert.equal info[2].foreground, 1

    assert.equal info[3].text, '| '
    assert.equal info[3].position, 'right'
    assert.equal info[3].foreground, 5

    assert.equal info[4].text, 'Sun 3 Nov'
    assert.equal info[4].position, 'right'
    assert.equal info[4].foreground, 1