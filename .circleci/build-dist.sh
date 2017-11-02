#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Building Distribution"
npm run build

echo "Building new docs"
DIR=$RUNNING_DIR/docs
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing existing docs"
    rm -rf "$DIR"
fi

mkdir $PWD/docs
npm run ghdocs

echo "Build Done"
