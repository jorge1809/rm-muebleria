import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Lightbulb,
  Sofa,
  Ruler,
  Gem,
  Leaf,
} from "lucide-react";

import { articulosInspiracion } from "../../data/articulosInspiracion";
import { categoriasProducto } from "../../data/categoriasProducto";
import PaginaNoEncontrada from "../../components/PaginaNoEncontrada/PaginaNoEncontrada";
import SEO from "../../components/SEO/SEO";
import ArticuloSchema from "../../components/ArticuloSchema/ArticuloSchema";

import "./DetalleInspiracion.css";

function DetalleInspiracionRuta() {
  const { slug } = useParams<{ slug: string }>();

  const articulo = articulosInspiracion.find((item) => item.slug === slug);

  if (!articulo) {
    return (
      <PaginaNoEncontrada
        tipo="INSPIRACIÓN"
        titulo="No encontramos este artículo"
        descripcion="El artículo que buscas no está disponible o su dirección ha cambiado."
      />
    );
  }

  const categoria = categoriasProducto.find(
    (item) => item.slug === articulo.categoriaSlug,
  );

  const iconos = [Sofa, Ruler, Gem, Leaf];

  const urlArticulo =
    typeof window !== "undefined"
      ? `${window.location.origin}/inspiracion/${articulo.slug}`
      : `/inspiracion/${articulo.slug}`;

  return (
    <main className="detalle-inspiracion">
      <SEO titulo={articulo.titulo} descripcion={articulo.descripcion} />

      {typeof window !== "undefined" && (
        <ArticuloSchema articulo={articulo} urlArticulo={urlArticulo} />
      )}

      <div className="detalle-inspiracion__contenedor">
        {/* HERO EDITORIAL */}

        <section className="detalle-inspiracion__hero">
          <div className="detalle-inspiracion__hero-contenido">
            <Link to="/#inspiracion" className="detalle-inspiracion__volver">
              <ArrowLeft size={17} aria-hidden="true" />
              Volver a Inspiración
            </Link>

            <div className="detalle-inspiracion__hero-informacion">
              <span className="detalle-inspiracion__etiqueta">
                INSPIRACIÓN / R&M MUEBLERÍA
              </span>

              <h1>{articulo.titulo}</h1>

              <p className="detalle-inspiracion__descripcion">
                {articulo.descripcion}
              </p>

              <div className="detalle-inspiracion__etiquetas">
                {articulo.etiquetas.map((etiqueta, index) => {
                  const Icono = iconos[index % iconos.length];

                  return (
                    <span key={`${etiqueta}-${index}`}>
                      <Icono size={19} strokeWidth={1.5} aria-hidden="true" />
                      {etiqueta}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="detalle-inspiracion__hero-imagen">
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              fetchPriority="high"
            />
          </div>
        </section>

        <article className="detalle-inspiracion__articulo">
          {/* INTRODUCCIÓN */}

          <section className="detalle-inspiracion__introduccion">
            <p>{articulo.introduccion}</p>

            {articulo.cita && <blockquote>“{articulo.cita}”</blockquote>}
          </section>

          {/* SECCIONES DINÁMICAS */}

          <div className="detalle-inspiracion__secciones">
            {articulo.secciones.map((seccion, index) => (
              <section
                key={seccion.id}
                className={[
                  "detalle-inspiracion__seccion",
                  index % 2 !== 0 && seccion.imagen
                    ? "detalle-inspiracion__seccion--invertida"
                    : "",
                  !seccion.imagen
                    ? "detalle-inspiracion__seccion--sin-imagen"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {seccion.imagen && (
                  <div className="detalle-inspiracion__seccion-imagen">
                    <img
                      src={seccion.imagen}
                      alt={seccion.imagenAlt ?? seccion.titulo}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="detalle-inspiracion__seccion-texto">
                  <span className="detalle-inspiracion__numero">
                    {String(index + 1).padStart(2, "0")}
                    <span aria-hidden="true" />
                  </span>

                  <h2>{seccion.titulo}</h2>

                  <p>{seccion.texto}</p>

                  {seccion.consejo && (
                    <aside className="detalle-inspiracion__consejo">
                      <Lightbulb
                        size={24}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />

                      <div>
                        <strong>Consejo</strong>
                        <p>{seccion.consejo}</p>
                      </div>
                    </aside>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* COLECCIÓN DESTACADA */}

        <section className="detalle-inspiracion__coleccion">
          <div className="detalle-inspiracion__coleccion-contenido">
            <span className="detalle-inspiracion__etiqueta">
              COLECCIÓN DESTACADA
            </span>

            <h2>
              {categoria
                ? `${categoria.nombre} para cada estilo de vida`
                : "Diseño para cada estilo de vida"}
            </h2>

            <p>
              Explora nuestra colección y encuentra muebles que combinan
              comodidad, diseño y personalidad para transformar tu hogar.
            </p>

            <Link
              to={`/catalogo/${articulo.categoriaSlug}`}
              className="detalle-inspiracion__coleccion-boton"
            >
              Ver muebles relacionados
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="detalle-inspiracion__coleccion-imagen">
            <img
              src={
                articulo.imagenColeccion ?? categoria?.imagen ?? articulo.imagen
              }
              alt={`Colección ${categoria?.nombre ?? "de muebles"}`}
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default DetalleInspiracionRuta;
