#!/usr/bin/env bash

# (1) get gattuso version
version=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+.[[:digit:]]")

# (2) build docker images
sudo docker push akromio/gattuso:latest
sudo docker push akromio/gattuso:$version
