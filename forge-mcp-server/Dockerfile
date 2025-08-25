# Multi-stage Dockerfile for Tyler Forge MCP Server
# Optimized for AWS App Runner deployment with x86/x64 architecture

# Stage 1: Build stage
FROM --platform=linux/amd64 node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and scripts
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

# Copy the Forge repository files for bundling
# Note: In CI/CD, these would be copied from the forge repo
COPY ../src/stories ./src/stories
COPY ../src/lib ./src/lib
COPY ../src/dev ./src/dev

# Build TypeScript
RUN npm run build

# Generate the bundled data for deployment
RUN npm run bundle

# Stage 2: Production stage
FROM --platform=linux/amd64 node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Switch to non-root user
USER nodejs

# Expose port (App Runner default is 8080)
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080
ENV FORGE_BUNDLED=true

# Health check for App Runner
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => { process.exit(1); });"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the SSE server for remote access
CMD ["node", "dist/server-sse.js"]