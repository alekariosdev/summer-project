# =============================================================================
# Base Stage - Common dependencies
# =============================================================================
FROM node:22-alpine AS base

# libc6-compat is recommended by Next.js for Alpine compatibility
RUN apk update && apk add --no-cache \
    libc6-compat \
    bash \
    git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json package-lock.json ./

# =============================================================================
# Development Stage
# =============================================================================
FROM base AS development

ENV NODE_ENV=development
ENV PATH=/opt/app/node_modules/.bin:$PATH

# Install all dependencies (including devDependencies)
RUN npm install

COPY . .

# Expose Next.js default dev port
EXPOSE 3000

CMD ["npm", "run", "dev"]

# =============================================================================
# Build Stage - Used only for production build
# =============================================================================
FROM base AS build

ENV NODE_ENV=production

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Install ALL deps (devDependencies are needed to build)
RUN npm install

COPY . .

# Build the Next.js app (produces .next/standalone with output: 'standalone')
RUN npm run build

# =============================================================================
# Production Stage
# =============================================================================
FROM node:22-alpine AS production

RUN apk update && apk add --no-cache \
    libc6-compat \
    bash

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /opt/app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=build /opt/app/public ./public

# Copy the standalone server output (includes minimal node_modules)
# The --chown ensures correct ownership for the non-root user
COPY --from=build --chown=nextjs:nodejs /opt/app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /opt/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# standalone output produces a server.js entrypoint - no npm needed
CMD ["node", "server.js"]