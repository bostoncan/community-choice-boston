FROM node:6

ENV PATH ./node_modules/.bin:$PATH

WORKDIR /app
ADD ./package.json ./
ADD ./webpack.config.js ./

RUN npm install
