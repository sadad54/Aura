#!/bin/sh
set -e

echo "🚀 Starting Aura Application..."

# Run database migrations
echo "📦 Running database migrations..."
cd /app/server
npx prisma migrate deploy

# Start backend server in background
echo "🌟 Starting backend server..."
cd /app/server
node dist/server.js &

# Start frontend server
echo "🎨 Starting frontend server..."
cd /app
serve -s client -l 5173

# Keep container running
wait
