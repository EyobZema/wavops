import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wavops.io";
  return [
    {
      url: `${base}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/audio-dataset-problems`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/how-wavops-works`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

