#!/bin/sh

# 1. Generate static web site
hugo --cleanDestinationDir -d public

# 2. Push last update
git add -A
git commit -m "Last update"
git push

# 3. Push static web site 
git checkout main

## 3.1 Clean repo
rm *

## 3.2 get static web site from src
git checkout src -- public
mv public/* ./
rmdir public

## 3.3 Push web site 
git add -A
git commit -m "Last update"
git push

# 4. Back to src branch
git checkout src
