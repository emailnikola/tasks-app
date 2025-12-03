# --- Stage 1: Build Stage (Shared build for all microservices) ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run prisma_generate
RUN npm run build:all

# --- Stage 2: Production Stage (Runtime image) ---
FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/apps ./apps
COPY --from=build /app/generated ./generated
