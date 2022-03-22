import PrismaClient from '$lib/prisma';
import { PostType } from '$lib/utils/stringTypes';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAmountOfSolvedExercises(user: User): Promise<number> {
    const result: number = await prisma.userSolvesExercise.count({
        where: {
            userId: user.id
        }
    })
    console.log(result)
    return result
}

export async function getAmountOfReadPosts(user: User, type: PostType): Promise<number> {
    const result: number = await prisma.userReadsPost.count({
        where: {
            userId: user.id,
            post: {
                type: type
            }
        }
    })
    console.log(result)
    return result
}

export async function getXP(user: User): Promise<number> {
    const result: User = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            solvedExercises: true,
            readPosts: true
        }
    })

    let xp: number = 0
    for (let exercise of result.solvedExercises) {
        xp += exercise.xp
    }
    for (let post of result.readPosts) {
        xp += post.xp
    }

    console.log(xp)
    return xp
}