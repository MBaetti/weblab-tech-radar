import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

// Connection-String vom Compose oder vom .env-File
const connectionString = process.env["DATABASE_URL"] ?? `postgresql://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@${process.env["DB_HOST"]}:${process.env["DB_PORT"]}/${process.env["DB_NAME"]}?schema=public`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
