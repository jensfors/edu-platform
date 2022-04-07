import { findAllCoursesWithPersona, findAllExercisesWithPersona, getPersona } from "$lib/db/persona";
import type { Course, Persona } from "@prisma/client";

export async function get({ params }) {
    const { personaId } = params
    let persona: Persona = null
    let courses: Course[] = []

    persona = await getPersona(personaId)
    courses = await findAllCoursesWithPersona(persona)

    return {
        body: {
            persona,
            courses,
        }
    };
}