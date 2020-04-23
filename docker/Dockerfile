# Dockerfile for universalregistrar/driver-did-key

FROM node:10
MAINTAINER Markus Sabadello <markus@danubetech.com>

# build driver-did-key

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

# done

EXPOSE 9080

CMD [ "node", "index.js" ]
