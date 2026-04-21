# 💸 GestionFinanciera - API de Gestión de Finanzas Personales

![.NET 9](https://img.shields.io/badge/.NET-9.0-512BD4?style=for-the-badge&logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean_Architecture-green?style=for-the-badge)

Este proyecto es una API robusta y escalable diseñada para la gestión de finanzas personales, permitiendo el control de gastos, ingresos, presupuestos y deudas. Construido bajo los principios de **Clean Architecture** y **CQRS**, garantizando un código mantenible, testeable y desacoplado.

---

## 🏗️ Arquitectura

La solución sigue el patrón de **Clean Architecture**, dividida en las siguientes capas:

- **Domain:** Entidades de negocio, excepciones personalizadas y lógica central (Core).
- **Application:** Casos de uso, interfaces, lógica de MediatR (Commands/Queries) y validaciones.
- **Infrastructure:** Persistencia de datos (EF Core, PostgreSQL), servicios externos y acceso a archivos.
- **API (Presentation):** Controladores REST, middleware y configuración de OpenAPI/Scalar.

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** .NET 9.0
- **Base de Datos:** PostgreSQL
- **ORM:** Entity Framework Core
- **Patrones:** CQRS (Command Query Responsibility Segregation)
- **Mediador:** MediatR
- **Seguridad:** Hashing de contraseñas mediante **PBKDF2** (SHA256, 100k iteraciones)
- **Documentación:** Scalar API Reference (OpenAPI)

---

## 🚀 Empezando

### Requisitos Previos
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) o [VS Code](https://code.visualstudio.com/)

### Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/USUARIO/GestionFinanciera.git
   cd GestionFinanciera
   ```

2. **Configurar la Base de Datos:**
   Actualiza la cadena de conexión en `Gestion.API/appsettings.json` con tus credenciales de PostgreSQL:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=GestionFinancieraDb;Username=postgres;Password=TU_PASSWORD"
   }
   ```

3. **Aplicar Migraciones:**
   Ejecuta los siguientes comandos desde la raíz:
   ```bash
   dotnet ef database update --project Gestion.Infrastructure --startup-project Gestion.API
   ```

4. **Ejecutar el proyecto:**
   ```bash
   dotnet run --project Gestion.API
   ```

---

## 🧪 Pruebas y Documentación

Una vez que la aplicación esté corriendo, puedes acceder a la consola de pruebas interactiva:

🔗 **Scalar UI:** `http://localhost:5284/scalar/v1`

---

## 📝 Licencia
Este proyecto está bajo la licencia MIT.
