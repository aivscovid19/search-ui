# stage: 1
FROM node:latest as react-build

# Create app directory
WORKDIR /app

COPY package.json .

RUN yarn install

ENTRYPOINT ["yarn"]
CMD [ "start" ]