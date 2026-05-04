# 💎 Frontend Architecture & Principles - FinancePro

Este documento describe los estándares técnicos, el stack y los principios aplicados en el desarrollo de la interfaz de usuario de **FinancePro**.

## 🚀 Tech Stack
- **Framework**: Angular 18+ (Standalone Architecture).
- **Lenguaje**: TypeScript (Strict Mode).
- **Estilos**: Vanilla CSS con Sistema de Variables Atómicas.
- **Gráficos**: Chart.js (Integración reactiva).
- **Estado**: Services con RxJS (BehaviorSubjects/Observables).

## 🏛️ Estructura de Carpetas (Clean Frontend)
Se sigue un patrón de organización por **módulos de interés**:
- `/core`: Servicios globales, interceptores y guardias (Singleton scope).
- `/shared`: Componentes reutilizables (Botones, Layouts, Inputs).
- `/features`: Módulos de negocio (Gastos, Categorías, Auth).

## 🛠️ Principios de Diseño y Código
### 1. Standalone Components
Eliminamos la complejidad de los `NgModules`. Cada componente es autónomo, facilitando las pruebas unitarias y el *tree-shaking*.

### 2. Design System (Atomic CSS)
No usamos frameworks como Bootstrap o Tailwind para mantener un control total sobre el rendimiento. 
- **Variables CSS**: Centralizadas en `styles.css` para consistencia de colores, sombras y bordes.
- **Glassmorphism**: Uso extendido de `backdrop-filter` y transparencias para una estética premium.

### 3. Responsabilidad Única (SRP)
- **Componentes**: Solo manejan la lógica de presentación y eventos de usuario.
- **Servicios**: Única fuente de verdad para la comunicación con la API y manejo de datos.

### 4. Seguridad y Guardias
- **AuthGuard**: Protección de rutas a nivel de Router.
- **JWT Handling**: Decodificación segura de tokens para obtener contexto de usuario sin peticiones extra al servidor.

### 5. UX Reactiva
- **Validaciones**: Uso de `ReactiveForms` con feedback visual inmediato.
- **Animaciones**: Micro-interacciones sutiles para mejorar la percepción de fluidez (Shakes, Fade-ins).

## 📈 Escalabilidad
El sistema está diseñado para añadir nuevas funcionalidades (ej. Presupuestos) simplemente creando una nueva carpeta en `/features` y registrando la ruta en el `app.routes.ts`, heredando automáticamente el `MainLayout`.
