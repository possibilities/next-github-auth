#!/bin/sh

set -e

[ -z "${GITHUB_CLIENT_ID}" ] && echo "GITHUB_CLIENT_ID is required" && exit 1;
[ -z "${GITHUB_CLIENT_SECRET}" ] && echo "GITHUB_CLIENT_SECRET is required" && exit 1;

# install and link libray
cd ..
rm -rf ./node_modules
yarn install
yarn link

# install and run app
cd example
rm -rf ./node_modules
yarn install
yarn link next-github-auth
yarn dev
