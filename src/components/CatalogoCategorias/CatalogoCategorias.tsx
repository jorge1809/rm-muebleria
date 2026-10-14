import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";

import type { CategoriaProducto } from "../../types/CategoriaProducto";
import "./CatalogoCategorias.css";

interface CatalogoCategoriasProps {
  categorias: CategoriaProducto[];
}

function CatalogoCategorias({ categorias }: CatalogoCategoriasProps) {
  // Inicializamos Embla sin Autoplay para evitar el error.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: categorias.length > 4,
  });

  // Controlamos el estado de los botones.
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(false);

  // Actualizamos los botones según la posición del carrusel.
  const actualizarBotones = useCallback(() => {
    if (!emblaApi) return;

    setPuedeAnterior(emblaApi.canScrollPrev());
    setPuedeSiguiente(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Escuchamos los cambios del carrusel.

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("init", actualizarBotones);
    emblaApi.on("select", actualizarBotones);
    emblaApi.on("reInit", actualizarBotones);

    return () => {
      emblaApi.off("init", actualizarBotones);
      emblaApi.off("select", actualizarBotones);
      emblaApi.off("reInit", actualizarBotones);
    };
  }, [emblaApi, actualizarBotones]);

  return (
    <section
      className="catalogo-categorias"
      id="catalogo"
      aria-labelledby="catalogo-titulo"
    >
      <header className="catalogo-categorias__encabezado">
        <div>
          <span className="catalogo-categorias__etiqueta">
            Nuestro catálogo
          </span>

          <h2 id="catalogo-titulo">Explora por categoría</h2>

          <p>Elige una categoría y encuentra tu próximo mueble.</p>
        </div>

        <div className="catalogo-categorias__controles">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!puedeAnterior}
            aria-label="Ver categorías anteriores"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!puedeSiguiente}
            aria-label="Ver categorías siguientes"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </header>

      <div className="catalogo-categorias__viewport" ref={emblaRef}>
        <div className="catalogo-categorias__carrusel">
          {categorias.map((categoria) => (
            <div className="catalogo-categorias__slide" key={categoria.id}>
              <Link
                className="catalogo-categoria"
                to={`/catalogo/${categoria.slug}`}
                aria-label={`Explorar categoría ${categoria.nombre}`}
              >
                <div className="catalogo-categoria__imagen">
                  <img src={categoria.imagen} alt="" loading="lazy" />
                </div>

                <div className="catalogo-categoria__contenido">
                  <div>
                    <h3>{categoria.nombre}</h3>
                    <span>Ver colección</span>
                  </div>

                  <ArrowUpRight size={22} aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CatalogoCategorias;
