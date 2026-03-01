import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { errorHandler, type AppError } from './error-handler';

function buildRes(): Partial<Response> {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
}

describe('errorHandler', () => {
    const req = {} as Request;
    const next = vi.fn() as unknown as NextFunction;

    it('sollte Status 500 und die Standardmeldung zurückgeben, wenn kein Status gesetzt ist', () => {
        const res = buildRes();
        const err: AppError = new Error('Unbekannter Fehler');

        errorHandler(err, req, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unbekannter Fehler' });
    });

    it('sollte den gesetzten HTTP-Status des Fehlers verwenden', () => {
        const res = buildRes();
        const err: AppError = new Error('Nicht gefunden');
        err.status = 404;

        errorHandler(err, req, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nicht gefunden' });
    });

    it('sollte "Internal Server Error" zurückgeben, wenn kein Fehler-Message vorhanden ist', () => {
        const res = buildRes();
        const err: AppError = { name: 'Error', message: '' };

        errorHandler(err, req, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
});

