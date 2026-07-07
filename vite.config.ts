import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import Sitemap from 'vite-plugin-sitemap';
import banner from 'vite-plugin-banner';
import { VitePWA } from 'vite-plugin-pwa';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://jkfertilizers.com';
const BUILD_DATE = new Date();
const ROOT_DIR = process.cwd();

function readTextIfExists(filePath: string): string {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

function readMdxSlugs(dirPath: string): string[] {
  if (!existsSync(dirPath)) return [];

  return readdirSync(dirPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

const productsFile = path.resolve(ROOT_DIR, 'src/data/products.ts');
const blogDir = path.resolve(ROOT_DIR, 'src/content/blog');
const servicesDir = path.resolve(ROOT_DIR, 'src/content/services');

const productsSource = readTextIfExists(productsFile);

const productSlugs = Array.from(
  new Set(
    [...productsSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map(
      (match): string => match[1],
    ),
  ),
);

const blogSlugs = Array.from(new Set(readMdxSlugs(blogDir)));
const serviceSlugs = Array.from(new Set(readMdxSlugs(servicesDir)));

const staticRoutes = ['/about', '/history', '/products', '/services', '/portfolio', '/blog', '/contact'];

const dynamicRoutes = Array.from(
  new Set([
    '/',
    ...staticRoutes,
    ...productSlugs.map((slug) => `/products/${slug}`),
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ]),
);

const priorityMap: Record<string, number> = {
  '/': 1.0,
  '/contact': 0.9,
  '/products': 0.9,
  '/services': 0.85,
  '/about': 0.8,
  '/portfolio': 0.75,
  '/history': 0.7,
  '/blog': 0.75,
  ...Object.fromEntries(
    productSlugs.map((slug) => [`/products/${slug}`, 0.85] as const),
  ),
  ...Object.fromEntries(
    serviceSlugs.map((slug) => [`/services/${slug}`, 0.8] as const),
  ),
  ...Object.fromEntries(blogSlugs.map((slug) => [`/blog/${slug}`, 0.7] as const)),
};

const changefreqMap: Record<string, string> = {
  '/': 'weekly',
  '/products': 'weekly',
  '/blog': 'weekly',
  '/contact': 'monthly',
  '/about': 'monthly',
  '/history': 'yearly',
  '/portfolio': 'monthly',
  '/services': 'monthly',
  '*': 'monthly',
};

export default defineConfig({
  plugins: [

    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),

    react({
      include: /\.(js|jsx|ts|tsx)$/,
      exclude: /\.(mdx)$/,
    }),

    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
      ],
      manifest: {
        name: 'J K Fertilizers — Organic Fertilizer Manufacturer',
        short_name: 'JK Fertilizers',
        description:
          'Leading manufacturer of organic fertilizers, base granules and coated granules in Gujarat, India. FCO approved. Since 2006.',
        theme_color: '#163D26',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '32x32',
            type: 'image/x-icon',
          },
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MiB
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,avif,jpg,jpeg,gif,woff2}',
        ],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|webp|avif|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|woff2?|ttf|otf)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'asset-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),

    banner({
      outDir: 'dist',
      content: `/*
=================================================
  J K Fertilizers — jkfertilizers.com
  Copyright © ${BUILD_DATE.getFullYear()} J K Fertilizers
  Built with Vite + React
  Version: ${process.env.npm_package_version || '0.1.0'}
  Build Date: ${BUILD_DATE.toISOString()}
  File: {{filename}}
=================================================
*/`,
    }),

    Sitemap({
      hostname: BASE_URL,
      dynamicRoutes,
      priority: priorityMap,
      changefreq: changefreqMap,
      lastmod: { '*': BUILD_DATE },
      readable: true,
      outDir: 'dist',
      generateRobotsTxt: true,
      robots: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: 'Googlebot-Image', allow: '/' },
        { userAgent: 'Googlebot-Video', allow: '/' },
        { userAgent: 'Googlebot-News', allow: '/' },
        { userAgent: 'Google-Extended', allow: '/' },
        { userAgent: 'Gemini-Web', allow: '/' },
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'OAI-SearchBot', allow: '/' },
        { userAgent: 'anthropic-ai', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'Claude-Web', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Meta-ExternalAgent', allow: '/' },
        { userAgent: 'Meta-ExternalFetcher', allow: '/' },
        { userAgent: 'FacebookBot', allow: '/' },
        { userAgent: 'Bingbot', allow: '/' },
        { userAgent: 'msnbot', allow: '/' },
        { userAgent: 'msnbot-media', allow: '/' },
        { userAgent: 'Applebot', allow: '/' },
        { userAgent: 'Applebot-Extended', allow: '/' },
        { userAgent: 'Brave Bot', allow: '/' },
        { userAgent: 'DuckDuckBot', allow: '/' },
        { userAgent: 'YandexBot', allow: '/' },
        { userAgent: 'YandexImages', allow: '/' },
        { userAgent: 'Baiduspider', allow: '/' },
        { userAgent: 'xAI-Bot', allow: '/' },
        { userAgent: 'cohere-ai', allow: '/' },
        { userAgent: 'LinkedInBot', allow: '/' },
        { userAgent: 'Twitterbot', allow: '/' },
        { userAgent: 'facebookexternalhit', allow: '/' },
        { userAgent: 'WhatsApp', allow: '/' },
        { userAgent: 'TelegramBot', allow: '/' },
        { userAgent: 'ia_archiver', allow: '/' },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(ROOT_DIR, 'src'),
    },
  },

  server: {
    port: 3000,
  },
});