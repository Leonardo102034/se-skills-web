#!/bin/bash

# Script de despliegue para Google Cloud Platform
# Uso: ./deploy.sh [PROJECT_ID] [REGION]

set -e

# Variables por defecto
PROJECT_ID=${1:-"criker-ai"}
REGION=${2:-"us-central1"}
SERVICE_NAME="web-skills"

echo "🚀 Iniciando despliegue a Google Cloud Platform..."
echo "📋 Proyecto: $PROJECT_ID"
echo "🌍 Región: $REGION"
echo "🔧 Servicio: $SERVICE_NAME"

# Verificar que gcloud esté instalado
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI no está instalado"
    echo "📥 Instala Google Cloud SDK desde: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Configurar proyecto
echo "⚙️ Configurando proyecto..."
gcloud config set project $PROJECT_ID

# Habilitar APIs necesarias
echo "🔌 Habilitando APIs necesarias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Construir y subir imagen Docker
echo "🐳 Construyendo imagen Docker..."
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
gcloud builds submit --tag $IMAGE_NAME .

# Desplegar en Cloud Run
echo "🚀 Desplegando en Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10

# Obtener URL del servicio
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 URL del servicio: $SERVICE_URL"
echo "📊 Para ver logs: gcloud logs tail --service=$SERVICE_NAME" 