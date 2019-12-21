FROM node:12.14.0-stretch

COPY package*.json ./

RUN npm i

COPY src ./src

RUN npm t

ENTRYPOINT ["npm", "start"]

