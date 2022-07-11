"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactsListDomainsSumController = void 0;

var _GetContactsListDomainSum = _interopRequireDefault(require("../../../../shared/providers/HubSpot/useCases/GetContactsListDomainSum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getContactsListDomainSum = new _GetContactsListDomainSum.default();

class GetContactsListDomainsSumController {
  async index(request, response) {
    const {
      list_id
    } = request.params;
    const domainSum = await getContactsListDomainSum.execute(list_id);
    return response.json(domainSum);
  }

}

const getContactsListDomainsSumController = new GetContactsListDomainsSumController();
exports.getContactsListDomainsSumController = getContactsListDomainsSumController;