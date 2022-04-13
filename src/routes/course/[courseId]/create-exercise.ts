import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from '$lib/db/courses'
import { createExercise } from '$lib/db/exercises'
import { getAllPersonas, getUsablePersonas } from '$lib/db/persona'
import { getAllCriteria } from '$lib/db/wcag'
import { Difficulty } from '$lib/utils/stringTypes'
import type { Course, Exercise, Persona, WCAGCriteria, WCAGPrinciple } from '@prisma/client'

export async function get({ params, url }) {
  const userId: string = url.searchParams.get('userId')
  const { courseId } = params
  let course: Course = null
  let personas: Persona[] = []
  let criteria: WCAGCriteria[] = []
  if (courseId && userId) {
    course = await getCourse(courseId)
    personas = await getUsablePersonas(userId)
  }
  criteria = await getAllCriteria()

  //console.log('get', course)
  return {
    body: {
      course,
      personas,
      criteria,
    },
  }
}

/** @type {import('./course/[courseId]').RequestHandler} */
export async function post({ request }) {
  let data = await request.json()
  console.log('we entered the end point daddy', data)
  let exercise: Exercise = await createExercise(data.exerciseTitle, 'this is the content', data.exerciseType, Difficulty.Beginner, data.personaSelected, data.course)
  return {
    body: {
      message: 'Yyayayayayya',
    },
  }
}
