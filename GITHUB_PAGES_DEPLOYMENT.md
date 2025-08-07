# 🚀 Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu aplicación web tecnológica en GitHub Pages de forma automática.

## 📋 Prerrequisitos

1. **Cuenta de GitHub**
   - Crea una cuenta en [GitHub](https://github.com)
   - Crea un nuevo repositorio o usa uno existente

2. **Git instalado**
   - Instala [Git](https://git-scm.com/)
   - Configura tu identidad de Git

3. **Node.js y npm**
   - Instala [Node.js](https://nodejs.org/) (versión 18 o superior)

## 🛠️ Configuración Inicial

### 1. Configurar el repositorio

```bash
# Clonar el repositorio (si no lo tienes localmente)
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd se-web-skills

# O si ya tienes el proyecto local
git init
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### 2. Configurar Astro para GitHub Pages

Edita `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://github.com/IngZidany',
  base: '/se-web-skills',
  // ... resto de configuración
});
```

**Reemplaza:**
- `TU_USUARIO` con `IngZidany` (tu nombre de usuario de GitHub)
- `TU_REPOSITORIO` con `se-web-skills` (nombre de tu repositorio)

## 🚀 Métodos de Despliegue

### Opción 1: Despliegue Automático (Recomendado)

1. **Configurar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Ve a Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Save

2. **Configurar GitHub Actions**
   - El archivo `.github/workflows/deploy.yml` ya está configurado
   - Cada push a `main` activará el despliegue automático

3. **Hacer push para desplegar**
   ```bash
   git add .
   git commit -m "Configuración inicial"
   git push origin main
   ```

### Opción 2: Despliegue Manual

#### Usando el script de despliegue

```bash
# Despliegue básico
./deploy-github-pages.sh

# Despliegue con parámetros específicos
./deploy-github-pages.sh mi-repositorio mi-usuario
```

#### Usando comandos manuales

```bash
# 1. Construir el proyecto
npm run build

# 2. Crear rama gh-pages
git checkout -b gh-pages

# 3. Copiar archivos construidos
cp -r dist/* .

# 4. Commit y push
git add .
git commit -m "Deploy a GitHub Pages"
git push origin gh-pages --force

# 5. Volver a main
git checkout main
```

## 🔧 Configuración Avanzada

### Configuración de Dominio Personalizado

1. **Comprar dominio** (opcional)
2. **Configurar DNS**:
   - Añadir registro CNAME: `TU_USUARIO.github.io`
3. **Configurar en GitHub**:
   - Settings > Pages > Custom domain
   - Añadir tu dominio

### Configuración de HTTPS

- GitHub Pages proporciona HTTPS automático
- Los certificados se renuevan automáticamente

### Configuración de SEO

```javascript
// En astro.config.mjs
export default defineConfig({
  site: 'https://TU_USUARIO.github.io',
  base: '/TU_REPOSITORIO',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
```

## 📊 Monitoreo y Logs

### Ver logs de GitHub Actions
1. Ve a tu repositorio en GitHub
2. Ve a Actions
3. Selecciona el workflow "Deploy to GitHub Pages"
4. Revisa los logs de cada ejecución

### Verificar el despliegue
```bash
# Verificar que el sitio esté disponible
curl -I https://TU_USUARIO.github.io/TU_REPOSITORIO
```

## 🔍 Troubleshooting

### Error: "404 Not Found"
**Causa**: Configuración incorrecta de `base` en `astro.config.mjs`
**Solución**: Verificar que `base` coincida con el nombre del repositorio

### Error: "Build failed"
**Causa**: Error en la construcción del proyecto
**Solución**:
```bash
# Verificar construcción local
npm run build

# Verificar logs en GitHub Actions
# Ir a Actions > Deploy to GitHub Pages > View logs
```

### Error: "Permission denied"
**Causa**: Permisos insuficientes en el repositorio
**Solución**:
1. Verificar que seas owner o tengas permisos de admin
2. Verificar configuración de GitHub Actions en Settings > Actions > General

### Error: "Branch not found"
**Causa**: Rama `gh-pages` no existe
**Solución**:
```bash
# Crear rama gh-pages
git checkout -b gh-pages
git push origin gh-pages
```

## 💰 Costos

**GitHub Pages es GRATUITO** para:
- Repositorios públicos
- Repositorios privados (con GitHub Pro)

**Límites**:
- 1GB de almacenamiento por repositorio
- 100GB de ancho de banda por mes
- 10 builds por hora

## 🎯 Ventajas de GitHub Pages

✅ **Gratuito** - Sin costos de hosting  
✅ **Automático** - Despliegue con cada push  
✅ **HTTPS automático** - Certificados SSL incluidos  
✅ **CDN global** - Distribución de contenido optimizada  
✅ **Integración Git** - Control de versiones integrado  
✅ **Fácil configuración** - Setup en minutos  

## 📝 Archivos de Configuración

- `.github/workflows/deploy.yml`: Configuración de GitHub Actions
- `astro.config.mjs`: Configuración de Astro para GitHub Pages
- `deploy-github-pages.sh`: Script de despliegue manual
- `astro.config.github-pages.mjs`: Configuración alternativa

## 🎯 Próximos Pasos

1. **Configurar dominio personalizado**
2. **Optimizar SEO**
3. **Configurar analytics**
4. **Implementar caché**
5. **Configurar monitoreo**

## 📞 Soporte

- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- [Documentación de Astro](https://docs.astro.build/en/guides/deploy/github-pages/)
- [GitHub Community](https://github.com/orgs/community/discussions)

---

**¡Tu sitio estará disponible en: `https://IngZidany.github.io/se-web-skills`** 🎉 