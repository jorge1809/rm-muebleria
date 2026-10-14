import { rutaPublica } from "../utils/rutaPublica";
import type { CategoriaProducto } from "../types/CategoriaProducto";

export const categoriasProducto: CategoriaProducto[] = [
  {
    id: 1,
    nombre: "Sofás",
    slug: "sofas",
    imagen: rutaPublica("/productos/sofa-oslo.webp"),
    tituloEditorial: "Comodidad que transforma tus espacios.",
    descripcion:
      "Descubre sofás que combinan diseño contemporáneo, confort y personalidad para crear una sala que se sienta verdaderamente tuya.",
  },
  {
    id: 2,
    nombre: "Mesas",
    slug: "mesas",
    imagen: rutaPublica("/productos/mesa-roble.webp"),
    tituloEditorial: "El punto de encuentro de cada hogar.",
    descripcion:
      "Desde reuniones familiares hasta momentos cotidianos, encuentra mesas que aportan calidez, equilibrio y estilo a tus espacios.",
  },
  {
    id: 3,
    nombre: "Camas",
    slug: "camas",
    imagen: rutaPublica("/productos/cama-queen.webp"),
    tituloEditorial: "El descanso comienza con un buen diseño.",
    descripcion:
      "Explora camas pensadas para crear dormitorios acogedores, donde la comodidad y el estilo se encuentran.",
  },
  {
    id: 4,
    nombre: "Sillas",
    slug: "sillas",
    imagen: rutaPublica("/productos/silla-nordica.webp"),
    tituloEditorial: "Cada asiento tiene su propia historia.",
    descripcion:
      "Diseños que acompañan conversaciones, reuniones y momentos especiales, con la combinación perfecta de comodidad y personalidad.",
  },
];
