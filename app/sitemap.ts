import type { MetadataRoute } from "next";

const BASE_URL = "https://www.bcadconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, priority: 1 },
    { url: `${BASE_URL}/services`, priority: 0.9 },
    { url: `${BASE_URL}/about`, priority: 0.8 },
    { url: `${BASE_URL}/training`, priority: 0.8 },
    { url: `${BASE_URL}/register`, priority: 0.7 },
    { url: `${BASE_URL}/contact`, priority: 0.6 },
  ];
}
