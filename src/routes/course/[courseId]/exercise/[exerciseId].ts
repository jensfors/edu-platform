import { getCourseFromExercise, getExercise } from '$lib/db/exercises'
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
