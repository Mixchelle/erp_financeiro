# ===== Builder =====
FROM node:20-alpine AS builder
WORKDIR /app

# Copia package.json e package-lock.json explicitamente
COPY package.json ./
COPY package-lock.json ./

# Instala usando o lock; se por algum motivo não existir, cai no install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY tsconfig*.json nest-cli.json ./
COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
RUN npm run build

# ===== Runner =====
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "node dist/main.js"]
