import { Link, useSearchParams } from "react-router";
import { productos } from "../../data/productos";
import { categoriasProducto } from "../../data/categoriasProducto";
import ProductoCard from "../../components/ProductoCard/ProductoCard";
import "./Buscar.css";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function Buscar() {
  const [parametros] = useSearchParams();
  const consulta = (parametros.get("q") ?? "").trim();
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  const resultados =
    palabras.length === 0
      ? []
      : productos.filter((producto) =>
          palabras.every((palabra) =>
            normalizar(producto.nombre).includes(palabra),
          ),
        );

  return (
    <main className="buscar">
      <nav className="buscar__ruta" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Resultados de búsqueda</span>
      </nav>
      <header className="buscar__encabezado">
        <h1>
          {consulta
            ? `Resultados para “${consulta}”`
            : "Explora nuestros muebles"}
        </h1>
        <p role="status">
          {consulta
            ? `${resultados.length} ${resultados.length === 1 ? "producto encontrado" : "productos encontrados"}.`
            : "Busca desde el Header o elige una categoría."}
        </p>
      </header>
      {resultados.length > 0 ? (
        <div className="buscar__grid">
          {resultados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              nombreCategoria={
                categoriasProducto.find(
                  (categoria) => categoria.id === producto.categoriaId,
                )?.nombre ?? "Muebles"
              }
            />
          ))}
        </div>
      ) : (
        <section className="buscar__vacio">
          <h2>
            {consulta ? "Prueba con otra búsqueda" : "Explora por categoría"}
          </h2>
          {consulta && (
            <p>
              No encontramos coincidencias. Prueba con “silla”, “mesa” o “sofá”.
            </p>
          )}
          <div className="buscar__categorias">
            {categoriasProducto.map((categoria) => (
              <Link key={categoria.id} to={`/catalogo/${categoria.slug}`}>
                {categoria.nombre} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Buscar;
