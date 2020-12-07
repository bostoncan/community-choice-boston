FROM node:8-alpine

ENV PATH ./node_modules/.bin:$PATH

WORKDIR /app
ADD ./package.json ./
RUN npm install

