#!/bin/sh

echo "update dev branch"
echo "=============="

hugo

git add -A
git commit -m "Last update"
git push 

echo "update main branch"
echo "=============="

git checkout main
git checkout dev -- public

mv public/* ./
rm public

git add -A
git commit -m "Last update"
git push 

echo "back to dev branch"
echo "=============="

git checkout dev
