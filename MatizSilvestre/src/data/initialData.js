import fotoHs200ml from '../assets/images/Hs_200ml.jpg';
import fotoDifusorColgante from '../assets/images/Dc_8ml.jpg';
import fotoGemaDifusor from '../assets/images/Gd_10ml.jpg';

export const INITIAL_PRODUCTS = [
  {
    id: 'home-spray-200ml',
    name: 'Home Spray y Textil',
    volume: '200 ml',
    tagline: 'Esencia para ambientes y tejidos',
    price: 10000,
    discountPercent: 15,
    wholesalePrice: 7000,
    wholesaleMinQty: 6,
    category: 'Ambientación & Textil',
    hasColorSelection: true,
    colorOptions: ['Gatillo Dorado', 'Gatillo Plateado'],
    description:
      'Formulación botánica artesanal diseñada para vestir el aire y tus textiles más preciados con una bruma sutil y persistente sin manchar.',
    image:
      fotoHs200ml,
    imageAlt:
      'Home Spray y Textil Matiz Silvestre de 200 ml con gatillo dorado',
    fragrances: [
      {
        id: 'f-hs-1',
        name: 'Citrus',
        family: 'Cítrica',
        stock: false,
        notes: 'Notas frescas, volátiles y chispeantes de limón, bergamota, pomelo y lima.'
      },
      {
        id: 'f-hs-9',
        name: 'Bambú',
        family: 'Herbal Limpio',
        stock: true,
        notes: 'Vegetal, herbal limpio y ligeramente húmedo, asociado al aire libre y la naturaleza.'
      },
      {
        id: 'f-hs-10',
        name: 'Coniglio',
        family: 'Floral-Blanca',
        stock: true,
        notes: 'Notas de flor de azahar, rosa suave, lavanda y un fondo de almizcle limpio.'
      },
      {
        id: 'f-hs-8',
        name: 'Chicle',
        family: 'Dulce-Frutal',
        stock: true,
        notes: 'Notas intensas de tutti-frutti, fresa/frutilla y vainillina.'
      },
      {
        id: 'f-hs-11',
        name: 'Jazmin',
        family: 'Floral',
        stock: true,
        notes: 'Perfil opulento, dulce, envolvente e intenso.'
      },
      {
        id: 'f-hs-12',
        name: 'Naranja & Pimienta',
        family: 'Cítrica especiada',
        stock: true,
        notes: 'Notas frescas y dulces de la naranja con el toque seco,calido y picante de la pimienta.'
      }
    ]
  },
  {
    id: 'difusor-colgante-8ml',
    name: 'Difusor Colgante Tradicional',
    volume: '8 ml',
    tagline: 'Aroma portátil para auto o placard',
    price: 5000,
    discountPercent: 15,
    wholesalePrice: 3450,
    wholesaleMinQty: 10,
    category: 'Difusores colgantes',
    description:
      'Frasco compacto de vidrio templado con tapa de madera y un hilo dorado que absorbe y difunde la fragancia de forma continua y gradual.',
    image:
      fotoDifusorColgante,
    imageAlt:
      'Difusor colgante tradicional Matiz Silvestre de 8 ml con tapa de madera e hilo dorado',
    fragrances: [
      {
        id: 'f-dc-1',
        name: 'Citrus',
        family: 'Cítrica',
        stock: true,
        notes: 'Notas frescas, volátiles y chispeantes de limón, bergamota, pomelo y lima.'
      },
      {
        id: 'f-dc-2',
        name: 'Hawai',
        family: 'Fruta tropical',
        stock: true,
        notes: 'Notas tropicales y frescas de ananá, melón ,coco y una brisa marina.'
      },
      {
        id: 'f-dc-3',
        name: 'Lavanda',
        family: 'Herbal Floral',
        stock: true,
        notes: 'Perfil medicinal, limpio y relajante.'
      },
      {
        id: 'f-dc-4',
        name: 'Maderas de Oriente',
        family: 'Amaderada Oriental',
        stock: true,
        notes: 'Notas profundas, secas y cálidas de sándalo, cedro, pachulí, incienso y especias exóticas.'
      },
      {
        id: 'f-dc-5',
        name: 'Vainilla & Coco',
        family: 'Gourmand Oriental',
        stock: true,
        notes: 'Notas dulces y cálidas de la vainilla con la cremosidad del fruto del coco'
      },
      {
        id: 'f-dc-6',
        name: 'Mango & Maracuyá',
        family: 'Fruta Tropical',
        stock: true,
        notes: 'Notas tropicales, ácidas, vibrantes y frecas del mango y del maracuyá.'
      },
      {
        id: 'f-dc-7',
        name: 'Frutos Rojos',
        family: 'Frutos del Bosque',
        stock: true,
        notes: 'Notas dulces y ácidas simultáneamente, dominadas por acordes de mora, frambuesa, arándano y frutilla silvestre.'
      },
      {
        id: 'f-dc-8',
        name: 'Chicle',
        family: 'Dulce-Frutal',
        stock: true,
        notes: 'Notas intensas de tutti-frutti, fresa/frutilla y vainillina.'
      }
    ]
  },
  {
    id: 'gema-difusor-10ml',
    name: 'Gema Difusor Colgante',
    volume: '10 ml',
    tagline: 'Gema aromática portatil para auto o placard',
    price: 5800,
    discountPercent: 15,
    wholesalePrice: 3800,
    wholesaleMinQty: 10,
    hasStoneSelection: true,
    category: 'Gema Difusores colgantes',
    description:
      'Inspirada en el corte de una piedra preciosa. Su diseño facetado refracta la luz mientras aromatiza con distinción tu vehículo o armario personal.',
    image:
      fotoGemaDifusor,
    imageAlt:
      'Gema difusor colgante Matiz Silvestre de 10 ml con diseño facetado',
    fragrances: [
      {
        id: 'f-gd-1',
        name: 'Citrus',
        family: 'Cítrica',
        stock: true,
        notes: 'Notas frescas, volátiles y chispeantes de limón, bergamota, pomelo y lima.'
      },
      {
        id: 'f-gd-3',
        name: 'Lavanda',
        family: 'Herbal Floral',
        stock: true,
        notes: 'Perfil medicinal, limpio y relajante.'
      },
      {
        id: 'f-gd-4',
        name: 'Maderas de Oriente',
        family: 'Amaderada Oriental',
        stock: true,
        notes: 'Notas profundas, secas y cálidas de sándalo, cedro, pachulí, incienso y especias exóticas.'
      },
      {
        id: 'f-gd-5',
        name: 'Vainilla & Coco',
        family: 'Gourmand Oriental',
        stock: true,
        notes: 'Notas dulces y cálidas de la vainilla con la cremosidad del fruto del coco'
      },
      {
        id: 'f-gd-6',
        name: 'Mango & Maracuyá',
        family: 'Fruta Tropical',
        stock: true,
        notes: 'Notas tropicales, ácidas, vibrantes y frecas del mango y del maracuyá.'
      },
      {
        id: 'f-gd-7',
        name: 'Frutos Rojos',
        family: 'Frutos del Bosque',
        stock: true,
        notes: 'Notas dulces y ácidas simultáneamente, dominadas por acordes de mora, frambuesa, arándano y frutilla silvestre.'
      },
      {
        id: 'f-gd-8',
        name: 'Chicle',
        family: 'Dulce-Frutal',
        stock: true,
        notes: 'Notas intensas de tutti-frutti, fresa/frutilla y vainillina.'
      }
    ]
  }
];

export const BRAND_INFO = {
  name: 'Matiz Silvestre',
  subname: 'Perfumería Artesanal',
  whatsappNumber: '5493513314890',
  whatsappDisplay: '+54 9 351 331-4890',
  location: 'Córdoba, Argentina',
  tagline: 'Aromas que visten tus espacios con la serenidad de lo natural.'
};

// Tipos de piedra disponibles para las Gemas Difusor.
export const GEMA_STONES = [
  {
    name: 'Amatista',
    description: 'Transforma las energías negativas en positivas y amorosas.'
  },
  {
    name: 'Cuarzo Azul',
    description: 'Favorece la comunicación, calma la mente y alivia el miedo.'
  },
  {
    name: 'Cuarzo Rosa',
    description: 'Piedra de amor incondicional y paz infinita.'
  },
  {
    name: 'Jaspe Rojo',
    description: 'Ayuda a aterrizar las energías, limpia y estabiliza el aura.'
  }
];
