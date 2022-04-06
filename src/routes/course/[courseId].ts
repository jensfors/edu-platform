import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import { getExercise, updateExercise } from "$lib/db/exercises";
import { getAllCriteria } from "$lib/db/wcag";
import type { Course, Exercise, Persona, WCAGCriteria, WCAGPrinciple } from "@prisma/client";

export async function get({ params }) {
    const { courseId } = params
    let course: Course = null
    let principles: WCAGPrinciple[] = []
    let personas: Persona[] = []

    if (courseId) {
        course = await getCourse(courseId)
        principles = await getWCAGPrinciplesForCourse(course)
        personas = await getAllPersonasForCourse(course)
    }
    //console.log('get', course)
    return {
        body: {
            course,
            principles,
            personas,
        }
    };
}