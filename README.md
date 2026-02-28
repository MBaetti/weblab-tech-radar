# WeblabTechRadar

Tech-Radar im Rahmen des Moduls Web Programming Lab an der HSLU Informatik im Herbstsemester 2025.

# Dokumentation

**arc42 Vorlage mit asciidoc**

Die Dokumentation zu diesem Projekt befindet sich unter /doc.

# Ganzen Stack mittels Docker-Compose hochfahren

## Environment

Als .env-Datei im Root-Verzeichnis hinterlegen.

**Inhalt**

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

Danach läuft der Client unter `http://localhost:4200/`. Mittels Reverse-Proxi (nginx) wird der Server unter `http://localhost:3000/` für den Client erreichbar.

Die API ist dadurch unter `http://localhost:4200/api/` verfügbar.

# Client

**Angular**

*Version:* 21.1.2

## Client separat hochfahren

```bash
cd client
ng serve
```

Danach läuft der Client unter `http://localhost:4200/`.

# API

*Lokal:* `http://localhost:3000/api`

*Docker-Compose:* `http://localhost:4200/api/`

| Methode  | Pfad   | Beschreibung                        |
|----------|--------|-------------------------------------|
| `GET`    | `/`    | Alle Technologien abrufen           |
| `GET`    | `/:id` | Technologie mit einer bestimmten ID |
| `POST`   | `/`    | Neue Technologie erfassen           |
| `PUT`    | `/:id` | Bestehende Technologie updaten      |
| `DELETE` | `/:id` | Technologie löschen                 |

<details>
<summary><code>GET /</code> – Alle Technologien abrufen</summary>

**Response:** `200 OK` mit einem Array aller Technologie-Objekte.

</details>

<details>
<summary><code>GET /:id</code> – Technologie nach ID abrufen</summary>

**Response:** `200 OK` mit dem gefundenen Objekt oder `404 Not Found`.

</details>

<details>
<summary><code>POST /</code> – Neue Technologie erfassen</summary>

**Request Body:**
```json
{
  "name": "ArgoCD",
  "category": "tool",
  "description": "GitOps-Tool für Kubernetes",
  "ring": "adopt",
  "classification": "Empfohlen für alle neuen Projekte"
}
```
- `ring` und `classification` sind optional.
- Gültige Werte für `category`: `technique`, `tool`, `plattform`, `languageOrFramework`
- Gültige Werte für `ring`: `adopt`, `trial`, `assess`, `hold`

**Response:** `201 Created` mit dem erstellten Objekt.

</details>

<details>
<summary><code>PUT /:id</code> – Technologie aktualisieren</summary>

**Request Body** (alle Felder optional):
```json
{
  "name": "ArgoCD",
  "category": "tool",
  "description": "GitOps-Tool für Kubernetes",
  "ring": "adopt",
  "classification": "Empfohlen für alle neuen Projekte",
  "published": true
}
```
- Wird `published: true` zum ersten Mal gesetzt, wird `publicationDate` automatisch gesetzt.

**Response:** `200 OK` mit dem aktualisierten Objekt.

</details>

<details>
<summary><code>DELETE /:id</code> – Technologie löschen</summary>

**Response:** `200 OK` mit dem gelöschten Objekt oder `404 Not Found`.

</details>

Ein interaktives File befindet sich unter `./server/tech-radar.http`

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

Die API ist unter `http://localhost:3000/api` verfügbar.

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