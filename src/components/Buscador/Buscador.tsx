import { useId } from "react";
import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import "./Buscador.css";

interface BuscadorProps {
  consultaInicial?: string;
  enfocar?: boolean;
  onBuscar?: () => void;
}

type EventoFormulario = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

function Buscador({
  consultaInicial = "",
  enfocar = false,
  onBuscar,
}: BuscadorProps) {
  const inputId = useId();
  const navigate = useNavigate();

  function buscar(event: EventoFormulario) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const consulta = String(datos.get("q") ?? "").trim();
    if (!consulta) return;
    const parametros = new URLSearchParams({ q: consulta });
    navigate(`/buscar?${parametros.toString()}`);
    onBuscar?.();
  }

  return (
    <form className="buscador" role="search" onSubmit={buscar}>
      <label className="buscador__etiqueta" htmlFor={inputId}>
        Buscar muebles
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        placeholder="Buscar muebles…"
        defaultValue={consultaInicial}
        autoFocus={enfocar}
        maxLength={100}
        required
      />
      <button type="submit" aria-label="Buscar productos">
        <Search size={20} aria-hidden="true" />
      </button>
    </form>
  );
}

export default Buscador;
