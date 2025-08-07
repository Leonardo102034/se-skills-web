#!/bin/bash

# Script de despliegue para GitHub Pages
# Uso: ./deploy-github-pages.sh [REPOSITORIO] [USUARIO]

set -e

# Variables por defecto
REPOSITORIO=${1:-"se-web-skills"}
USUARIO=${2:-"IngZidany"}
BRANCH="main"

echo "🚀 Iniciando despliegue a GitHub Pages..."
echo "📋 Repositorio: $REPOSITORIO"
echo "👤 Usuario: $USUARIO"
echo "🌿 Rama: $BRANCH"

# Verificar que git esté instalado
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git no está instalado"
    exit 1
fi

# Verificar que estemos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: No estás en un repositorio git"
    exit 1
fi

# Verificar que tengamos cambios para commit
if git diff-index --quiet HEAD --; then
    echo "⚠️  No hay cambios para commit"
else
    echo "📝 Haciendo commit de cambios..."
    git add .
    git commit -m "Actualización automática - $(date)"
fi

# Construir el proyecto
echo "🔨 Construyendo proyecto..."
npm run build

# Verificar que la construcción fue exitosa
if [ ! -d "dist" ]; then
    echo "❌ Error: La construcción falló. No se encontró el directorio dist/"
    exit 1
fi

# Crear rama gh-pages si no existe
if ! git show-ref --verify --quiet refs/heads/$BRANCH; then
    echo "🌿 Creando rama $BRANCH..."
    git checkout -b $BRANCH
else
    echo "🌿 Cambiando a rama $BRANCH..."
    git checkout $BRANCH
fi

# Limpiar rama gh-pages (excepto .git)
echo "🧹 Limpiando rama $BRANCH..."
git rm -rf . || true
git clean -fxd

# Copiar archivos construidos
echo "📁 Copiando archivos construidos..."
cp -r dist/* .

# Agregar archivos al staging
echo "📝 Agregando archivos..."
git add .

# Commit de los cambios
echo "💾 Haciendo commit..."
git commit -m "Deploy a GitHub Pages - $(date)"

# Push a GitHub
echo "🚀 Subiendo a GitHub..."
git push origin $BRANCH --force

# Volver a la rama principal
echo "🔄 Volviendo a rama principal..."
git checkout main

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 Tu sitio estará disponible en: https://$USUARIO.github.io/$REPOSITORIO"
echo "⏰ Puede tomar unos minutos en estar disponible"
echo ""
echo "📋 Para configurar GitHub Pages:"
echo "1. Ve a Settings > Pages en tu repositorio"
echo "2. Source: Deploy from a branch"
echo "3. Branch: gh-pages"
echo "4. Folder: / (root)"
echo "5. Save" 