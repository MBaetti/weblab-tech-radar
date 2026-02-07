FROM node:24.13.0

# Arbeitsverzeichnis
WORKDIR /app

# Abhängigkeiten kopieren
COPY package*.json ./
COPY prisma ./prisma/

# Abhängigkeiten installieren
RUN npm install

# Prisma-Client generieren
RUN npx prisma generate

# Quellencode kopieren
COPY . .

# Port freigeben
EXPOSE 3000

# Startbefehl
CMD ["npm", "run", "start"]