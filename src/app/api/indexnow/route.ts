import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";
import { TOOLS } from "@/config/tools.registry";
import { CATEGORIES } from "@/config/categories.registry";
import { SAMPLE_POSTS } from "@/lib/blog-data";

const INDEXNOW_KEY = "2032946dbd1548d89436c5306cc46231";

export async function GET() {
  const host = new URL(siteConfig.url).host;

  const urlList = [
    siteConfig.url,
    `${siteConfig.url}/tools`,
    `${siteConfig.url}/blog`,
    ...CATEGORIES.map((c) => `${siteConfig.url}/category/${c.slug}`),
    ...TOOLS.map((t) => `${siteConfig.url}/tool/${t.slug}`),
    ...SAMPLE_POSTS.map((p) => `${siteConfig.url}/blog/${p.slug}`),
  ];

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      submittedUrls: urlList.length,
      message: "IndexNow payload sent to Bing & search engines successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
