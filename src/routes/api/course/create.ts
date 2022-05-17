import { createCourse } from "$lib/db/courses"
import type { Course } from "@prisma/client"

export async function post({ request }) {
    let data = await request.json()
    let course: Course = await createCourse(data.title, data.description, data.userId)
    return {
        body: {
            course,
            message: course ? 'Course successfully created' : 'Damn, something went kinda wrong creating the course',
        },
    }
}