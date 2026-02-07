import { prisma } from './prisma/prisma'

async function main() {
    const technology = await prisma.technology.create({
        data: {
            name: 'Beispiel-Technologie',
            category: 'tool',
            ring: 'trial',
            description: 'Beispielhafte Technologie für Seed-Daten',
            classification: 'Trial - wir evaluieren den Einsatz in einem kleinen Projekt',
        },
    })
    console.log('Created technology:', technology)

    const allTechnologies = await prisma.technology.findMany()
    console.log('All technologies:', JSON.stringify(allTechnologies, null, 2))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })