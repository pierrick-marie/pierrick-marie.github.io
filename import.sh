#!/bin/bash

rm ./*.html
rm ./*.xml

rm -r categories
rm -r css
rm -r img
rm -r js
rm -r resources
rm -r sass
rm -r tags

git checkout dev.yummy-yam.export -- public
mv public/* ./

rmdir public

rm -r categories
rm -r tags
