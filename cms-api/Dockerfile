# =============================================================================
# Base Stage - Common dependencies
# =============================================================================
FROM node:22-alpine AS base

RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY package.json package-lock.json ./
COPY scripts ./scripts
COPY patches ./patches

# =============================================================================
# Development Stage
# =============================================================================
FROM base AS development

ENV NODE_ENV=development
ENV PATH=/opt/app/node_modules/.bin:$PATH

# Install all dependencies (including devDependencies)
RUN npm install

COPY . .

# Expose Strapi default port
EXPOSE 1337

CMD ["npm", "run", "develop"]

# =============================================================================
# Build Stage - Used only for production build
# =============================================================================
FROM base AS build

ENV NODE_ENV=production

# Install all deps needed to build
RUN npm install

COPY . .

# Build the Strapi admin panel
RUN npm run build

# =============================================================================
# Production Stage
# =============================================================================
FROM node:22-alpine AS production

RUN apk update && apk add --no-cache \
    vips-dev \
    bash

ENV NODE_ENV=production

WORKDIR /opt/app

# Copy package files and postinstall assets
COPY package.json package-lock.json ./
COPY scripts ./scripts
COPY patches ./patches

# Install only production dependencies
RUN npm install --omit=dev

# Copy built artifacts from build stage
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/.strapi ./.strapi
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/database ./database
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/favicon.png ./favicon.png

# Create a non-root user for security
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    chown -R strapi:strapi /opt/app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]