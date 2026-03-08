import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      new URL(
        "https://luttuwzpgsetpqmlgmjx.supabase.co/storage/v1/object/public/cabin-images/**",
      ),
    ],
  },
};

export default nextConfig;
