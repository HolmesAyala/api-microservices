FROM node:10

ADD . .

RUN yarn install

EXPOSE 8080

CMD ["yarn", "run", "start"]
