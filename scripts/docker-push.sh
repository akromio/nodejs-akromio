#!/usr/bin/env bash

# (1) get version
version=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+.[[:digit:]]")
mmVersion=$(npm pkg --workspace @akromio/gattuso get version | grep gattuso | grep -o -E "[[:digit:]]+.[[:digit:]]+")

# (2) publish docker images
sudo docker push akromio/gattuso:latest
sudo docker push akromio/gattuso:$version
sudo docker push akromio/gattuso:$nmVersion

sudo docker push akromio/carboni:latest
sudo docker push akromio/carboni:$version
sudo docker push akromio/carboni:$nmVersion
