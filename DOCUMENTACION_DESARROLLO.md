# Documentación del Proyecto: Prototipo de Página de Detalle de Producto (Inspirado en MercadoLibre)

## Índice
1. [Introducción](#introducción)
2. [Objetivo del Proyecto](#objetivo-del-proyecto)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Endpoints Implementados](#endpoints-implementados)
5. [Tests Unitarios](#tests-unitarios)
6. [Diagrama de Objetos y Arquitectura](#diagrama-de-objetos-y-arquitectura)
7. [Reflexión Personal: Decisiones de Diseño y Desafíos](#reflexion-personal-decisiones-de-diseno-y-desafios)

---

## Introducción
Este proyecto es un prototipo de una página de detalle de producto inspirado en MercadoLibre. Simula la experiencia de usuario y la arquitectura de una aplicación real de e-commerce, incluyendo frontend (React + Vite + Tailwind CSS) y backend (Node.js + Express + TypeScript)

## Objetivo del Proyecto
- Simular la experiencia de compra y visualización de productos.
- Practicar separación de responsabilidades y buenas prácticas.
- Implementar una arquitectura escalable y mantenible.

## Estructura de Carpetas
```
Chall/
  backend/
    src/
      application/         # Casos de uso (lógica de negocio)
      domain/              # Entidades y contratos (interfaces)
      infrastructure/      # Implementaciones concretas (acceso a datos, JSON)
      interfaces/          # Controladores y rutas HTTP
      server.ts            # Servidor principal backend
      purchase-server.ts   # Servidor de compras
    package.json
    ...
  src/
    components/           # Componentes React
    services/             # Servicios para consumir la API
    types/                # Tipos TypeScript
    App.tsx
    main.tsx
    ...
  public/
    product-images/       # Imágenes de productos
    payment-icons/        # Íconos de métodos de pago
  package.json
  ...
```

## Endpoints Implementados

### Backend principal (`server.ts` en puerto 3001)

| Método | Ruta                                      | Descripción                                      |
|--------|-------------------------------------------|--------------------------------------------------|
| GET    | `/api/health`                             | Health check del backend                         |
| GET    | `/api/products/:id`                       | Obtener detalle de producto por ID                |
| GET    | `/api/products/:id/comments`              | Obtener comentarios y resumen de reviews          |
| GET    | `/api/products/:id/with-payment-methods`  | Producto + métodos de pago disponibles            |
| GET    | `/api/payment-methods`                    | Listar todos los métodos de pago                  |
| GET    | `/api/payment-methods/by-ids?ids=1,2,3`   | Métodos de pago filtrados por IDs                 |
| GET    | `/api/sellers/:id`                        | Obtener información de vendedor por ID            |

### Servicio de compras (`purchase-server.ts` en puerto 3002)

| Método | Ruta              | Descripción                                 |
|--------|-------------------|---------------------------------------------|
| GET    | `/api/health`     | Health check del servicio de compras        |
| POST   | `/api/purchase`   | Realizar una compra de producto             |

### Notas sobre los endpoints
- Todos los endpoints devuelven datos en formato JSON.
- El endpoint raíz (`/`) del backend principal lista los endpoints implementados.
- El servicio de compras está separado para simular una arquitectura de microservicios.

## Tests Unitarios
- Se implementaron tests unitarios para los casos de uso, controladores y repositorios principales del backend utilizando Vitest.
- Los tests cubren flujos exitosos, validaciones, manejo de errores y casos límite.
- La cobertura de código supera el 80%, cumpliendo con los requisitos del desafío.
- Los tests se encuentran organizados en la carpeta `backend/src/__tests__/` y pueden ejecutarse con:
  ```bash
  npm run test
  npm run test:coverage
  ```

## Diagrama de Objetos y Arquitectura
- El backend sigue una arquitectura hexagonal (puertos y adaptadores), separando claramente dominio, aplicación, infraestructura e interfaces.
- Los objetos principales son:
  - **Product**: representa el producto y sus atributos.
  - **Seller**: información del vendedor.
  - **Comment**: comentarios y reviews de productos.
  - **PaymentMethod**: métodos de pago disponibles.
- Las relaciones entre objetos se dan principalmente a través de los repositorios y casos de uso, que orquestan la obtención y persistencia de datos.
- El flujo típico es: _Controlador_ → _Caso de Uso_ → _Repositorio (acceso a JSON)_ → _Respuesta al usuario_.
- Esta estructura facilita el testing, el mantenimiento y la futura migración a una base de datos real.