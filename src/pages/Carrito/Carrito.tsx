import { Link } from "react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { productos } from "../../data/productos";
import { useCarrito } from "../../hooks/useCarrito";
import "./Carrito.css";

const moneda = new Intl.NumberFormat("es-NI", {
  style: "currency",
  currency: "NIO",
});

function Carrito() {
  const { items, cambiarCantidad, eliminarItem } = useCarrito();

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

  return (
    <main className="carrito">
      <nav className="carrito__ruta" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Carrito</span>
      </nav>

      <h1>Tu carrito</h1>

      {lineas.length === 0 ? (
        <section
          className="carrito__vacio"
          aria-labelledby="carrito-vacio-titulo"
        >
          <ShoppingCart size={48} aria-hidden="true" />

          <h2 id="carrito-vacio-titulo">Tu carrito está vacío</h2>

          <p>
            Explora nuestras categorías y encuentra muebles para tu espacio.
          </p>

          <a className="carrito__boton" href="/#catalogo">
            Explorar catálogo →
          </a>
        </section>
      ) : (
        <div className="carrito__grid">
          <section aria-label="Productos del carrito">
            {lineas.map((linea) => (
              <article
                className="carrito-item"
                key={`${linea.productoId}-${linea.varianteId}`}
              >
                <Link to={`/productos/${linea.productoId}`}>
                  <img
                    className="carrito-item__imagen"
                    src={linea.producto.imagen}
                    alt={linea.producto.nombre}
                    loading="lazy"
                  />
                </Link>

                <div className="carrito-item__contenido">
                  <h2>
                    <Link to={`/productos/${linea.productoId}`}>
                      {linea.producto.nombre}
                    </Link>
                  </h2>

                  <p>Color: {linea.variante.color}</p>

                  <p>Precio unitario: {moneda.format(linea.producto.precio)}</p>

                  <div className="carrito-item__cantidad">
                    <button
                      type="button"
                      aria-label={`Reducir cantidad de ${linea.producto.nombre}, ${linea.variante.color}`}
                      disabled={linea.cantidad <= 1}
                      onClick={() =>
                        cambiarCantidad(linea.productoId, linea.varianteId, -1)
                      }
                    >
                      <Minus size={18} aria-hidden="true" />
                    </button>

                    <span aria-label="Cantidad">{linea.cantidad}</span>

                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${linea.producto.nombre}, ${linea.variante.color}`}
                      disabled={linea.cantidad >= linea.variante.stock}
                      onClick={() =>
                        cambiarCantidad(linea.productoId, linea.varianteId, 1)
                      }
                    >
                      <Plus size={18} aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    className="carrito-item__eliminar"
                    type="button"
                    aria-label={`Eliminar ${linea.producto.nombre}, ${linea.variante.color}`}
                    onClick={() =>
                      eliminarItem(linea.productoId, linea.varianteId)
                    }
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    Eliminar
                  </button>
                </div>

                <p className="carrito-item__subtotal">
                  {moneda.format(linea.producto.precio * linea.cantidad)}
                </p>
              </article>
            ))}

            <a className="carrito__continuar" href="/#catalogo">
              ← Continuar explorando
            </a>
          </section>

          <aside className="carrito__resumen" aria-labelledby="resumen-titulo">
            <h2 id="resumen-titulo">Resumen del pedido</h2>

            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{moneda.format(subtotal)}</dd>
              </div>

              <div>
                <dt>Entrega</dt>
                <dd>Por confirmar</dd>
              </div>

              <div className="carrito__total">
                <dt>Total de productos</dt>
                <dd aria-live="polite">{moneda.format(subtotal)}</dd>
              </div>
            </dl>

            <Link className="carrito__boton" to="/pedido">
              Continuar con el pedido →
            </Link>

            <p>El costo de entrega todavía no está incluido.</p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Carrito;
