import { prisma } from '$lib/prisma';
import { fixWCAGorder } from '$lib/utils/stringFormating';
import type { WCAGCriteria } from '@prisma/client';

export async function getAllCriteria(): Promise<WCAGCriteria[]> {
    const result: WCAGCriteria[] = await prisma.wCAGCriteria.findMany({
        include: {
            principle: true
        },
        orderBy: {
            number: 'asc'
        }
    })
    const criteria: WCAGCriteria[] = fixWCAGorder(result)
    return criteria
}

export async function getAllCriteriaSolved(userId: string): Promise<WCAGCriteria[]> {
    const result: WCAGCriteria[] = await prisma.$queryRaw`SELECT "WCAGCriteria".*, count(*) AS solves FROM "WCAGCriteria" JOIN "ExerciseHasCriteria" ON "WCAGCriteria".id = "ExerciseHasCriteria"."criteriaId" JOIN "Exercise" ON "ExerciseHasCriteria"."exerciseId" = "Exercise".id JOIN "UserSolvesExercise" ON "Exercise".id = "UserSolvesExercise"."exerciseId" WHERE "UserSolvesExercise"."userId" = ${userId} GROUP BY "WCAGCriteria".id`
    return result
}