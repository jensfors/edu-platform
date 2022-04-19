import PrismaClient from '$lib/prisma';
import type { Course, Exercise, Persona } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPersonas(): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany(/*{
        where: {
            private: false
        }
    }*/)
    return result
}

export async function getAmountOfPersonas(amount: number): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            private: false,     // only public courses
        },
        orderBy: {
            official: 'desc'
        }, // Sort by official
        take: amount          // Amount to return
    })
    return result
}

export async function getPersona(id: string): Promise<Persona> {
    const result: Persona = await prisma.persona.findUnique({
        where: {
            id: id
        },
        include: {
            author: true
        }
    })
    return result
}

export async function getAllOfficialPersonas(): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            official: true
        }
    })
    return result
}

export async function getUsersPersonas(userId: string): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            authorId: userId
        }
    })
    return result
}

export async function getUsablePersonas(userId: string): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            private: false
            /*
            OR: [{
                AND: [{
                    authorId: userId
                }, {
                    private: false
                }],
                private: false
            }]*/
        }
    })
    return result
}

export async function createPersona(name: string, age: number, description: string, avatarUrl: string, _private: boolean, userId: string): Promise<Persona> {
    const result: Persona = await prisma.persona.create({
        data: {
            name: name,
            age: age,
            description: description,
            avatarUrl: avatarUrl,
            private: _private,
            author: {
                connect: {
                    id: userId
                }
            }
        }
    })
    return result
}

// Updates an existing persona
export async function updatePersona(persona: Persona): Promise<Persona> {
    try {
        const result: Persona = await prisma.persona.update({
            where: {
                id: persona.id
            },
            data: persona
        })
        return result
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Persona with id: ${persona.id} does not exist`)
    }
}

export async function deletePersona(persona: Persona): Promise<boolean> {
    if ((await findAllExercisesWithPersona(persona)).length !== 0) {
        console.log(`This persona is assigned to exercises`)
        return false
    }
    try {
        await prisma.persona.delete({
            where: {
                id: persona.id
            }
        })
        return true
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Persona id: ${persona.id} does not exist`)
        return false
    }
}

export async function findAllExercisesWithPersona(persona: Persona): Promise<Exercise[]> {
    const result: Exercise[] = await prisma.exercise.findMany({
        where: {
            personaId: persona.id
        },
        /*
        include: {
            course: true
        } */
    })
    return result
}

export async function findAllCoursesWithPersona(persona: Persona): Promise<Course[]> {
    const result: { course: Course; }[] = await prisma.exercise.findMany({
        where: {
            personaId: persona.id,
            public: true
        },
        select: {
            course: {
                include: {
                    exercises: {
                        where: {
                            public: true
                        },
                        include: {
                            criteria: {
                                include: {
                                    criteria: {
                                        include: {
                                            principle: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    let courses: Course[] = []
    result.forEach((course) => {
        if (course.course.public) {
            courses.push(course.course)
        }
    })
    return courses
}
