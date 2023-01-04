#!/usr/bin/env bash

# App names to publish.
readonly apps=(gattuso carboni cavani)

# (1) get version
version=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+.[[:digit:]]")
mmVersion=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+")

# (2) publish docker images
for app in ${apps[@]}; do
  sudo docker push akromio/$app:latest
  sudo docker push akromio/$app:$version
  sudo docker push akromio/$app:$nmVersion
done
