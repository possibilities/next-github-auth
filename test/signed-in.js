import test from 'ava'

const startBrowser = require('./helpers/startBrowser')
const ensureGithubSignin = require('./helpers/ensureGithubSignin')
const revokeAppAccess = require('./helpers/revokeAppAccess')

const WAIT_MS = 3000

const signIntoApp = t => {
  t.context.browser
    .goto('http://localhost:3000/sign-in')
    // This button takes a bit to light up and become clickable
    .wait(WAIT_MS)
    .click('#js-oauth-authorize-btn')
    .wait(WAIT_MS)
    .evaluate(() => document.querySelector('body').innerText)
    .then(pageText => {
      t.truthy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('home page!'))
      t.end()
    })
    .catch(error => t.end(error))
}

test.beforeEach(startBrowser)
test.beforeEach.cb(ensureGithubSignin)
test.beforeEach.cb(revokeAppAccess)
test.beforeEach.cb(signIntoApp)

test.cb('visiting sign-out page redirects to home page', t => {
  t.context.browser
    .goto('http://localhost:3000/sign-out')
    .wait(WAIT_MS)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.falsy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('home page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting sign-out page via client navigation redirects to home page', t => {
  t.context.browser
    .goto('http://localhost:3000')
    .click('.sign-out')
    .wait(WAIT_MS)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.falsy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('home page!'))
      t.end()
    })
    .catch(error => t.end(error))
})
