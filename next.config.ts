import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Turbopack مشخص می‌شود؛ پیکربندی webpack فقط برای build استفاده می‌شود
  turbopack: {},
  // جلوگیری از توقف سرور توسعه هنگام اسکن پوشه‌های سیستمی (upload/download)
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions ?? {}),
      ignored: ["**/upload/**", "**/download/**", "**/node_modules/**", "**/.next/**"],
    };
    return config;
  },
};

export default nextConfig;
