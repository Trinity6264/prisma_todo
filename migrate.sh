#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting database migration..."

# Run Prisma migrations
echo "📊 Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "✅ Database migration completed successfully!"
