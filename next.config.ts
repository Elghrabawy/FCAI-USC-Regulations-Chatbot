import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  reactStrictMode: true,
};

export default nextConfig;
