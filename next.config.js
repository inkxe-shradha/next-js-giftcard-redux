/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
// Notice we have added the pwa config inside withPwa . On previous versions of Next, serving the service worker requires a custom server. But since Next 9+, this is not required. It’s much easier now! next-pwa will create the sw.js file and this file will served from the public folder in the production build.
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com"],
  },
  pwa: {
    dest: "public",
  },
};

module.exports = withPWA(nextConfig);
