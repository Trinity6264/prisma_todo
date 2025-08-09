# Use Node.js 18 LTS as base image
FROM node:18-alpine AS builder

# Install necessary system dependencies
RUN apk add --no-cache postgresql-client

# Set working directory
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./
COPY tsconfig.json ./

# Copy Prisma schema before installing dependencies (needed for postinstall script)
COPY prisma/ ./prisma/

# Install all dependencies (needed for build)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install necessary system dependencies
RUN apk add --no-cache postgresql-client

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy Prisma schema
COPY prisma/ ./prisma/

# Install only production dependencies
RUN npm install --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated

# Copy other necessary files
COPY healthcheck.js ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
