# syntax = docker/dockerfile:1.2
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000

ARG REDIS_CONNECTION 
ENV REDIS_CONNECTION=$REDIS_CONNECTION
ENV NODE_ENV=production

RUN export

CMD [ "node", "build" ]