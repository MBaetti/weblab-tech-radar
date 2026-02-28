# WeblabTechRadar

Tech-Radar im Rahmen des Moduls Web Programming Lab an der HSLU Informatik im Herbstsemester 2025.

# Dokumentation

**arc42 Vorlage mit asciidoc**

Die Dokumentation zu diesem Projekt befindet sich unter /doc.

# Ganzen Stack mittels Docker-Compose hochfahren

## Environment

Als .env-Datei im Root-Verzeichnis.

**Inhalt:**
```env
# Client
CLIENT_PORT=4200

# Server
SERVER_PORT=3000
SERVER_NODE_ENV=development

# DB
DB_USER=postgres
DB_PASSWORD={passwort}
DB_HOST=localhost
DB_PORT=5432
DB_NAME=techradar
```

**Wichtig**
- {passwort} durch das eigene Passwort ersetzen.

## Docker-Compose

```bash
docker-compose up -d
```

Danach läuft der Client unter `http://localhost:4200/`. Mittels Reverse-Proxi (nginx) wird der Server unter `http://localhost:3000/` erreichbar.

# Client

**Angular**

*Version:* 21.1.2

## Client separat hochfahren

```bash
cd client
ng serve
```

Danach läuft der Client unter `http://localhost:4200/`.

# Server

**Node.js**

*Version:* v24.13.0

**Express**

API-Routing und Middleware.

## Server separat hochfahren

```bash
cd server
npm install
npm start
```

Danach läuft der Server unter `http://localhost:3000/`.

# DB

**PostgreSQL**

## DB separat als Docker-Container hochfahren

```bash
docker pull postgres
docker run --name techradar -d -p 5432:5432 -e POSTGRES_PASSWORD={passwort} postgres
```

**Wichtig** 
- {passwort} durch das Passwort ersetzen, welches in der .env-Datei definiert ist.
- Es muss ein Docker-Environment vorhanden sein.

# Testing

## Unit-Tests

```bash
cd client
ng test
```

## End-to-End-Tests mit Cypress

```bash
cd client
npx cypress open
```