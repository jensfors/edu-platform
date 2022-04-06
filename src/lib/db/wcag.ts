import PrismaClient from '$lib/prisma';
import type { WCAGCriteria } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCriteria(): Promise<WCAGCriteria[]> {
    const result: WCAGCriteria[] = await prisma.wCAGCriteria.findMany({
        include: {
            principle: true
        },
        orderBy: {
            number: 'asc'
        }
    })
    return result
}