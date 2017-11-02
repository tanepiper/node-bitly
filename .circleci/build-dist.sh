#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Building Distribution"
npm run build

echo "Building new docs"
RUNNING_DIR=$PWD

# For docs we want the full version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

DIR=$RUNNING_DIR/docs
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing existing docs"
    rm -rf "$DIR"
fi

npm run docs

mv $DIR/bitly/$PACKAGE_VERSION/* docs
rm -rf $DIR/bitly

echo "Docs building done"
