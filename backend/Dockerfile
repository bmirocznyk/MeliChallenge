# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY src/infrastructure/database ./src/infrastructure/database

RUN npm ci --omit=dev

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"] 