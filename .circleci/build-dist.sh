#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Building Distribution"
npm run build

echo "Building new docs"
npm run ghdocs

echo "Build Done"
