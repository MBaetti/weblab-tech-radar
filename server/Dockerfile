FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# Schema kopieren und Prisma-Client generieren
COPY prisma ./prisma/
RUN npx prisma generate

COPY . .