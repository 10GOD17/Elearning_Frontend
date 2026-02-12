# 🎓 SalfaCorp LMS — Frontend

> Plataforma Corporativa de Aprendizaje — Interfaz Web  
> **Stack:** Angular 20 · PrimeNG 20 · TypeScript · DM Sans  
> **Desarrollado por:** [Syntaxis](https://syntaxis.cl)

---

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Guía de Estilo](#guía-de-estilo)
- [Documentación de Usuario](#documentación-de-usuario)

---

## ✅ Requisitos

| Herramienta | Versión mínima |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| Angular CLI | 20.x |

```bash
npm install -g @angular/cli@20
```

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/10GOD17/Elearning_Frontend.git
cd Elearning_Frontend

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp src/environments/environment.example.ts src/environments/environment.ts
# Editar environment.ts con la URL de la API

# 4. Iniciar en modo desarrollo
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## 🔧 Variables de Entorno

Configura `src/environments/environment.ts` con los valores correspondientes:

```typescript
// environment.ts — Desarrollo
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  googleClientId: 'your_google_client_id',
  appName: 'SalfaCorp LMS',
  version: '1.0.0',
};

// environment.prod.ts — Producción
export const environment = {
  production: true,
  apiUrl: 'https://api.lms.salfacorp.cl',
  googleClientId: 'your_google_client_id',
  appName: 'SalfaCorp LMS',
  version: '1.0.0',
};
```

---

## 📜 Scripts Disponibles

```bash
ng serve                              # Servidor de desarrollo
ng serve --configuration=staging     # Servidor staging
ng build                             # Build desarrollo
ng build --configuration=production  # Build producción optimizado
ng test                              # Tests unitarios (Karma/Jasmine)
ng e2e                               # Tests E2E (Cypress)
ng lint                              # ESLint
ng generate component nombre         # Generar componente
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                   # Módulo principal (singleton)
│   │   ├── services/           # AuthService, UserService, ApiService
│   │   ├── guards/             # AuthGuard, RoleGuard
│   │   ├── interceptors/       # JWT Interceptor, Error Interceptor
│   │   └── models/             # Interfaces TypeScript globales
│   │
│   ├── shared/                 # Componentes reutilizables
│   │   ├── components/         # Botones, tarjetas, modales, badges
│   │   ├── pipes/              # Pipes personalizados
│   │   └── directives/         # Directivas personalizadas
│   │
│   ├── features/               # Módulos funcionales (lazy-loaded)
│   │   ├── auth/               # Login, selección de rol
│   │   ├── dashboard/          # Dashboard por rol con KPIs
│   │   ├── learning-center/    # Catálogo, reproductor de cursos
│   │   ├── dnc/                # Módulo DNC para CH y Jefatura
│   │   ├── users/              # Gestión de usuarios (CH)
│   │   ├── certificates/       # Mis certificados
│   │   └── profile/            # Perfil del usuario
│   │
│   ├── layout/                 # Componentes de layout
│   │   ├── sidebar/            # Sidebar responsivo
│   │   ├── topbar/             # Barra superior
│   │   └── main-layout/        # Layout principal
│   │
│   └── app.routes.ts           # Rutas de la aplicación
│
├── environments/               # Variables de entorno por ambiente
│   ├── environment.ts          # Desarrollo
│   ├── environment.staging.ts  # Staging
│   └── environment.prod.ts     # Producción
│
└── assets/
    ├── fonts/                  # DM Sans
    ├── images/                 # Logos, íconos
    └── styles/                 # Variables SCSS globales

docs/
└── MANUAL_USUARIO.md           # Manual completo de usuario
```

---

## 🏗️ Arquitectura

### Componentes Standalone (Angular 20)
Todos los componentes usan la arquitectura **standalone** de Angular 20 sin NgModules.

### Lazy Loading
Cada módulo funcional se carga bajo demanda para optimizar el tiempo de carga inicial.

```typescript
// app.routes.ts
{
  path: 'learning-center',
  loadComponent: () => import('./features/learning-center/...'),
  canActivate: [AuthGuard]
}
```

### Estado de la aplicación
Se usa un store reactivo con **signals** de Angular y RxJS para el estado global.

### Comunicación con la API
Servicio `ApiService` centralizado con `HttpClient` + interceptor JWT automático.

---

## 🎨 Guía de Estilo

| Token | Valor |
|---|---|
| **Color primario** | `#9D2226` (Salfa Red) |
| **Color secundario** | `#1a1a2e` (Dark Navy) |
| **Fuente principal** | DM Sans (Google Fonts) |
| **Estética** | ShadCN-inspired · Minimal · Clean |

### PrimeNG 20 Theme
```typescript
// Tema configurado en app.config.ts
providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark-mode',
    }
  }
})
```

### SCSS Variables globales
```scss
// src/assets/styles/_variables.scss
$primary:       #9D2226;
$primary-dark:  #7a1a1d;
$surface:       #ffffff;
$surface-ground: #f8f9fa;
$text-primary:  #1a1a2e;
$border-radius: 12px;
```

---

## 📖 Documentación de Usuario

El manual completo de usuario está disponible en:

```
docs/MANUAL_USUARIO.md
```

Incluye instrucciones detalladas para los tres roles:
- 👤 **Colaborador** — Inscripción a cursos, progreso y certificados
- 👥 **Jefatura** — Seguimiento de equipo y DNC
- 🏢 **Capital Humano** — Administración completa del LMS

---

## 🌐 Roles de Usuario

| Rol | Módulos accesibles |
|---|---|
| `colaborador` | Dashboard, Centro de Aprendizaje, Certificados, Perfil |
| `jefatura` | + Vista de equipo, alertas DNC |
| `capital_humano` | + DNC completo, Gestión usuarios, Reportes, Configuración |

---

## 🧪 Testing

```bash
# Tests unitarios
ng test

# Tests E2E con Cypress
ng e2e

# Cobertura de tests
ng test --code-coverage
```

Cobertura mínima requerida: **80%**

---

## 📦 Build de Producción

```bash
ng build --configuration=production
```

El output estará en `dist/elearning-frontend/`. 
Servir el build con Nginx, Apache o cualquier servidor estático.

---

*Desarrollado por **Syntaxis** — Febrero 2026*
