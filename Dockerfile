# Use a imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Imagem de produção
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Copia os arquivos necessários da etapa de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Instala apenas as dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Expõe a porta da aplicação
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "server.js"]