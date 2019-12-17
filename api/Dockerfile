FROM node:12-alpine

ENV PATH ./node_modules/.bin:$PATH

WORKDIR /root
ADD ./package.json ./

RUN apk --update add zip && npm install
ENV NODE_PATH /root/node_modules
ENV PATH /root/node_modules/.bin:$PATH

WORKDIR /app
