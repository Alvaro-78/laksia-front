FROM node:16.14-alpine3.15

WORKDIR /app/

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

CMD [ "npm" , "run",  "local" ]