#!/bin/sh

hugo -d docs

git add -A
git commit -m "Last update"
git push
