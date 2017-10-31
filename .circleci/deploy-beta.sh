#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail

echo "Doing NPM Beta Release"

npm version patch -m "beta release %s"
npm publish --tag beta

echo "Release done"
