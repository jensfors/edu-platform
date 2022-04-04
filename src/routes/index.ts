import { getLatestCourses, getPopularCourses, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import { getAllPersonas } from "$lib/db/persona";
import { getLatestBlogPosts } from "$lib/db/posts";
import { getAmountOfReadPosts, getAmountOfSolvedExercises, getUser, getXP } from "$lib/db/user";
import { getUserLevel } from "$lib/utils/levels";
import { PostType, XP } from "$lib/utils/stringTypes";
import type { Course, Persona, Post, User, WCAGPrinciple } from "@prisma/client";

export async function get({ url }) {
    console.log("GET MAIN")
    let courses: Course[] = []
    let userXP: XP = { level: 0, nextLevelXP: 0, progressXP: 0 }
    let solvedExercises: number = 0
    let readBlogPosts: number = 0
    let personas: Persona[] = []
    let blogPosts: Post[] = []

    const userId: string = url.searchParams.get('userId')
    console.log('-------------------')
    console.log(userId)
    console.log('-------------------')


    // Getting courses for main page
    courses = await getLatestCourses(5)
    // TODO: Change to popular when many courses
    // courses = await getPopularCourses(5, 100)
    let coursePrinciples: { id: string, principles: WCAGPrinciple[] }[] = []
    for (const course of courses) {
        let principles: WCAGPrinciple[] = await getWCAGPrinciplesForCourse(course)
        coursePrinciples.push({ id: course.id, principles: principles })
    }

    // Getting personas for main page
    personas = await getAllPersonas()

    // Getting blog posts for main page
    blogPosts = await getLatestBlogPosts(3)

    // IF a user is logged in, all relevant info is fetched
    if (userId !== null) {
        const user: User = await getUser(userId)
        solvedExercises = await getAmountOfSolvedExercises(user)
        readBlogPosts = await getAmountOfReadPosts(user, PostType.Blog)
        const progressXP: number = await getXP(user)
        userXP = getUserLevel(progressXP)
    }


    return {
        body: {
            userXP,
            courses,
            coursePrinciples,
            solvedExercises,
            readBlogPosts,
            personas,
            blogPosts,
        }
    };
};