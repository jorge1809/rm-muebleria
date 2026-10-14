import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],

  // Desarrollo: SPA para permitir recargar rutas de React Router.
  // Preview y compilación: MPA para servir el HTML prerenderizado.
  appType: command === "serve" && !isPreview ? "spa" : "mpa",

  build: {
    manifest: true,
  },

  ssr: {
    noExternal: ["react-router"],
  },
}));
