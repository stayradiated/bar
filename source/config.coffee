
config =

  height: 26 # height of OSX panel
  position: 'top' # or 'bottom'

  # Unix socket path
  # WARNING: Will be deleted if it already exists
  socket: '/tmp/bar.sock'

  font: "12px/26px 'PanicSans'"

  colors: [
    '#151515' # 0. background
    '#C5C8C6' # 1. foreground
    '#282A2E' # 2. grey bg
    '#707880' # 3. grey fg
    '#AC4142' # 4. red
    '#90A959' # 5. green
    '#DE935F' # 6. orange
    '#F0C674' # 7. yellow
    '#6A9FB5' # 8. blue
    '#AA759F' # 9. magenta
  ]

module.exports = config