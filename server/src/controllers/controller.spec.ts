import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import {
    createTechnology,
    getTechnologies,
    getTechnologyById,
    updateTechnology,
    deleteTechnology,
} from './controller';

// Prisma-Client mocken
vi.mock('../../prisma/prisma', () => ({
    prisma: {
        technologyEntry: {
            create: vi.fn(),
            findMany: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
    },
}));

import { prisma } from '../../prisma/prisma';
import {TechCategory, TechRing} from "../../generated/prisma/enums";

// Hilfsfunktionen
function buildRes(): { res: Partial<Response>; status: ReturnType<typeof vi.fn>; json: ReturnType<typeof vi.fn> } {
    const res: Partial<Response> = {};
    const status = vi.fn().mockReturnValue(res);
    const json = vi.fn().mockReturnValue(res);
    res.status = status;
    res.json = json;
    return { res, status, json };
}

function buildReq(params: Record<string, string> = {}, body: Record<string, unknown> = {}): Partial<Request> {
    return { params, body } as Partial<Request>;
}

const next = vi.fn() as unknown as NextFunction;

const sampleEntry = {
    id: 1,
    name: 'Angular',
    category: TechCategory.languageOrFramework,
    ring: TechRing.adopt,
    description: 'Web-Framework von Google',
    classification: 'Frontend',
    entryDate: new Date(),
    changeDate: new Date(),
    published: false,
    publicationDate: null,
};

// getTechnologies
describe('getTechnologies', () => {
    beforeEach(() => vi.clearAllMocks());

    it('sollte alle Technologien als JSON zurückgeben', async () => {
        vi.mocked(prisma.technologyEntry.findMany).mockResolvedValue([sampleEntry]);
        const { res, json } = buildRes();

        await getTechnologies(buildReq() as Request, res as Response, next);

        expect(json).toHaveBeenCalledWith([sampleEntry]);
    });

    it('sollte next() bei einem Datenbankfehler aufrufen', async () => {
        const error = new Error('DB-Fehler');
        vi.mocked(prisma.technologyEntry.findMany).mockRejectedValue(error);
        const { res } = buildRes();

        await getTechnologies(buildReq() as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

// getTechnologyById
describe('getTechnologyById', () => {
    beforeEach(() => vi.clearAllMocks());

    it('sollte eine Technologie per ID zurückgeben', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(sampleEntry);
        const { res, json } = buildRes();

        await getTechnologyById(buildReq({ id: '1' }) as Request, res as Response, next);

        expect(json).toHaveBeenCalledWith(sampleEntry);
    });

    it('sollte 400 zurückgeben, wenn die ID keine Zahl ist', async () => {
        const { res, status, json } = buildRes();

        await getTechnologyById(buildReq({ id: 'abc' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültige ID' });
    });

    it('sollte 404 zurückgeben, wenn die Technologie nicht existiert', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await getTechnologyById(buildReq({ id: '99' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Technologie nicht gefunden' });
    });
});

// createTechnology
describe('createTechnology', () => {
    beforeEach(() => vi.clearAllMocks());

    const validBody = {
        name: 'React',
        category: 'languageOrFramework',
        ring: 'trial',
        description: 'UI-Bibliothek von Meta',
        classification: 'Frontend',
    };

    it('sollte eine neue Technologie erstellen und 201 zurückgeben', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        vi.mocked(prisma.technologyEntry.create).mockResolvedValue({ ...sampleEntry, name: 'React' });
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, validBody) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(201);
        expect(json).toHaveBeenCalled();
    });

    it('sollte 400 zurückgeben, wenn der Name fehlt', async () => {
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, { ...validBody, name: '' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültiger Name' });
    });

    it('sollte 409 zurückgeben, wenn der Name bereits vergeben ist', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(sampleEntry);
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, validBody) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(409);
        expect(json).toHaveBeenCalledWith({ message: 'Technologie existiert bereits' });
    });

    it('sollte 400 zurückgeben, wenn die Kategorie ungültig ist', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, { ...validBody, category: 'ungueltig' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültige Kategorie' });
    });

    it('sollte 400 zurückgeben, wenn der Ring ungültig ist', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, { ...validBody, ring: 'ungueltig' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültiger Ring' });
    });

    it('sollte 400 zurückgeben, wenn die Beschreibung fehlt', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await createTechnology(buildReq({}, { ...validBody, description: '' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültige Beschreibung' });
    });
});

// updateTechnology
describe('updateTechnology', () => {
    beforeEach(() => vi.clearAllMocks());

    it('sollte eine Technologie aktualisieren', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(sampleEntry);
        const updated = { ...sampleEntry, ring: TechRing.hold };
        vi.mocked(prisma.technologyEntry.update).mockResolvedValue(updated);
        const { res, json } = buildRes();

        await updateTechnology(buildReq({ id: '1' }, { ring: 'hold' }) as Request, res as Response, next);

        expect(json).toHaveBeenCalledWith(updated);
    });

    it('sollte 400 zurückgeben, wenn die ID ungültig ist', async () => {
        const { res, status, json } = buildRes();

        await updateTechnology(buildReq({ id: 'abc' }, { ring: 'hold' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültige ID' });
    });

    it('sollte 404 zurückgeben, wenn die Technologie nicht existiert', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await updateTechnology(buildReq({ id: '99' }, { ring: 'hold' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Technologie nicht gefunden' });
    });

    it('sollte publicationDate setzen, wenn published erstmals auf true gesetzt wird', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue({ ...sampleEntry, publicationDate: null });
        vi.mocked(prisma.technologyEntry.update).mockResolvedValue({ ...sampleEntry, published: true });
        const { res } = buildRes();

        await updateTechnology(buildReq({ id: '1' }, { published: true }) as Request, res as Response, next);

        const updateCall = vi.mocked(prisma.technologyEntry.update).mock.calls[0][0];
        expect(updateCall.data.publicationDate).toBeInstanceOf(Date);
    });

    it('sollte 400 zurückgeben, wenn published kein Boolean ist', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(sampleEntry);
        const { res, status, json } = buildRes();

        await updateTechnology(buildReq({ id: '1' }, { published: 'ja' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültiger Publish-Wert' });
    });
});

// deleteTechnology
describe('deleteTechnology', () => {
    beforeEach(() => vi.clearAllMocks());

    it('sollte eine Technologie löschen und zurückgeben', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(sampleEntry);
        vi.mocked(prisma.technologyEntry.delete).mockResolvedValue(sampleEntry);
        const { res, json } = buildRes();

        await deleteTechnology(buildReq({ id: '1' }) as Request, res as Response, next);

        expect(json).toHaveBeenCalledWith(sampleEntry);
    });

    it('sollte 400 zurückgeben, wenn die ID ungültig ist', async () => {
        const { res, status, json } = buildRes();

        await deleteTechnology(buildReq({ id: 'abc' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith({ message: 'Ungültige ID' });
    });

    it('sollte 404 zurückgeben, wenn die Technologie nicht existiert', async () => {
        vi.mocked(prisma.technologyEntry.findUnique).mockResolvedValue(null);
        const { res, status, json } = buildRes();

        await deleteTechnology(buildReq({ id: '99' }) as Request, res as Response, next);

        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Technologie nicht gefunden' });
    });
});

