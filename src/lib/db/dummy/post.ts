import PrismaClient from '$lib/prisma';
import { userMatti, userJen, userKasper, userSimon } from './data';

const prisma = new PrismaClient();

export const createBlogPosts = async () => {
    await prisma.post.create({
        data: {
            title: 'A public blog post by ' + userMatti.firstName,
            public: true,
            authors: {
                create: [
                    {
                        mainAuthor: true,
                        user: {
                            connect: {
                                id: userMatti.id,
                            },
                        },
                    },
                ],
            },
            criteria: {
                create: [{
                    criteria: {
                        connect: { number: '1.2.2' }
                    }
                }, {
                    criteria: {
                        connect: { number: '2.2.2' }
                    }
                }, {
                    criteria: {
                        connect: { number: '3.2.2' }
                    }
                }]
            },
            usersRead: {
                create: [{
                    xp: 50,
                    user: {
                        connect: {
                            id: userKasper.id
                        }
                    }
                }, {
                    xp: 50,
                    user: {
                        connect: {
                            id: userSimon.id
                        }
                    }
                }]
            }
        },
    })

    await prisma.post.create({
        data: {
            title: 'A public blog post by ' + userMatti.firstName + ' (main author) and ' + userJen.firstName,
            public: true,
            authors: {
                create: [
                    {
                        mainAuthor: true,
                        user: {
                            connect: {
                                id: userMatti.id,
                            },
                        },
                    }, {
                        user: {
                            connect: {
                                id: userJen.id,
                            },
                        },
                    },
                ],
            },
            criteria: {
                create: [{
                    criteria: {
                        connect: { number: '1.2.4' }
                    }
                }, {
                    criteria: {
                        connect: { number: '1.2.8' }
                    }
                }, {
                    criteria: {
                        connect: { number: '4.1.1' }
                    }
                }]
            },
            usersRead: {
                create: [{
                    xp: 100,
                    user: {
                        connect: {
                            id: userKasper.id
                        }
                    }
                }, {
                    xp: 100,
                    user: {
                        connect: {
                            id: userSimon.id
                        }
                    }
                }]
            },
            comments: {
                create: [{
                    text: 'This is a comment written by ' + userKasper.firstName,
                    user: {
                        connect: {
                            id: userKasper.id
                        }
                    },
                    likes: {
                        create: [{
                            user: {
                                connect: {
                                    id: userJen.id
                                }
                            }
                        }, {
                            user: {
                                connect: {
                                    id: userSimon.id
                                }
                            }
                        }]
                    }

                }]
            }
        },
    })

    await prisma.post.create({
        data: {
            title: 'A private blog post by ' + userMatti.firstName,
            authors: {
                create: [
                    {
                        mainAuthor: true,
                        user: {
                            connect: {
                                id: userMatti.id,
                            },
                        },
                    },
                ],
            },
            criteria: {
                create: [{
                    criteria: {
                        connect: {
                            number: '3.3.3'
                        }
                    }
                }]
            }
        },
    })

}