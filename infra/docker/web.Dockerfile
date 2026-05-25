# ============================================================
# Stage 1: Install dependencies
# ============================================================
FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY web/package.json web/bun.lock ./
RUN bun install --frozen-lockfile

# ============================================================
# Stage 2: Build
# ============================================================
FROM oven/bun:1-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY web/ ./

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN bun run build

# ============================================================
# Stage 3: Production runtime
# ============================================================
FROM node:20-alpine AS runtime
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "run", "start"]
