import { getLatestCourses, getWCAGPrinciplesForCourse } from "$lib/db/courses";
import { getAmountOfPersonas } from "$lib/db/persona";
import { getLatestBlogPosts } from "$lib/db/posts";
import { getAmountOfReadPosts, getAmountOfSolvedExercises, getUser, getXP } from "$lib/db/user";
import { getAllCriteria, getAllCriteriaSolved } from "$lib/db/wcag";
import { addSolvesToCriteria } from "$lib/utils/awards";
import { getUserLevel } from "$lib/utils/levels";
import { PostType, XP } from "$lib/utils/stringTypes";
import type { Course, Persona, Post, User, WCAGCriteria, WCAGPrinciple } from "@prisma/client";

export async function get({ params }) {
    let courses: Course[] = []
    let userXP: XP = { level: 0, nextLevelXP: 0, progressXP: 0 }
    let solvedExercises: number = 0
    let readBlogPosts: number = 0
    let personas: Persona[] = []
    let blogPosts: Post[] = []

    const userId: string = params.userId

    // Getting courses for main page
    courses = await getLatestCourses(4)
    // TODO: Change to popular when many courses
    // courses = await getPopularCourses(5, 100)
    let coursePrinciples: { id: string, principles: WCAGPrinciple[] }[] = []
    for (const course of courses) {
        let principles: WCAGPrinciple[] = await getWCAGPrinciplesForCourse(course)
        coursePrinciples.push({ id: course.id, principles: principles })
    }

    // Getting personas for main page
    personas = await getAmountOfPersonas(4)

    // Getting blog posts for main page
    blogPosts = await getLatestBlogPosts(3)

    // Gettings all WCAG Criteria
    let criteria: WCAGCriteria[] = await getAllCriteria()

    // IF a user is logged in, all relevant info is fetched
    let solvedCriteria: WCAGCriteria[] = []

    if (userId !== "null") {
        const user: User = await getUser(userId)
        solvedExercises = await getAmountOfSolvedExercises(user)
        readBlogPosts = await getAmountOfReadPosts(user, PostType.Blog)
        const progressXP: number = await getXP(userId)
        userXP = getUserLevel(progressXP)
        solvedCriteria = await getAllCriteriaSolved(userId)
        addSolvesToCriteria(criteria, solvedCriteria)
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
            criteria,
        }
    };
};