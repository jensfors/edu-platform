import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function main() {
    await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        posts: {
          create: [{ title: 'Hello World' }, { title: 'Hello Hell' }],
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
    console.log("Nou dab")
  }

  /* 
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  createdAt DateTime @default(now()) @db.Timestamp(6)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique @db.VarChar(255)
  name    String?  @db.VarChar(255)
  posts   Post[]
  profile Profile?
}
  */