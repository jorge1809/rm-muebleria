import type { Beneficio } from "../../types/Beneficio";
import "./Beneficios.css";

interface BeneficiosProps {
  beneficios: Beneficio[];
}

function Beneficios({ beneficios }: BeneficiosProps) {
  return (
    <section className="beneficios" aria-labelledby="beneficios-titulo">
      <div className="beneficios__encabezado">
        <span className="beneficios__etiqueta">Nuestra propuesta</span>
        <h2 className="beneficios__titulo" id="beneficios-titulo">
          Más que muebles, piezas para vivirlas.
        </h2>
      </div>
      <div className="beneficios__grid">
        {beneficios.map((beneficio) => (
          <article className="beneficio" key={beneficio.id}>
            <span className="beneficio__numero">{beneficio.numero}</span>
            <h3>{beneficio.titulo}</h3>
            <p>{beneficio.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Beneficios;
