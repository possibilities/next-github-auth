# Next github auth example

A [Next.js](https://github.com/zeit/next.js) example using [Github](https://github.com) authentication

[![CircleCI](https://circleci.com/gh/possibilities/next-github-auth-example.svg?style=svg)](https://circleci.com/gh/possibilities/next-github-auth-example)


![screen](https://raw.githubusercontent.com/possibilities/next-github-auth-example/master/screen.gif "screen")


## Usage

1. Install

  ```
  yarn install
  ```

1. [Add an OAuth application](https://github.com/settings/developers) to your Github account to generate a client id and secret

   Set the callback URL to the public URL of the deployed app

1. Setup environment

  ```
  export GITHUB_CLIENT_ID=YOUR_APP_ID
  export GITHUB_CLIENT_SECRET=YOUR_APP_SECRET
  ```

1. Start the app

  ```
  yarn dev
  ```

## Demo

The example app is deployed to [https://next-github-auth-example.now.sh](https://next-github-auth-example.now.sh)

## Deploy

Deploy to [now](https://now.sh)

```
now secret add next-github-id YOUR_APP_ID
now secret add next-github-secret YOUR_APP_SECRET

now -e GITHUB_CLIENT_ID=@next-github-id -e GITHUB_CLIENT_SECRET=@next-github-secret
```
