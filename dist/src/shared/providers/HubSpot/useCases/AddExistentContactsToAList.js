"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bigArraySplitter = require("../../../utils/bigArraySplitter");

var _HubSpotEndpoints = _interopRequireDefault(require("../infra/http/HubSpotEndpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hubSpotEndpoints = new _HubSpotEndpoints.default();

class AddExistentContactsToAList {
  async execute(listId, emails) {
    process.stdout.write(`\nADDING CONTACTS TO LIST ${listId} ON HUBSPOT...\n`);
    const splittedEmailsBatch = (0, _bigArraySplitter.bigArraySplitter)(emails, 500);

    for await (const emailsBatch of splittedEmailsBatch) {
      hubSpotEndpoints.addExistentContactsToAList(listId, emailsBatch);
    }

    process.stdout.write(`\nCONTACTS TO ADDED TO THE LIST ${listId} ON HUBSPOT.\n`);
  }

}

exports.default = AddExistentContactsToAList;