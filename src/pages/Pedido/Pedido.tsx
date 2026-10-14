import type { ComponentProps } from "react";
import { Link } from "react-router";
import { productos } from "../../data/productos";
import { useCarrito } from "../../hooks/useCarrito";
import { useRef, useState } from "react";
import type { DatosPedido } from "../../types/DatosPedido";
import RevisionPedido from "../../components/RevisionPedido/RevisionPedido";
import "./Pedido.css";

type EventoFormulario = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

const moneda = new Intl.NumberFormat("es-NI", {
  style: "currency",
  currency: "NIO",
});

function Pedido() {
  const { items } = useCarrito();
  const [telefono, setTelefono] = useState("");
  const [entrega, setEntrega] = useState<"recogida" | "domicilio">("recogida");
  const [datosRevision, setDatosRevision] = useState<DatosPedido | null>(null);
  const formularioRef = useRef<HTMLFormElement>(null);
  const revisionRef = useRef<HTMLDivElement>(null);
  const lineas = items.flatMap((item) => {
    const producto = productos.find(
      (producto) => producto.id === item.productoId,
    );
    const variante = producto?.variantes.find(
      (variante) => variante.id === item.varianteId,
    );
    return producto && variante ? [{ ...item, producto, variante }] : [];
  });
  const subtotal = lineas.reduce(
    (total, linea) => total + linea.producto.precio * linea.cantidad,
    0,
  );

  function revisarPedido(event: EventoFormulario) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const campos = new FormData(formulario);
    const nombre = String(campos.get("nombre") ?? "").trim();
    const direccion = String(campos.get("direccion") ?? "").trim();
    const notas = String(campos.get("notas") ?? "").trim();

    const campoDireccion = formulario.elements.namedItem("direccion");
    if (
      entrega === "domicilio" &&
      !direccion &&
      campoDireccion instanceof HTMLTextAreaElement
    ) {
      campoDireccion.setCustomValidity(
        "Escribe una dirección; no solo espacios.",
      );
      campoDireccion.reportValidity();
      return;
    }

    setDatosRevision({
      nombre,
      telefono: `+505 ${telefono}`,
      entrega,
      direccion: entrega === "domicilio" ? direccion : "",
      notas,
    });
    requestAnimationFrame(() => {
      revisionRef.current?.focus();
    });
  }

  function editarDatos() {
    setDatosRevision(null);
    requestAnimationFrame(() => {
      formularioRef.current
        ?.querySelector<HTMLInputElement>("#pedido-nombre")
        ?.focus();
    });
  }
  return (
    <main className="pedido">
      <nav className="pedido__ruta" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link to="/carrito">Carrito</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Datos del pedido</span>
      </nav>
      <h1>Datos del pedido</h1>
      <p className="pedido__introduccion">
        {datosRevision
          ? "Revisa tus datos y los productos seleccionados."
          : "Completa tus datos para preparar la solicitud."}
      </p>

      {lineas.length === 0 ? (
        <section className="pedido__vacio">
          <h2>Primero agrega productos al carrito</h2>
          <p>Necesitamos saber qué muebles te interesan.</p>
          <Link className="pedido__enlace" to="/carrito">
            Volver al carrito →
          </Link>
        </section>
      ) : (
        <div className="pedido__grid">
          <form
            ref={formularioRef}
            className="pedido__formulario"
            hidden={datosRevision !== null}
            onSubmit={revisarPedido}
          >
            <fieldset className="pedido__grupo">
              <legend>Datos de contacto</legend>
              <div className="pedido__campo">
                <label htmlFor="pedido-nombre">Nombre completo</label>
                <input
                  id="pedido-nombre"
                  name="nombre"
                  autoComplete="name"
                  required
                  maxLength={100}
                  pattern=".*\S.*"
                  title="Escribe tu nombre; no puede contener solamente espacios."
                />
              </div>
              <div className="pedido__campo">
                <label htmlFor="pedido-telefono">Teléfono</label>
                <div className="pedido__telefono">
                  <span className="pedido__prefijo" aria-hidden="true">
                    +505
                  </span>
                  <input
                    id="pedido-telefono"
                    name="telefono"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={telefono}
                    onChange={(event) =>
                      setTelefono(
                        event.target.value.replace(/[^0-9]/g, "").slice(0, 8),
                      )
                    }
                    required
                    pattern="[0-9]{8}"
                    title="Escribe los 8 dígitos de tu teléfono."
                    aria-describedby="pedido-telefono-ayuda"
                  />
                </div>
                <small id="pedido-telefono-ayuda">
                  Nicaragua (+505). Escribe 8 dígitos, sin espacios.
                </small>
              </div>
            </fieldset>

            <fieldset className="pedido__grupo">
              <legend>Forma de entrega</legend>
              <label className="pedido__opcion">
                <input
                  type="radio"
                  name="entrega"
                  value="recogida"
                  checked={entrega === "recogida"}
                  onChange={() => setEntrega("recogida")}
                />
                Recoger en tienda
              </label>
              <label className="pedido__opcion">
                <input
                  type="radio"
                  name="entrega"
                  value="domicilio"
                  checked={entrega === "domicilio"}
                  onChange={() => setEntrega("domicilio")}
                />
                Entrega a domicilio
              </label>
              {entrega === "domicilio" && (
                <div className="pedido__campo">
                  <label htmlFor="pedido-direccion">
                    Dirección y referencias
                  </label>
                  <textarea
                    id="pedido-direccion"
                    name="direccion"
                    autoComplete="street-address"
                    required
                    maxLength={500}
                    rows={4}
                    onChange={(event) =>
                      event.currentTarget.setCustomValidity("")
                    }
                  />
                </div>
              )}
              <p className="pedido__nota">
                La disponibilidad y el costo de entrega se confirmarán con un
                asesor.
              </p>
            </fieldset>

            <div className="pedido__campo">
              <label htmlFor="pedido-notas">Notas adicionales (opcional)</label>
              <textarea
                id="pedido-notas"
                name="notas"
                rows={3}
                maxLength={500}
              />
            </div>
            <button className="pedido__boton" type="submit">
              Revisar pedido
            </button>
            <p className="pedido__nota">
              Esta es una vista previa. Todavía no se enviará ningún pedido.
            </p>
          </form>
          {datosRevision && (
            <div
              ref={revisionRef}
              className="pedido__panel-revision"
              tabIndex={-1}
              role="region"
              aria-labelledby="revision-titulo"
            >
              <RevisionPedido datos={datosRevision} onEditar={editarDatos} />
            </div>
          )}
          <aside
            className="pedido__resumen"
            aria-labelledby="pedido-resumen-titulo"
          >
            <h2 id="pedido-resumen-titulo">Tu selección</h2>
            <ul className="pedido__productos">
              {lineas.map((linea) => (
                <li key={`${linea.productoId}-${linea.varianteId}`}>
                  <img src={linea.producto.imagen} alt="" loading="lazy" />
                  <div>
                    <h3>{linea.producto.nombre}</h3>
                    <p>
                      {linea.variante.color} · Cantidad: {linea.cantidad}
                    </p>
                    <strong>
                      {moneda.format(linea.producto.precio * linea.cantidad)}
                    </strong>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="pedido__totales">
              <div>
                <dt>Subtotal</dt>
                <dd>{moneda.format(subtotal)}</dd>
              </div>
              <div>
                <dt>Modalidad</dt>
                <dd>
                  {entrega === "recogida" ? "Recoger en tienda" : "Domicilio"}
                </dd>
              </div>
              <div>
                <dt>Entrega</dt>
                <dd>Por confirmar</dd>
              </div>
            </dl>
            <Link className="pedido__enlace" to="/carrito">
              ← Editar carrito
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Pedido;
