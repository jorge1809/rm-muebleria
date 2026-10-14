import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const carpetaRaiz = process.cwd();
const carpetaTemporal = await mkdtemp(path.join(tmpdir(), "rm-sitemap-"));

function escaparXML(valor) {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function cargarDatos(archivo, exportacion) {
  const entrada = path.join(carpetaRaiz, "src", "data", archivo);

  const salida = path.join(carpetaTemporal, archivo.replace(/\.ts$/, ".mjs"));

  await build({
    entryPoints: [entrada],
    outfile: salida,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const modulo = await import(pathToFileURL(salida).href);

  return modulo[exportacion];
}

try {
  const [productos, categorias, ambientes, articulos] = await Promise.all([
    cargarDatos("productos.ts", "productos"),
    cargarDatos("categoriasProducto.ts", "categoriasProducto"),
    cargarDatos("ambientes.ts", "ambientes"),
    cargarDatos("articulosInspiracion.ts", "articulosInspiracion"),
  ]);

  const archivoEntorno = path.join(carpetaRaiz, ".env.production");

  let contenidoEntorno = "";

  try {
    contenidoEntorno = await readFile(archivoEntorno, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const lineaDominio = contenidoEntorno
    .split(/\r?\n/)
    .find((linea) => linea.trim().startsWith("VITE_SITE_URL="));

  const dominio =
    process.env.VITE_SITE_URL ||
    lineaDominio?.split("=").slice(1).join("=").trim();

  if (!dominio) {
    console.log("Sitemap omitido: configura VITE_SITE_URL en .env.production.");
    process.exit(0);
  }

  const urlBase = new URL(dominio);

  if (
    urlBase.protocol !== "https:" ||
    urlBase.hostname === "localhost" ||
    urlBase.hostname === "127.0.0.1"
  ) {
    throw new Error("VITE_SITE_URL debe ser un dominio público HTTPS.");
  }

  const rutas = [
    "/",
    ...categorias.map((categoria) => `/catalogo/${categoria.slug}`),
    ...ambientes.map((ambiente) => `/ambientes/${ambiente.ancla}`),
    ...productos.map((producto) => `/productos/${producto.id}`),
    ...articulos.map((articulo) => `/inspiracion/${articulo.slug}`),
  ];

  const urls = [...new Set(rutas)].map((ruta) => {
    const url = new URL(ruta, urlBase).href;

    return `  <url>
    <loc>${escaparXML(url)}</loc>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", urlBase).href}
`;

  await writeFile(
    path.join(carpetaRaiz, "dist", "sitemap.xml"),
    sitemap,
    "utf8",
  );

  await writeFile(path.join(carpetaRaiz, "dist", "robots.txt"), robots, "utf8");

  console.log(`Sitemap generado correctamente: ${urls.length} URLs.`);
} finally {
  await rm(carpetaTemporal, {
    recursive: true,
    force: true,
  });
}
