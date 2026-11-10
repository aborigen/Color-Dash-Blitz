
#!/bin/bash

# Color Dash Blitz - Professional Build & Archive Script
# Optimized for Sber, VK Games, and Yandex Games.

# Exit on any error
set -e

PLATFORM=${1:-"generic"}
DATE=$(date +%Y-%m-%d)
ARCHIVE_NAME="dist-${PLATFORM}-${DATE}.zip"

echo "------------------------------------------"
echo "🚀 Starting Color Dash Blitz Build Process"
echo "🌐 Platform: $PLATFORM"
echo "📅 Date: $DATE"
echo "------------------------------------------"

# 0. Early Environment Checks
if ! command -v zip >/dev/null 2>&1; then
  echo "❌ Error: 'zip' command not found. Please install zip and try again."
  exit 1
fi

# 1. Clean previous build artifacts
echo "🧹 Cleaning previous build artifacts..."
rm -rf out
# We don't remove existing zips to allow multiple platform builds in one session

# 2. Build check
if [ ! -d "out" ]; then
  echo "⚠️ 'out' directory not found. Please run 'npm run build' first."
  # If this script was called directly without npm run build, we run it
  npm run build
fi

# 3. Post-build Cleanup (Standard for most stores)
if [ -d "out/404" ]; then
  echo "🧹 Removing 404/index.html artifact..."
  rm -rf out/404
fi

# 4. Create the archive
if [ -d "out" ]; then
  echo "📦 Packaging $ARCHIVE_NAME..."
  
  # Enter the output directory to ensure a flat zip structure
  # Platforms like Yandex and VK require index.html to be at the zip root
  cd out
  
  # Create the zip file containing all static files at the root
  zip -q -r ../$ARCHIVE_NAME .
  
  cd ..
  
  # Summary
  FILE_SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
  echo "------------------------------------------"
  echo "✅ SUCCESS: $PLATFORM build complete!"
  echo "📦 Archive: $ARCHIVE_NAME ($FILE_SIZE)"
  echo "📍 Ready for platform upload"
  echo "------------------------------------------"
else
  echo "------------------------------------------"
  echo "❌ ERROR: Build failed. 'out' directory was not generated."
  echo "------------------------------------------"
  exit 1
fi
