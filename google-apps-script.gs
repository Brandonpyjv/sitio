/* ============================================================
   GOOGLE APPS SCRIPT — Recibe las respuestas y las guarda en la hoja
   Cómo usar:
   1. Crea una Hoja de Google nueva (sheets.new). Ponle un nombre, ej: "Respuestas Inglés".
   2. Menú: Extensiones > Apps Script.
   3. Borra todo y pega ESTE código. Guarda (icono de disquete).
   4. Implementar > Nueva implementación > tipo "Aplicación web".
      - Ejecutar como: Yo
      - Quién tiene acceso: Cualquier persona
   5. Copia la URL que termina en /exec y pégala en config.js (SHEET_ENDPOINT).
   ============================================================ */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    // Si la hoja está vacía, crea encabezados con las llaves recibidas
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }

    // Ordena los valores según el encabezado existente
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ""; });

    // Agrega columnas nuevas si llegan llaves que no estaban
    Object.keys(data).forEach(function (k) {
      if (headers.indexOf(k) === -1) {
        sheet.getRange(1, headers.length + 1).setValue(k);
        row.push(data[k]);
        headers.push(k);
      }
    });

    sheet.appendRow(row);
    return ContentService.createTextOutput("OK");
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err);
  }
}
