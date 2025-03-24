FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/company-site/package.json ./apps/company-site/
COPY packages/db/package.json ./packages/db/
RUN pnpm install

# Production build
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/company-site/node_modules ./apps/company-site/node_modules
COPY --from=deps /app/packages/db/node_modules ./packages/db/node_modules
RUN pnpm build:1

# Production image
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
COPY --from=builder /app/apps/company-site/public ./apps/company-site/public
COPY --from=builder /app/apps/company-site/.next/standalone ./apps/company-site/
COPY --from=builder /app/apps/company-site/.next/static ./apps/company-site/.next/static

EXPOSE 3000
CMD ["node", "apps/company-site/server.js"]
