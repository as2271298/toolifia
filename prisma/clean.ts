import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanBadPosts() {
  console.log("🧹 Cleaning placeholder blog posts from database...");

  const deleted = await prisma.blogPost.deleteMany({
    where: {
      OR: [
        { title: { contains: "Catchy" } },
        { title: { contains: "<" } },
        { excerpt: { contains: "compelling" } },
        { excerpt: { contains: "<" } },
        { content: { contains: "<Full article" } },
        { content: { contains: "<" } },
      ],
    },
  });

  console.log(`✓ Deleted ${deleted.count} placeholder posts from PostgreSQL database.`);
}

cleanBadPosts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
