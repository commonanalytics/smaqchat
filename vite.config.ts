import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from 'vite-plugin-dts';
import postcssImport from 'postcss-import';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    dts({
      include: ["src/components/SmaqChatbot/**/*"],
      outDir: "dist/types",
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/SmaqChatbot/index.ts"),
      name: "SmaqChatbot",
      formats: ["es", "umd"],
      fileName: (format) => `smaq-chatbot.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        "chart.js", 
        "react-markdown", 
        "remark-gfm", 
        "@tanstack/react-query", 
        "axios",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "next-themes"
      ],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "chart.js": "Chart",
          "react-markdown": "ReactMarkdown",
          "remark-gfm": "remarkGfm",
          "@tanstack/react-query": "reactQuery",
          "axios": "axios",
          "lucide-react": "lucideReact",
          "class-variance-authority": "cva",
          "clsx": "clsx",
          "tailwind-merge": "tailwindMerge",
          "next-themes": "nextThemes"
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name && assetInfo.name.endsWith('.css') ? 'styles.css' : '[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
    cssTarget: 'esnext',
  },
});
