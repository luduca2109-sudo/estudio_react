# --- ETAPA 1: Compilación ---
# Cambiamos: FROM node:18-alpine AS builder o node:20-alpine
FROM public.ecr.aws/docker/library/node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- ETAPA 2: Servidor de Producción ---
# Cambiamos: FROM nginx:1.25-alpine
FROM public.ecr.aws/docker/library/nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]