# --- ETAPA 1: Compilación ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y compilamos el sitio
COPY . .
RUN npm run build

# --- ETAPA 2: Servidor de Producción ---
FROM nginx:1.25-alpine

# Copiamos el resultado de la compilación de la etapa anterior al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para el tráfico web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]