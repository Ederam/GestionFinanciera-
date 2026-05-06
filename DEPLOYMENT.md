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
**Tecnología:** Angular 18+ (Standalone).

Al estar el Backend y Frontend en el mismo repositorio, Vercel necesita instrucciones específicas para encontrar y compilar solo la carpeta de Angular.

### Configuración Inicial (Al Importar el Proyecto):
- **Framework Preset**: Seleccionar explícitamente `Angular`.
- **Root Directory**: Hacer clic en Edit y seleccionar `Gestion.Frontend`. (Esto le dice a Vercel que ignore el Backend en C#).
- **Build Command**: Dejar el default (`ng build`).

### Configuración Crítica (Después del primer despliegue):
Debido a la nueva estructura de Angular (Application Builder), Vercel puede generar un error `404 NOT FOUND` si no se ajusta la carpeta de salida.
1. Ir a la pestaña **Settings** del proyecto en Vercel.
2. Menú lateral izquierdo: **General**.
3. Bajar hasta **Build & Development Settings**.
4. En **Output Directory**, encender el switch de *Override*.
5. Escribir exactamente: `dist/gestion.frontend/browser`
6. Guardar (Save) y realizar un **Redeploy** desde la pestaña de Deployments.

### Paso de Sincronización:
El archivo `src/environments/environment.prod.ts` **debe** contener la URL pública que generó Railway (con el sufijo `/api`) *antes* de hacer el push que dispara el despliegue en Vercel.

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
