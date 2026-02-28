# 1. Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# 2. Mit Nginx ausliefern
FROM nginx:alpine

# Proxie Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/weblab-tech-radar/browser /usr/share/nginx/html

EXPOSE 80
