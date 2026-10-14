export interface SeccionInspiracion {
  id: number;
  titulo: string;
  texto: string;
  imagen?: string;
  imagenAlt?: string;
  consejo?: string;
}

export interface ArticuloInspiracion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  slug: string;
  categoriaSlug: string;
  introduccion: string;
  etiquetas: string[];
  cita?: string;
  secciones: SeccionInspiracion[];
  imagenColeccion?: string;
}
