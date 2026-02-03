import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const INDEXABLE_HOSTS = new Set([
  "patrickcipicgruebener.com",
  "www.patrickcipicgruebener.com",
]);

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host") || "";
  const host = forwardedHost || headersList.get("host") || "";
  const domain = host.split(",")[0]?.trim().split(":")[0]?.toLowerCase() || "";
  const isIndexable = INDEXABLE_HOSTS.has(domain);

  return {
    rules: isIndexable
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
  };
}
