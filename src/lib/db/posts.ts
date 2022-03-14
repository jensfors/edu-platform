import PrismaClient from '$lib/prisma';
import { daysToMs } from '$lib/utils/dates';
import type { Post } from '@prisma/client';

const prisma = new PrismaClient();


// Gets the 'amount' latest blog posts that are public
export async function getLatestBlogPosts(amount: number): Promise<Post[]> {
    // `SELECT * FROM "public"."Post" WHERE public = true AND "type" = 'Blog' ORDER BY "createdAt" DESC LIMIT ${amount}`
    const result: Post[] = await prisma.post.findMany({
        where: {
            public: true,    // only public posts
            type: 'Blog'     // only Blog posts
        },
        orderBy: {
            createdAt: 'desc' // Sort by newest
        },
        take: amount // Amount to return
    })
    return result
}

// Get 'amount' most read blog posts the last 'days'
export async function getPopularBlogPosts(amount: number, days: number): Promise<Post[]> {
    /*
    const result = await prisma.userReadsPost.groupBy({
        by: ['postId'],
        where: {
            readAt: {
                lte: new Date(Date.now()),
                gte: new Date(Date.now() - daysToMs(days))
            },
        },
        orderBy: {
            _count: {
                postId: 'desc',
            },
        },
        take: 2,
    })
    const result: Post[] = await prisma.post.findMany({
        where: {
            public: true,
            type: 'Blog',
            usersRead: {
                some: {
                    readAt: {
                        lte: new Date(Date.now()),
                        gte: new Date(Date.now() - daysToMs(days))
                    }
                }
            },
        },
        include: {
            usersRead: {
                where: {
                    readAt: {
                        lte: new Date(Date.now()),
                        gte: new Date(Date.now() - daysToMs(days))
                    }
                }
            }
        },
    }) */
    const result: Post[] = await prisma.$queryRaw`SELECT id, title, "createdAt", public, type FROM "public"."Post" JOIN "public"."UserReadsPost" ON "public"."Post".id = "public"."UserReadsPost"."postId" WHERE public = true AND "type" = 'Blog' AND "readAt" > current_date - interval '7 days' GROUP BY  "public"."Post".id ORDER BY COUNT(*) DESC LIMIT ${amount};`
    return result
}