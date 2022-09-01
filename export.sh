#!/bin/sh

# Push src

git add -A
git commit -m "Last update"
git push

# Export static web site 
git checkout main

hugo --cleanDestinationDir -d ../pierrick-marie.github.io

# Push web site 

git add -A
git commit -m "Last update"
git push

# Back to src branch

git checkout src
