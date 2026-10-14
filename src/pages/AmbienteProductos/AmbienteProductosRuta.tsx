import { useParams } from "react-router";

import { ambientes } from "../../data/ambientes";
import { productos } from "../../data/productos";
import { categoriasProducto } from "../../data/categoriasProducto";

import CategoriaProductos from "../CategoriaProductos/CategoriaProductos";
import PaginaNoEncontrada from "../../components/PaginaNoEncontrada/PaginaNoEncontrada";
import SEO from "../../components/SEO/SEO";

const contenidoEditorial: Record<
  string,
  { titulo: string; descripcion: string }
> = {
  sala: {
    titulo: "Espacios para compartir momentos inolvidables.",
    descripcion:
      "Descubre sofás, mesas y muebles que combinan diseño, comodidad y calidez para crear una sala que se sienta verdaderamente tuya.",
  },
  comedor: {
    titulo: "Donde cada encuentro se convierte en un recuerdo.",
    descripcion:
      "Explora mesas, sillas y muebles pensados para disfrutar cada comida y compartir momentos especiales.",
  },
  dormitorio: {
    titulo: "Tu espacio personal para descansar y renovar energías.",
    descripcion:
      "Encuentra muebles que combinan tranquilidad, funcionalidad y estilo para crear el dormitorio que imaginas.",
  },
};

function AmbienteProductosRuta() {
  const { slug } = useParams();

  const ambiente = ambientes.find((ambiente) => ambiente.ancla === slug);

  if (!ambiente) {
    return (
      <PaginaNoEncontrada
        tipo="AMBIENTES"
        titulo="No encontramos este ambiente"
        descripcion="El ambiente que buscas no está disponible. Explora nuestros espacios y descubre muebles para tu hogar."
      />
    );
  }

  const productosAmbiente = productos.filter((producto) =>
    producto.ambienteIds.includes(ambiente.id),
  );

  const contenido = contenidoEditorial[ambiente.ancla];

  const tituloSEO = `Muebles para ${ambiente.nombre.toLowerCase()}`;

  const descripcionSEO =
    `Explora muebles para ${ambiente.nombre.toLowerCase()} ` +
    `en R&M Mueblería. Descubre diseños, precios y disponibilidad.`;

  function obtenerNombreCategoria(categoriaId: number): string {
    return (
      categoriasProducto.find((categoria) => categoria.id === categoriaId)
        ?.nombre ?? "Muebles"
    );
  }

  return (
    <>
      <SEO titulo={tituloSEO} descripcion={descripcionSEO} />

      <CategoriaProductos
        titulo={ambiente.nombre}
        descripcion={contenido?.descripcion ?? ambiente.descripcion}
        etiqueta="Explora por ambiente"
        productos={productosAmbiente}
        nombreCategoria={(producto) =>
          obtenerNombreCategoria(producto.categoriaId)
        }
        tituloEditorial={contenido?.titulo}
        imagenPortada={ambiente.imagen}
      />
    </>
  );
}

export default AmbienteProductosRuta;
