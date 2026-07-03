import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // WARN: static export is load-bearing — the config-driven locale routing
  // (ADR-0002) is built to deploy as static HTML with no middleware.
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Inline the CSS into <style> in <head> instead of a render-blocking
    // <link rel="stylesheet">. Styles arrive with the HTML so the browser
    // paints immediately — removes the ~300ms render-blocking request flagged
    // by Lighthouse. Works well with Tailwind's small atomic bundle.
    inlineCss: true,
  },
}

export default nextConfig
