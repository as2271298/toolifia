import { PrismaClient } from "@prisma/client";

// Use relative imports to avoid path alias issues with ts-node
import { TOOLS } from "../src/config/tools.registry";
import { CATEGORIES } from "../src/config/categories.registry";
import { SAMPLE_POSTS } from "../src/lib/blog-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // ── System Settings ─────────────────────────────────────────────────────────
  console.log("⚙️  Seeding system settings...");
  const settings = [
    { key: "site_name", value: "Toolifia" },
    { key: "maintenance_mode", value: "false" },
    { key: "ai_model", value: "meta-llama/llama-3.1-8b-instruct:free" },
    { key: "site_version", value: "1.0.0" },
  ];
  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`   ✓ ${settings.length} system settings seeded\n`);

  // ── Categories ───────────────────────────────────────────────────────────────
  console.log("📂 Seeding categories...");
  let catCount = 0;
  for (const cat of CATEGORIES) {
    const toolsInCat = TOOLS.filter((t) => t.category === cat.slug).length;
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        featured: cat.featured ?? false,
        toolsCount: toolsInCat,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        featured: cat.featured ?? false,
        toolsCount: toolsInCat,
      },
    });
    catCount++;
    process.stdout.write(`   → ${cat.name}\n`);
  }
  console.log(`   ✓ ${catCount} categories seeded\n`);

  // ── Tools ────────────────────────────────────────────────────────────────────
  console.log("🔧 Seeding tools...");
  let toolCount = 0;
  for (const tool of TOOLS) {
    // Assign realistic seed usage counts based on reviewsCount
    const seedUsage = tool.reviewsCount * 3 + Math.floor(Math.random() * 500);
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {
        name: tool.name,
        category: tool.category,
        description: tool.description,
        icon: tool.icon,
        featured: tool.featured ?? false,
        trending: tool.trending ?? false,
        rating: tool.rating,
        reviewsCount: tool.reviewsCount,
      },
      create: {
        slug: tool.slug,
        name: tool.name,
        category: tool.category,
        description: tool.description,
        icon: tool.icon,
        featured: tool.featured ?? false,
        trending: tool.trending ?? false,
        rating: tool.rating,
        reviewsCount: tool.reviewsCount,
        usageCount: seedUsage,
      },
    });
    toolCount++;
    process.stdout.write(`   → ${tool.name}\n`);
  }
  console.log(`   ✓ ${toolCount} tools seeded\n`);

  // ── Blog Posts ───────────────────────────────────────────────────────────────
  console.log("📝 Seeding blog posts...");
  let postCount = 0;
  for (const post of SAMPLE_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        readingTime: post.readTime,
        published: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        readingTime: post.readTime,
        published: true,
      },
    });
    postCount++;
    process.stdout.write(`   → ${post.title}\n`);
  }
  console.log(`   ✓ ${postCount} blog posts seeded\n`);

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 Database seed completed successfully!");
  console.log(`   📂 Categories : ${catCount}`);
  console.log(`   🔧 Tools      : ${toolCount}`);
  console.log(`   📝 Blog Posts : ${postCount}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
