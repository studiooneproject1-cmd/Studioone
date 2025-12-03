import { Client } from "pg";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function fetchDynamicPaths() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  try {
    const projectsRes = await client.query(`SELECT id FROM projects WHERE id IS NOT NULL`);
    const servicesRes = await client.query(`SELECT id FROM services WHERE id IS NOT NULL`);

    const projects = projectsRes.rows.map(r => `/projects/${r.id}`);
    const services = servicesRes.rows.map(r => `/services/${r.id}`);

    return [...projects, ...services];
  } finally {
    await client.end();
  }
}

export default {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*"],

  additionalPaths: async (config) => {
    const staticPaths = [
      "/", "/about", "/services", "/projects", "/contact", "/mission-vision"
    ];

    const dynamicPaths = await fetchDynamicPaths();

    const allPaths = [...staticPaths, ...dynamicPaths];

    return Promise.all(allPaths.map(p => config.transform(config, p)));
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin/"] },
    ],
  },
};
