import { prisma } from '$lib/prisma';
import { bobBlind, danDeaf, mattiMovement, userJen, userKasper, userMatti, userSimon } from './data';

export const createUsers = async () => {
    await prisma.user.create({
        data: {
            id: userMatti.id,
            email: userMatti.email,
            firstName: userMatti.firstName,
            lastName: userMatti.lastName,
            role: userMatti.role,
            avatarURL: userMatti.avatarURL,
            personas: {
                create: [{
                    id: bobBlind.id,
                    name: bobBlind.name,
                    age: bobBlind.age,
                    description: bobBlind.description,
                    avatarUrl: bobBlind.avatarUrl,
                    private: bobBlind.private
                }, {
                    id: danDeaf.id,
                    name: danDeaf.name,
                    age: danDeaf.age,
                    description: danDeaf.description,
                    avatarUrl: danDeaf.avatarUrl
                }]
            },
        },
    })

    await prisma.user.create({
        data: {
            id: userJen.id,
            email: userJen.email,
            firstName: userJen.firstName,
            lastName: userJen.lastName,
            role: userJen.role,
            avatarURL: userJen.avatarURL,
            personas: {
                create: {
                    id: mattiMovement.id,
                    name: mattiMovement.name,
                    age: mattiMovement.age,
                    description: mattiMovement.description,
                    avatarUrl: mattiMovement.avatarUrl
                }
            }
        }
    })

    await prisma.user.create({
        data: {
            id: userKasper.id,
            email: userKasper.email,
            firstName: userKasper.firstName,
            lastName: userKasper.lastName,
            role: userKasper.role,
            avatarURL: userKasper.avatarURL
        }
    })

    await prisma.user.create({
        data: {
            id: userSimon.id,
            email: userSimon.email,
            firstName: userSimon.firstName,
            lastName: userSimon.lastName,
            role: userSimon.role,
            avatarURL: userSimon.avatarURL
        }
    })
}