import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { AdminPortal } from "@/components/admin/AdminPortal";

export const metadata = constructMetadata({
  title: `System Admin Portal | ${siteConfig.name}`,
  description: "Protected administrative console for platform management and AI blog publishing.",
  noIndex: true,
});

export default function AdminPage() {
  return <AdminPortal />;
}
