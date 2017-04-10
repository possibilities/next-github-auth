const revokeAppAccess = t => {
  const { browser } = t.context

  browser
    .goto('https://github.com/settings/applications')
    .evaluate(() => document.querySelector('.js-revoke-item .btn'))
    .then(revokeButton => {
      if (revokeButton) {
        browser
          .click('.js-revoke-item .btn')
          .wait('.facebox .btn')
          .click('.facebox .btn')
          .then(() => t.end())
          .catch(error => t.end(error))
      } else {
        t.end()
      }
    })
    .catch(error => t.end(error))
}

module.exports = revokeAppAccess
