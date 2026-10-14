import "./Contacto.css";
import { crearEnlaceWhatsApp } from "../../config/contacto";

function Contacto() {
  return (
    <section
      className="contacto"
      id="contacto"
      aria-labelledby="contacto-titulo"
    >
      <div className="contacto__contenido">
        <span className="contacto__etiqueta">Estamos para ayudarte</span>

        <h2 className="contacto__titulo" id="contacto-titulo">
          ¿Necesitas ayuda para elegir?
        </h2>

        <p className="contacto__descripcion">
          Nuestro equipo puede orientarte para encontrar muebles que se adapten
          a tu espacio, estilo y necesidades.
        </p>
        <a
          className="contacto__boton"
          href={crearEnlaceWhatsApp(
            "Hola, quisiera asesoría para elegir muebles para mi espacio.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contactar un asesor
        </a>
      </div>

      <div className="contacto__visual">
        <img src="/productos/mesa-roble.webp" alt="Mesa Roble" loading="lazy" />
      </div>
    </section>
  );
}

export default Contacto;
