import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { articulosInspiracion } from "../../data/articulosInspiracion";
import "./Inspiracion.css";

function Inspiracion() {
  return (
    <section
      className="inspiracion"
      id="inspiracion"
      aria-labelledby="inspiracion-titulo"
    >
      <header className="inspiracion__encabezado">
        <span className="inspiracion__etiqueta">Inspiración</span>

        <h2 className="inspiracion__titulo" id="inspiracion-titulo">
          Ideas para hacer de tu espacio algo único.
        </h2>

        <p>Consejos e ideas para crear ambientes que reflejen tu estilo.</p>
      </header>

      <div className="inspiracion__grid">
        {articulosInspiracion.map((articulo) => (
          <article className="inspiracion-card" key={articulo.id}>
            <div className="inspiracion-card__imagen">
              <img src={articulo.imagen} alt="" loading="lazy" />
            </div>

            <div className="inspiracion-card__contenido">
              <h3>{articulo.titulo}</h3>
              <p>{articulo.descripcion}</p>

              <Link
                to={`/inspiracion/${articulo.slug}`}
                className="inspiracion-card__enlace"
              >
                Leer más
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Inspiracion;
