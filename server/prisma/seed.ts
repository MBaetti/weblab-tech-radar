import { TechCategory, TechRing } from '../generated/prisma/client';
import { prisma } from './prisma';

async function main() {
    console.log('Seeding database with initial technologies...');

    await prisma.technologyEntry.deleteMany();

    const technologies = [
        {
            name: 'React',
            category: TechCategory.tool,
            ring: TechRing.adopt,
            description: 'Die meistgenutzte Library für Web-Frontends.',
            classification: 'Library – Weit verbreitete UI-Bibliothek für Web-Frontends; großes Ökosystem, viele Community-Pakete und breite Adoption.',
        },
        {
            name: 'Kotlin',
            category: TechCategory.languageOrFramework,
            ring: TechRing.trial,
            description: 'Moderner Standard für Android-Entwicklung und Backend-Services.',
            classification: 'Language/Framework – Moderne, expressive Sprache mit guter Java-Interoperabilität; stark in mobilen und serverseitigen Projekten.',
        },
        {
            name: 'Rust',
            category: TechCategory.languageOrFramework,
            ring: TechRing.assess,
            description: 'Systemsprache mit Fokus auf Sicherheit und Performance.',
            classification: 'Language/Framework – Systemsprache mit Fokus auf Speichersicherheit und Performance; vielversprechend für System- und Infrastruktursoftware.',
        },
        {
            name: 'Java 8',
            category: TechCategory.languageOrFramework,
            ring: TechRing.hold,
            description: 'Veraltete Version. Teams sollten auf Java 17+ migrieren.',
            classification: 'Language/Framework – Ältere LTS-Version von Java; weit verbreitet, aber veraltet im Vergleich zu neueren LTS-Versionen.',
        },
        {
            name: 'GitHub Copilot',
            category: TechCategory.tool,
            ring: TechRing.adopt,
            description: 'KI-gestützte Code-Vervollständigung.',
            classification: 'Tool – KI-gestützte Assistenz für Entwickler; steigert Produktivität, erfordert aber Review der generierten Vorschläge.',
        },
        {
            name: 'Postman',
            category: TechCategory.tool,
            ring: TechRing.trial,
            description: 'Tool für API-Tests und Dokumentation.',
            classification: 'Tool – Etabliertes Werkzeug für API-Testing und Dokumentation; benutzerfreundlich und weit verbreitet.',
        },
        {
            name: 'Jenkins',
            category: TechCategory.tool,
            ring: TechRing.assess,
            description: 'Klassisches CI/CD Tool. Oft durch modernere Alternativen ersetzt.',
            classification: 'Tool – Bewährter CI-Server mit großer Verbreitung; wird jedoch in vielen Teams durch modernere, cloud-native Dienste ersetzt.',
        },
        {
            name: 'Terraform',
            category: TechCategory.tool,
            ring: TechRing.hold,
            description: 'Infrastructure as Code Standard.',
            classification: 'Tool – Declarative Infrastructure-as-Code; Standard für Provisionierung und Multi-Cloud-Management.',
        },
        {
            name: 'AWS',
            category: TechCategory.plattform,
            ring: TechRing.adopt,
            description: 'Marktführende Cloud-Plattform.',
            classification: 'Plattform – Marktführende Cloud mit umfangreichem Dienstangebot und globaler Infrastruktur.',
        },
        {
            name: 'Vercel',
            category: TechCategory.plattform,
            ring: TechRing.trial,
            description: 'Optimale Plattform für Next.js und Frontend-Deployments.',
            classification: 'Plattform – Spezialisiert auf Frontend-Deployments und Serverless-Hosting; besonders geeignet für Next.js-Anwendungen.',
        },
        {
            name: 'Azure',
            category: TechCategory.plattform,
            ring: TechRing.assess,
            description: 'Microsofts Cloud-Ökosystem, stark in Enterprise-Umgebungen.',
            classification: 'Plattform – Enterprise-fokussierte Cloud mit starker Integration ins Microsoft-Ökosystem und vielfältigen Diensten.',
        },
        {
            name: 'Microservices',
            category: TechCategory.technique,
            ring: TechRing.hold,
            description: 'Architekturstil zur Zerlegung komplexer Systeme.',
            classification: 'Technique – Architekturansatz zur Aufteilung in unabhängige, deploybare Dienste; fördert Skalierbarkeit, erhöht aber Komplexität.',
        },
        {
            name: 'GraphQL',
            category: TechCategory.technique,
            ring: TechRing.adopt,
            description: 'Abfragesprache für APIs als Alternative zu REST.',
            classification: 'Technique – Flexible API-Abfragesprache, die Over- und Underfetching reduziert; gut für komplexe Clients.',
        },
        {
            name: 'Test Driven Development (TDD)',
            category: TechCategory.technique,
            ring: TechRing.trial,
            description: 'Entwicklungsprozess, bei dem Tests vor dem Code geschrieben werden.',
            classification: 'Technique – Entwicklungsprinzip, das durch Tests qualitativ besseren, getesteten Code und klareres Design fördert.',
        }
    ];

    for (const tech of technologies) {
        await prisma.technologyEntry.create({
            data: tech,
        });
        await prisma.technologyEntry.update({
            where: { name: tech.name },
            data: {
                published: true,
                publicationDate: new Date(),
            },
        })
    }

    console.log(`${technologies.length} new technologies have been seeded into the database.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
