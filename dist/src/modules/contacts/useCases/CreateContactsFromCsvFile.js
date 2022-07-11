"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateContactList = _interopRequireDefault(require("../../../shared/providers/HubSpot/useCases/CreateContactList"));

var _CreateContactsInBatch = _interopRequireDefault(require("../../../shared/providers/HubSpot/useCases/CreateContactsInBatch"));

var _AddExistentContactsToAList = _interopRequireDefault(require("../../../shared/providers/HubSpot/useCases/AddExistentContactsToAList"));

var _Papaparser = _interopRequireDefault(require("../../../shared/providers/Papaparser"));

var _perf_hooks = require("perf_hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CRIAR UMA LISTA NO HUBSPOT
// CRIAR OS CONTATOS DO CSV NO HUBSPOT
// ADICIONA OS CONTATOS CRIARDOS A LISTA CRIADA
const firstName = 'marlon';
const lastName = 'valentino';
const createContactList = new _CreateContactList.default();
const createContactsInBatch = new _CreateContactsInBatch.default();
const addExistentContactsToAList = new _AddExistentContactsToAList.default();
const uploader = new _Papaparser.default();

class CreateContactsFromCsvFile {
  async execute() {
    const initTime = _perf_hooks.performance.now();

    const listId = await createContactList.execute(firstName, lastName).catch(err => {
      console.log(err);
    });
    const contactsBatch = await uploader.readFile('Contatos.csv');

    if (!contactsBatch) {
      process.stdout.write('\nDATA NOT FOUND');
    }

    const emails = await createContactsInBatch.execute(contactsBatch);
    await addExistentContactsToAList.execute(listId, emails);

    const endTime = _perf_hooks.performance.now();

    const executionTime = (endTime - initTime) * 100 / 1000 / 100;
    process.stdout.write(`\nPROCESS COMPLETED IN ${executionTime}s\n`);
  }

}

exports.default = CreateContactsFromCsvFile;