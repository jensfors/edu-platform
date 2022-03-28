import PrismaClient from '$lib/prisma';
import type { Assignment, Course, Exercise, Persona, WCAGCriteria } from '@prisma/client';

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

export async function createExercise(title: string, content: string, persona: Persona, course: Course): Promise<Exercise> {
    const result: Exercise = await prisma.exercise.create({
        data: {
            title: title,
            content: content,
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

export async function giveExerciseCategoryAndAnswers(exercise: Exercise, criteria: WCAGCriteria[], assignments: { question: string, answers: { text: string, isSolution: boolean }[] }[]): Promise<boolean> {
    // Adds all WCAG criteria to the exercise
    try {
        const relation = criteria.map(criterion => ({ exerciseId: exercise.id, criteriaId: criterion.id }));
        await prisma.exerciseHasCriteria.createMany({
            data: relation
        })

        for (let assignment of assignments) {
            const result: Assignment = await prisma.assignment.create({
                data: {
                    question: assignment.question,
                    exercise: {
                        connect: { id: exercise.id }
                    }
                }
            })
            for (let answer of assignment.answers) {
                await prisma.answer.create({
                    data: {
                        text: answer.text,
                        isSolution: answer.isSolution,
                        assignment: {
                            connect: { id: result.id }
                        }
                    }
                })
            }
        }
        console.log('dab')
        return true
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Creating exercise categories and assignments/answers failed`)
        return false
    }
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