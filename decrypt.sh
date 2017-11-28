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
  gpg --decrypt -o .aws --recipient forecastme launch.gpg

  rm launch.gpg
fi
