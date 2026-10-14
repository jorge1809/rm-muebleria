import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "react-router";
import "./Header.css";

const enlaces = [
  { href: "/#ambientes", texto: "Ambientes" },
  { href: "/#catalogo", texto: "Colecciones" },
  { href: "/#contacto", texto: "Contacto" },
];

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const botonMenuRef = useRef<HTMLButtonElement>(null);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <>
      <div className="announcement">
        <p>Diseño y comodidad para cada espacio de tu hogar.</p>
      </div>

      <header
        className="header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuAbierto) {
            cerrarMenu();
            botonMenuRef.current?.focus();
          }
        }}
      >
        <div className="header__contenido">
          <Link
            className="header__logo"
            to="/"
            aria-label="R y M Mueblería, volver al inicio"
            onClick={cerrarMenu}
          >
            <span className="header__marca" aria-hidden="true">
              <span className="header__marca-iniciales">
                R<span className="header__marca-amp">&amp;</span>M
              </span>
              <span className="header__marca-nombre">MUEBLERÍA</span>
            </span>
          </Link>

          <nav className="header__nav" aria-label="Navegación principal">
            {enlaces.map((enlace) => (
              <Link key={enlace.href} to={enlace.href}>
                {enlace.texto}
              </Link>
            ))}
          </nav>

          <button
            ref={botonMenuRef}
            className="header__menu-boton"
            type="button"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            {menuAbierto ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        <nav
          className="menu-movil"
          id="menu-movil"
          aria-label="Navegación móvil"
          hidden={!menuAbierto}
        >
          {enlaces.map((enlace) => (
            <Link key={enlace.href} to={enlace.href} onClick={cerrarMenu}>
              {enlace.texto}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

export default Header;
