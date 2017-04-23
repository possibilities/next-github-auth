#!/bin/sh

set -e

[ -z "${GITHUB_CLIENT_ID}" ] && echo "GITHUB_CLIENT_ID is required" && exit 1;
[ -z "${GITHUB_CLIENT_SECRET}" ] && echo "GITHUB_CLIENT_SECRET is required" && exit 1;

# install and link libray
yarn install
yarn link --force

# install and run app
cd example
yarn install
yarn link next-github-auth
yarn dev
