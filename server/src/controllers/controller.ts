import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/prisma';
import { TechCategory, TechRing} from '../../generated/prisma/enums';

const isTechCategory = (value: unknown): value is TechCategory =>
    typeof value === 'string' && Object.values(TechCategory).includes(value as TechCategory);

const isTechRing = (value: unknown): value is TechRing =>
    typeof value === 'string' && Object.values(TechRing).includes(value as TechRing);

export const createTechnology = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, ring, description, classification } = req.body;
        if (typeof name !== 'string' || name.trim().length === 0) {
            res.status(400).json({ message: 'Ungültiger Name' });
            return;
        }
        const nameExists: boolean = await technologyNameExists(name);
        if (nameExists) {
            res.status(409).json({ message: 'Technologie existiert bereits' });
            return;
        }
        if (!isTechCategory(category)) {
            res.status(400).json({ message: 'Ungültige Kategorie' });
            return;
        }
        // Optional
        if (ring !== undefined && !isTechRing(ring)) {
            res.status(400).json({ message: 'Ungültiger Ring' });
            return;
        }
        if (typeof description !== 'string' || description.trim().length === 0) {
            res.status(400).json({ message: 'Ungültige Beschreibung' });
            return;
        }
        // Optional
        if (classification !== undefined && (typeof classification !== 'string' || classification.trim().length === 0)) {
            res.status(400).json({ message: 'Ungültige Klassifizierung' });
            return;
        }

        const newTechnology = await prisma.technologyEntry.create({
            data: {
                name: name.trim(),
                category: category,
                ring: ring,
                description: description.trim(),
                classification: classification,
            },
        });

        res.status(201).json(newTechnology);
    } catch (error) {
        next(error);
    }
};

export const getTechnologies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const technologies = await prisma.technologyEntry.findMany();
        res.json(technologies);
    } catch (error) {
        next(error);
    }
};

export const getTechnologyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = extractIdFromRequest(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Ungültige ID' });
            return;
        }

        const technology = await prisma.technologyEntry.findUnique({
            where: { id },
        });

        if (!technology) {
            res.status(404).json({ message: 'Technologie nicht gefunden' });
            return;
        }
        res.json(technology);
    } catch (error) {
        next(error);
    }
};

export const updateTechnology = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = extractIdFromRequest(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Ungültige ID' });
            return;
        }
        const { name, category, ring, description, classification, published } = req.body;

        const existingTechnology = await technologyById(id);
        if (!existingTechnology) {
            res.status(404).json({ message: 'Technologie nicht gefunden' });
            return;
        }

        const data: any = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim().length === 0) {
                res.status(400).json({ message: 'Ungültiger Name' });
                return;
            }
            data.name = name.trim();
        }
        if (category !== undefined) {
            if (!isTechCategory(category)) {
                res.status(400).json({ message: 'Ungültige Kategorie' });
                return;
            }
            data.category = category;
        }
        if (ring !== undefined) {
            if (!isTechRing(ring)) {
                res.status(400).json({ message: 'Ungültiger Ring' });
                return;
            }
            data.ring = ring;
        }
        if (description !== undefined) {
            if (typeof description !== 'string' || description.trim().length === 0) {
                res.status(400).json({ message: 'Ungültige Beschreibung' });
                return;
            }
            data.description = description.trim();
        }
        if (classification !== undefined) {
            if (typeof classification !== 'string' || classification.trim().length === 0) {
                res.status(400).json({ message: 'Ungültige Klassifizierung' });
                return;
            }
            data.classification = classification.trim();
        }
        if (published !== undefined) {
            if (typeof published !== 'boolean') {
                res.status(400).json({ message: 'Ungültiger Publish-Wert' });
                return;
            }
            data.published = published;
            if (published === true && !existingTechnology.publicationDate) {
                data.publicationDate = new Date();
            }
        }

        const updatedTechnology = await prisma.technologyEntry.update({
            where: { id },
            data,
        });

        res.json(updatedTechnology);
    } catch (error) {
        next(error);
    }
};

export const deleteTechnology = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = extractIdFromRequest(req);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Ungültige ID' });
            return;
        }

        const existingTechnology = await technologyById(id);
        if (!existingTechnology) {
            res.status(404).json({ message: 'Technologie nicht gefunden' });
            return;
        }

        const deletedTechnology = await prisma.technologyEntry.delete({
            where: { id },
        });

        res.json(deletedTechnology);
    } catch (error) {
        next(error);
    }
};

async function technologyById(id: number) {
    return prisma.technologyEntry.findUnique({where: {id}});
}

async function technologyNameExists(name: string): Promise<boolean> {
    return (await prisma.technologyEntry.findUnique({where: {name}})) != null;
}

function extractIdFromRequest(req: Request): number {
    const rawId: string | string[] = req.params['id'];
    const idStr: string = Array.isArray(rawId) ? rawId[0] : rawId;
    return Number.parseInt(idStr, 10);
}