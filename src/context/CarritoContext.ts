import { createContext } from "react";
import type { ItemCarrito } from "../types/ItemCarrito";

interface CarritoContextValue {
  items: ItemCarrito[];
  agregarItem: (productoId: number, varianteId: number) => void;
  cambiarCantidad: (
    productoId: number,
    varianteId: number,
    cambio: number,
  ) => void;
  eliminarItem: (productoId: number, varianteId: number) => void;
}

export const CarritoContext = createContext<CarritoContextValue | undefined>(
  undefined,
);
