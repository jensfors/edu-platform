import PrismaClient from '$lib/prisma';
import type { Exercise, Persona } from '@prisma/client';
import { userJen, userKasper, userMatti } from './dummy/data';

const prisma = new PrismaClient();

export async function getAllPersonas(): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany(/*{
        where: {
            private: false
        }
    }*/)
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

export async function getUsersPersonas(): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            authorId: userMatti.id // TODO: Local storage
        }
    })
    return result
}

export async function getUsablePersonas(): Promise<Persona[]> {
    const result: Persona[] = await prisma.persona.findMany({
        where: {
            OR: [{
                authorId: userMatti.id // TODO: Local storage
            }, {
                private: false
            }]
        }
    })
    return result
}

export async function createPersona(name: string, age: number, description: string, avatarUrl: string, _private: boolean): Promise<Persona> {
    const result: Persona = await prisma.persona.create({
        data: {
            name: name,
            age: age,
            description: description,
            avatarUrl: avatarUrl,
            private: _private,
            author: {
                connect: {
                    id: userMatti.id // TODO: Local storage
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
            personaId: 'personaid4'
        }
    })
    return result
}


