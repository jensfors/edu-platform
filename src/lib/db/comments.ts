import PrismaClient from '$lib/prisma';
import type { Comment, Post, UserLikesComment } from '@prisma/client';
import { userMatti, userSimon } from './dummy/data';

const prisma = new PrismaClient();


export async function addCommentToPost(post: Post, text: string): Promise<Comment> {
    const result: Comment = await prisma.comment.create({
        data: {
            text: text,
            post: {
                connect: { id: post.id }
            },
            user: {
                connect: { id: userSimon.id } // TODO: Change to local storage
            }
        }
    })
    return result
}

export async function likeComment(comment: Comment): Promise<Comment> {
    const result: Comment = await prisma.comment.update({
        where: {
            id: comment.id
        },
        data: {
            likes: {
                create: {
                    user: {
                        connect: { id: userMatti.id } // TODO: Change to local storage
                    }
                }
            }
        }
    })
    return result
}