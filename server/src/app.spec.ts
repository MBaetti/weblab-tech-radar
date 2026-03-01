import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from './app';
import http from 'node:http';

let server: http.Server;
let port: number;

beforeAll(async () => {
    await new Promise<void>((resolve) => {
        server = http.createServer(app);
        server.listen(0, () => {
            port = (server.address() as { port: number }).port;
            resolve();
        });
    });
});

afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe('Express App', () => {
    it('sollte eine Express-App-Instanz exportieren', () => {
        expect(app).toBeDefined();
        expect(typeof app).toBe('function');
    });

    it('sollte auf GET /api/technologies antworten (nicht 404)', async () => {
        const statusCode = await new Promise<number>((resolve) => {
            http.get(`http://localhost:${port}/api/technologies`, (res) => {
                resolve(res.statusCode ?? 0);
            }).on('error', () => resolve(0));
        });

        // Jeder Status außer 404 bedeutet, dass die Route registriert ist
        expect(statusCode).not.toBe(404);
    });
});

