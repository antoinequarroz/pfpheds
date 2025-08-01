# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances système nécessaires pour le build
RUN apk add --no-cache python3 make g++ git

# Copier les fichiers de configuration
COPY package*.json ./

# Nettoyer et installer les dépendances avec force pour éviter les conflits
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install --force --legacy-peer-deps

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY ./nginx/nginx.front.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
