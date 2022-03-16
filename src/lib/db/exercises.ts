import PrismaClient from '$lib/prisma';
import type { Course, Exercise, Persona, WCAGCriteria } from '@prisma/client';

const prisma = new PrismaClient();

export async function getExercise(exerciseId: string): Promise<Exercise> {
    try {
        const result: Exercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId
            },
            include: {
                criteria: {
                    select: {
                        criteriaId: true
                    }
                }
            }
        })
        return result
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Exercise: ${exerciseId} does not exists`)
    }
}

export async function createExercise(title: string, persona: Persona, course: Course): Promise<Exercise> {
    const result: Exercise = await prisma.exercise.create({
        data: {
            title: title,
            course: {
                connect: { id: course.id }
            },
            persona: {
                connect: { id: persona.id }
            }
        }
    })
    return result
}

export async function updateExercise(exercise: Exercise, criteria: WCAGCriteria[]): Promise<Exercise> {
    // Adds all WCAG criteria to the exercise
    const relation = criteria.map(criterion => ({ exerciseId: exercise.id, criteriaId: criterion.id }));
    await prisma.exerciseHasCriteria.createMany({
        data: relation
    })

    const result: Exercise = await prisma.exercise.update({
        where: {
            id: exercise.id
        },
        data: exercise
    })

    return result
}


// TODO: Delte exercise
/*
export async function deleteExercise(exercise: Exercise): Promise<boolean>{
    try {

        return true
    }
    catch(PrismaClientKnownRequestError){
        console.log(`Something went wrong deletign exercise: ${exercise.id}`)
        return false
    }
}
*/