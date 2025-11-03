import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ✅ Vercel + Windows + React 通用配置
export default defineConfig({
  plugins: [react()],
  base: "./", // 确保在 Vercel 或相对路径下都能正确加载资源
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 支持 @ 引用 src
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // ✅ 拆分 React + AntD Mobile，提升首屏加载速度
          vendor: ["react", "react-dom", "react-router-dom"],
          antd: ["antd-mobile"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "antd-mobile"],
  },
});
