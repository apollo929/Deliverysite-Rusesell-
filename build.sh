#!/bin/bash
BRANCH=`git rev-parse --abbrev-ref HEAD`;
if [ "$BRANCH" == "master" ]; then
  npm run build:prod
else
  npm run build:stg
fi
