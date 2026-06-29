# Uso de Inteligencia Artificial - EVA 2

## Información General
- **Asignatura:** Desarrollo de Aplicación Web con JavaScript
- **Estudiante:** Ivan Orellana
- **Aplicación:** Tienda de Peluches MySpace Scene (continuación de Eva1)

## Prompts utilizados

- Debo mencionar que usé el mismo chat que usé para la eva1 para tener una mejor continuación y para que no me cambiara el nombre de los archivos que ya tenia.

### 1. Estructura de datos para carrito
**Prompt:**
> Necesito una estructura de objetos eficiente para el carrito de compras en JavaScript que almacene id, nombre, precio, cantidad, color e imagen. ¿Qué estructura recomiendas?

**Mejora aplicada:**
Se implementó un arreglo de objetos con la estructura sugerida, añadiendo validación de unicidad por id+color para evitar duplicados.

### 2. Validaciones avanzadas con expresiones regulares
**Prompt:**
> Genera un codigo de JavaScript para validar nombres de productos y caracteres especiales. Además, dame validación para precio positivo y cantidad entera.

**Mejora aplicada:**
Se implementó la regex `^[a-zA-ZáéíóúñÑ0-9\s✖♠☆✰☠♥★]+$` y funciones modulares de validación con mensajes de error claros.

### 3. Prevención de XSS y sanitización
**Prompt:**
> Como puedo sanitizar texto en JavaScript para evitar ataques XSS al mostrar datos del carrito?

**Mejora aplicada:**
Se creó la función `escapeHTML()` y `sanitizarTexto()`, y todo el renderizado del carrito usa `createElement` en lugar de `innerHTML` con datos externos.

### 4. Persistencia con localStorage
**Prompt:**
> Necesito guardar el carrito de compras en localStorage y cargarlo al iniciar la página. ¿Cómo implemento eso?

**Mejora aplicada:**
Se implementó `localStorage.setItem()` en cada modificación del carrito y `cargarCarritoGuardado()` al inicio.

### 5. Refactorización de funciones
**Prompt:**
> Tengo muchas funciones en mi código, necesito reorganizarlas de formas más modulares y reutilizables. Dame sugerencias de separación.

**Mejora aplicada:**
Se separaron las funciones en: validaciones, manipulación del carrito, renderizado, y utilidades generales. Cada función tiene una única responsabilidad.

### 6. Calcular total dinámico
**Prompt:**
> Dame una función eficiente en JavaScript para calcular el total de un carrito usando reduce.

**Mejora aplicada:**
Se implementó `calcularTotalCarrito()` usando `reduce()` sobre el arreglo.
