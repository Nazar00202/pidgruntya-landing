import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    target: "es2019",
    sourcemap: false,
    // SSR-збірка потрібна лише для пререндеру — public/ туди копіювати не треба
    copyPublicDir: !isSsrBuild,
  },
}));
