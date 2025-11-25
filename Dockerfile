# Node.js base
FROM node:20-alpine AS base

# Backend builder
FROM base AS backend-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npx prisma generate
RUN npm run build

# Frontend builder
FROM base AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Copy backend
COPY --from=backend-builder /app/server/dist ./server/dist
COPY --from=backend-builder /app/server/node_modules ./server/node_modules
COPY --from=backend-builder /app/server/package.json ./server/
COPY --from=backend-builder /app/server/prisma ./server/prisma

# Copy frontend build
COPY --from=frontend-builder /app/dist ./client

# Install serve to host frontend
RUN npm install -g serve

# Expose ports
EXPOSE 3001 5173

# Start script
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]
