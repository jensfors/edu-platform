import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

// Create a Post2 ("How to be Bob"), that relates to a category we create ("New category")
export const createCategory = async () => {
    await prisma.post2.create({
      data: {
        title: 'How to be Bob',
        categories: {
          create: [
            {
              assignedBy: 'Bob',
              assignedAt: new Date(),
              category: {
                create: {
                  name: 'New category',
                },
              },
            },
          ],
        },
      },
    })
};


// Create a new post ("How to be Bob") an assign to existing category (id = 1)
export const assignCategories = async () => {
  await prisma.post2.create({
    data: {
      title: 'How to be Bob',
      categories: {
        create: [
          {
            assignedBy: 'Bob',
            assignedAt: new Date(),
            category: {
              connect: {
                id: 1,
              },
            },
          },
        ],
      },
    },
  })
};

// getting posts where Category = "New category"
export const getPosts = async () => {
  const lol = await prisma.post2.findMany({
    where: {
      categories: {
        some: {
          category: {
            name: 'New category',
          },
        },
      },
    },
  })
  console.log(lol)
};

// Get categories made by Bob and title is "How to be Bob2"
export const getAssignments = async () => {
  const dab = await prisma.category.findMany({
    where: {
      posts: {
        some: {
          assignedBy: 'Bob',
          post: {
            title: {
              contains: 'How to be Bob2',
            },
          },
        },
      },
    },
  })
  console.log(dab)
};
