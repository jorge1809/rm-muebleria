import Hero from "../../components/Hero/Hero";
import Ambientes from "../../components/Ambientes/Ambientes";
import CatalogoCategorias from "../../components/CatalogoCategorias/CatalogoCategorias";
import Inspiracion from "../../components/Inspiracion/Inspiracion";
import Beneficios from "../../components/Beneficios/Beneficios";
import Contacto from "../../components/Contacto/Contacto";
import { ambientes } from "../../data/ambientes";
import { categoriasProducto } from "../../data/categoriasProducto";
import { beneficios } from "../../data/beneficios";
import SEO from "../../components/SEO/SEO";

function Inicio() {
  return (
    <main>
      <SEO
        titulo="Muebles para tu hogar"
        descripcion="Explora muebles para sala, comedor y dormitorio en R&M Mueblería. Descubre nuestras colecciones y consulta disponibilidad por WhatsApp."
      />
      <Hero />
      <Ambientes ambientes={ambientes} />
      <CatalogoCategorias categorias={categoriasProducto} />
      <Inspiracion />
      <Beneficios beneficios={beneficios} />
      <Contacto />
    </main>
  );
}

export default Inicio;
