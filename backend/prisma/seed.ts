import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const roles = ["Fullstack", "Backend", "Frontend", "ML", "CV", "UX/UI"]
const skills = ["Django", "REST", "Nest", "Next", "React", "Docker", ".NET", "FastAPI", "Laravel", "Figma"]
// const languages = ["Python", "TS", "JS", "C++", "PHP", "C#"]

async function main() {

    roles.forEach(async (role, i) => {
        await prisma.roles.upsert({
            where: { id: i + 1 },
            update: {},
            create: { name: role },
        });
    });

    skills.forEach(async (skill, i) => {
        await prisma.skills.upsert({
            where: { id: i + 1 },
            update: {},
            create: { name: skill },
        });
    });

    await prisma.users.upsert({
        where: { email: "JohnSmith@gmail.com", username: "John Smith" },
        update: {
            roles: {
                create: {
                    assignedAt: new Date(),
                    role: { connect: { id: 1 } }
                }
            },
            skills: {
                create: [
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 2 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 3 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 4 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 5 } }
                    },

                ]
            },
        },
        create: {
            email: "JohnSmith@gmail.com",
            username: 'John Smith',
            fullname: 'John Smith',
            phone: "+7924-167-45-99",
            birthDate: new Date(),
            password: "password",
            roles: {
                create: {
                    assignedAt: new Date(),
                    role: { connect: { id: 1 } }
                }
            },
            skills: {
                create: [
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 2 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 3 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 4 } }
                    },
                    {
                        assignedAt: new Date(),
                        skill: { connect: { id: 5 } }
                    },

                ]
            },
            // skills: { connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] }
        }

    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });