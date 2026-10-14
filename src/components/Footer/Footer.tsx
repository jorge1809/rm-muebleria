import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contenido">
        <div className="footer__marca">
          <a
            className="footer__logo"
            href="#"
            aria-label="Mueblería: volver al inicio"
          >
            Mueblería
          </a>
          <p>
            Muebles contemporáneos para crear espacios cómodos, funcionales y
            con personalidad.
          </p>
        </div>
        <details className="footer__grupo" open>
          <summary>Comprar</summary>
          <nav className="footer__columna" aria-label="Comprar">
            <a href="/#sala">Sala</a>
            <a href="/#comedor">Comedor</a>
            <a href="/#dormitorio">Dormitorio</a>
            <a href="/#catalogo">Catálogo</a>
          </nav>
        </details>
        <details className="footer__grupo" open>
          <summary>Ayuda</summary>
          <div className="footer__columna">
            <a href="/#contacto">Contacto</a>
            <span>Preguntas frecuentes — próximamente</span>
            <span>Entregas — próximamente</span>
          </div>
        </details>
        <details className="footer__grupo" open>
          <summary>Información</summary>
          <div className="footer__columna">
            <span>Managua, Nicaragua</span>
            <span>Privacidad — próximamente</span>
            <span>Términos y condiciones — próximamente</span>
          </div>
        </details>
      </div>
      <div className="footer__inferior">
        <p>
          © {new Date().getFullYear()} Mueblería. Todos los derechos reservados.
        </p>
        <p>Managua, Nicaragua</p>
      </div>
    </footer>
  );
}

export default Footer;
