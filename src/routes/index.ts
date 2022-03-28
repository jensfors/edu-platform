import { getPopularCourses, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import { getUserLevel } from "$lib/utils/levels";
import type { XP } from "$lib/utils/stringTypes";
import type { Course, WCAGPrinciple } from "@prisma/client";

export async function get() {
    console.log("GET MAIN")
    const userXP: XP = getUserLevel()
    const courses = await getPopularCourses(5, 100)
    let coursePrinciples: { id: string, principles: WCAGPrinciple[] }[] = []
    for (const course of courses) {
        let principles: WCAGPrinciple[] = await getWCAGPrinciplesForCourse(course)
        coursePrinciples.push({ id: course.id, principles: principles })
    }


    return {
        body: {
            userXP,
            courses
        }
    };
};