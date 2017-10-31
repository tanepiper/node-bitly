#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Beta Release branch: $CIRCLE_BRANCH"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

git config --global push.default simple
git config --global user.name $CIRCLE_USERNAME
git config --global user.email piper.tane@gmail.com

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

npm version $PACKAGE_VERSION-beta-$CIRCLE_BUILD_NUM -m "$CIRCLE_BRANCH %s"
npm publish --tag beta

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag $PACKAGE_VERSION && git push --tags && git push --set-upstream origin $CIRCLE_BRANCH

echo "Release done"
