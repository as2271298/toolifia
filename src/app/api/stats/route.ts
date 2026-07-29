import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const [totalTools, totalCategories, totalUsage, topTools] = await Promise.all([
      db.tool.count(),
      db.category.count(),
      db.tool.aggregate({ _sum: { usageCount: true } }),
      db.tool.findMany({
        orderBy: { usageCount: "desc" },
        take: 5,
        select: { slug: true, name: true, usageCount: true, icon: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalTools,
        totalCategories,
        totalUsage: totalUsage._sum.usageCount ?? 0,
        topTools,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
