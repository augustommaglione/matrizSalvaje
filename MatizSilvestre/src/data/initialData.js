export const INITIAL_PRODUCTS = [
  {
    id: 'home-spray-200ml',
    name: 'Home Spray y Textil',
    volume: '200 ml',
    tagline: 'Esencia pura para ambientes y tejidos',
    price: 8500,
    category: 'Ambientación & Textil',
    badge: 'Best Seller',
    description:
      'Formulación botánica artesanal diseñada para vestir el aire y tus textiles más preciados con una bruma sutil y persistente sin manchar.',
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    fragrances: [
      {
        id: 'f-hs-1',
        name: 'Vainilla Bourbon & Caramelo Tostado',
        family: 'Gourmand Cálido',
        notes: 'Notas de vainilla de Madagascar, toque de azúcar morena y fondo amaderado cálido.'
      },
      {
        id: 'f-hs-2',
        name: 'Lavanda Silvestre & Eucalipto',
        family: 'Herbal Relajante',
        notes: 'Lavanda francesa silvestre, hojas de eucalipto fresco y rocío matutino.'
      },
      {
        id: 'f-hs-3',
        name: 'Higo Negro & Maderas Nobles',
        family: 'Frutal Amaderado',
        notes: 'Hojas verdes de higuera, fruto maduro, savia y cedro atlántico.'
      },
      {
        id: 'f-hs-4',
        name: 'Jazmín Blanco & Flores de Azahar',
        family: 'Floral Puro',
        notes: 'Corazón de pétalos blancos, jazmín del país y chispas de neroli.'
      }
    ]
  },
  {
    id: 'difusor-colgante-8ml',
    name: 'Difusor Colgante Tradicional',
    volume: '8 ml',
    tagline: 'Aromaterapia portátil para auto o placard',
    price: 4200,
    category: 'Difusores',
    badge: 'Esencial',
    description:
      'Frasco compacto de vidrio templado con tapa de madera porosa que absorbe y difunde los aceites esenciales de forma continua y gradual.',
    image:
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop',
    fragrances: [
      {
        id: 'f-dc-1',
        name: 'Cítricos Silvestres & Bergamota',
        family: 'Cítrico Energizante',
        notes: 'Cáscaras de limón de Amalfi, bergamota italiana y hojas de menta crujiente.'
      },
      {
        id: 'f-dc-2',
        name: 'Sándalo Suave & Ámbar',
        family: 'Amaderado Oriental',
        notes: 'Resina de ámbar dorado, madera de sándalo pulida y un toque sutil de almizcle blanco.'
      },
      {
        id: 'f-dc-3',
        name: 'Té Verde & Bambú del Alba',
        family: 'Fresco Zen',
        notes: 'Hojas de té matcha, tallos de bambú joven y flor de loto cristalina.'
      }
    ]
  },
  {
    id: 'gema-difusor-10ml',
    name: 'Gema Difusor Colgante',
    volume: '10 ml',
    tagline: 'Joya aromática facetada con cordel trenzado',
    price: 5600,
    category: 'Edición Joya',
    badge: 'Exclusivo',
    description:
      'Inspirada en el corte de una piedra preciosa. Su diseño facetado refracta la luz mientras aromatiza con distinción tu vehículo o armario personal.',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    fragrances: [
      {
        id: 'f-gd-1',
        name: 'Rosa de Damasco & Oud Imperial',
        family: 'Floral Amaderado',
        notes: 'Pétalos aterciopelados de rosa búlgara, maderas orientales ahumadas y cuero fino.'
      },
      {
        id: 'f-gd-2',
        name: 'Pera Silvestre & Fresias Blancas',
        family: 'Frutal Cristalino',
        notes: 'Pera william crocante envuelta en bouquet floral blanco y base de pachulí suave.'
      },
      {
        id: 'f-gd-3',
        name: 'Cardamomo & Cedro Ahumado',
        family: 'Especiado Elegante',
        notes: 'Semillas de cardamomo verde, corteza de cedro de Virginia y benjuí noble.'
      }
    ]
  }
];

export const BRAND_INFO = {
  name: 'Matiz Silvestre',
  subname: 'Perfumería de Autor',
  whatsappNumber: '5491123456789', // Configurable por el usuario
  whatsappDisplay: '+54 9 11 2345-6789',
  instagram: 'matizsilvestre.ar',
  instagramUrl: 'https://instagram.com',
  email: 'contacto@matizsilvestre.com',
  location: 'Buenos Aires, Argentina',
  tagline: 'Aromas que visten tus espacios con la serenidad de lo natural.'
};
