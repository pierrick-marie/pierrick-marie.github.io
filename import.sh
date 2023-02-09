#!/bin/bash

rm ./*.html
rm ./*.xml

rm -r css
rm -r img
rm -r js
rm -r resources
rm -r sass

git checkout dev.yummy-yam.export -- public
mv public/* ./

rmdir public

