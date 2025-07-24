# MercadoLibre Challenge

Este proyecto es una aplicación fullstack desarrollada como desafío técnico. Incluye:

- **Frontend**: React + Vite (puerto 5173)
- **Backend Productos**: Node.js/TypeScript/Express (puerto 3001)
- **Backend Compras**: Node.js/TypeScript/Express (puerto 3002)

---

## Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Levantamiento de Servicios y Puertos](#levantamiento-de-servicios-y-puertos)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
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

### 1. Instalación de dependencias

Desde la raíz del proyecto:

```bash
npm install
cd backend
npm install
cd ..
```

### 2. Levantar los servicios en modo desarrollo

#### Backend de productos (API principal)

```bash
cd backend
PORT=3001 npm run dev
```
Accede a: [http://localhost:3001](http://localhost:3001)

#### Backend de compras

En otra terminal:

```bash
cd backend
PURCHASE_PORT=3002 npm run purchase
```
Accede a: [http://localhost:3002](http://localhost:3002)

#### Frontend

En la raíz del proyecto:

```bash
npm run dev
```
Accede a: [http://localhost:5173](http://localhost:5173)

### 3. Variables de entorno

- El backend de productos usa por defecto el puerto `3001` (`PORT`).
- El backend de compras usa por defecto el puerto `3002` (`PURCHASE_PORT`).
- El frontend usa el puerto `5173`.

Puedes modificar estos valores en los scripts de inicio o en los archivos de configuración.

---

## Levantamiento de Servicios y Puertos

| Servicio             | Comando de inicio                | Puerto por defecto | URL de acceso                  |
|----------------------|----------------------------------|--------------------|-------------------------------|
| Backend Productos    | `npm run dev` (en `/backend`)    | 3001               | http://localhost:3001         |
| Backend Compras      | `npm run purchase` (en `/backend`)| 3002               | http://localhost:3002         |
| Frontend             | `npm run dev` (en raíz)          | 5173               | http://localhost:5173         |


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

---

## Docker y Docker Compose

### Levantar todo con Docker Compose

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up --build
```

Esto levantará:

- **Frontend** en [http://localhost:5173](http://localhost:5173)
- **Backend Productos** en [http://localhost:3001](http://localhost:3001)
- **Backend Compras** en [http://localhost:3002](http://localhost:3002)

### Comandos útiles

- Levantar ambos servicios: `docker-compose up --build`
- Detener: `docker-compose down`

---

## Créditos y documentación adicional

- Decisiones de diseño: [DECISIONES_DE_DISENIO.md](./DECISIONES_DE_DISENIO.md)
- Documentación de desarrollo: [DOCUMENTACION_DESARROLLO.md](./DOCUMENTACION_DESARROLLO.md)

--- 