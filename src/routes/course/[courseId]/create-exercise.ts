import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from '$lib/db/courses'
import { getAllPersonas } from '$lib/db/persona'
import type { Course, Persona, WCAGPrinciple } from '@prisma/client'

export async function get({ params }) {
  const { courseId } = params
  let course: Course = null
  let principles: WCAGPrinciple[] = []
  let personas: Persona[] = []
  if (courseId) {
    course = await getCourse(courseId)
    principles = await getWCAGPrinciplesForCourse(course)
    personas = await getAllPersonas()
  }
  //console.log('get', course)
  return {
    body: {
      course,
      principles,
      personas,
    },
  }
}
