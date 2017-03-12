# Next github auth example

A [Next.js](https://github.com/zeit/next.js) example using [Github](https://github.com) authentication

[![CircleCI](https://circleci.com/gh/possibilities/next-github-auth-example.svg?style=svg)](https://circleci.com/gh/possibilities/next-github-auth-example)

## Usage

1. Install

  ```
  yarn install
  ```

1. [Add an OAuth application](https://github.com/settings/developers) to your Github account to generate a client id and secret

1. Setup environment

  ```
  export GITHUB_CLIENT_ID=YOUR_APP_ID
  export GITHUB_CLIENT_SECRET=YOUR_APP_SECRET
  ```

1. Start the app

  ```
  yarn dev
  ```
