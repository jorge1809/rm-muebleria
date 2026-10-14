import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  MessageCircle,
  X,
} from "lucide-react";

import type { Producto } from "../../types/Producto";
import type { CategoriaProducto } from "../../types/CategoriaProducto";

import { crearEnlaceWhatsApp } from "../../config/contacto";

import "./DetalleProducto.css";

interface DetalleProductoProps {
  producto: Producto;
  categoria: CategoriaProducto;
}

const formateadorPrecio = new Intl.NumberFormat("es-NI", {
  style: "currency",
  currency: "NIO",
});

function DetalleProducto({ producto, categoria }: DetalleProductoProps) {
  const fotografias = [...new Set([producto.imagen, ...producto.galeria])];

  const [indiceImagen, setIndiceImagen] = useState(0);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  const botonAmpliarRef = useRef<HTMLButtonElement>(null);
  const botonCerrarRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: fotografias.length > 1,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [varianteId, setVarianteId] = useState(
    producto.variantes.find((variante) => variante.stock > 0)?.id ??
      producto.variantes[0]?.id,
  );

  const varianteSeleccionada = producto.variantes.find(
    (variante) => variante.id === varianteId,
  );

  const precio = formateadorPrecio.format(producto.precio);

  const disponible = producto.variantes.some((variante) => variante.stock > 0);

  const stockSeleccionado = varianteSeleccionada?.stock ?? 0;

  const imagenSeleccionada = fotografias[indiceImagen];

  const mensajeWhatsApp = [
    "Hola, quisiera recibir información sobre este mueble:",
    "",
    `Producto: ${producto.nombre}`,
    `Precio publicado: ${precio}`,
    varianteSeleccionada ? `Color: ${varianteSeleccionada.color}` : null,
    "",
    "¿Podrían confirmarme la disponibilidad y las opciones de entrega?",
  ]
    .filter((linea) => linea !== null)
    .join("\n");

  function seleccionarImagen(indice: number) {
    setIndiceImagen(indice);
    emblaApi?.scrollTo(indice);
  }

  const cambiarImagen = useCallback(
    (direccion: number) => {
      setIndiceImagen((indiceActual) => {
        const siguiente =
          (indiceActual + direccion + fotografias.length) % fotografias.length;

        emblaApi?.scrollTo(siguiente);

        return siguiente;
      });
    },
    [emblaApi, fotografias.length],
  );
  useEffect(() => {
    if (!emblaApi) return;

    const actualizarSeleccion = () => {
      setIndiceImagen(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", actualizarSeleccion);

    return () => {
      emblaApi.off("select", actualizarSeleccion);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!imagenAmpliada) return;

    const elementoAnterior = document.activeElement;

    botonCerrarRef.current?.focus();

    function manejarTeclado(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setImagenAmpliada(false);
      }

      if (event.key === "ArrowLeft") {
        cambiarImagen(-1);
      }

      if (event.key === "ArrowRight") {
        cambiarImagen(1);
      }

      if (event.key === "Tab") {
        const controles = modalRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])",
        );

        if (!controles?.length) return;

        const primero = controles[0];
        const ultimo = controles[controles.length - 1];

        if (event.shiftKey && document.activeElement === primero) {
          event.preventDefault();
          ultimo.focus();
        } else if (!event.shiftKey && document.activeElement === ultimo) {
          event.preventDefault();
          primero.focus();
        }
      }
    }

    document.addEventListener("keydown", manejarTeclado);

    return () => {
      document.removeEventListener("keydown", manejarTeclado);

      if (elementoAnterior instanceof HTMLElement) {
        elementoAnterior.focus();
      }
    };
  }, [imagenAmpliada, cambiarImagen]);

  return (
    <main className="detalle-producto">
      <nav className="detalle-producto__ruta" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/catalogo/${categoria.slug}`}>{categoria.nombre}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{producto.nombre}</span>
      </nav>

      <div className="detalle-producto__grid">
        <div className="detalle-producto__galeria">
          <div className="detalle-producto__galeria-layout">
            {fotografias.length > 1 && (
              <div
                className="detalle-producto__miniaturas"
                aria-label="Fotografías del producto"
              >
                {fotografias.map((imagen, indice) => (
                  <button
                    key={imagen}
                    type="button"
                    className="detalle-producto__miniatura"
                    aria-label={`Ver fotografía ${indice + 1} de ${producto.nombre}`}
                    aria-pressed={indice === indiceImagen}
                    onClick={() => seleccionarImagen(indice)}
                  >
                    <img src={imagen} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <div className="detalle-producto__visor">
              <div className="detalle-producto__embla" ref={emblaRef}>
                <div className="detalle-producto__embla-contenedor">
                  {fotografias.map((imagen, indice) => (
                    <div className="detalle-producto__embla-slide" key={imagen}>
                      <img
                        className="detalle-producto__imagen"
                        src={imagen}
                        alt={`${producto.nombre}, fotografía ${indice + 1} de ${fotografias.length}`}
                        loading={indice === 0 ? "eager" : "lazy"}
                        fetchPriority={indice === 0 ? "high" : "auto"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                ref={botonAmpliarRef}
                type="button"
                className="detalle-producto__ampliar"
                onClick={() => setImagenAmpliada(true)}
                aria-label={`Ampliar fotografía de ${producto.nombre}`}
              >
                <Expand size={20} aria-hidden="true" />
              </button>

              {fotografias.length > 1 && (
                <span className="detalle-producto__contador">
                  {indiceImagen + 1} / {fotografias.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="detalle-producto__contenido">
          <span className="detalle-producto__categoria">
            {categoria.nombre}
          </span>

          <h1>{producto.nombre}</h1>

          <p className="detalle-producto__precio">{precio}</p>

          <p className="detalle-producto__descripcion">
            {producto.descripcion}
          </p>

          {producto.variantes.length > 0 && (
            <fieldset className="detalle-producto__colores">
              <legend>
                Color: {varianteSeleccionada?.color ?? "Selecciona un color"}
              </legend>

              <div className="detalle-producto__opciones">
                {producto.variantes.map((variante) => (
                  <label className="detalle-producto__color" key={variante.id}>
                    <input
                      type="radio"
                      name={`color-${producto.id}`}
                      value={variante.id}
                      checked={varianteId === variante.id}
                      onChange={() => setVarianteId(variante.id)}
                    />

                    <span
                      className="detalle-producto__muestra"
                      style={{ backgroundColor: variante.colorHex }}
                      aria-hidden="true"
                    />

                    <span>{variante.color}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <p className="detalle-producto__stock" role="status">
            {stockSeleccionado > 0
              ? "Disponible para consultar"
              : "Sin disponibilidad actualmente"}
          </p>

          <a
            className="detalle-producto__boton"
            href={crearEnlaceWhatsApp(mensajeWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Consultar por WhatsApp
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>

          {!disponible && (
            <p className="detalle-producto__aviso">
              Puedes consultar cuándo estará disponible nuevamente.
            </p>
          )}

          <p className="detalle-producto__nota">
            Nuestro equipo puede ayudarte con medidas, colores, disponibilidad y
            opciones de entrega.
          </p>

          <section className="detalle-producto__especificaciones">
            <h2>Especificaciones</h2>

            <dl>
              <div>
                <dt>Alto</dt>
                <dd>{producto.medidas.alto} cm</dd>
              </div>

              <div>
                <dt>Ancho</dt>
                <dd>{producto.medidas.ancho} cm</dd>
              </div>

              <div>
                <dt>Profundidad</dt>
                <dd>{producto.medidas.profundidad} cm</dd>
              </div>

              <div>
                <dt>Materiales</dt>
                <dd>{producto.materiales}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {imagenAmpliada && (
        <div
          ref={modalRef}
          className="detalle-producto__modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería ampliada de ${producto.nombre}`}
        >
          <button
            ref={botonCerrarRef}
            type="button"
            className="detalle-producto__modal-cerrar"
            onClick={() => setImagenAmpliada(false)}
            aria-label="Cerrar galería ampliada"
          >
            <X size={26} aria-hidden="true" />
          </button>

          {fotografias.length > 1 && (
            <button
              type="button"
              className="detalle-producto__modal-anterior"
              onClick={() => cambiarImagen(-1)}
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={30} aria-hidden="true" />
            </button>
          )}

          <img
            src={imagenSeleccionada}
            alt={`${producto.nombre}, fotografía ${indiceImagen + 1} ampliada`}
          />

          {fotografias.length > 1 && (
            <button
              type="button"
              className="detalle-producto__modal-siguiente"
              onClick={() => cambiarImagen(1)}
              aria-label="Fotografía siguiente"
            >
              <ChevronRight size={30} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default DetalleProducto;
