import type { DatosPedido } from "../../types/DatosPedido";

interface RevisionPedidoProps {
  datos: DatosPedido;
  onEditar: () => void;
}

function RevisionPedido({ datos, onEditar }: RevisionPedidoProps) {
  return (
    <section className="pedido__revision" aria-labelledby="revision-titulo">
      <h2 id="revision-titulo">Revisa tus datos</h2>
      <p>Comprueba tus datos y los productos del resumen antes de continuar.</p>
      <dl className="pedido__datos">
        <div>
          <dt>Nombre</dt>
          <dd>{datos.nombre}</dd>
        </div>
        <div>
          <dt>Teléfono</dt>
          <dd>{datos.telefono}</dd>
        </div>
        <div>
          <dt>Forma de entrega</dt>
          <dd>
            {datos.entrega === "recogida"
              ? "Recoger en tienda"
              : "Entrega a domicilio"}
          </dd>
        </div>
        {datos.entrega === "domicilio" && (
          <div>
            <dt>Dirección y referencias</dt>
            <dd>{datos.direccion}</dd>
          </div>
        )}
        {datos.notas && (
          <div>
            <dt>Notas adicionales</dt>
            <dd>{datos.notas}</dd>
          </div>
        )}
      </dl>
      <div className="pedido__acciones">
        <button className="pedido__boton" type="button" disabled>
          Solicitar pedido — próximamente
        </button>
        <button
          className="pedido__boton pedido__boton--secundario"
          type="button"
          onClick={onEditar}
        >
          Corregir mis datos
        </button>
      </div>
      <p className="pedido__nota">
        Vista previa del pedido. Todavía no se ha enviado ninguna solicitud.
      </p>
    </section>
  );
}

export default RevisionPedido;
