const DEFAULT_EXTENSIONS = [
  '.mcss',
  '.css',
  '.scss',
  '.sass',
  '.stylus',
  '.styl',
  '.less'
]

let oldHandlers = {}

function noOp () {}

function restore () {
  for (const ext in oldHandlers) {
    if (oldHandlers[ext] === undefined) {
      delete require.extensions[ext]
    } else {
      require.extensions[ext] = oldHandlers[ext]
    }
  }
}

export default function register (extensions = DEFAULT_EXTENSIONS, handler = noOp) {
  restore()

  for (const ext of extensions) {
    oldHandlers[ext] = require.extensions[ext]
    require.extensions[ext] = handler
  }
}

register()
