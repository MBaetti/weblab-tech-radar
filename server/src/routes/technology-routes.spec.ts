import { describe, it, expect } from 'vitest';
import router from './technology-routes';

function getRegisteredMethods(router: any): { method: string; path: string }[] {
    return router.stack
        .filter((layer: any) => layer.route)
        .map((layer: any) => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path,
        }));
}

describe('technology-routes', () => {
    it('sollte GET / registriert haben', () => {
        const routes = getRegisteredMethods(router);
        expect(routes).toContainEqual({ method: 'GET', path: '/' });
    });

    it('sollte GET /:id registriert haben', () => {
        const routes = getRegisteredMethods(router);
        expect(routes).toContainEqual({ method: 'GET', path: '/:id' });
    });

    it('sollte POST / registriert haben', () => {
        const routes = getRegisteredMethods(router);
        expect(routes).toContainEqual({ method: 'POST', path: '/' });
    });

    it('sollte PUT /:id registriert haben', () => {
        const routes = getRegisteredMethods(router);
        expect(routes).toContainEqual({ method: 'PUT', path: '/:id' });
    });

    it('sollte DELETE /:id registriert haben', () => {
        const routes = getRegisteredMethods(router);
        expect(routes).toContainEqual({ method: 'DELETE', path: '/:id' });
    });
});

