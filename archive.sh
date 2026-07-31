#!/bin/bash

# Color Dash Blitz - Build & Archive Script
# This script builds the project and creates a zip file for Yandex Games / Web publishing.

# Exit on any error
set -e

echo "--- 🛠 Starting Build Process ---"

# 1. Clean previous build artifacts
rm -rf out
rm -f game.zip

# 2. Build the project
# This triggers next build and next export via package.json
npm run build

# 3. Create the archive
if [ -d "out" ]; then
  echo "--- 📦 Creating game.zip ---"
  # Go into the out directory to ensure the zip doesn't contain the 'out' folder itself
  cd out
  
  # Check if zip is installed
  if command -v zip >/dev/null 2>&1; then
    zip -r ../game.zip .
    cd ..
    echo "--- ✅ Success! Your game.zip is ready for upload. ---"
  else
    cd ..
    echo "--- ⚠️  Warning: 'zip' command not found. ---"
    echo "The build was successful in the 'out/' folder, but the archive could not be created automatically."
    exit 1
  fi
else
  echo "--- ❌ Error: Build failed, 'out' directory not found. ---"
  exit 1
fi
