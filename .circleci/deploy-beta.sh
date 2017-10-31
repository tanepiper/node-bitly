#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Beta Release"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

git config --global user.name $CIRCLE_USERNAME
git config --global user.email piper.tane@gmail.com

npm version $PACKAGE_VERSION-beta-$CIRCLE_BUILD_NUM -m "beta release %s"
npm publish --tag beta

echo "Release done"
