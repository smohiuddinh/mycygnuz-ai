import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

// Only real, indexable URLs — fragment links (/#services) are not separate pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/ai-calling`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ]
}
