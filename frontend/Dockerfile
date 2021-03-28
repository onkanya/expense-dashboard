# to install any essential packages
FROM node:14.15.2-alpine3.12 AS buildbase
WORKDIR /app/expense-fe
COPY package*.json ./
RUN yarn

# to build the source code to js
FROM buildbase as builder
WORKDIR /app/expense-fe
COPY . .
RUN yarn build

FROM nginx:1.13.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/expense-fe/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]