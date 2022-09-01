#!/bin/sh

# 1. Push theme updated

## 1.1 Change directory
cd themes/prettyhugo

## 1.2 Push update
git add -A
git commit -m "Last update"
git push

## 1.3 Go back in parent folder
cd ../..

# 2. Generate static web site
hugo --cleanDestinationDir -d public

# 3. Push last update
git add -A
git commit -m "Last update"
git push

# 4. Push static web site 
git checkout main

## 4.1 get static web site from src
git checkout src -- public
mv public/* ./
rmdir public

## 4.2 Push web site 
git add -A
git commit -m "Last update"
git push

# 5. Back to src branch
git checkout src
