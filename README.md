# MercadoLibre Frontend - Samsung Galaxy A55 Product Page

Este proyecto es una implementación frontend que replica la página de detalle de producto de MercadoLibre, específicamente para el Samsung Galaxy A55 128GB 8GB Awesome Lemon.

## Tecnologías Utilizadas

- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Herramienta de construcción rápida y moderna
- **Tailwind CSS**: Framework de CSS utilitario
- **Lucide React**: Iconos SVG modernos
- **Node.js 22.17**: Runtime JavaScript
- **Yarn**: Gestor de paquetes con Corepack

## Características Implementadas

### ✅ Componentes Principales
- **Header**: Barra de navegación con logo, búsqueda y menú
- **Breadcrumb**: Navegación de categorías
- **Gallery**: Galería de imágenes interactiva con thumbnails
- **ProductInfo**: Información del producto, condición, reseñas y variantes
- **PriceSection**: Precio, cuotas, cantidad y botones de compra
- **SellerInfo**: Información y reputación del vendedor
- **ProductAttributes**: Características técnicas del producto

### ✅ Funcionalidades
- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Galería de imágenes interactiva con navegación
- Selector de variantes (color y memoria)
- Selector de cantidad con validaciones
- Información de envío y métodos de pago
- Reseñas y calificaciones del producto
- Información detallada del vendedor

### ✅ Datos del Producto
- Información completa del Samsung Galaxy A55
- Imágenes reales del producto desde MercadoLibre
- Precios y opciones de financiamiento
- Características técnicas detalladas
- Variantes de color y almacenamiento

## Instalación y Ejecución

### Prerrequisitos
- **Node.js 22.17** (recomendado usar nvm para gestión de versiones)
- **Yarn** (habilitado mediante `corepack enable`)
- **Git** para clonar el repositorio

### Configuración del Entorno

1. **Configurar Node.js con nvm**
   ```bash
   # Instalar y usar Node.js 22.17
   nvm install 22.17
   nvm use 22.17
   
   # Verificar la versión
   node --version  # Debería mostrar v22.17.x
   ```

2. **Habilitar Corepack para Yarn**
   ```bash
   corepack enable
   ```

### Pasos para Ejecutar

1. **Clonar el repositorio** (si aplica)
   ```bash
   git clone <repository-url>
   cd ml-cloud-challenge
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   yarn dev
   ```
   La aplicación se abrirá automáticamente en `http://localhost:3000`

4. **Construir para producción**
   ```bash
   yarn build
   ```

5. **Previsualizar build de producción**
   ```bash
   yarn preview
   ```

6. **Linting y verificación de código**
   ```bash
   yarn lint
   ```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `yarn dev` | Inicia el servidor de desarrollo |
| `yarn build` | Construye la aplicación para producción |
| `yarn preview` | Previsualiza el build de producción |
| `yarn lint` | Ejecuta ESLint para verificar el código |

## Estructura del Proyecto

```
ml-cloud-challenge/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Gallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── PriceSection.tsx
│   │   ├── SellerInfo.tsx
│   │   └── ProductAttributes.tsx
│   ├── types/               # Tipos TypeScript
│   │   └── product.ts
│   ├── data/               # Datos mock
│   │   └── mockProduct.ts
│   ├── App.tsx             # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── public/                # Archivos estáticos
├── index.html            # HTML base
├── package.json         # Dependencias y scripts
├── vite.config.ts       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
└── run.md              # Este archivo
```

## Diseño y Estilo

El proyecto utiliza Tailwind CSS para replicar fidedignamente el diseño de MercadoLibre:

- **Colores**: Esquema de colores oficial de MercadoLibre
  - Amarillo: `#FFE600` (ml-yellow)
  - Azul: `#3483FA` (ml-blue)
  - Verde: `#00A650` (ml-green)
  - Naranja: `#FF6600` (ml-orange)
- **Tipografía**: Fuente Inter con pesos variados (300, 400, 500, 600, 700)
- **Componentes**: Cards, botones y elementos UI que coinciden con el diseño original
- **Responsive**: Diseño mobile-first optimizado para todos los dispositivos

## Datos Mock

El archivo `src/data/mockProduct.ts` contiene datos reales extraídos del producto Samsung Galaxy A55 de MercadoLibre:

- ✅ Información completa del producto
- ✅ URLs reales de imágenes desde CDN de MercadoLibre
- ✅ Variantes de color y almacenamiento
- ✅ Información detallada del vendedor
- ✅ Precios y opciones de financiamiento
- ✅ Características técnicas completas
- ✅ Sistema de reseñas y calificaciones

## Funcionalidades Interactivas

### 1. **Galería de Imágenes**
- Navegación con flechas izquierda/derecha
- Selección directa por thumbnails
- Imágenes responsive con aspect ratio correcto
- Transiciones suaves entre imágenes

### 2. **Selector de Variantes**
- Cambio dinámico de color del producto
- Selección de capacidad de almacenamiento
- Estados visuales activos e inactivos
- Compatibilidad con diferentes variantes

### 3. **Control de Cantidad**
- Botones de incremento/decremento
- Validaciones basadas en stock disponible
- Prevención de valores inválidos
- Feedback visual del stock restante

### 4. **Navegación y UX**
- Breadcrumb funcional con categorías
- Header completo con búsqueda
- Links navegables a categorías
- Diseño responsive en todos los dispositivos

## Optimizaciones Técnicas

- ⚡ **Vite**: Build tool moderno para desarrollo rápido
- 🎯 **TypeScript**: Tipado estático para mayor robustez
- 🎨 **Tailwind CSS**: Estilos utilitarios para desarrollo ágil
- 📱 **Mobile-first**: Diseño responsive desde móvil hacia desktop
- 🔧 **ESLint**: Linting configurado para mantener calidad de código
- ⚛️ **React 18**: Últimas características de React

## Próximas Mejoras

### Backend Integration
- [ ] Integración con API REST
- [ ] Gestión de estados con Context API o Zustand
- [ ] Carga dinámica de productos

### Funcionalidades Adicionales
- [ ] Carrito de compras funcional
- [ ] Sistema de favoritos persistente
- [ ] Modal de imágenes con zoom
- [ ] Sección de reseñas expandidas
- [ ] Productos relacionados y recomendaciones
- [ ] Sistema de filtros avanzados

### Performance y SEO
- [ ] Server-Side Rendering (SSR) con Next.js
- [ ] Optimización de imágenes con lazy loading
- [ ] Meta tags dinámicos para SEO
- [ ] Progressive Web App (PWA)

## Solución de Problemas

### Error: "corepack command not found"
```bash
# Instalar corepack globalmente
npm install -g corepack
corepack enable
```

### Error: "yarn command not found"
```bash
# Verificar que corepack esté habilitado
corepack enable
# O instalar yarn globalmente
npm install -g yarn
```

### Problemas con Node.js
```bash
# Verificar versión de Node
node --version
# Cambiar a la versión correcta con nvm
nvm use 22.17
```

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## Licencia

Este proyecto es parte de un challenge técnico y está disponible para propósitos educativos y de demostración. 