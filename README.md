# Knowledge - Plataforma Web Tecnológica

Una aplicación web moderna y responsive desarrollada con **Astro**, **Tailwind CSS**, **Node.js** y **JavaScript** para el desarrollo de habilidades tecnológicas.

## 🚀 Características

### Página Principal (Home)
- **Título "KNOWLEDGE"** en pantalla completa con fondo negro y letras grandes
- Diseño responsive que se adapta a diferentes tamaños de pantalla
- Imágenes referenciales y elementos visuales atractivos
- Navegación principal con 4 secciones clave

### Navegación Principal
- **Pensamiento Crítico**: Análisis, evaluación, síntesis y toma de decisiones
- **Comunicación**: Habilidades verbales, escritas, no verbales y digitales
- **Creatividad**: Ideación, innovación, expresión artística e inspiración
- **Colaboración**: Trabajo en equipo, liderazgo, comunicación grupal y resolución de conflictos

### Páginas Individuales
Cada página incluye:
- **4 secciones de pantalla completa** (1440x900 con responsive)
- **Navegación secundaria** con 3 opciones:
  - **Knowledge**: Contenido principal de la habilidad
  - **Biblioteca**: Recursos (PDFs, imágenes, textos, libros)
  - **Progreso**: Seguimiento del desarrollo y logros

## 🛠️ Tecnologías Utilizadas

- **Astro**: Framework web para crear sitios estáticos rápidos
- **Tailwind CSS**: Framework CSS utility-first para diseño responsive
- **Node.js**: Entorno de ejecución de JavaScript
- **JavaScript**: Programación del lado del cliente
- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados y animaciones

## 📁 Estructura del Proyecto

```
Web_Skills/
├── src/
│   ├── components/
│   │   ├── Navigation.astro      # Navegación principal
│   │   └── SecondaryNav.astro    # Navegación secundaria
│   ├── layouts/
│   │   └── Layout.astro          # Layout principal
│   ├── pages/
│   │   ├── index.astro           # Página principal
│   │   ├── pensamiento-critico.astro
│   │   ├── comunicacion.astro
│   │   ├── creatividad.astro
│   │   └── colaboracion.astro
│   └── styles/
│       └── global.css            # Estilos globales con Tailwind
├── public/
│   └── favicon.svg               # Icono de la aplicación
├── package.json
├── astro.config.mjs
└── README.md
```

## 🎨 Diseño y UX

### Características de Diseño
- **Responsive Design**: Se adapta a móviles, tablets y desktop
- **Gradientes Modernos**: Fondos con gradientes atractivos
- **Glassmorphism**: Efectos de cristal y transparencias
- **Animaciones Suaves**: Transiciones y hover effects
- **Tipografía Clara**: Fuente Inter para mejor legibilidad

### Paleta de Colores
- **Azul**: Pensamiento Crítico
- **Verde**: Comunicación
- **Púrpura**: Creatividad
- **Naranja**: Colaboración

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd Web_Skills

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
```

## 🐳 Despliegue con Docker

### Construir imagen Docker
```bash
docker build -t web-skills .
```

### Ejecutar contenedor
```bash
docker run -p 8080:80 web-skills
```

### Acceder a la aplicación
Abre tu navegador en `http://localhost:8080`

## ☁️ Despliegue en Google Cloud Platform

Para desplegar en GCP, consulta el archivo [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

### Despliegue rápido
```bash
# Configurar proyecto
gcloud config set project TU_PROJECT_ID

# Desplegar automáticamente
./deploy.sh TU_PROJECT_ID
```

## 🌐 Despliegue en GitHub Pages

Para desplegar en GitHub Pages, consulta el archivo [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) para instrucciones detalladas.

### Despliegue rápido
```bash
# Configurar repositorio
git remote add origin https://github.com/IngZidany/se-web-skills.git

# Desplegar automáticamente
git push origin main
```

### Despliegue manual
```bash
# Despliegue manual
./deploy-github-pages.sh se-web-skills IngZidany
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px - 1440px+
- **Pantallas grandes**: 1440px+

## 🔧 Configuración

### Tailwind CSS
El proyecto utiliza Tailwind CSS v4 con configuración personalizada en `src/styles/global.css`.

### Astro Config
Configuración optimizada en `astro.config.mjs` con integración de Tailwind CSS.

## 📈 Funcionalidades

### Sistema de Navegación
- **Navegación Principal**: Menú fijo en la parte superior
- **Navegación Secundaria**: Menú específico para cada página
- **Navegación Móvil**: Menú hamburguesa responsive

### Secciones de Contenido
- **Knowledge**: Información principal de cada habilidad
- **Biblioteca**: Recursos organizados por categorías
- **Progreso**: Sistema de seguimiento de logros
- **Próximos Pasos**: Enlaces a otras habilidades

### Interactividad
- **Smooth Scrolling**: Navegación suave entre secciones
- **Hover Effects**: Efectos interactivos en botones y enlaces
- **Responsive Menus**: Menús adaptables a diferentes dispositivos

## 🎯 Objetivos del Proyecto

1. **Educación Tecnológica**: Proporcionar recursos para el desarrollo de habilidades digitales
2. **Experiencia de Usuario**: Crear una interfaz intuitiva y atractiva
3. **Accesibilidad**: Diseño inclusivo para diferentes usuarios
4. **Performance**: Optimización para carga rápida y rendimiento

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

---

**Desarrollado con ❤️ usando Astro, Tailwind CSS y JavaScript**
