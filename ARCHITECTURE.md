# Documentación de Arquitectura y Decisiones Técnicas

Este documento detalla los patrones, librerías y decisiones de diseño fundamentales utilizadas en el desarrollo de la API de **GestionFinanciera**. Esta documentación debe mantenerse viva y actualizarse conforme el proyecto evolucione.

---

## 1. CQRS y MediatR

### ¿Qué es CQRS?
CQRS (Command Query Responsibility Segregation) es un patrón que establece que las operaciones que leen datos (Queries) deben estar estrictamente separadas de las operaciones que modifican el estado del sistema (Commands).
- **Commands (Crear, Actualizar, Borrar):** Tienen una intención clara de cambiar algo. Usualmente no devuelven datos (excepto el ID del elemento creado o un status).
- **Queries (Leer):** Solo obtienen información. Nunca deben modificar el estado de la base de datos (no tienen "side effects").

### ¿Por qué MediatR?
MediatR es la implementación del patrón **Mediador** en .NET. 
- En lugar de que el `GastosController` reciba por el constructor un `IGastosService` y conozca toda la lógica de cómo se crea un gasto, el controlador simplemente envía un mensaje al "Mediador": `_mediator.Send(new CreateGastoCommand())`.
- MediatR se encarga de buscar quién es el responsable de manejar ese mensaje (`CreateGastoCommandHandler`) y lo ejecuta.
- **Ventaja:** Desacoplamiento extremo. Los controladores quedan casi vacíos, y cada funcionalidad (caso de uso) vive en un archivo aislado, cumpliendo el principio de Responsabilidad Única (SRP).

---

## 2. El Uso de DTOs (Data Transfer Objects)

Los DTOs son objetos diseñados puramente para transportar datos entre procesos (en nuestro caso, desde el servidor al cliente web/móvil vía HTTP).

### ¿Por qué no usar las Entidades de Dominio directamente?
1. **Seguridad:** Una entidad `Usuario` tiene un `PasswordHash`. Si devolvemos la entidad, podríamos filtrar contraseñas por error. Con un `UsuarioDto`, explícitamente elegimos qué campos exponer.
2. **Prevención de Over-posting:** Si usamos entidades para recibir datos, un usuario malintencionado podría enviar campos extra en el JSON intentando modificar propiedades internas a las que no debería tener acceso.
3. **Prevención de Referencias Circulares:** Al usar Entity Framework, las entidades tienen propiedades de navegación (ej. un `Gasto` tiene una `Categoria`, y una `Categoria` tiene una lista de `Gastos`). Al intentar serializar esto a JSON, el serializador entra en un bucle infinito. El DTO corta esto de raíz.

---

## 3. Seguridad: Hashing de Contraseñas (PBKDF2)

### ¿Qué es y por qué se eligió?
Utilizamos **PBKDF2** (Password-Based Key Derivation Function 2) con SHA256 y 100,000 iteraciones.
- Se eligió porque **viene nativamente implementado en .NET** a través de `Rfc2898DeriveBytes`. Esto significa que no dependemos de librerías de terceros para la seguridad crítica de la aplicación.
- Es un estándar recomendado por el NIST (Instituto Nacional de Estándares y Tecnología de EE. UU.).
- Se utiliza un **Salt aleatorio** (una cadena extraña que se mezcla con el password) por cada usuario para evitar ataques de tablas arcoíris (Rainbow tables).

### Alternativas en la industria
- **Argon2 / BCrypt:** Son algoritmos más modernos y diseñados específicamente para ser resistentes no solo a fuerza bruta en CPU, sino también a ataques usando Tarjetas Gráficas (GPUs) o hardware especializado (ASICs).
- **¿Es PBKDF2 profesional?** Sí, lo es. Sin embargo, para aplicaciones de máxima seguridad bancaria moderna, muchos optan hoy en día por Argon2. PBKDF2 es el estándar perfecto y profesional para nuestra arquitectura actual.

---

## 4. Inyección de Dependencias (DI)

La DI es una técnica donde un objeto recibe los otros objetos que necesita para funcionar (dependencias) en lugar de crearlos él mismo usando la palabra clave `new`.

- **Pro:** Código altamente testeable. Cuando hagamos pruebas unitarias, en lugar de pasarle la base de datos real al Handler, le inyectaremos una base de datos "falsa" en memoria.
- **Manejo de Ciclo de Vida:** El framework de .NET maneja automáticamente cuándo se crea y cuándo se destruye la conexión a la base de datos (Scoped), asegurando que no dejemos conexiones abiertas consumiendo memoria.

---

## 5. Entity Framework Core (EF Core) vs Micro-ORMs

Utilizamos **Entity Framework Core**, que es un ORM (Object-Relational Mapper) completo.

### Pros (Por qué lo elegimos):
1. **Velocidad de Desarrollo:** Permite escribir consultas en C# (LINQ) sin escribir SQL crudo, lo que acelera dramáticamente el desarrollo.
2. **Seguridad Tipada:** Si cambias el nombre de una propiedad en tu código, el compilador te avisa de los errores. Si escribes un string SQL a mano, el error lo ves hasta que la app se cae (en tiempo de ejecución).
3. **Migraciones:** Mantiene un historial de versiones de tu base de datos mediante código, permitiendo recrear la BD en cualquier servidor en segundos.

### Contras y Alternativas (ej. Dapper):
- **Contras:** EF Core genera el SQL por detrás. En consultas extremadamente complejas, el SQL generado puede no ser el más óptimo, afectando ligeramente el rendimiento.
- **Dapper (Micro-ORM):** Es la alternativa profesional número uno. Es ridículamente rápido porque no "rastrea" los cambios de los objetos, simplemente mapea filas de SQL a objetos en C#.
- **La decisión Arquitectónica:** En Clean Architecture moderno, lo más profesional es usar **EF Core para las modificaciones (Commands)**, aprovechando que rastrea el estado y facilita los guardados complejos. Para las **consultas masivas y de alto rendimiento (Queries)**, se suele integrar Dapper para ganar velocidad bruta. Por ahora, para mantener la complejidad baja, hemos usado EF Core con `.AsNoTracking()` en las Queries, lo cual nos da un rendimiento casi igual al de Dapper para lecturas simples.

---

*Nota: Este documento será actualizado automáticamente cada vez que incorporemos un nuevo concepto arquitectónico crítico al proyecto.*
