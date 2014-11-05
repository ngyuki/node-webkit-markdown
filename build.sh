#!/bin/bash

rm -fr release/
mkdir -p release/
zip node-webkit/app.nw -r package.json app/ node_modules/
cat node-webkit/nw.exe node-webkit/app.nw > release/app.exe

cp -v \
  node-webkit/ffmpegsumo.dll \
  node-webkit/icudtl.dat \
  node-webkit/libEGL.dll \
  node-webkit/libGLESv2.dll \
  node-webkit/nw.pak \
    release/
