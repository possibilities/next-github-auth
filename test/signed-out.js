import test from 'ava'

const startBrowser = require('./helpers/startBrowser')
const ensureGithubSignin = require('./helpers/ensureGithubSignin')
const revokeAppAccess = require('./helpers/revokeAppAccess')

test.beforeEach(startBrowser)
test.beforeEach.cb(ensureGithubSignin)
test.beforeEach.cb(revokeAppAccess)

test.cb('visiting public page succeeds', t => {
  t.context.browser
    .goto('http://localhost:3000/public')
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.falsy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('public page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting public page via client navigation succeeds', t => {
  t.context.browser
    .goto('http://localhost:3000')
    .click('.nav .public')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.falsy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('public page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting sign-in page succeeds', t => {
  t.context.browser
    .goto('http://localhost:3000/sign-in')
    // This button takes a bit to light up and become clickable
    .wait(3000)
    .click('#js-oauth-authorize-btn')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('home page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting sign-in page via client navigation succeeds', t => {
  t.context.browser
    .goto('http://localhost:3000')
    .click('.sign-in')
    // This button takes a bit to light up and become clickable
    .wait(3000)
    .click('#js-oauth-authorize-btn')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('home page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting private page prompts for authorization', t => {
  t.context.browser
    .goto('http://localhost:3000/private')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('Authorize application'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting private page prompts for authorization within scope', t => {
  t.context.browser
    .goto('http://localhost:3000/private')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('Authorize application'))
      // Make sure we're bring prompted for repos
      t.truthy(pageText.includes('Repositories'))
      t.truthy(pageText.includes('Public and private'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting private page via client navigation prompts for authorization', t => {
  t.context.browser
    .goto('http://localhost:3000')
    .click('.nav .private')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('Authorize application'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting private page redirects back to private page after signing in', t => {
  t.context.browser
    .goto('http://localhost:3000/private')
    // This button takes a bit to light up and become clickable
    .wait(3000)
    .click('#js-oauth-authorize-btn')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('private page!'))
      t.end()
    })
    .catch(error => t.end(error))
})

test.cb('visiting private page via client navigation redirects back to private page after signing in', t => {
  t.context.browser
    .goto('http://localhost:3000')
    .click('.private')
    // This button takes a bit to light up and become clickable
    .wait(3000)
    .click('#js-oauth-authorize-btn')
    .wait(2000)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then(pageText => {
      t.truthy(pageText.includes('hi next-github-auth-test-user'))
      t.truthy(pageText.includes('private page!'))
      t.end()
    })
    .catch(error => t.end(error))
})
