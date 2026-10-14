export interface VarianteProducto {
  id: number;
  color: string;
  colorHex: string;
  stock: number;
}

export interface MedidasProducto {
  alto: number;
  ancho: number;
  profundidad: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  // Ambientes donde puede utilizarse el producto
  ambienteIds: number[];
  precio: number;
  imagen: string;
  galeria: string[];
  materiales: string;
  medidas: MedidasProducto;
  variantes: VarianteProducto[];
}
