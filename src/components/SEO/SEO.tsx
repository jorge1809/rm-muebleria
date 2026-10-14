import { useEffect } from "react";
import { useLocation } from "react-router";

interface SEOProps {
  titulo: string;
  descripcion: string;
  noIndex?: boolean;
}

function SEO({ titulo, descripcion, noIndex = false }: SEOProps) {
  const { pathname } = useLocation();

  const tituloCompleto = `${titulo} | R&M Mueblería`;

  const urlBase = import.meta.env.VITE_SITE_URL as string | undefined;

  const urlCanonica = urlBase
    ? new URL(pathname, `${urlBase.replace(/\/+$/, "")}/`).href
    : undefined;

  useEffect(() => {
    document.title = tituloCompleto;

    let descripcionMeta = document.head.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!descripcionMeta) {
      descripcionMeta = document.createElement("meta");
      descripcionMeta.name = "description";
      document.head.appendChild(descripcionMeta);
    }

    descripcionMeta.content = descripcion;

    const canonicalAnterior = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (urlCanonica) {
      const canonical = canonicalAnterior ?? document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = urlCanonica;

      if (!canonicalAnterior) document.head.appendChild(canonical);
    } else {
      canonicalAnterior?.remove();
    }

    const robotsAnterior = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );

    if (noIndex) {
      const robots = robotsAnterior ?? document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex, nofollow";

      if (!robotsAnterior) document.head.appendChild(robots);
    } else {
      robotsAnterior?.remove();
    }
  }, [tituloCompleto, descripcion, urlCanonica, noIndex]);

  // El servidor genera los metadatos para el HTML prerenderizado.
  if (import.meta.env.SSR) {
    return (
      <>
        <title>{tituloCompleto}</title>
        <meta name="description" content={descripcion} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        {!noIndex && urlCanonica && <link rel="canonical" href={urlCanonica} />}
      </>
    );
  }

  // En el navegador no renderizamos estos elementos dentro de #root.
  return null;
}

export default SEO;
