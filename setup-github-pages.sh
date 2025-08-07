#!/bin/bash

# Script para configurar automáticamente el proyecto para GitHub Pages
# Uso: ./setup-github-pages.sh [USUARIO] [REPOSITORIO]

set -e

# Variables por defecto
USUARIO=${1:-"IngZidany"}
REPOSITORIO=${2:-"se-web-skills"}

echo "🚀 Configurando proyecto para GitHub Pages..."
echo "👤 Usuario: $USUARIO"
echo "📋 Repositorio: $REPOSITORIO"

# Verificar que estemos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: No estás en un repositorio git"
    echo "💡 Ejecuta: git init"
    exit 1
fi

# Verificar que tengamos Node.js y npm
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

# Verificar que tengamos las dependencias instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Actualizar astro.config.mjs
echo "⚙️ Configurando astro.config.mjs..."
cat > astro.config.mjs << EOF
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://${USUARIO}.github.io',
  base: '/${REPOSITORIO}',
  vite: {
    plugins: [tailwindcss()]
  }
});
EOF

# Crear directorio .github/workflows si no existe
mkdir -p .github/workflows

# Crear workflow de GitHub Actions
echo "🔧 Configurando GitHub Actions..."
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Install, build, and upload your site to GitHub Pages
        uses: withastro/action@v1

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# Hacer el script de despliegue ejecutable
chmod +x deploy-github-pages.sh

# Verificar que la configuración sea correcta
echo "🔍 Verificando configuración..."
if npm run build; then
    echo "✅ Construcción exitosa"
else
    echo "❌ Error en la construcción"
    exit 1
fi

# Mostrar instrucciones finales
echo ""
echo "✅ ¡Configuración completada exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube el código a GitHub:"
echo "   git add ."
echo "   git commit -m 'Configuración para GitHub Pages'"
echo "   git push origin main"
echo ""
echo "2. Configura GitHub Pages:"
echo "   - Ve a tu repositorio en GitHub"
echo "   - Settings > Pages"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: gh-pages"
echo "   - Folder: / (root)"
echo "   - Save"
echo ""
echo "3. Tu sitio estará disponible en:"
echo "   https://${USUARIO}.github.io/${REPOSITORIO}"
echo ""
echo "🎉 ¡Listo para desplegar!" 