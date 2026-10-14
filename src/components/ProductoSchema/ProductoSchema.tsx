import type { Producto } from "../../types/Producto";

interface ProductoSchemaProps {
  producto: Producto;
  urlProducto: string;
}

function ProductoSchema({ producto, urlProducto }: ProductoSchemaProps) {
  const imagenes = [...new Set([producto.imagen, ...producto.galeria])];

  const urlBase = import.meta.env.VITE_SITE_URL as string | undefined;

  const convertirUrlAbsoluta = (ruta: string) => {
    if (!urlBase) return ruta;

    return new URL(ruta, urlBase).href;
  };

  const disponible = producto.variantes.some((variante) => variante.stock > 0);

  const datosEstructurados = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    image: imagenes.map(convertirUrlAbsoluta),
    sku: String(producto.id),
    material: producto.materiales,
    height: {
      "@type": "QuantitativeValue",
      value: producto.medidas.alto,
      unitCode: "CMT",
    },
    width: {
      "@type": "QuantitativeValue",
      value: producto.medidas.ancho,
      unitCode: "CMT",
    },
    depth: {
      "@type": "QuantitativeValue",
      value: producto.medidas.profundidad,
      unitCode: "CMT",
    },
    offers: {
      "@type": "Offer",
      url: urlProducto,
      priceCurrency: "NIO",
      price: producto.precio,
      availability: disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const json = JSON.stringify(datosEstructurados).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default ProductoSchema;
