/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
