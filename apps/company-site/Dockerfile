FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Install dependencies (for the entire monorepo)
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/company-site/package.json ./apps/company-site/package.json
COPY packages/db/package.json ./packages/db/package.json
RUN pnpm install --frozen-lockfile

# Production build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build:1

# Production image
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/company-site/public ./public
COPY --from=builder /app/apps/company-site/.next/standalone ./
COPY --from=builder /app/apps/company-site/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
