#!/bin/bash

rm ./*.html
rm ./*.xml
rm ./*.txt

rm -r bootstrap
rm -r css
rm -r img
rm -r js
rm -r resources
rm -r sass
rm -r docs

git checkout export -- public
mv public/* ./

rm -r public
rm -r contacts
rm -r projets
rm -r technologies

