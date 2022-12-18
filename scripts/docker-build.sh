#!/usr/bin/env bash

# (1) get gattuso version
version=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+.[[:digit:]]")

# (2) build docker image
sudo docker build -t akromio/gattuso:latest -t akromio/gattuso:$version --build-arg version=$version docker/alpine/
