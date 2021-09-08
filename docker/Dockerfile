# Dockerfile for universalregistrar/driver-did-key

FROM node:10-alpine
MAINTAINER Markus Sabadello <markus@danubetech.com>

RUN apk add --no-cache --virtual build-deps python alpine-sdk autoconf libtool automake && \
  mkdir -p /prebuilds && cd /prebuilds && npm init -y && npm install sodium-native@3.1.1 && \
  apk del build-deps
ENV SODIUM_NATIVE_PREBUILD=/prebuilds/node_modules/sodium-native/

# build driver-did-key

WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules/
RUN npm install

# done

EXPOSE 9080

CMD [ "node", "index.js" ]
