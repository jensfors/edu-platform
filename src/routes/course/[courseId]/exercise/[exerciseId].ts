import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from '$lib/db/courses'
import { createExercise, getExercise } from '$lib/db/exercises'

import { getAllPersonas, getUsablePersonas } from '$lib/db/persona'
import { getAllCriteria } from '$lib/db/wcag'
import { Difficulty } from '$lib/utils/stringTypes'
import type { Course, Exercise, Persona, WCAGCriteria, WCAGPrinciple } from '@prisma/client'

export async function get({ params }) {
  const { exerciseId } = params
  let exercise: Exercise = null
  if (exerciseId) {
    exercise = await getExercise(exerciseId)
  }

  // console.log('get exerboy: ', exercise)
  return {
    body: {
      exercise,
    },
  }
}
