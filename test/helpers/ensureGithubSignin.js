const testEmail = process.env.TEST_USER_EMAIL
const testPassword = process.env.TEST_USER_PASSWORD

let signedInCookies = null

const ensureGithubSignin = t => {
  const { browser } = t.context

  if (signedInCookies) {
    browser
      .goto('https://github.com')
      .cookies.set(signedInCookies)
      .then(() => t.end())
      .catch(error => t.end(error))
  } else {
    browser
      .goto('https://github.com/login')
      .type('#login_field', testEmail)
      .type('#password', testPassword)
      .click('.btn')
      .wait(1000)
      .cookies.get({ url: null })
      .then(cookies => {
        signedInCookies = cookies
        t.end()
      })
      .catch(error => t.end(error))
  }
}

module.exports = ensureGithubSignin
