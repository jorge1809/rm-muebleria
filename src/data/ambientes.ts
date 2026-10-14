import { rutaPublica } from "../utils/rutaPublica";
import type { Ambiente } from "../types/Ambiente";

export const ambientes: Ambiente[] = [
  {
    id: 1,
    nombre: "Sala",
    descripcion: "Espacios pensados para compartir y descansar.",
    imagen: rutaPublica("/productos/sofa-oslo.webp"),
    ancla: "sala",
  },
  {
    id: 2,
    nombre: "Comedor",
    descripcion: "Diseños para convertir cada comida en un encuentro.",
    imagen: rutaPublica("/productos/mesa-roble.webp"),
    ancla: "comedor",
  },
  {
    id: 3,
    nombre: "Dormitorio",
    descripcion: "Calma, comodidad y diseño para tu descanso.",
    imagen: rutaPublica("/productos/cama-queen.webp"),
    ancla: "dormitorio",
  },
];
