# 📝 CheatSheet: Comandos Frecuentes del Proyecto

Este archivo contiene los comandos más utilizados para mantener, compilar y ejecutar tanto el Backend (.NET) como el Frontend (Angular) de la aplicación `GestionFinanciera`.

---

## 🟢 Frontend (Angular)

**Ruta Base:** Debes estar en `d:\ER-DEV\Gestion` para comandos estructurales, y en `d:\ER-DEV\Gestion\Gestion.Frontend` para comandos de desarrollo.

### 1. Inicializar el Proyecto Angular (Una sola vez)
Este comando crea el cascarón del frontend en el Monorepo, configurando las rutas y estilos, omitiendo la creación de un nuevo repositorio Git para no causar conflictos con el existente.
```powershell
npx -y @angular/cli@18 new Gestion.Frontend --routing --style=css --skip-git
```

### 2. Levantar el Servidor de Desarrollo (Frontend)
Debes entrar a la carpeta del frontend y ejecutar el servidor. Esto habilitará el "Hot Reload" (cada cambio en el código actualizará la pantalla automáticamente).
```powershell
cd Gestion.Frontend
npm start
# O alternativamente:
# npx ng serve -o
```

### 3. Instalar Nuevos Paquetes (Librerías NPM)
Si necesitas alguna librería visual o herramienta externa.
```powershell
cd Gestion.Frontend
npm install nombre_del_paquete
```

---

## 🔵 Backend (.NET 9)

**Ruta Base:** Debes estar en `d:\ER-DEV\Gestion`.

### 1. Compilar el Proyecto
Verifica que no existan errores de código en ninguna capa.
```powershell
dotnet build
```

### 2. Levantar el Servidor (API)
Inicia la API y abre automáticamente Scalar UI en el navegador.
```powershell
dotnet run --project Gestion.API
```

### 3. Ejecutar Pruebas Unitarias
Valida que la lógica de negocio (CQRS y Validators) siga intacta.
```powershell
dotnet test
```

### 4. Crear y Aplicar Migraciones (Base de Datos)
Cuando hagas cambios en las Entidades de `Gestion.Domain` (Ej: Agregar una columna nueva).
```powershell
# Crear la migración
dotnet ef migrations add NombreDelCambio --project Gestion.Infrastructure --startup-project Gestion.API

# Aplicar los cambios a PostgreSQL
dotnet ef database update --project Gestion.Infrastructure --startup-project Gestion.API
```
