import PrismaClient from '$lib/prisma';
import type { Course, Post } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLatestBlogPosts(amount: number): Promise<Course[]> {
    const result: Course[] = await prisma.course.findMany({
        where: {
            public: true,    // only public courses
        },
        orderBy: {
            createdAt: 'desc' // Sort by newest
        },
        take: amount // Amount to return
    })
    return result
}

// TODO: Turn into prisma
// Gets the 'amount' courses with most solved exercises the last 'days' 
export async function getPopularCourses(amount: number, days: number): Promise<Course[]> {
    const result: Course[] = await prisma.$queryRaw`SELECT "public"."Course".id, "public"."Course".title, "public"."Course"."createdAt", "public"."Course".public, "public"."Course".description FROM ("public"."Course" JOIN "public"."Exercise" ON "public"."Course".id = "public"."Exercise"."courseId") JOIN "public"."UserSolvesExercise" ON "public"."Exercise".id = "public"."UserSolvesExercise"."exerciseId" WHERE "public"."Course".public = true AND "solvedAt" > current_date - interval '7 days' GROUP BY  "public"."Course".id ORDER BY COUNT(*) DESC LIMIT ${amount};`
    return result
}