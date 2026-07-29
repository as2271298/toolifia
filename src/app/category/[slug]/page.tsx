import { notFound } from "next/navigation";
import { CATEGORIES } from "@/config/categories.registry";
import { TOOLS } from "@/config/tools.registry";
import { ToolCard } from "@/components/common/ToolCard";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { siteConfig } from "@/config/site.config";
import { constructMetadata } from "@/lib/seo";
import { Sparkles, Grid } from "lucide-react";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return constructMetadata();

  return constructMetadata({
    title: `${cat.name} - Free Online Utilities | ${siteConfig.name}`,
    description: cat.description,
    canonicalUrl: `${siteConfig.url}/category/${cat.slug}`,
  });
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryTools = TOOLS.filter((t) => t.category === category.slug);

  const breadcrumbs = [
    { name: "Categories", url: "/#categories" },
    { name: category.name, url: `/category/${category.slug}` },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
            <Sparkles className="w-4 h-4" /> Category Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Available Tools ({categoryTools.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All tools in {category.name} are 100% free and web-based
          </p>
        </div>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 text-center border border-slate-200 dark:border-slate-800">
          <Grid className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Tools coming soon</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            We are constantly adding new tools to the {category.name} collection. Check back shortly!
          </p>
        </div>
      )}
    </div>
  );
}
