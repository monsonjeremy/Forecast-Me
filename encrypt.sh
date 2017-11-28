#!/usr/bin/env bash

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -e|--environment)
    DEPLOY_ENV="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done

if [ "$DEPLOY_ENV" == "production" ]; then
  gpg --encrypt -o launch.gpg --recipient forecastme .aws

  rm .aws
fi
