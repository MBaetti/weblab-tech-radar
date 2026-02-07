# WeblabTechRadar

Tech-Radar im Rahmen des Moduls Web Programming Lab an der HSLU Informatik im Herbstsemester 2025.

# Dokumentation

**arc42 Vorlage mit asciidoc**

Die Dokumentation zu diesem Projekt befindet sich unter /doc im Repository.

# Stack hochfahren

Führe den folgenden Befehl aus, um sowohl den Client als auch den Server gleichzeitig zu starten:

```bash
docker-compose up -d
```

# Client

**Angular**

*Version:* 21.1.2

Dieses Projekt wurde mit [Angular CLI](https://github.com/angular/angular-cli) erstellt.

## Entwicklungsserver

Führe den folgenden Befehl aus, um einen lokalen Entwicklungsserver zu starten:

```bash
cd client
ng serve
```

Sobald der Server läuft, öffne deinen Browser und navigiere zu `http://localhost:4200/`. Die Anwendung lädt automatisch neu, sobald du eine der Quelldateien änderst.

## Code-Scaffolding

Angular CLI enthält leistungsstarke Code-Scaffolding-Tools. Um eine neue Komponente zu generieren. Führe dazu den folgenden Befehl aus:

```bash
cd client
ng generate component component-name
```

Für eine vollständige Liste verfügbarer Schematics (wie `components`, `directives` oder `pipes`). Führe dazu den folgenden Befehl aus:

```bash
cd client
ng generate --help
```

## Bauen

Führe den folgenden Befehl aus, um das Projekt zu bauen:

```bash
cd client
ng build
```

Dies wird dein Projekt kompilieren und die Build-Artefakte im `dist/`-Verzeichnis ablegen. Standardmäßig optimiert der Produktions-Build deine Anwendung für Leistung und Geschwindigkeit.

## Unit-Tests ausführen

Um Unit-Tests mit dem [Vitest](https://vitest.dev/)-Test-Runner auszuführen, verwende den folgenden Befehl:

```bash
cd client
ng test
```

## End-to-End-Tests ausführen

Führe den folgenden Befehl für End-to-End (e2e) Tests aus:

```bash
cd client
ng e2e
```

Angular CLI wird standardmäßig nicht mit einem End-to-End-Test-Framework ausgeliefert. Du kannst eines auswählen, das deinen Anforderungen entspricht.

## Zusätzliche Ressourcen

Für weitere Informationen zur Verwendung der Angular CLI und detaillierten Befehlsreferenzen besuche die Seite [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

# Server

**Node.js**

*Version:* v24.13.0

Event-basierte JavaScript-Laufzeitumgebung (V8 Engine) für das Backend.

**Express**

Minimalistisches Web-Framework für API-Routing und Middleware.

**MongoDB**

Dokumentenorientierte NoSQL-Datenbank zur Datenhaltung.

## Installation

Stelle sicher, dass Node.js und npm installiert sind. Führe dann den folgenden Befehl aus, um die Abhängigkeiten zu installieren:

```bash
cd server
npm install
```

## Starten des Servers

Führe den folgenden Befehl aus, um den Server zu starten:

```bash
cd server
npm start
```