import { getCourseFromExercise, getExercise, userSolvesExercise } from '$lib/db/exercises'
import { getDifficultyXP } from '$lib/utils/levels'
import type { Course, Exercise } from '@prisma/client'


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
  let data = await request.json()
  let xp = getDifficultyXP(data.difficulty)
  let result = await userSolvesExercise(data.exerciseId, data.userId, xp)
  return {
    body: {
      message: result ? 'Exercise successfully solved' : 'Damn, something went kinda wrong',
    },
  }
}
