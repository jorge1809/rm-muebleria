import { ArrowUpRight } from "lucide-react";
import { rutaPublica } from "../../utils/rutaPublica";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__visual">
        <img
          className="hero__imagen"
          src={rutaPublica("/hero-sala.png")}
          alt="Sala moderna y luminosa con sofá gris, mesa de centro y decoración cálida"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__contenido">
        <span className="hero__etiqueta">
          <span className="hero__etiqueta-linea" aria-hidden="true" />
          DISEÑO PARA TU HOGAR
        </span>

        <h1 className="hero__titulo" id="hero-titulo">
          Diseña un hogar
          <span> que se sienta tuyo.</span>
        </h1>

        <p className="hero__descripcion">
          Descubre muebles que combinan diseño, comodidad y personalidad para
          transformar cada espacio de tu hogar.
        </p>

        <a className="hero__boton" href="#catalogo">
          Explorar muebles
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>

        <div className="hero__detalle">
          <span className="hero__detalle-linea" aria-hidden="true" />
          <p>Espacios pensados para vivirlos.</p>
        </div>
      </div>

      <div className="hero__imagen-etiqueta">
        <span>R&M MUEBLERÍA</span>
        <span>Vive tu espacio</span>
      </div>
    </section>
  );
}

export default Hero;
