FROM node:16.14-alpine3.15 as builder

WORKDIR /app/

COPY package.json package-lock.json /app/

RUN npm ci --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

RUN npm run dev



FROM nginx:1.15.9-alpine

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]