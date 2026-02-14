import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/prisma';
import { TechCategory, TechRing} from '../../generated/prisma/enums';

const isTechCategory = (value: unknown): value is TechCategory =>
    typeof value === 'string' && Object.values(TechCategory).includes(value as TechCategory);

const isTechRing = (value: unknown): value is TechRing =>
    typeof value === 'string' && Object.values(TechRing).includes(value as TechRing);

const parseDate = (value: unknown): Date | null => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed;
        }
    }
    return null;
};

export const createTechnology = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, ring, description, classification, entryDate } = req.body;
        if (typeof name !== 'string' || name.trim().length === 0) {
            res.status(400).json({ message: 'Invalid name' });
            return;
        }
        if (!isTechCategory(category)) {
            res.status(400).json({ message: 'Invalid category' });
            return;
        }
        // Optional
        if (ring !== undefined && !isTechRing(ring)) {
            res.status(400).json({ message: 'Invalid ring' });
            return;
        }
        if (typeof description !== 'string' || description.trim().length === 0) {
            res.status(400).json({ message: 'Invalid description' });
            return;
        }
        // Optional
        if (classification !== undefined && (typeof classification !== 'string' || classification.trim().length === 0)) {
            res.status(400).json({ message: 'Invalid classification' });
            return;
        }
        const parsedDate = entryDate === undefined ? new Date() : parseDate(entryDate);
        if (!parsedDate) {
            res.status(400).json({ message: 'Invalid entryDate' });
            return;
        }

        const newTechnology = await prisma.technologyEntry.create({
            data: {
                name: name.trim(),
                category: category,
                ring: ring,
                description: description.trim(),
                classification: classification,
                entryDate: parsedDate,
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
        const rawId = req.params['id'];
        const idStr = Array.isArray(rawId) ? rawId[0] : rawId;
        const id = Number.parseInt(idStr, 10);
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
        const rawId = req.params['id'];
        const idStr = Array.isArray(rawId) ? rawId[0] : rawId;
        const id = Number.parseInt(idStr, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Ungültige ID' });
            return;
        }
        const { name, category, ring, description, classification, published } = req.body;

        const existingTechnology = await technologyExists(id);
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
        const rawId = req.params['id'];
        const idStr = Array.isArray(rawId) ? rawId[0] : rawId;
        const id = Number.parseInt(idStr, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: 'Ungültige ID' });
            return;
        }

        const existingTechnology = await technologyExists(id);
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

async function technologyExists(id: number) {
    return prisma.technologyEntry.findUnique({where: {id}});
}