import PrismaClient from '$lib/prisma'
import type { PostType } from '$lib/utils/stringTypes'
import type { User } from '@prisma/client'

const prisma = new PrismaClient()

export async function getLeaderboard(limit: number) {
  const result: User[] = await prisma.$queryRaw`SELECT "User".*, SUM (xp) AS totalxp FROM "UserSolvesExercise" FULL JOIN "User" ON "User".id = "UserSolvesExercise"."userId" GROUP BY "User".id ORDER BY totalxp DESC NULLS LAST, "firstName" ASC LIMIT ${limit}`
  /*
  // TODO: Maybe one day prisma can do this
  const result = await prisma.userSolvesExercise.groupBy({
    by: ['userId'],
    _sum: {
      xp: true
    },
    orderBy: {
      _sum: {
        xp: 'desc'
      }
    },
    take: limit
  }) */
  return result
}

export async function getAmountOfSolvedExercises(user: User): Promise<number> {
  const result: number = await prisma.userSolvesExercise.count({
    where: {
      userId: user.id,
    },
  })
  return result
}

export async function getAmountOfReadPosts(user: User, type: PostType): Promise<number> {
  const result: number = await prisma.userReadsPost.count({
    where: {
      userId: user.id,
      post: {
        type: type,
      },
    },
  })
  return result
}

export async function getXP(user: User): Promise<number> {
  const result: User = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      solvedExercises: true,
      readPosts: true,
    },
  })

  let xp: number = 0
  for (let exercise of result.solvedExercises) {
    xp += exercise.xp
  }
  for (let post of result.readPosts) {
    xp += post.xp
  }
  return xp
}

export async function createUser(
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  avatarURL?: string
): Promise<User> {
  const result: User = await prisma.user.create({
    data: {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      avatarURL: avatarURL,
    },
  })
  return result
}

export async function getUser(id: string): Promise<User> {
  try {
    const result: User = await prisma.user.findUnique({
      where: { id: id },
      include: {
        solvedExercises: true,
        readPosts: true,
        personas: true,
        posts: true,
        courses: true,
      },
    })
    return result
  } catch (PrismaClientKnownRequestError) {
    console.log(`User with id ${id} does not exist`)
  }
}
