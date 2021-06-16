import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import linaria from "vite-plugin-linaria-styled";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    linaria({
      sourceMap: true,
      cacheDirectory: ".linaria-cache",
      extension: ".linaria.css",
    }),
  ],
  define: { "process.env": process.env },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          process: "process",
        }),
      ],
    },
  },
});
