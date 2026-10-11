import path from "node:path"
import { fileURLToPath } from "node:url"
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const root = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    loadPaths: [path.join(root, "styles")],
  },
}

export default withNextIntl(nextConfig)
