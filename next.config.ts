import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["src/app/styles"], // 確保 Vercel 能找到 SCSS 檔案
  },
};

export default nextConfig;