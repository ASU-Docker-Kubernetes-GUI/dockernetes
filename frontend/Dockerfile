FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn build

COPY . .

CMD ["yarn", "start"]

EXPOSE 3000