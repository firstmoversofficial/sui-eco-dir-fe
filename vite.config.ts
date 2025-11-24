import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), mode === "development" && screenGraphPlugin()],
    publicDir: "./static",
    base: "./",
    css: {
        postcss: {
            plugins: [tailwind()],
        },
    },
    server: {
        // Proxy only for local development
        // In production, the frontend will use VITE_API_BASE_URL from .env
        proxy:
            process.env.NODE_ENV === "development"
                ? {
                      "/api/v1": {
                          target: "http://localhost:3001",
                          changeOrigin: true,
                      },
                  }
                : undefined,
    },
}));
