import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from '$lib/db/courses'
import { getAllPersonas } from '$lib/db/persona'
import { getAllCriteria } from '$lib/db/wcag'
import type { Course, Persona, WCAGCriteria, WCAGPrinciple } from '@prisma/client'

export async function get({ params }) {
  const { courseId } = params
  let course: Course = null
  let principles: WCAGPrinciple[] = []
  let personas: Persona[] = []
  let criteria: WCAGCriteria[] = []
  if (courseId) {
    course = await getCourse(courseId)
    principles = await getWCAGPrinciplesForCourse(course)
    personas = await getAllPersonas()
  }

  criteria = await getAllCriteria()

  //console.log('get', course)
  return {
    body: {
      course,
      principles,
      personas,
      criteria,
    },
  }
}
