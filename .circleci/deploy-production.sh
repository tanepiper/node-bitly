#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Release"

PACKAGE_VERSION=$(grep -m1 version package.json | sed -E 's/.*"(([0-9]+\.?)+).*/\1/')

VERSION_COMMAND=patch

git config --global push.default simple
git config --global user.name $CIRCLE_USERNAME
git config --global user.email piper.tane@gmail.com

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

git add .
git diff-index --quiet HEAD || git commit -m "Commit changes for $PACKAGE_VERSION"
git branch --set-upstream $CIRCLE_BRANCH
npm version $VERSION_COMMAND -m "$CIRCLE_BRANCH %s [ci skip]"
npm publish
git push --tags
git push --set-upstream origin $CIRCLE_BRANCH

echo "Release done"
