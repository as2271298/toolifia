const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const totalPosts = await prisma.blogPost.count();
  const posts = await prisma.blogPost.findMany({ select: { slug: true, title: true, category: true } });
  console.log(`Total Blog Posts in Database: ${totalPosts}`);
  console.log("Categories covered:");
  const cats = {};
  posts.forEach(p => cats[p.category] = (cats[p.category] || 0) + 1);
  console.log(cats);
}

main().finally(() => prisma.$disconnect());
