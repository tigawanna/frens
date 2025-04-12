FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for Prisma Client (updated for Alpine 3.21)
RUN apk add --no-cache libc6-compat openssl

# Install dependencies (with caching)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --development

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run db:prod
RUN npm run build

# Production image, copy all files and run the app
FROM base AS runner

ENV NODE_ENV production

# Create app directory
WORKDIR /app

# Add a non-root user for security (Alpine way)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs expressjs
USER expressjs

# Copy built files
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=expressjs:nodejs /app/prisma ./prisma

# Expose port for the application
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
