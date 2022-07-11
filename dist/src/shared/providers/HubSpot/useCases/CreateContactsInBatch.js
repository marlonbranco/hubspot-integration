"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HubSpotEndpoints = _interopRequireDefault(require("../infra/http/HubSpotEndpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { inject, injectable } from 'tsyringe';
// import IHubSpotEndpoints from '@sharedProviders/HubSpot/implementations/IHubSpotEndpoints';
const hubSpotEndpoints = new _HubSpotEndpoints.default(); // @injectable()

class CreateContactsInBatch {
  /* constructor(
    @inject('HubSpotEndpoints')
    private hubSpotEndpoints: IHubSpotEndpoints
  ) {} */
  async execute(contactsBatch) {
    process.stdout.write('\nCREATING CONTACTS ON HUBSPOT...\n');
    let emailsList = [];

    for await (const batch of contactsBatch) {
      await hubSpotEndpoints.createContactsInBatch(batch);
      const emails = batch.map(({
        email
      }) => email);
      emailsList.push(emails);
    }

    emailsList = emailsList.flat(1);
    process.stdout.write('\nFINISHED CREATING CONTACTS\n');
    return emailsList;
  }

}

exports.default = CreateContactsInBatch;