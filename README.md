# E-commerce Challenge

Este proyecto es una aplicación de e-commerce fullstack desarrollada como desafío técnico. Incluye un backend en Node.js/TypeScript y un frontend en React/Vite.

---

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Decisiones de Diseño](#decisiones-de-diseño)
- [Docker y Docker Compose](#docker-y-docker-compose)
- [Créditos](#créditos)

---

## Características
- Catálogo de productos con imágenes y descripciones.
- Visualización de métodos de pago.
- Detalle de producto, comentarios y reviews.
- Simulación de compra.
- Backend desacoplado con casos de uso y repositorios.
- Pruebas unitarias y de integración.

## Requisitos
- Node.js >= 18.x
- npm >= 9.x
- (Opcional) Docker y Docker Compose

## Instalación y Ejecución

### Modo local (desarrollo)

1. Instala dependencias del frontend y backend:
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```
2. Ejecuta el backend:
   ```bash
   cd backend
   PORT=3001 npm run dev
   ```
   El backend corre en [http://localhost:3001](http://localhost:3001)

3. Ejecuta el frontend:
   ```bash
   npm run dev
   ```
   El frontend corre en [http://localhost:5173](http://localhost:5173)

### Modo producción con Docker Compose (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Desde la raíz del proyecto, ejecuta:
   ```bash
   docker-compose up --build
   ```
3. Accede a:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend Productos: [http://localhost:3001](http://localhost:3001)
   - Backend Compras: [http://localhost:3002](http://localhost:3002)

## Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
cd backend
npm run test
```

## Estructura del Proyecto
```
Chall/
  backend/           # Backend Node.js/TypeScript
    src/
      application/   # Casos de uso
      domain/        # Interfaces de dominio
      infrastructure/# Implementaciones (JSON, etc)
      interfaces/    # Controladores y rutas
  src/               # Frontend React
    components/      # Componentes UI
    services/        # Lógica de acceso a API
    types/           # Tipos TypeScript
public/              # Imágenes y assets
```

## Decisiones de Diseño
 [DECISIONES_DE_DISENIO.md](./DECISIONES_DE_DISENIO.md) y [DOCUMENTACION_DESARROLLO.md](./DOCUMENTACION_DESARROLLO.md).

## Docker y Docker Compose

- El backend de productos se expone en el puerto 3001.
- El backend de compras se expone en el puerto 3002.
- El frontend se expone en el puerto 5173.
- Puedes modificar los puertos en `docker-compose.yml` si lo necesitas.

### Comandos útiles
- Levantar ambos servicios: `docker-compose up --build`
- Detener: `docker-compose down`
