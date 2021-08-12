# Dockerfile for universalregistrar/driver-did-key

FROM node:10-alpine
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules/
RUN npm install

# done

EXPOSE 9080

CMD [ "node", "index.js" ]
