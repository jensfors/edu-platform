import PrismaClient from '$lib/prisma';
import { PostType } from '$lib/utils/stringTypes';
import type { Post, User, UserHasPost } from '@prisma/client';
import { userMatti } from './dummy/data';

const prisma = new PrismaClient();


// Gets the 'amount' latest blog posts that are public
export async function getLatestBlogPosts(amount: number): Promise<Post[]> {
    // `SELECT * FROM "public"."Post" WHERE public = true AND "type" = 'Blog' ORDER BY "createdAt" DESC LIMIT ${amount}`
    const result: Post[] = await prisma.post.findMany({
        where: {
            public: true,    // only public posts
            type: PostType.Blog     // only Blog posts
        },
        orderBy: {
            createdAt: 'desc' // Sort by newest
        },
        take: amount // Amount to return
    })
    return result
}

// TODO: Turn into prisma
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
    const result: Post[] = await prisma.$queryRaw`SELECT id, title, content, "createdAt", public, type FROM "public"."Post" JOIN "public"."UserReadsPost" ON "public"."Post".id = "public"."UserReadsPost"."postId" WHERE public = true AND "type" = 'Blog' AND "readAt" > current_date - interval '7 days' GROUP BY  "public"."Post".id ORDER BY COUNT(*) DESC LIMIT ${amount};`
    return result
}

// Gets a specific post from id
export async function getPost(postId: string): Promise<Post> {
    const result: Post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            comments: {
                include: {
                    likes: true,
                    _count: {
                        select: { likes: true }
                    }
                }
            },
            _count: {
                select: { comments: true }
            }
        }
    })
    return result
}

export async function getUserBlogPost(userId: string): Promise<Post[]> {
    const result: Post[] = await prisma.post.findMany({
        where: {
            type: PostType.Blog,
            authors: {
                some: {
                    userId: userId
                }
            },
        }
    })
    return result
}

// Can update a post if you are an author and returns true
export async function updatePost(post: Post): Promise<boolean> {
    const userId: string = userMatti.id // TODO: Change to localstorage
    try {
        const result = await prisma.userHasPost.update({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: post.id
                }
            },
            data: {
                post: {
                    update: {
                        title: post.title,
                        public: post.public
                    }
                }
            }
        })
        return true
    }
    catch (PrismaClientKnownRequestError) {
        console.log("Your are not author of this post") // TODO: Better error handling
    }
    return false
}

// Create a post
export async function createPost(title: string, content: string, _public: boolean, type: PostType): Promise<Post> {
    const userId: string = userMatti.id // TODO: Change to localstorage

    const result: Post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            public: _public,
            type: type,
            authors: {
                create: {
                    userId: userId,
                    mainAuthor: true
                }
            }
        }
    })
    return result
}

export async function addAuthorToPost(post: Post, author: User): Promise<UserHasPost> {
    const result: UserHasPost = await prisma.userHasPost.create({
        data: {
            user: {
                connect: { id: author.id }
            },
            post: {
                connect: { id: post.id }
            }
        }
    })
    return result
}
