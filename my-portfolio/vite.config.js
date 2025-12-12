import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov'],
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    assetsInlineLimit: 0, // No inline videos
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep video files in their original location
          if (assetInfo.name.endsWith('.mp4') ||
            assetInfo.name.endsWith('.webm') ||
            assetInfo.name.endsWith('.mov')) {
            return 'assets/videos/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
