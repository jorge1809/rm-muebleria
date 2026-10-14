import type { ArticuloInspiracion } from "../types/ArticuloInspiracion";

export const articulosInspiracion: ArticuloInspiracion[] = [
  {
    id: 1,
    titulo: "Cómo elegir el sofá ideal para tu sala",
    descripcion: "Encuentra el equilibrio entre comodidad, tamaño y diseño.",
    imagen: "/inspiracion/sala.webp",
    slug: "como-elegir-sofa",
    categoriaSlug: "sofas",

    introduccion:
      "Elegir un sofá es una de las decisiones más importantes al amueblar una sala. Además de su apariencia, debemos considerar el espacio disponible, la comodidad y el uso que tendrá diariamente.",

    etiquetas: ["Comodidad", "Espacio", "Diseño", "Materiales"],

    cita: "El sofá ideal combina comodidad, funcionalidad y personalidad.",

    secciones: [
      {
        id: 1,
        titulo: "Considera el espacio disponible",
        texto:
          "Antes de comprar, mide el lugar donde colocarás el sofá. Deja suficiente espacio para caminar y procura que sus dimensiones mantengan una proporción equilibrada con los demás muebles.",
        imagen: "/inspiracion/sofa-espacio.webp",
        imagenAlt: "Sofá ubicado en una sala con espacio de circulación",
        consejo:
          "Mide también puertas, pasillos y accesos para comprobar que el sofá pueda ingresar a tu hogar.",
      },
      {
        id: 2,
        titulo: "Elige colores que combinen con tu hogar",
        texto:
          "Los tonos neutros son una opción versátil porque combinan con diferentes estilos de decoración. Puedes agregar personalidad mediante cojines, alfombras y otros accesorios.",
        imagen: "/inspiracion/sofa-colores.webp",
        imagenAlt: "Cojines y textiles en tonos neutros sobre un sofá",
      },
      {
        id: 3,
        titulo: "Valora los materiales y la limpieza",
        texto:
          "Finalmente, considera los materiales y la facilidad de limpieza. Un sofá adecuado debe responder tanto a tus necesidades prácticas como a tus preferencias de diseño.",
        imagen: "/inspiracion/sofa-materiales.webp",
        imagenAlt: "Muestras de tejidos y tapizados para sofás",
        consejo:
          "Consulta los cuidados recomendados para cada tipo de tapizado antes de elegir.",
      },
    ],

    imagenColeccion: "/productos/sofa-oslo.webp",
  },

  {
    id: 2,
    titulo: "Ideas para un comedor acogedor",
    descripcion: "Descubre cómo crear un espacio para compartir.",
    imagen: "/inspiracion/comedor.webp",
    slug: "comedor-acogedor",
    categoriaSlug: "mesas",

    introduccion:
      "El comedor es un espacio para compartir conversaciones, reuniones y momentos especiales. Su diseño debe favorecer tanto la comodidad como la convivencia.",

    etiquetas: ["Comedor", "Convivencia", "Materiales", "Iluminación"],

    cita: "Un comedor acogedor invita a compartir mucho más que una comida.",

    secciones: [
      {
        id: 1,
        titulo: "Encuentra la mesa adecuada",
        texto:
          "Selecciona una mesa adecuada al tamaño de la habitación y al número de personas que la utilizarán. Las mesas redondas pueden facilitar la conversación en espacios pequeños.",
        consejo:
          "Deja espacio suficiente alrededor de la mesa para retirar las sillas cómodamente.",
      },
      {
        id: 2,
        titulo: "Combina comodidad y materiales",
        texto:
          "Combina la mesa con sillas cómodas y materiales que armonicen con el resto de la decoración. La madera y los tonos cálidos ayudan a crear una atmósfera acogedora.",
      },
      {
        id: 3,
        titulo: "Cuida la iluminación",
        texto:
          "Una iluminación bien distribuida puede transformar el ambiente. Considera una lámpara sobre la mesa y elementos decorativos sencillos que no dificulten la conversación.",
      },
    ],

    imagenColeccion: "/productos/mesa-roble.webp",
  },

  {
    id: 3,
    titulo: "Crea un dormitorio de ensueño",
    descripcion:
      "Combina texturas, iluminación y muebles para descansar mejor.",
    imagen: "/inspiracion/dormitorio.webp",
    slug: "dormitorio-ensueno",
    categoriaSlug: "camas",

    introduccion:
      "El dormitorio debe ser un espacio que favorezca el descanso y transmita tranquilidad. Para lograrlo, conviene priorizar la comodidad y evitar una decoración excesivamente recargada.",

    etiquetas: ["Descanso", "Dormitorio", "Texturas", "Organización"],

    cita: "Un dormitorio bien diseñado convierte el descanso en parte de tu bienestar cotidiano.",

    secciones: [
      {
        id: 1,
        titulo: "Elige una cama proporcionada",
        texto:
          "La cama es el elemento principal. Elige un tamaño que se adapte a la habitación y permita mantener zonas de circulación cómodas.",
        consejo:
          "Comprueba las medidas de la cama y del colchón antes de decidirte.",
      },
      {
        id: 2,
        titulo: "Crea una atmósfera tranquila",
        texto:
          "Los colores suaves, las texturas naturales y la iluminación cálida contribuyen a crear una atmósfera relajante. Puedes combinarlos con mesas de noche y accesorios funcionales.",
      },
      {
        id: 3,
        titulo: "Organiza cada espacio",
        texto:
          "Mantener el orden también forma parte del diseño. Los muebles con almacenamiento ayudan a aprovechar mejor el espacio y conservar una apariencia armoniosa.",
      },
    ],

    imagenColeccion: "/productos/cama-queen.webp",
  },
];
