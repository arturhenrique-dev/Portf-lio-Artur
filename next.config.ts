import type { NextConfig } from "next";

// Sem `output: "export"`: na Vercel a página já é pré-renderizada como estática
// e mantemos a otimização automática de imagens do next/image.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "motion"],
  },
};

export default nextConfig;
