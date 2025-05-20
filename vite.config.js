import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    vue(),
    VueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
              },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Limite augmentée à 5 Mo
      },
      manifest: {
        name: 'HEdS',
        short_name: 'HEdS',
        description: 'Progressive Web App pour PFPHEDS',
        theme_color: '#0B213F',
        background_color: '#0B213F',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/assets/images/hespicto.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/images/hespicto.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'root': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'], // Par exemple, regrouper les dépendances tierces
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optionnel : augmente la limite d'avertissement pour les chunks
  },
})
