import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import type { Producto } from "../../types/Producto";
import "./ProductoCard.css";

interface ProductoCardProps {
  producto: Producto;
  nombreCategoria: string;
}

const formatoPrecio = new Intl.NumberFormat("es-NI", {
  style: "currency",
  currency: "NIO",
});

function ProductoCard({ producto, nombreCategoria }: ProductoCardProps) {
  return (
    <article className="producto-card">
      <Link
        className="producto-card__enlace"
        to={`/productos/${producto.id}`}
        aria-label={`Ver detalles de ${producto.nombre}`}
      >
        <div className="producto-card__visual">
          <img
            className="producto-card__imagen"
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
          />
        </div>

        <div className="producto-card__contenido">
          <div className="producto-card__datos">
            <span className="producto-card__categoria">{nombreCategoria}</span>

            <h3 className="producto-card__nombre">{producto.nombre}</h3>

            <p className="producto-card__precio">
              {formatoPrecio.format(producto.precio)}
            </p>
          </div>

          <span className="producto-card__accion" aria-hidden="true">
            <ArrowUpRight size={22} strokeWidth={1.7} />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProductoCard;
