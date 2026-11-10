#!/bin/bash

# Color Dash Blitz - Marketing Screenshot Generator
# This script uses ImageMagick to create 1280x720 landscape screenshots.
# Requirements: ImageMagick (convert or magick command)

# --- CONFIGURATION (Edit these to change visuals) ---
WIDTH=1280
HEIGHT=720
PRIMARY_RED="#FF4B4B"
SECONDARY_PINK="#D81B60"
BG_DARK="#0a0a0a"
TEXT_WHITE="#ffffff"
TEXT_MUTED="#aaaaaa"

# --- TEXT CONTENT (Edit these to change the words) ---

# English Version
TITLE_EN="COLOR DASH BLITZ"
DESC_1_EN="TEST YOUR REFLEXES"
DESC_2_EN="BEAT THE CLOCK"
FACT_EN="FACT: Blue is the most popular color!"

# Russian Version
TITLE_RU="ЦВЕТНОЙ БЛИЦ"
DESC_1_RU="ПРОВЕРЬ СВОЮ РЕАКЦИЮ"
DESC_2_RU="ОБГОНИ ТАЙМЕР"
FACT_RU="ФАКТ: Синий — самый популярный цвет!"

# --- GENERATION LOGIC ---

OUTPUT_DIR="public/promo"
mkdir -p $OUTPUT_DIR

# Check for ImageMagick command
CMD="magick"
if ! command -v magick &> /dev/null; then
    CMD="convert"
    if ! command -v convert &> /dev/null; then
        echo "Error: ImageMagick not found. Please install it to use this script."
        exit 1
    fi
fi

echo "🚀 Generating professional screenshots for Color Dash Blitz..."

generate() {
    local lang=$1
    local title=$2
    local desc=$3
    local suffix=$4
    local out="${OUTPUT_DIR}/screenshot-${lang}-${suffix}.png"

    echo "  - Creating: $out"

    $CMD -size ${WIDTH}x${HEIGHT} canvas:"$BG_DARK" \
        \( -size 800x800 radial-gradient:"${PRIMARY_RED}00"-"${PRIMARY_RED}33" -geometry +0-200 \) -composite \
        \( -size 800x800 radial-gradient:"${SECONDARY_PINK}00"-"${SECONDARY_PINK}22" -geometry +480+120 \) -composite \
        -fill "$TEXT_WHITE" -font "Arial-Bold" -pointsize 80 -gravity center -annotate +0-80 "$title" \
        -fill "$TEXT_MUTED" -font "Arial" -pointsize 32 -gravity center -annotate +0+20 "$desc" \
        -fill "$PRIMARY_RED" -draw "roundrectangle 50,650 1230,700 10,10" \
        -fill white -font "Arial-Bold" -pointsize 18 -gravity West -annotate +80+313 "⚡ HIGH VELOCITY ARCADE" \
        "$out"
}

# Generate English Assets
generate "en" "$TITLE_EN" "$DESC_1_EN" "1"
generate "en" "$TITLE_EN" "$DESC_2_EN" "2"
generate "en" "COLOR THEORY" "$FACT_EN" "3"

# Generate Russian Assets
generate "ru" "$TITLE_RU" "$DESC_1_RU" "1"
generate "ru" "$TITLE_RU" "$DESC_2_RU" "2"
generate "ru" "ТЕОРИЯ ЦВЕТА" "$FACT_RU" "3"

echo "✅ Done! Screenshots are available in $OUTPUT_DIR"
