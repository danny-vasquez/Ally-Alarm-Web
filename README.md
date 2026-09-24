# Ally Alarm Web

Dashboard web de Ally Alarm: gestión de plantillas de alarmas, categorías y
dispositivos. React + TypeScript + Tailwind CSS v4, con los componentes
Material Design 3 oficiales de Google (`@material/web`).

## Requisitos

- Node.js 20 o superior
- npm

## Cómo correr la app

```bash
npm install
npm run dev
```

Esto levanta el servidor de desarrollo (Vite) en `http://localhost:5173`.

## Pantallas incluidas

- **Inicio** (`/`) — calendario semanal con las alarmas, filtrable por categoría.
- **Plantillas** (`/plantillas`) — lista de plantillas por categoría, con opción de crear, editar y eliminar.
- **Crear/editar plantilla** (`/plantillas/editar/:categoryId`) — armado de los pasos (secciones) de una plantilla.
- **Categorías** (`/categorias`) — activar o desactivar todas las alarmas de una categoría.
- **Configuración** (`/configuracion`) — accesos a las distintas configuraciones de la app.
- **Gestión de dispositivos** (`/configuracion/gestion-dispositivos`) — comportamiento de las alarmas por dispositivo (móvil, smartwatch, web).

## Sobre la fidelidad al diseño

El diseño está hecho pensando en pantallas de 1920x1080, que es el tamaño
de los frames de Figma. Ahí es donde la app se ve pixel perfect.

En pantallas más chicas la app sigue funcionando bien,
pero se va adaptando (no es una réplica exacta del diseño a escala). Así
que si algo se ve un poco distinto en una laptop o en el celular, es
esperable — para comparar contra el diseño real, lo ideal es abrir el
navegador a 1920x1080.

Respecto a la imagen que se usa en el sidebar puede verse más arriba o más abajo dependiendo de la altura de la pantalla.

## Consideraciones retroalimentación anterior entrega

Se hicieron ajustes de la retroalimentación dada en la entrega de los mockups: 
los botones morados ahora tienen texto en blanco y en la imagen del sidebar tiene un cierto filtro degradiente oscuro para mejorar la legibilidad del texto.

## Comparar contra los frames de Figma

Hay scripts en `playwright/` para sacar capturas de la app a 1920x1080 y
compararlas a ojo (con diff resaltado en rojo) contra PNG exportados de
Figma. Ver `playwright/screenshot.js` y `playwright/diff.js`, o los scripts
`npm run screenshots` / `npm run diff` en `package.json`.
