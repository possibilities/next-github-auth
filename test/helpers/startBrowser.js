const Browser = require('nightmare')

const startBrowser = t => {
  t.context.browser = new Browser({
    show: false,
    typeInterval: 1
  })
}

module.exports = startBrowser
