#!/bin/bash

dir=$(cd "$(dirname "$0")";pwd)
"$dir/node-webkit/nw.exe" "$dir" "$@"
