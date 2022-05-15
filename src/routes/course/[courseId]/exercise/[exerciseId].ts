import { getCourseFromExercise, getExercise, userSolvesExercise } from '$lib/db/exercises'
import { getUser, getXP } from '$lib/db/user'
import { getDifficultyXP, getUserLevel } from '$lib/utils/levels'
import type { XP } from '$lib/utils/stringTypes'
import type { Course, Exercise, User } from '@prisma/client'

export async function get({ params }) {
  const { exerciseId } = params
  let exercise: Exercise = null
  let course: Course = null
  if (exerciseId) {
    exercise = await getExercise(exerciseId)
    course = await getCourseFromExercise(exercise)
  }

  return {
    body: {
      exercise,
      course,
    },
  }
}

export async function post({ request }) {
  // Insert new post data in DB
  let data = await request.json()
  let xp = getDifficultyXP(data.difficulty)
  let result = await userSolvesExercise(data.exerciseId, data.userId, xp)

  // Fetch data for xp modal
  const user: User = await getUser(data.userId)
  const totalXP: number = await getXP(user)
  const userXP: XP = getUserLevel(totalXP)
  // @ts-ignore
  userXP.totalXP = totalXP
  // @ts-ignore
  user.userXP = userXP

  return {
    body: {
      message: result ? 'Exercise successfully solved' : 'Damn, something went kinda wrong',
      user,
    },
  }
}
