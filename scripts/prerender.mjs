import { createServer } from "vite";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse, parseFragment, serialize } from "parse5";

const raiz = process.cwd();

function obtenerAtributo(nodo, nombre) {
  return nodo.attrs?.find((atributo) => atributo.name === nombre)?.value;
}

function buscarElemento(nodo, nombre, id) {
  if (nodo.tagName === nombre && (!id || obtenerAtributo(nodo, "id") === id)) {
    return nodo;
  }

  for (const hijo of nodo.childNodes ?? []) {
    const encontrado = buscarElemento(hijo, nombre, id);

    if (encontrado) return encontrado;
  }

  return null;
}

function esMetadataSEO(nodo) {
  if (nodo.tagName === "title") return true;

  if (nodo.tagName === "meta") {
    return ["description", "robots"].includes(obtenerAtributo(nodo, "name"));
  }

  if (nodo.tagName === "link") {
    return obtenerAtributo(nodo, "rel") === "canonical";
  }

  return false;
}

function generarDocumento(plantilla, htmlReact) {
  const documento = parse(plantilla);
  const head = buscarElemento(documento, "head");
  const root = buscarElemento(documento, "div", "root");

  if (!head || !root) {
    throw new Error("No se encontró <head> o <div id='root'>.");
  }

  const fragmento = parseFragment(htmlReact);

  function moverMetadata(nodo) {
    for (const hijo of [...(nodo.childNodes ?? [])]) {
      if (esMetadataSEO(hijo)) {
        const indice = nodo.childNodes.indexOf(hijo);

        nodo.childNodes.splice(indice, 1);

        hijo.parentNode = head;
        head.childNodes.push(hijo);
      } else {
        moverMetadata(hijo);
      }
    }
  }

  moverMetadata(fragmento);

  root.childNodes = fragmento.childNodes;

  for (const hijo of root.childNodes) {
    hijo.parentNode = root;
  }

  return serialize(documento);
}

const servidor = await createServer({
  configFile: path.join(raiz, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { render } = await servidor.ssrLoadModule("/src/entry-server.tsx");

  const { productos } = await servidor.ssrLoadModule("/src/data/productos.ts");

  const { categoriasProducto } = await servidor.ssrLoadModule(
    "/src/data/categoriasProducto.ts",
  );
  const { ambientes } = await servidor.ssrLoadModule("/src/data/ambientes.ts");
  const { articulosInspiracion } = await servidor.ssrLoadModule(
    "/src/data/articulosInspiracion.ts",
  );

  const rutas = [
    "/",
    ...categoriasProducto.map((categoria) => `/catalogo/${categoria.slug}`),
    ...ambientes.map((ambiente) => `/ambientes/${ambiente.ancla}`),
    ...productos.map((producto) => `/productos/${producto.id}`),
    ...articulosInspiracion.map((articulo) => `/inspiracion/${articulo.slug}`),
  ];
  const plantilla = await readFile(
    path.join(raiz, "dist", "index.html"),
    "utf8",
  );

  for (const ruta of new Set(rutas)) {
    const htmlReact = render(ruta);

    const html = generarDocumento(plantilla, htmlReact);

    const destino =
      ruta === "/"
        ? path.join(raiz, "dist", "index.html")
        : path.join(raiz, "dist", ruta.slice(1), "index.html");

    await mkdir(path.dirname(destino), {
      recursive: true,
    });

    await writeFile(destino, html, "utf8");

    console.log(`Prerenderizado: ${ruta}`);
  }

  console.log(`Prerenderizado completado: ${new Set(rutas).size} rutas.`);
} finally {
  await servidor.close();
}
