import { useEffect, useState } from "react";
import { cargarCarrito, guardarCarrito } from "../services/carritoStorage";
import type { ReactNode } from "react";
import type { ItemCarrito } from "../types/ItemCarrito";
import { productos } from "../data/productos";
import { CarritoContext } from "./CarritoContext";

interface CarritoProviderProps {
  children: ReactNode;
}

function obtenerStock(productoId: number, varianteId: number) {
  const producto = productos.find((producto) => producto.id === productoId);
  return (
    producto?.variantes.find((variante) => variante.id === varianteId)?.stock ??
    0
  );
}

function CarritoProvider({ children }: CarritoProviderProps) {
  const [items, setItems] = useState<ItemCarrito[]>(cargarCarrito);

  useEffect(() => {
    guardarCarrito(items);
  }, [items]);

  function agregarItem(productoId: number, varianteId: number) {
    const stock = obtenerStock(productoId, varianteId);
    if (stock <= 0) return;

    setItems((actuales) => {
      const existente = actuales.find(
        (item) =>
          item.productoId === productoId && item.varianteId === varianteId,
      );
      if (!existente) {
        return [...actuales, { productoId, varianteId, cantidad: 1 }];
      }
      if (existente.cantidad >= stock) return actuales;

      return actuales.map((item) =>
        item.productoId === productoId && item.varianteId === varianteId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      );
    });
  }

  function cambiarCantidad(
    productoId: number,
    varianteId: number,
    cambio: number,
  ) {
    if (cambio !== 1 && cambio !== -1) return;
    const stock = obtenerStock(productoId, varianteId);

    setItems((actuales) =>
      actuales.map((item) => {
        if (item.productoId !== productoId || item.varianteId !== varianteId) {
          return item;
        }
        const cantidad = item.cantidad + cambio;
        return cantidad >= 1 && cantidad <= stock
          ? { ...item, cantidad }
          : item;
      }),
    );
  }

  function eliminarItem(productoId: number, varianteId: number) {
    setItems((actuales) =>
      actuales.filter(
        (item) =>
          !(item.productoId === productoId && item.varianteId === varianteId),
      ),
    );
  }

  return (
    <CarritoContext.Provider
      value={{ items, agregarItem, cambiarCantidad, eliminarItem }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
