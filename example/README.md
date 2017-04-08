# Next.js with Github auth example

A [Next.js](https://github.com/zeit/next.js) example using [Github](https://github.com) authentication

## Setup app environment

1. [Add an OAuth application](https://github.com/settings/developers) to your Github account to generate a client id and secret

    Set the callback URL to the public URL of the deployed app

1. Setup environment

    Export your GitHub app's client id and secret as environment variables

    ```
    export GITHUB_CLIENT_ID=YOUR_APP_ID
    export GITHUB_CLIENT_SECRET=YOUR_APP_SECRET
    ```

## Quick start

1. Run provided script

```
cd ./example && ./run.sh
```

## Manual start

1. Build and install

    Start by installing the library in the root of the repo

    ```
    yarn install
    yarn link
    ```

    Install the example

    ```
    cd example
    yarn install
    yarn link next-github-auth
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
