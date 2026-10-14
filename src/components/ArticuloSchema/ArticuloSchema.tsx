import type { ArticuloInspiracion } from "../../types/ArticuloInspiracion";

interface ArticuloSchemaProps {
  articulo: ArticuloInspiracion;
  urlArticulo: string;
}

function ArticuloSchema({ articulo, urlArticulo }: ArticuloSchemaProps) {
  const datosEstructurados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.titulo,
    description: articulo.descripcion,
    image: new URL(articulo.imagen, urlArticulo).href,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": urlArticulo,
    },
    author: {
      "@type": "Organization",
      name: "R&M Mueblería",
    },
    publisher: {
      "@type": "Organization",
      name: "R&M Mueblería",
    },
    articleBody: [
      articulo.introduccion,
      ...articulo.secciones.map(
        (seccion) => `${seccion.titulo}. ${seccion.texto}`,
      ),
    ].join("\n\n"),
  };

  const json = JSON.stringify(datosEstructurados).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default ArticuloSchema;
