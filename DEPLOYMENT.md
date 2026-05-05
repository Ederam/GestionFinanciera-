# 🚀 Guía de Despliegue - FinancePro

Este documento detalla los pasos para desplegar la aplicación completa en entornos de producción.

## 🗄️ 1. Backend (Railway)
**Servicios requeridos:** PostgreSQL + Web Service (.NET).

### Configuración del Servicio de API:
- **Repositorio**: GitHub (Root: `/Gestion.API`)
- **Variables de Entorno (Environment Variables)**:
  - `ConnectionStrings__DefaultConnection`: Conexión dinámica a PostgreSQL.
    - *Valor*: `${{Postgres.PGHOST}};Port=${{Postgres.PGPORT}};Username=${{Postgres.PGUSER}};Password=${{Postgres.PGPASSWORD}};Database=${{Postgres.PGDATABASE}}`
  - `JWT_KEY`: Clave secreta para la firma de tokens.
  - `Jwt__Issuer`: `FinanceProAPI`
  - `Jwt__Audience`: `FinanceProApp`
  - `PORT`: `8080` (Puerto de escucha para Railway).

### Networking:
- Generar dominio público en la sección *Settings > Networking*.

---

## 🎨 2. Frontend (Vercel)
**Tecnología:** Angular (Standalone).

### Configuración del Proyecto:
- **Root Directory**: `/Gestion.Frontend`
- **Framework Preset**: Angular
- **Build Command**: `ng build`
- **Output Directory**: `dist/gestion.frontend/browser`

### Paso Crítico de Sincronización:
Asegurarse de que el archivo `src/environments/environment.prod.ts` contenga la URL generada por Railway (con el sufijo `/api`).

---

## 🔐 3. Seguridad (CORS)
Una vez obtenido el dominio de Vercel (ej: `https://tu-app.vercel.app`), se debe actualizar la política de CORS en el Backend:
1. Ir a Railway.
2. Actualizar el código o las variables si se manejan de forma dinámica para permitir el origen de Vercel.

## 🔄 4. Flujo de Actualización (CI/CD)
1. Realizar cambios en local.
2. `git add .`
3. `git commit -m "mensaje"`
4. `git push origin main`
*Los servicios se actualizarán automáticamente en minutos.*
