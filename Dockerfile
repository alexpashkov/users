FROM node:12.14.0-stretch

COPY package*.json ./

RUN npm i

COPY src ./src

ENTRYPOINT ["npm", "start"]

