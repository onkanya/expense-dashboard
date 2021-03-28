FROM node:14.15.2-alpine3.12 AS buildbase
WORKDIR /app/backend-api
COPY package*.json ./
RUN yarn

FROM buildbase as builder
WORKDIR /app/backend-api
COPY . .
RUN yarn build

FROM node:14.15.2-alpine3.12 as runner
WORKDIR /app/backend-api
COPY --from=builder /app/backend-api/dist /app/backend-api/dist
COPY --from=builder /app/backend-api/node_modules /app/backend-api/node_modules
COPY --from=builder /app/backend-api/package*.json /app/backend-api/

EXPOSE 8080

CMD [ "yarn", "start" ]
