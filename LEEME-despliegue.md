# Guía de despliegue — Práctica de Inglés SENA

Sitio 100% gratis, para usarlo un día, con registro de respuestas en **Google Sheets**.

Hay **3 pasos**: (1) crear la hoja + script, (2) pegar la URL en `config.js`, (3) subir el sitio a internet.

---

## Paso 1 — Google Sheets (recibe las respuestas)

1. Abre **https://sheets.new** (crea una hoja nueva con tu cuenta de Google). Ponle nombre, ej. *Respuestas Inglés*.
2. Menú **Extensiones → Apps Script**.
3. Borra el código de ejemplo y pega TODO el contenido del archivo **`google-apps-script.gs`**. Guarda (💾).
4. Arriba a la derecha: **Implementar → Nueva implementación**.
   - Engranaje ⚙️ → tipo **Aplicación web**.
   - *Ejecutar como:* **Yo**.
   - *Quién tiene acceso:* **Cualquier persona**.
   - **Implementar**. Acepta los permisos que pida (es tu propia cuenta).
5. Copia la **URL del Web App** (termina en `/exec`).

---

## Paso 2 — Conectar el sitio

1. Abre el archivo **`config.js`**.
2. Pega tu URL dentro de las comillas:
   ```js
   const CONFIG = {
     SHEET_ENDPOINT: "https://script.google.com/macros/s/AKfyc.../exec"
   };
   ```
3. Guarda.

> Si dejas `SHEET_ENDPOINT: ""` vacío, el sitio igual funciona, pero en vez de enviar a la hoja, **descarga un archivo .json** con las respuestas de cada estudiante (respaldo manual).

---

## Paso 3 — Subir el sitio a internet (gratis)

Como tus compañeros lo harán **desde casa**, necesitas un link público. La opción más rápida sin instalar nada:

### Opción recomendada: Netlify Drop (arrastrar y soltar)
1. Entra a **https://app.netlify.com/drop**.
2. Arrastra la carpeta **`sitio`** completa a la página.
3. En segundos te da un link tipo `https://nombre-aleatorio.netlify.app`. Ese es el que compartes.
   - (Crear cuenta gratis es opcional pero recomendado para que el link no expire ese día.)

### Alternativas gratis equivalentes
- **Cloudflare Pages** (https://pages.cloudflare.com) — arrastrar carpeta, link permanente.
- **GitHub Pages** — si usas GitHub: sube la carpeta a un repo y activa Pages.

> **Importante:** sube la carpeta completa (con `index.html`, `styles.css`, `app.js`, `data.js`, `config.js`, `logoSena.png`, `logoFactugest.png`). El archivo `google-apps-script.gs` y este `LEEME` no afectan; puedes dejarlos o quitarlos.

---

## Cómo revisas las respuestas
Cada estudiante que finaliza agrega **una fila** a tu Hoja de Google con:
`nombre`, `fecha`, `puntaje_auto` (de las secciones autocalificables) y **todas** sus respuestas por pregunta.
La **Sección 3** se revisa en grupo: las respuestas quedan guardadas para que cada quien diga lo que puso.

---

## Notas sobre la calificación automática
- **Sección 1** (verbos): exacta, acepta contracciones (`don't`/`do not`, `'ll`/`will`).
- **Sección 2A y 2B**: compara ignorando mayúsculas, puntuación y guiones, y **acepta los dos órdenes** del condicional (`If ..., ...` y `... if ...`).
- **Sección 3**: abierta, no se autocalifica (se revisa en grupo).
- El verificador por sección solo marca ✅/❌ (no explica el porqué). El verbo correcto se muestra al final, en la vista de resultados bloqueada.
