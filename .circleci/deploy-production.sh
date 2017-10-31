#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Release"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

git config --global user.name $CIRCLE_USERNAME
git config --global user.email piper.tane@gmail.com

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

npm version patch -m "node-bitly %s"
npm publish

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag $PACKAGE_VERSION && git push --tags

echo "Release done"
