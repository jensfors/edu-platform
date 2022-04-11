import PrismaClient from '$lib/prisma';
import type { Course, Persona, Post, User, UserSolvesExercise, WCAGPrinciple } from '@prisma/client';
import { userMatti } from './dummy/data';

const prisma = new PrismaClient();

export async function getLatestCourses(amount: number): Promise<Course[]> {
    const result: Course[] = await prisma.course.findMany({
        where: {
            public: true,     // only public courses
        },
        orderBy: {
            createdAt: 'desc' // Sort by newest
        },
        take: amount          // Amount to return
    })
    return result
}

// TODO: Turn into prisma
// Gets the 'amount' courses with most solved exercises the last 'days' 
export async function getPopularCourses(amount: number, days: number): Promise<Course[]> {
    const result: Course[] = await prisma.$queryRaw`SELECT "public"."Course".id, "public"."Course".title, "public"."Course"."createdAt", "public"."Course".public, "public"."Course".description FROM ("public"."Course" JOIN "public"."Exercise" ON "public"."Course".id = "public"."Exercise"."courseId") JOIN "public"."UserSolvesExercise" ON "public"."Exercise".id = "public"."UserSolvesExercise"."exerciseId" WHERE "public"."Course".public = true AND "solvedAt" > current_date - interval '100 days' GROUP BY  "public"."Course".id ORDER BY COUNT(*) DESC LIMIT ${amount};`
    return result
}

export async function getCourse(courseId: string): Promise<Course> {
    try {
        const result: Course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                exercises: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    include: {
                        persona: true,
                        criteria: true,
                        assignments: {
                            include: {
                                answers: true
                            }
                        },
                        usersSolved: true,
                    }
                },
                authors: {
                    include: {
                        user: true
                    }
                },
            }
        })
        return result
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Course: ${courseId} does not exists`)
    }
}

export async function getAuthoredCourses(): Promise<Course[]> {
    try {
        const result: Course[] = await prisma.course.findMany({
            where: {
                authors: {
                    some: {
                        userId: userMatti.id // TODO: Local storage
                    }
                }
            }
        })
        return result
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Something went wrong (getAuthoredCourses)`)
    }
}


// TODO: Turn into prisma
// Gets the principles for a course, which the exercises involve
export async function getWCAGPrinciplesForCourse(course: Course): Promise<WCAGPrinciple[]> {
    const result: WCAGPrinciple[] = await prisma.$queryRaw`SELECT DISTINCT "WCAGPrinciple".* FROM "Course" JOIN "Exercise" ON ${course.id} = "Exercise"."courseId" JOIN "ExerciseHasCriteria" ON "Exercise".id = "ExerciseHasCriteria"."exerciseId" JOIN "WCAGCriteria" ON "ExerciseHasCriteria"."criteriaId" = "WCAGCriteria".id JOIN "WCAGPrinciple" ON "WCAGCriteria"."principleId" = "WCAGPrinciple".id`
    return result
}

export async function createCourse(title: string, description: string): Promise<Course> {
    const result: Course = await prisma.course.create({
        data: {
            title: title,
            description: description,
            authors: {
                create: {
                    user: {
                        connect: { id: userMatti.id } // TODO: Change to local storage
                    },
                    mainAuthor: true
                }
            }
        }

    })
    return result
}

// TODO: Turn into prisma
// Returns a list of the Personas which are in exercises for a given course
export async function getAllPersonasForCourse(course: Course): Promise<Persona[]> {
    const result: Persona[] = await prisma.$queryRaw`SELECT DISTINCT "Persona".* FROM "Course" JOIN "Exercise" ON ${course.id} = "Exercise"."courseId" JOIN "Persona" ON "Exercise"."personaId" = "Persona".id`
    return result;
}

export async function updateCourse(course: Course): Promise<Course> {
    try {
        const result: Course = await prisma.course.update({
            where: {
                id: course.id
            },
            data: course
        })
        return result
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Course: ${course.id} does not exists`)
    }
}

// Add another author to the course
export async function addAuthorToCourse(course: Course, author: User): Promise<boolean> {
    try {
        await prisma.userHasCourse.create({
            data: {
                course: {
                    connect: { id: course.id }
                },
                user: {
                    connect: { id: author.id }
                }
            }
        })
    }
    catch (PrismaClientKnownRequestError) {
        console.log(`Something went wrong (addAuthorToCourse)`)
        return false
    }
}


