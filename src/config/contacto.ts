export const contacto = {
  whatsapp: "50581679980",
};

export function crearEnlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
