#!/bin/bash
# test_images.sh

echo "Probando imágenes Android disponibles..."

# Lista de imágenes que SÍ existen
images=(
  "budtmo/docker-android-x86-10.0"
  "budtmo/docker-android-x86-9.0"
  "budtmo/docker-android-x86-8.1"
  "butomo/docker-android-x86-9.0"
)

for image in "${images[@]}"; do
  echo "Probando: $image"
  if docker pull "$image" 2>/dev/null; then
    echo "✅ $image disponible"
    echo "Úsala en tu docker-compose"
    exit 0
  fi
done