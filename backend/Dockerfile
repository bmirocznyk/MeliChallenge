# Etapa 1: Build
FROM node:22.17-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src

RUN yarn build

# Etapa 2: Producción
FROM node:22.17-alpine

RUN corepack enable

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock* ./
COPY --from=builder /app/dist ./dist
COPY src/infrastructure/database ./src/infrastructure/database

RUN yarn install --frozen-lockfile --production

ENV PORT=3001
EXPOSE 3001

CMD ["yarn", "start"] 