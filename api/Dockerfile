FROM node:4.3

ENV PATH ./node_modules/.bin:$PATH

WORKDIR /root
ADD ./package.json ./

RUN npm install
ENV NODE_PATH /root/node_modules
ENV PATH /root/node_modules/.bin:$PATH

WORKDIR /app
