# stage: 1
FROM node:latest as react-build

# Create app directory
WORKDIR /app

COPY . ./

RUN yarn install
RUN yarn build
