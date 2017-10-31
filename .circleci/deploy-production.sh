#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Release"

PACKAGE_VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

VERSION_COMMAND=patch

git config --global push.default simple
git config --global user.name $CIRCLE_USERNAME
git config --global user.email piper.tane@gmail.com

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

git add .
git commit -m "release dependencies"
npm version $VERSION_COMMAND -m "node-bitly %s"
npm publish
git push --tags
git push --set-upstream origin $CIRCLE_BRANCH

echo "Release done"
