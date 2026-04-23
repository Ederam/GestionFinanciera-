# GestionFinanciera: El Motor Inteligente de tus Finanzas Personales

GestionFinanciera no es solo otra API de gastos; es un **motor transaccional de grado empresarial** diseñado para ser el cerebro detrás de la próxima gran aplicación Fintech. Construida con los más altos estándares de la industria, está lista para escalar a millones de usuarios desde el día uno.

## 🚀 ¿Qué hace especial a GestionFinanciera?

### 1. Arquitectura de Élite (Clean Architecture + CQRS)
La mayoría de los proyectos colapsan bajo su propio peso cuando crecen. GestionFinanciera está construida con **Clean Architecture**, asegurando que la lógica de negocio viva aislada de los detalles técnicos. Además, implementa el patrón **CQRS (Command Query Responsibility Segregation)**, dividiendo las operaciones de lectura y escritura.
*   **El Beneficio:** Si mañana tu app explota en popularidad y tienes millones de personas "leyendo" su saldo, puedes escalar los servidores de lectura de forma independiente a los de escritura, garantizando un rendimiento ultra-rápido siempre.

### 2. Seguridad Nivel Bancario
No jugamos con los datos de los usuarios.
*   **Hashing PBKDF2:** Las contraseñas están protegidas con el mismo estándar recomendado por el NIST, combinando criptografía SHA-256 con *Salts* dinámicos y 100,000 iteraciones para ser inmunes a los hackeos.
*   **Escudos JWT:** Cada transacción está respaldada por un ecosistema **JSON Web Token**, garantizando que un usuario jamás pueda ver o modificar la billetera de otro.

### 3. Escudo Anti-Corrupción (FluentValidation)
¿Usuarios enviando correos falsos o gastos con montos negativos? Imposible. Hemos forjado una capa interceptora impulsada por `FluentValidation` y `MediatR` que atrapa los datos corruptos "en vuelo" antes de que siquiera toquen la base de datos, devolviendo mensajes de error elegantes y precisos.

### 4. Módulos Core Completos
Nuestra API domina el flujo del dinero:
*   👤 **Usuarios:** Multi-tenancy nativo.
*   🏷️ **Categorías:** Clasificación personalizada.
*   💸 **Gastos e Ingresos:** El flujo de caja en tiempo real.
*   📅 **Presupuestos:** Herramientas para planificar y ahorrar.
*   💳 **Deudas:** Gestión de cuentas por pagar para evitar intereses.

### 5. Documentación Interactiva (Scalar UI)
Olvídate de leer tediosos PDFs para entender cómo conectarte. Nuestra API expone una interfaz visual **OpenAPI de última generación (Scalar)** donde los desarrolladores Frontend o Móvil pueden probar e integrar cada endpoint con un par de clics.

### 6. Calidad Comprobada
El código cuenta con una suite inicial de **Pruebas Unitarias** con *xUnit* y *Moq*, garantizando que la refactorización futura nunca rompa el núcleo financiero.

---

**GestionFinanciera** es la base de código perfecta para construir una aplicación iOS, Android o Web (React/Angular) que compita de frente con los unicornios financieros. Estabilidad, seguridad y rendimiento extremo, desde la primera línea de código.
