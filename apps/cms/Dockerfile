FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Install dependencies (for the entire monorepo)
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/package.json
COPY packages/db/package.json ./packages/db/package.json
RUN pnpm install --frozen-lockfile

# Development image
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["pnpm", "--filter", "cms", "dev"]

# Production build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build:2

# Production image
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy built app (assuming Next.js standalone output)
COPY --from=builder /app/apps/cms/public ./public
COPY --from=builder /app/apps/cms/.next/standalone ./
COPY --from=builder /app/apps/cms/.next/static ./.next/static

EXPOSE 3001
CMD ["node", "server.js"]
