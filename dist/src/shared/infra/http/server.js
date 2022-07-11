"use strict";

require("reflect-metadata");

require("dotenv/config");

require("express-async-errors");

var _ErrorsApp = _interopRequireDefault(require("../../errors/ErrorsApp"));

var _CreateContactsFromCsvFile = _interopRequireDefault(require("../../../modules/contacts/useCases/CreateContactsFromCsvFile"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = Number(process.env.PORT) || 3333;
const URL = process.env.URL || '0.0.0.0';
const createContactsFromCsvFile = new _CreateContactsFromCsvFile.default();

if (!URL) {
  throw new _ErrorsApp.default('URL_UNDEFINED');
}

_app.default.listen(PORT, URL, async () => {
  process.stdout.write(`Backend running on http://${URL}:${PORT}\n`);
  await createContactsFromCsvFile.execute();
});