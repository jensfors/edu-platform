import { getPopularCourses, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import { getAmountOfReadPosts, getAmountOfSolvedExercises } from "$lib/db/user";
import { getUserLevel } from "$lib/utils/levels";
import { PostType, XP } from "$lib/utils/stringTypes";
import type { Course, User, WCAGPrinciple } from "@prisma/client";

export async function get(/*{ url }*/) {
    console.log("GET MAIN")
    let courses: Course[] = []
    courses = await getPopularCourses(5, 100)

    let userXP: XP = { level: 0, nextLevelXP: 0, progressXP: 0 }
    let solvedExercises: number = 0
    let readBlogPosts: number = 0

    let coursePrinciples: { id: string, principles: WCAGPrinciple[] }[] = []
    for (const course of courses) {
        let principles: WCAGPrinciple[] = await getWCAGPrinciplesForCourse(course)
        coursePrinciples.push({ id: course.id, principles: principles })
    }
    let user: User = null

    if (user !== null) {
        console.log('in here', user)
        solvedExercises = await getAmountOfSolvedExercises(user)
        readBlogPosts = await getAmountOfReadPosts(user, PostType.Blog)
        userXP = getUserLevel()
    }


    return {
        body: {
            userXP,
            courses,
            coursePrinciples,
            solvedExercises,
            readBlogPosts
        }
    };
};