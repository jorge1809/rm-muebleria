import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollAlInicio() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      return;
    }

    let frame = 0;
    let intentos = 0;
    const maxIntentos = 30;

    let id: string;

    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }

    const desplazar = () => {
      const elemento = document.getElementById(id);

      if (!elemento) {
        if (intentos < maxIntentos) {
          intentos += 1;
          frame = requestAnimationFrame(desplazar);
        }

        return;
      }

      // Obtener la altura real del Header.
      const header = document.querySelector<HTMLElement>(".header");

      const alturaHeader = header?.getBoundingClientRect().height ?? 0;

      // Calcular la posición absoluta de la sección.
      const posicionElemento =
        elemento.getBoundingClientRect().top + window.scrollY;

      // Sin separación adicional.
      const posicionFinal = Math.max(0, posicionElemento - alturaHeader);

      // Desplazamiento suave con respeto a la accesibilidad.
      window.scrollTo({
        top: posicionFinal,
        left: 0,
        behavior: movimientoReducido ? "instant" : "smooth",
      });
    };

    frame = requestAnimationFrame(desplazar);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash, key]);

  return null;
}

export default ScrollAlInicio;
