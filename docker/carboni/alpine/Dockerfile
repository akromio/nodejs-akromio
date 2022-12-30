FROM node:18-alpine

# arguments
ARG version=latest

# environment variables
ENV KRM_REGISTRIES local=fs:///registry

# metadata
LABEL version=$version
LABEL description="Carboni image."
LABEL maintainer="Sia Codelabs"

# build image
RUN apk update && apk add bash
RUN npm i -g @akromio/carboni@$version
RUN echo "alias ll='ls -l'" >> ~/.bashrc

RUN mkdir /registry
VOLUME /registry

# entrypoint
STOPSIGNAL SIGINT
CMD carboni r
