"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ErrorsApp = _interopRequireDefault(require("../../../../errors/ErrorsApp"));

var _delayBetweenRequests = _interopRequireDefault(require("../../../../utils/delayBetweenRequests"));

var _hubSpotApiConnect = require("./hubSpotApiConnect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hubSpotApiKey = process.env.HUBSPOT_API_KEY;

class HubSpotEndpoints {
  async createContactList(firstName, lastName) {
    await (0, _delayBetweenRequests.default)(100);
    const contactList = await _hubSpotApiConnect.hubSpotApi.post('/contacts/v1/lists', {
      name: `${firstName}.${lastName}.${Date.now()}`
    }, {
      params: {
        hapikey: hubSpotApiKey
      }
    }).catch(err => {
      throw new _ErrorsApp.default(err.message, 400);
    });
    const {
      name,
      listId
    } = contactList.data;
    console.log(`\nCONTACT LIST CREATED:\n     name: ${name} \n     listID: ${listId}\n`);
    return listId;
  }

  async addExistentContactsToAList(listId, emailsBatch) {
    await (0, _delayBetweenRequests.default)(100);

    _hubSpotApiConnect.hubSpotApi.post(`/contacts/v1/lists/${listId}/add/`, {
      emails: emailsBatch
    }, {
      params: {
        hapikey: hubSpotApiKey
      }
    }).catch(err => {
      throw new _ErrorsApp.default(err.message, 400);
    });
  }

  async createContactsInBatch(body) {
    await (0, _delayBetweenRequests.default)(100);

    _hubSpotApiConnect.hubSpotApi.post('/contacts/v1/contact/batch/', body, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        hapikey: hubSpotApiKey
      }
    }).catch(err => {
      throw new _ErrorsApp.default(err.message, 400);
    });
  }

  async getContactsInAList(listId, offset) {
    const {
      data
    } = await _hubSpotApiConnect.hubSpotApi.get(`/contacts/v1/lists/${listId}/contacts/all`, {
      params: {
        hapikey: hubSpotApiKey,
        count: 100,
        property: 'email',
        vidOffset: offset
      }
    }).catch(err => {
      console.log(err);
    });
    return data;
  }

}

exports.default = HubSpotEndpoints;