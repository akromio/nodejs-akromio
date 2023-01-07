FROM node:18-alpine

# arguments
ARG version=latest

# environment variables
ENV KRM_REGISTRIES local=fs:///registry

# metadata
LABEL version=$version
LABEL description="Cavani image."
LABEL maintainer="Sia Codelabs"

# build image
RUN apk update && apk add bash redis
RUN npm i -g @akromio/cavani@$version
RUN echo "alias ll='ls -l'" >> ~/.bashrc

RUN mkdir /registry
VOLUME /registry

# entrypoint
STOPSIGNAL SIGINT
CMD cavani r
