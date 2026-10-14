import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import type { Ambiente } from "../../types/Ambiente";
import "./Ambientes.css";

interface AmbientesProps {
  ambientes: Ambiente[];
}

function Ambientes({ ambientes }: AmbientesProps) {
  const movimientoReducido = useReducedMotion();

  return (
    <section
      className="ambientes"
      id="ambientes"
      aria-labelledby="ambientes-titulo"
    >
      <div className="ambientes__encabezado">
        <span className="ambientes__etiqueta">Espacios para vivir</span>

        <h2 className="ambientes__titulo" id="ambientes-titulo">
          Cada espacio tiene su propia historia.
        </h2>

        <p className="ambientes__descripcion">
          Descubre muebles que combinan diseño, calidez y comodidad para
          transformar cada rincón de tu hogar.
        </p>
      </div>

      <div className="ambientes__grid">
        {ambientes.map((ambiente, index) => (
          <motion.article
            key={ambiente.id}
            id={ambiente.ancla}
            className="ambiente-card"
            initial={movimientoReducido ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              delay: movimientoReducido ? 0 : index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to={`/ambientes/${ambiente.ancla}`}
              className="ambiente-card__enlace"
              aria-label={`Explorar muebles para ${ambiente.nombre}`}
            >
              <div className="ambiente-card__visual">
                <motion.img
                  className="ambiente-card__imagen"
                  src={ambiente.imagen}
                  alt={`Ambiente de ${ambiente.nombre}`}
                  loading="lazy"
                  whileHover={movimientoReducido ? undefined : { scale: 1.06 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div className="ambiente-card__overlay" aria-hidden="true" />

                <span className="ambiente-card__numero">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="ambiente-card__contenido">
                  <div className="ambiente-card__texto">
                    <span className="ambiente-card__subtitulo">
                      R&M Mueblería
                    </span>

                    <h3>{ambiente.nombre}</h3>

                    <p>{ambiente.descripcion}</p>

                    <span className="ambiente-card__explorar">
                      Descubre este espacio
                    </span>
                  </div>

                  <span className="ambiente-card__flecha">
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Ambientes;
