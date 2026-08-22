#!/bin/bash

# Color Dash Blitz - Professional Build & Archive Script
# Optimized for Yandex Games and static web publishing.

# Exit on any error
set -e

# Generate filename with date
DATE=$(date +%Y-%m-%d)
ARCHIVE_NAME="game-$DATE.zip"

echo "------------------------------------------"
echo "🚀 Starting Color Dash Blitz Build Process"
echo "📅 Date: $DATE"
echo "------------------------------------------"

# 0. Early Environment Checks
if ! command -v zip >/dev/null 2>&1; then
  echo "❌ Error: 'zip' command not found. Please install zip and try again."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules not found. Installing dependencies..."
  npm install
fi

# 1. Clean previous build artifacts
echo "🧹 Cleaning previous build artifacts..."
rm -rf out
# Remove previous game zips to keep workspace clean
rm -f game-*.zip

# 2. Build the project
echo "🛠 Building project for production..."
# Ensure we are in production mode for optimized assets
export NODE_ENV=production
npm run build

# 3. Create the archive
if [ -d "out" ]; then
  echo "📦 Packaging $ARCHIVE_NAME..."
  
  # Enter the output directory to ensure a flat zip structure
  cd out
  
  # Create the zip file containing all static files at the root
  zip -q -r ../$ARCHIVE_NAME .
  
  cd ..
  
  # Summary
  FILE_SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
  echo "------------------------------------------"
  echo "✅ SUCCESS: Build complete!"
  echo "📦 Archive: $ARCHIVE_NAME ($FILE_SIZE)"
  echo "📍 Ready for upload to Yandex Games Console"
  echo "------------------------------------------"
else
  echo "------------------------------------------"
  echo "❌ ERROR: Build failed. 'out' directory was not generated."
  echo "Check the build logs above for more details."
  echo "------------------------------------------"
  exit 1
fi
