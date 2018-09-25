FROM node:8.9
RUN mkdir /app
ADD . /app

WORKDIR /app

RUN npm install
RUN npm build

CMD ["npm", "start"]