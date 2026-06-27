import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/verify-email",
          "/login",
          "/signup",
        ],
      },
    ],
    sitemap: "https://tripile.vercel.app/sitemap.xml",
    host: "https://tripile.vercel.app",
  };
}
