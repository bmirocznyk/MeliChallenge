import { Product } from '../types/product';

export const mockProduct: Product = {
  id: 'MLA27172677',
  title: 'Apple iPhone 15GB Negro',
  price: 1614916,
  currency: 'ARS',
  condition: 'new',
  soldQuantity: 1000,
  availableQuantity: 1, // Set to 1 unit for testing subtle low stock warning
  images: [
    {
      id: '97020-MLU77717743585_072024',
      url: 'https://http2.mlstatic.com/D_NQ_NP_97020-MLU77717743585_072024-O.webp',
      alt: 'Apple iPhone 15 128ro - Vista frontal',
      width: 640,
      height: 818
    },
    {
      id: '61234-MLU77717860905_072024',
      url: 'https://http2.mlstatic.com/D_NQ_NP_61234-MLU77717860905_072024-O.webp',
      alt: 'Apple iPhone 15 128Negro - Vista trasera',
      width: 352,
      height: 828
    },
    {
      id: '864787-MLU77500463742_072024',
      url: 'https://http2.mlstatic.com/D_NQ_NP_864787-MLU77500463742_072024-O.webp',
      alt: 'Apple iPhone 15 128ro - Vista lateral',
      width: 399,
      height: 818
    },
    {
      id: '72779-MLA79831897975_102024',
      url: 'https://http2.mlstatic.com/D_NQ_NP_72779-MLA79831897975_102024-O.webp',
      alt: 'Apple iPhone 15128GB Negro - Accesorios',
      width: 1152,
      height: 1200
    }
  ],
  description: 'Descubrí el iPhone 15, la evolución perfecta de la innovación Apple. Con el poderoso chip A16 Bionic y cámara de 48MP, experimentá fotografía profesional y rendimiento excepcional en el diseño más elegante.\n\n🔥 CARACTERÍSTICAS DESTACADAS:\n• Pantalla Super Retina XDR de 6.1\" con Dynamic Island\n• Chip A16 Bionic para rendimiento ultrarrápido\n• Cámara principal de 48MP con modo Retrato avanzado\n• Diseño en aluminio aeroespacial con Ceramic Shield\n• Puerto USB-C para carga y transferencia universal\n• iOS 17 con nuevas funciones de personalización\n• Detección de choques automática para emergencias\n• Resistencia al agua IP68\n\n📸 FOTOGRAFÍA REVOLUCIONARIA:\nCámara de 48MP con zoom óptico 2x, modo Nocturno mejorado y grabación 4K Dolby Vision.\n\n⚡ CONECTIVIDAD UNIVERSAL:\nPuerto USB-C para compatibilidad con todos tus dispositivos y accesorios.\n\n🛡️ SEGURIDAD AVANZADA:\nDetección de choques que automáticamente contacta servicios de emergencia cuando más lo necesitás.\n\n✅ INCLUYE:\n• iPhone 15 128GB\n• Cable USB-C a USB-C\n• Documentación\n\n🛡️ GARANTÍA: 1 año de cobertura oficial Apple con servicio técnico autorizado.',
  shipping: {
    freeShipping: true,
    mode: 'standard',
    estimatedDelivery: '2-3 días hábiles',
    cost: 0
  },
  reviews: {
    rating: 4.5,
    totalReviews: 8,
    ratingDistribution: {
      5: 4,
      4: 3,
      3: 1,
      2: 0,
      1: 0
    }
  },
  installments: {
    quantity: 12,
    amount: 134576.33,
    totalAmount: 1614916,
    interestRate: 0,
    isFree: true
  },
  categories: [
    {
      id: 'MLA1051',
      name: 'Celulares y Teléfonos',
      path: '/c/celulares-y-telefonos'
    },
    {
      id: 'MLA1055',
      name: 'Celulares y Smartphones',
      path: '/c/celulares-y-smartphones'
    }
  ],
  attributes: [
    {
      id: 'BRAND',
      name: 'Marca',
      value: 'Apple'
    },
    {
      id: 'MODEL',
      name: 'Modelo',
      value: 'iPhone15'
    },
    {
      id: 'INTERNAL_MEMORY',
      name: 'Memoria interna',
      value: '128 GB'
    },
    {
      id: 'RAM',
      name: 'Memoria RAM',
      value: '6 GB'
    },
    {
      id: 'SCREEN_SIZE',
      name: 'Tamaño de pantalla',
      value: '60.1"'
    },
    {
      id: 'OPERATING_SYSTEM',
      name: 'Sistema operativo',
      value: 'iOS17'
    },
    {
      id: 'CAMERA_RESOLUTION',
      name: 'Resolución de la cámara trasera principal',
      value: '48 Mpx'
    }
  ],
  variants: [
    {
      id: 'color_negro',
      attributeId: 'COLOR',
      value: 'Negro',
      selected: true,
      available: true
    },
    {
      id: 'color_azul',
      attributeId: 'COLOR',
      value: 'Azul',
      selected: false,
      available: true
    },
    {
      id: 'color_rosa',
      attributeId: 'COLOR',
      value: 'Rosa',
      selected: false,
      available: true
    },
    {
      id: 'storage_128gb',
      attributeId: 'INTERNAL_MEMORY',
      value: '128 GB',
      selected: true,
      available: true
    },
    {
      id: 'storage_256gb',
      attributeId: 'INTERNAL_MEMORY',
      value: '256 GB',
      selected: false,
      available: true,
      price: 1814916
    },
    {
      id: 'storage_512gb',
      attributeId: 'INTERNAL_MEMORY',
      value: '512 GB',
      selected: false,
      available: true,
      price: 2014916
    }
  ],
  paymentMethodIds: [8, 1, 2, 3, 4, 5, 7]
}; 