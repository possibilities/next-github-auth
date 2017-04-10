/* global describe, beforeEach, it */

const Browser = require('nightmare')
const expect = require('expect')

const testEmail = process.env.TEST_USER_EMAIL
const testPassword = process.env.TEST_USER_PASSWORD

let browser = null

beforeEach(done => {
  browser = new Browser({
    show: false,
    typeInterval: 1
  })

  browser
    .goto('https://github.com/settings/applications')
    .type('#login_field', testEmail)
    .type('#password', testPassword)
    .click('.btn')
    .wait(1000)
    .evaluate(() => document.querySelector('.js-revoke-item .btn'))
    .then(revokeButton => {
      if (revokeButton) {
        browser
          .click('.js-revoke-item .btn')
          .wait('.facebox .btn')
          .click('.facebox .btn')
          .then(() => done())
          .catch(done)
      } else {
        done()
      }
    })
    .catch(done)
})

describe('github auth', () => {
  describe('when signed out', () => {
    it('visiting public page succeeds', done => {
      browser
        .goto('http://localhost:3000/public')
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('public page!')
          done()
        })
        .catch(done)
    })

    it('visiting private page prompts for authorization', done => {
      browser
        .goto('http://localhost:3000/private')
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('Authorize application')
          done()
        })
        .catch(done)
    })

    it('visiting public page via client navigation succeeds', done => {
      browser
        .goto('http://localhost:3000')
        .click('.nav .public')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('public page!')
          done()
        })
        .catch(done)
    })

    it('visiting private page via client navigation prompts for authorization', done => {
      browser
        .goto('http://localhost:3000')
        .click('.nav .private')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('Authorize application')
          done()
        })
        .catch(done)
    })

    it('visiting sign-in page succeeds', done => {
      browser
        .goto('http://localhost:3000/sign-in')
        // This button takes a bit to light up and become clickable
        .wait(3000)
        .click('#js-oauth-authorize-btn')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('home page!')
          done()
        })
        .catch(done)
    })

    it('visiting sign-in page via client navigation succeeds', done => {
      browser
        .goto('http://localhost:3000')
        .click('.sign-in')
        // This button takes a bit to light up and become clickable
        .wait(3000)
        .click('#js-oauth-authorize-btn')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('home page!')
          done()
        })
        .catch(done)
    })

    it('visiting private page redirects back to private page after signing in', done => {
      browser
        .goto('http://localhost:3000/private')
        // This button takes a bit to light up and become clickable
        .wait(3000)
        .click('#js-oauth-authorize-btn')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('private page!')
          done()
        })
        .catch(done)
    })

    it('visiting private page via client navigation redirects back to private page after signing in', done => {
      browser
        .goto('http://localhost:3000')
        .click('.private')
        // This button takes a bit to light up and become clickable
        .wait(3000)
        .click('#js-oauth-authorize-btn')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toInclude('private page!')
          done()
        })
        .catch(done)
    })
  })

  describe('when signed in', () => {
    beforeEach((done) => {
      browser
        .goto('http://localhost:3000/sign-in')
        // This button takes a bit to light up and become clickable
        .wait(3000)
        .click('#js-oauth-authorize-btn')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .then(pageText => {
          expect(pageText).toInclude('next-github-auth-test-user')
          expect(pageText).toInclude('home page!')
          done()
        })
        .catch(done)
    })

    it('visiting sign-out page', done => {
      browser
        .goto('http://localhost:3000/sign-out')
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toNotInclude('next-github-auth-test-user')
          expect(pageText).toInclude('home page!')
          done()
        })
        .catch(done)
    })

    it('visiting sign-out page via client navigation', done => {
      browser
        .goto('http://localhost:3000')
        .click('.sign-out')
        .wait(2000)
        .evaluate(() => document.querySelector('body').innerText)
        .end()
        .then(pageText => {
          expect(pageText).toNotInclude('next-github-auth-test-user')
          expect(pageText).toInclude('home page!')
          done()
        })
        .catch(done)
    })
  })
})
