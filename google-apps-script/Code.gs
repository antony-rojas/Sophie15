/**
 * Confirmaciones de los XV de Sophie.
 *
 * 1. Crea una hoja de Google en blanco.
 * 2. Extensiones → Apps Script. Borra lo que haya y pega este archivo.
 * 3. Implementar → Nueva implementación → Aplicación web.
 *    Ejecutar como: Yo
 *    Quién tiene acceso: Cualquier persona
 * 4. Copia la URL que termina en /exec y pégala en rsvpScriptUrl de src/config.ts.
 * 5. Si cambias este script, crea una implementación nueva (las viejas no se actualizan solas).
 *
 * El PIN solo vive aquí. La página lo envía cuando abres el panel; no está en el sitio público.
 */
var ADMIN_PIN = '0221';
var SHEET_NAME = 'Invitados';

function doGet() {
  return json({ ok: true, service: 'sophie-rsvp' });
}

function doPost(e) {
  try {
    var body = JSON.parse((e.postData && e.postData.contents) || '{}');
    var action = body.action;

    if (action === 'add') {
      return json({ ok: true, record: addGuest(body.fullName, body.phone) });
    }

    if (String(body.pin || '') !== ADMIN_PIN) {
      return json({ ok: false, error: 'PIN incorrecto' });
    }

    if (action === 'list') return json({ ok: true, records: listGuests() });
    if (action === 'delete') {
      deleteGuest(body.id);
      return json({ ok: true, records: listGuests() });
    }
    if (action === 'clear') {
      clearGuests();
      return json({ ok: true, records: [] });
    }

    return json({ ok: false, error: 'Acción no reconocida' });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('Abre el script desde la hoja (Extensiones → Apps Script), no como proyecto suelto.');
  }

  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
  }

  if (sh.getLastRow() === 0) {
    sh.appendRow(['id', 'Nombre', 'Teléfono', 'Fecha']);
    sh.getRange(1, 1, 1, 4).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.hideColumns(1);
    sh.setColumnWidth(2, 240);
    sh.setColumnWidth(3, 160);
    sh.setColumnWidth(4, 180);
  }

  return sh;
}

function addGuest(fullName, phone) {
  var name = String(fullName || '').trim();
  var tel = String(phone || '').trim();

  if (!name || !tel) {
    throw new Error('Nombre y teléfono son obligatorios');
  }
  if (name.length > 120 || tel.length > 40) {
    throw new Error('Datos demasiado largos');
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var now = new Date();
    var record = {
      id: 'rsvp_' + now.getTime() + '_' + Math.floor(Math.random() * 100000),
      fullName: name,
      phone: tel,
      attending: 'yes',
      guestsCount: 1,
      timestamp: now.toISOString(),
      formattedDate: Utilities.formatDate(now, 'America/Lima', 'dd/MM/yyyy HH:mm')
    };

    getSheet().appendRow([
      record.id,
      plainText(record.fullName),
      plainText(record.phone),
      record.formattedDate
    ]);

    return record;
  } finally {
    lock.releaseLock();
  }
}

function listGuests() {
  var values = getSheet().getDataRange().getValues();
  var records = [];

  for (var i = 1; i < values.length; i++) {
    if (!values[i][0]) continue;
    records.push({
      id: String(values[i][0]),
      fullName: String(values[i][1]),
      phone: String(values[i][2]),
      attending: 'yes',
      guestsCount: 1,
      timestamp: '',
      formattedDate: String(values[i][3])
    });
  }

  records.reverse();
  return records;
}

function deleteGuest(id) {
  var sh = getSheet();
  var values = sh.getDataRange().getValues();
  for (var i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0]) === String(id)) {
      sh.deleteRow(i + 1);
      return;
    }
  }
}

function clearGuests() {
  var sh = getSheet();
  var last = sh.getLastRow();
  if (last > 1) sh.deleteRows(2, last - 1);
}

function plainText(value) {
  var text = String(value);
  if (/^[=+\-@]/.test(text)) return "'" + text;
  return text;
}
