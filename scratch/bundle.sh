#!/bin/bash

# Put this in a folder ABOVE the app/ folder, which contains the extension files (this repo)
# run to make a bundle.

rm -rf bundle
cp -R app bundle
rm bundle/lib/lodash.js
rm -rf bundle/scratch
rm bundle/*.scss
rm bundle/*.map

rm bundle/.gitignore

rm -rf bundle/.git
rm -rf bundle/.idea

zip -r bundle_$(date +%Y-%m-%d_%H-%M-%S).zip bundle/*
