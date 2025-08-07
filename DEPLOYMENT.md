# 🚀 Despliegue en Google Cloud Platform

Esta guía te ayudará a desplegar tu aplicación web tecnológica en Google Cloud Platform usando Docker y Cloud Run.

## 📋 Prerrequisitos

1. **Cuenta de Google Cloud Platform**
   - Crea una cuenta en [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente

2. **Google Cloud SDK**
   - Instala [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
   - Ejecuta `gcloud auth login` para autenticarte

3. **Docker** (opcional, para pruebas locales)
   - Instala [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🛠️ Configuración Inicial

### 1. Configurar el proyecto

```bash
# Reemplaza TU_PROJECT_ID con tu ID de proyecto real
gcloud config set project TU_PROJECT_ID
```

### 2. Habilitar APIs necesarias

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## 🚀 Métodos de Despliegue

### Opción 1: Despliegue Automático (Recomendado)

1. **Conectar repositorio a Cloud Build**
   - Ve a [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - Conecta tu repositorio de GitHub/GitLab
   - Crea un trigger que use el archivo `cloudbuild.yaml`

2. **Configurar trigger**
   - Branch: `main` o `master`
   - Archivo de configuración: `cloudbuild.yaml`
   - Región: `us-central1`

3. **Desplegar automáticamente**
   - Cada push a la rama principal activará el despliegue automático

### Opción 2: Despliegue Manual

#### Usando el script de despliegue

```bash
# Despliegue básico
./deploy.sh TU_PROJECT_ID

# Despliegue con región específica
./deploy.sh TU_PROJECT_ID us-west1
```

#### Usando comandos manuales

```bash
# 1. Construir y subir imagen
gcloud builds submit --tag gcr.io/TU_PROJECT_ID/web-skills .

# 2. Desplegar en Cloud Run
gcloud run deploy web-skills \
  --image gcr.io/TU_PROJECT_ID/web-skills \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10
```

### Opción 3: Prueba Local con Docker

```bash
# Construir imagen localmente
docker build -t web-skills .

# Ejecutar contenedor
docker run -p 8080:80 web-skills

# Acceder a http://localhost:8080
```

## 📊 Monitoreo y Logs

### Ver logs en tiempo real
```bash
gcloud logs tail --service=web-skills
```

### Ver métricas del servicio
```bash
# Ir a Cloud Run en la consola de GCP
# https://console.cloud.google.com/run
```

### Escalar el servicio
```bash
gcloud run services update web-skills \
  --max-instances 20 \
  --memory 1Gi
```

## 🔧 Configuración Avanzada

### Variables de entorno
```bash
gcloud run services update web-skills \
  --set-env-vars NODE_ENV=production
```

### Dominio personalizado
```bash
# Mapear dominio personalizado
gcloud run domain-mappings create \
  --service web-skills \
  --domain tu-dominio.com \
  --region us-central1
```

### SSL/TLS
- Cloud Run proporciona SSL automático
- Los certificados se renuevan automáticamente

## 💰 Costos Estimados

Con la configuración actual:
- **Cloud Run**: ~$5-15/mes (dependiendo del tráfico)
- **Container Registry**: ~$1-5/mes
- **Cloud Build**: ~$1-3/mes

## 🔍 Troubleshooting

### Error: "Permission denied"
```bash
# Verificar permisos
gcloud auth list
gcloud projects list
```

### Error: "API not enabled"
```bash
# Habilitar APIs manualmente
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

### Error: "Image not found"
```bash
# Verificar que la imagen se subió correctamente
gcloud container images list --repository=gcr.io/TU_PROJECT_ID
```

### Error: "Build failed"
```bash
# Ver logs de construcción
gcloud builds log [BUILD_ID]
```

## 📝 Archivos de Configuración

- `Dockerfile`: Configuración de la imagen Docker
- `nginx.conf`: Configuración del servidor web
- `cloudbuild.yaml`: Configuración de Cloud Build
- `.dockerignore`: Archivos a excluir del build
- `deploy.sh`: Script de despliegue manual

## 🎯 Próximos Pasos

1. **Configurar CI/CD**
   - Conectar con GitHub Actions
   - Configurar despliegue automático

2. **Optimizar rendimiento**
   - Configurar CDN
   - Optimizar imágenes
   - Implementar caché

3. **Monitoreo avanzado**
   - Configurar alertas
   - Implementar métricas personalizadas
   - Configurar logging estructurado

## 📞 Soporte

- [Documentación de Cloud Run](https://cloud.google.com/run/docs)
- [Documentación de Cloud Build](https://cloud.google.com/build/docs)
- [Comunidad de Google Cloud](https://cloud.google.com/community) 