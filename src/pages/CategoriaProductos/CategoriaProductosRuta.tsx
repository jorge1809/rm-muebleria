import { useParams } from "react-router";

import { categoriasProducto } from "../../data/categoriasProducto";
import { productos } from "../../data/productos";

import CategoriaProductos from "./CategoriaProductos";
import PaginaNoEncontrada from "../../components/PaginaNoEncontrada/PaginaNoEncontrada";
import SEO from "../../components/SEO/SEO";

function CategoriaProductosRuta() {
  const { slug } = useParams();

  const categoria = categoriasProducto.find(
    (categoria) => categoria.slug === slug,
  );

  if (!categoria) {
    return (
      <PaginaNoEncontrada
        tipo="COLECCIONES"
        titulo="No encontramos esta colección"
        descripcion="Parece que esta colección no está disponible. Pero todavía hay mucho por descubrir. Explora nuestros muebles y encuentra inspiración para cada espacio de tu hogar."
      />
    );
  }

  const productosCategoria = productos.filter(
    (producto) => producto.categoriaId === categoria.id,
  );

  const tituloSEO = `${categoria.nombre} para tu hogar`;

  const descripcionSEO =
    `Explora nuestra colección de ${categoria.nombre.toLowerCase()} ` +
    `en R&M Mueblería. Descubre diferentes diseños, materiales y estilos. ` +
    `Consulta precios y disponibilidad por WhatsApp.`;

  return (
    <>
      <SEO titulo={tituloSEO} descripcion={descripcionSEO} />

      <CategoriaProductos
        titulo={categoria.nombre}
        descripcion={categoria.descripcion}
        etiqueta="Nuestra colección"
        productos={productosCategoria}
        nombreCategoria={() => categoria.nombre}
        tituloEditorial={categoria.tituloEditorial}
        imagenPortada={categoria.imagen}
      />
    </>
  );
}

export default CategoriaProductosRuta;
