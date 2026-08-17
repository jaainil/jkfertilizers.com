#!/usr/bin/env bash
set -e

echo "=== Starting High-Fidelity (Visually Lossless) Image Optimization ==="

# Restore clean originals from git if desired or process existing
# Settings:
# - method=6: highest quality encoder profile in libwebp
# - quality 84-86: visually lossless for photos and granular textures
# - 1600px for hero, facility, blog, and service photos (crisp on 2K/4K and Retina)
# - 1080x1350px for products (full resolution for zooms and lightbox)
# - 400x400px @ 92 quality for brand logo (crystal-clear vectors/sharp text)

# 1. Logos
echo "Optimizing logos (High-DPI 400x400 @ Q92)..."
for f in logo.webp public/logo.webp; do
  if [ -f "$f" ]; then
    magick "$f" -resize '400x400>' -quality 92 -define webp:method=6 "${f}.tmp.webp"
    mv "${f}.tmp.webp" "$f"
    echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
  fi
done

# 2. OG Images
echo "Optimizing OG social images (1200x630 @ Q85)..."
for f in og-image.webp public/og-image.webp; do
  if [ -f "$f" ]; then
    magick "$f" -resize '1200x630^' -gravity center -extent 1200x630 -quality 85 -define webp:method=6 "${f}.tmp.webp"
    mv "${f}.tmp.webp" "$f"
    echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
  fi
done

# 3. Public Images (Hero, Facilities, Textures)
echo "Optimizing public/images/ (Retina 1600px @ Q85)..."
for f in public/images/*.webp; do
  if [ -f "$f" ]; then
    magick "$f" -resize '1600x>' -quality 85 -define webp:method=6 "${f}.tmp.webp"
    mv "${f}.tmp.webp" "$f"
    echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
  fi
done

# 4. Product images in src/content/products (Full 1080x1350 @ Q85 for crisp granules)
echo "Optimizing product images (Full 1080x1350 @ Q85)..."
find src/content/products -type f -name "*.webp" | while read -r f; do
  magick "$f" -resize '1080x1350>' -quality 85 -define webp:method=6 "${f}.tmp.webp"
  mv "${f}.tmp.webp" "$f"
  echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
done

# 5. Service images in src/content/services (1600px @ Q85)
echo "Optimizing service images (1600px @ Q85)..."
find src/content/services -type f -name "*.webp" | while read -r f; do
  magick "$f" -resize '1600x>' -quality 85 -define webp:method=6 "${f}.tmp.webp"
  mv "${f}.tmp.webp" "$f"
  echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
done

# 6. Blog images in src/content/blog (1600px @ Q85)
echo "Optimizing blog images (1600px @ Q85)..."
find src/content/blog -type f -name "*.webp" | while read -r f; do
  magick "$f" -resize '1600x>' -quality 85 -define webp:method=6 "${f}.tmp.webp"
  mv "${f}.tmp.webp" "$f"
  echo "  Optimized $f ($(ls -lh "$f" | awk '{print $5}'))"
done

echo "=== High-Fidelity Image Optimization Complete ==="
