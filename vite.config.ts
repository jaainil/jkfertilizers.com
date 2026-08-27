import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import banner from 'vite-plugin-banner';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

const BUILD_DATE = new Date();
const ROOT_DIR = process.cwd();

/**
 * Development middleware to route /api/rag/chat during `npm run dev`
 */
function ragDevServerPlugin(): Plugin {
  return {
    name: 'rag-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/rag/chat')) {
          try {
            const { default: handler } = await import('./api/rag/chat');
            await handler(req as any, res as any);
          } catch (err) {
            console.error('[vite-dev] RAG API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal Dev Server Error' }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    ragDevServerPlugin(),

    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
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