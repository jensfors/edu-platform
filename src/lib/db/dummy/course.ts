import PrismaClient from '$lib/prisma';
import { bobBlind, danDeaf, mattiMovement, userJen, userKasper, userMatti, userSimon } from './data';

const prisma = new PrismaClient();

export const createCourses = async () => {
    await prisma.course.create({
        data: {
            title: 'A public course by ' + userMatti.firstName,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            public: true,
            authors: {
                create: [{
                    mainAuthor: true,
                    user: {
                        connect: {
                            id: userMatti.id,
                        },
                    },
                },],
            },
            exercises: {
                create: [{
                    title: 'This is a Expert, Public exercise with Bob Blind',
                    difficulty: 'Expert',
                    public: true,
                    persona: {
                        connect: {
                            id: bobBlind.id
                        },
                    },
                    usersSolved: {
                        create: [{
                            xp: 69,
                            user: {
                                connect: { id: userKasper.id }
                            }
                        }, {
                            xp: 69,
                            user: {
                                connect: { id: userSimon.id }
                            }
                        }]
                    },
                    criteria: {
                        create: [{
                            criteria: {
                                connect: { number: '1.4.1' }
                            }
                        }, {
                            criteria: {
                                connect: { number: '3.2.2' }
                            }
                        }, {
                            criteria: {
                                connect: { number: '2.4.1' }
                            }
                        }]
                    },
                }, {
                    title: 'This is a Beginner, Private exercise with Dan Deaf',
                    persona: {
                        connect: {
                            id: danDeaf.id
                        },
                    },
                },]
            }
        },
    })

    await prisma.course.create({
        data: {
            title: 'A private course by ' + userJen.firstName + ' (main author) and ' + userMatti.firstName,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            public: false,
            authors: {
                create: [{
                    mainAuthor: true,
                    user: {
                        connect: {
                            id: userJen.id,
                        },
                    },
                }, {
                    user: {
                        connect: {
                            id: userMatti.id,
                        },
                    },
                }],
            },
            exercises: {
                create: [{
                    title: 'This is a Expert, Private exercise with Matti Movement',
                    difficulty: 'Expert',
                    public: false,
                    persona: {
                        connect: {
                            id: mattiMovement.id
                        },
                    },
                },]
            }
        },
    })
}