import { getAllPersonasForCourse, getCourse, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import type { Course, Persona, UserSolvesExercise, WCAGPrinciple } from "@prisma/client";

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

    return {
        body: {
            course,
            principles,
            personas,
        }
    };
}