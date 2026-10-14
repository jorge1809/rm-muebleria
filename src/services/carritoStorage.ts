import type { ItemCarrito } from "../types/ItemCarrito";
import { productos } from "../data/productos";

const CLAVE_CARRITO = "muebleria.carrito.v1";

function esItemCarrito(valor: unknown): valor is ItemCarrito {
  if (typeof valor !== "object" || valor === null) return false;
  const item = valor as Record<string, unknown>;
  return (
    typeof item.productoId === "number" &&
    Number.isInteger(item.productoId) &&
    typeof item.varianteId === "number" &&
    Number.isInteger(item.varianteId) &&
    typeof item.cantidad === "number" &&
    Number.isSafeInteger(item.cantidad) &&
    item.cantidad > 0
  );
}

export function cargarCarrito(): ItemCarrito[] {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    if (!guardado) return [];
    const datos: unknown = JSON.parse(guardado);
    if (!Array.isArray(datos)) return [];

    const items: ItemCarrito[] = [];
    for (const dato of datos) {
      if (!esItemCarrito(dato)) continue;
      const producto = productos.find(
        (producto) => producto.id === dato.productoId,
      );
      const variante = producto?.variantes.find(
        (variante) => variante.id === dato.varianteId,
      );
      if (!variante || variante.stock <= 0) continue;

      const existente = items.find(
        (item) =>
          item.productoId === dato.productoId &&
          item.varianteId === dato.varianteId,
      );
      if (existente) {
        existente.cantidad = Math.min(
          existente.cantidad + dato.cantidad,
          variante.stock,
        );
      } else {
        items.push({
          productoId: dato.productoId,
          varianteId: dato.varianteId,
          cantidad: Math.min(dato.cantidad, variante.stock),
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export function guardarCarrito(items: ItemCarrito[]): void {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  } catch {
    console.warn("No se pudo guardar el carrito en el navegador.");
  }
}
