FROM node:20-alpine AS build

ARG VITE_API_ORIGIN=http://localhost:5000
ENV VITE_API_ORIGIN=$VITE_API_ORIGIN

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
