#!/usr/bin/env bash

# App names to build.
readonly apps=(gattuso carboni cavani)

# (1) get version
version=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+.[[:digit:]]")
mmVersion=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+")

# (2) build docker image
for app in ${apps[@]}; do
  sudo docker build -t akromio/$app:latest -t akromio/$app:$mmVersion -t akromio/$app:$version --build-arg version=$version docker/$app/alpine/
done
