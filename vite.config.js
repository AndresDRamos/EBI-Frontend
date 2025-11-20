import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde la raíz del proyecto
  const env = loadEnv(mode, path.resolve(__dirname, "../"), "");

  return {
    plugins: [react()],
    // Usar base solo en producción (GitHub Pages), en desarrollo usar '/'
    base: mode === 'production' ? '/EBI-Frontend/' : '/',
    server: {
      port: parseInt(env.FRONTEND_PORT) || 3001,
      host: "0.0.0.0",
      open: true,
      proxy: {
        "/api": {
          target: `http://${env.BACKEND_IP || "localhost"}:${
            env.BACKEND_PORT || 4000
          }`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@auth": path.resolve(__dirname, "./src/auth"),
      },
    },
  };
});
